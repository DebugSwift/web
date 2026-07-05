#!/usr/bin/env bash
# Shared simulator build + axe helpers for DebugSwift screenshot scripts.

: "${ROOT:?ROOT must be set before sourcing sim-capture.sh}"
: "${WEB:?WEB must be set before sourcing sim-capture.sh}"

SIM_NAME="${SIM_NAME:-iPhone 17 Pro}"
DERIVED="${DERIVED_DATA_PATH:-/tmp/DebugSwiftDerived}"
NPX_CACHE="$(ls -d "$HOME"/.npm/_npx/*/node_modules/xcodebuildmcp 2>/dev/null | tail -1)"
AXE="${AXE:-$NPX_CACHE/bundled/axe}"
NODE_ARM="${NODE_ARM:-$HOME/.local/share/cursor-agent/versions/2025.09.18-7ae6800/node}"

# iPhone 17 Pro portrait (402×874)
SCREEN_W=402
SCREEN_H=874

if [[ ! -x "$AXE" ]]; then
  echo "axe not found; run: npx -y xcodebuildmcp@latest tools" >&2
  exit 1
fi

run_xbmcp() {
  if [[ -x "$NODE_ARM" ]]; then
    "$NODE_ARM" "$(dirname "$(command -v npx)")/npx" -y xcodebuildmcp@latest "$@"
  else
    npx -y xcodebuildmcp@latest "$@"
  fi
}

axe() { arch -arm64 "$AXE" "$@"; }

screenshot() {
  local dest="$1"
  xcrun simctl io "$SIM" screenshot "$dest"
}

build_and_launch() {
  echo "Building and launching Example app..."
  local build_json
  build_json="$(run_xbmcp simulator build-and-run \
    --project-path "$ROOT/Example/Example.xcodeproj" \
    --scheme Example \
    --simulator-name "$SIM_NAME" \
    --derived-data-path "$DERIVED" \
    --output json)"

  SIM="$(echo "$build_json" | python3 -c "
import json,sys
d=json.load(sys.stdin)
print(d.get('data',{}).get('artifacts',{}).get('simulatorId',''))
" 2>/dev/null)"

  if [[ -z "$SIM" ]]; then
    echo "build-and-run failed:" >&2
    echo "$build_json" >&2
    exit 1
  fi
  echo "Simulator: $SIM ($SIM_NAME)"
  sleep 2
}

ui_json() {
  axe describe-ui --udid "$SIM" 2>/dev/null || echo "[]"
}

ui_has() {
  local pattern="$1"
  ui_json | python3 -c "
import json,sys,re
pat=sys.argv[1]
data=json.load(sys.stdin)
# Anchor patterns (^...\$) = full label match; otherwise substring.
anchored=pat.startswith('^') and pat.endswith('\$')
rx=re.compile(pat[1:-1] if anchored else pat, re.I)
def walk(n):
    label=n.get('AXLabel') or ''
    if anchored:
        if rx.match(label): return True
    elif rx.search(label):
        return True
    for c in n.get('children',[]) or []:
        if walk(c): return True
    return False
sys.exit(0 if any(walk(r) for r in data) else 1)
" "$pattern"
}

ui_on_debugger_tab() {
  ui_has "^Network$|^Performance$|^Interface$|^Resources$|^App$" \
    && ! ui_has "^DebugSwift Examples$"
}

wait_for_ui() {
  local pattern="$1"
  local timeout="${2:-15}"
  local i=0
  while (( i < timeout * 2 )); do
    if ui_has "$pattern"; then return 0; fi
    sleep 0.5
    ((i++))
  done
  return 1
}

tap_label() {
  axe tap --udid "$SIM" --label "$1" \
    --wait-timeout "${3:-5}" \
    --post-delay "${2:-0.8}" 2>/dev/null
}

tap_coord() {
  axe tap --udid "$SIM" -x "$1" -y "$2" --post-delay "${3:-0.8}" 2>/dev/null
}

scroll_down() {
  axe gesture scroll-down --udid "$SIM" --post-delay "${1:-0.6}" 2>/dev/null || true
}

scroll_up() {
  axe gesture scroll-up --udid "$SIM" --post-delay "${1:-0.6}" 2>/dev/null || true
}

go_home_screen() {
  axe button --udid "$SIM" --button home --post-delay 0.8 2>/dev/null || true
}

dismiss_alert() {
  tap_label "OK" 0.4 || tap_label "Cancel" 0.4 || tap_label "Allow" 0.4 || true
}

close_debugger() {
  if ui_has "^Network$|^Performance$|^Interface$|^Resources$|^App$"; then
    tap_label "Close" 0.8 || tap_label "Fechar" 0.8 || tap_coord 382 79 0.8
    sleep 0.8
  fi
  if ui_has "^Snapshot$|^Hierarchy$"; then
    tap_label "OK" 0.5 || tap_coord 364 84 0.5
    sleep 0.5
  fi
}

ensure_examples_home() {
  local i
  for ((i = 0; i < 6; i++)); do
    dismiss_alert
    close_debugger
    if ui_has "DebugSwift Examples"; then
      return 0
    fi
    # REST API / pushed screens: back chevron top-left
    tap_coord 30 79 0.8
    sleep 0.5
  done
  ui_has "DebugSwift Examples"
}

hide_debug_ball_on_home() {
  ensure_examples_home
  if ui_has "^Círculo$|^circle"; then
    tap_label "Círculo" 0.6 || tap_coord 302 84 0.6
    sleep 0.4
  fi
}

show_debug_ball_on_home() {
  ensure_examples_home
  # Toggle shows ball when hidden (circle.dotted state)
  if ! ui_has "ladybug"; then return 0; fi
  tap_label "Círculo" 0.6 || tap_coord 302 84 0.6
  sleep 0.6
}

open_examples_link() {
  local label="$1"
  ensure_examples_home
  hide_debug_ball_on_home
  if tap_label "$label" 1.5; then
    return 0
  fi
  # Fallback: tap row center from describe-ui
  local coords
  coords="$(ui_json | python3 -c "
import json,sys
label=sys.argv[1]
data=json.load(sys.stdin)
def walk(n):
    if (n.get('AXLabel') or '')==label:
        f=n.get('frame',{})
        print(int(f.get('x',0)+f.get('width',0)/2), int(f.get('y',0)+f.get('height',0)/2))
        return True
    for c in n.get('children',[]) or []:
        if walk(c): return True
    return False
for r in data:
    if walk(r): break
" "$label" 2>/dev/null)"
  if [[ -n "$coords" ]]; then
    tap_coord ${coords// / } 1.5
  fi
}

open_debugger() {
  ensure_examples_home
  tap_label "ladybug" 2.0 || tap_coord 360 84 2.0
  wait_for_ui "^Network$" 12
}

open_debugger_on_network_tab() {
  open_debugger
  tap_label "Network" 0.8 || tap_coord 40 830 0.8
  sleep 0.8
}

pop_nav() {
  tap_coord 30 79 0.8 || axe gesture swipe-from-left-edge --udid "$SIM" --post-delay 0.8 2>/dev/null || true
}

tap_tab() {
  local tab="$1"
  case "$tab" in
    Network)     tap_label "Network" 0.8 || tap_coord 40 830 ;;
    Performance) tap_label "Performance" 0.8 || tap_coord 120 830 ;;
    Interface)   tap_label "Interface" 0.8 || tap_coord 201 830 ;;
    Resources)   tap_label "Resources" 0.8 || tap_coord 280 830 ;;
    App)         tap_label "App" 0.8 || tap_coord 360 830 ;;
    *) echo "Unknown tab: $tab" >&2; return 1 ;;
  esac
  sleep 0.8
}

tap_network_nav_icon() {
  local which="$1"
  case "$which" in
    injection)   tap_coord 255 66 ;;  # syringe
    encryption)  tap_coord 295 66 ;;  # lock
    threshold)   tap_coord 335 66 ;;  # speedometer
    *) return 1 ;;
  esac
  sleep 0.8
}

# ── Verified flows ─────────────────────────────────────────────────────────────

# 1. Generate HTTP traffic  2. Return home  3. Open debugger  4. Confirm request visible
fire_rest_get_single_post() {
  echo "  [flow] REST API → Get Single Post → Make Request"
  open_examples_link "REST API Demo, Test all HTTP methods with fake REST API + TLS security example"
  wait_for_ui "JSONPlaceholder API Demo|API Endpoints" 8 || {
    echo "  ✗ could not open REST API Demo" >&2
    return 1
  }

  tap_label "GET, Get Single Post, Fetch post with ID 1" 1.0 || tap_coord 100 309 1.0
  sleep 0.5
  tap_label "Make Request" 2.0 || tap_coord 301 454 2.0
  wait_for_ui "Status: 200|jsonplaceholder" 15 || {
    echo "  ✗ request did not complete" >&2
    return 1
  }

  echo "  [flow] back to Examples home"
  pop_nav
  wait_for_ui "DebugSwift Examples" 8
}

fire_rest_multiple_requests() {
  fire_rest_get_single_post || return 1
  open_examples_link "REST API Demo, Test all HTTP methods with fake REST API + TLS security example"
  wait_for_ui "API Endpoints" 8

  local ep
  for ep in \
    "GET, Get All Albums, Fetch all albums (100 items)" \
    "PUT, Update Post (PUT), Replace entire post with new data" \
    "DELETE, Delete Post, Delete post with ID 1"
  do
    tap_label "$ep" 0.6 || true
    tap_label "Make Request" 2.0 || true
    sleep 0.5
  done

  pop_nav
  wait_for_ui "DebugSwift Examples" 8
}

open_network_with_requests() {
  fire_rest_get_single_post || return 1
  echo "  [flow] open debugger → Network tab"
  open_debugger_on_network_tab
  wait_for_ui "jsonplaceholder|typicode" 10 || {
    echo "  ✗ no captured requests in Network tab" >&2
    return 1
  }
}

fire_websocket_connection() {
  echo "  [flow] WebSocket Test → Connect"
  start_websocket_server || return 1
  ensure_examples_home
  hide_debug_ball_on_home
  open_examples_link "WebSocket Inspector Test, Test WebSocket connections"
  wait_for_ui "Connect|WebSocket Inspector Test" 8
  tap_label "Connect" 2.5 || tap_coord 201 280 2.5
  wait_for_ui "Connected|localhost|127\\.0\\.0\\.1" 12 || sleep 3
  tap_label "Send Text" 1.0 || true
  sleep 0.5
  tap_label "Send JSON" 1.0 || true
  sleep 0.8
  pop_nav
  wait_for_ui "DebugSwift Examples" 8
}

WS_SERVER_PID=""

start_websocket_server() {
  if [[ -n "${WS_SERVER_PID:-}" ]] && kill -0 "$WS_SERVER_PID" 2>/dev/null; then
    return 0
  fi

  echo "  [server] Starting WebSocket test server on :3001"
  node "$WEB/scripts/websocket-test-server.mjs" &
  WS_SERVER_PID=$!

  local i=0
  while (( i < 40 )); do
    if lsof -iTCP:3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
      echo "  [server] Ready at ws://127.0.0.1:3001/websocket"
      return 0
    fi
    sleep 0.25
    ((i++))
  done

  echo "  ✗ WebSocket server failed to start on port 3001" >&2
  stop_websocket_server
  return 1
}

stop_websocket_server() {
  if [[ -n "${WS_SERVER_PID:-}" ]] && kill -0 "$WS_SERVER_PID" 2>/dev/null; then
    kill "$WS_SERVER_PID" 2>/dev/null || true
    wait "$WS_SERVER_PID" 2>/dev/null || true
  fi
  WS_SERVER_PID=""
}

prep_memory_leak() {
  echo "  [flow] Memory Leak Demo → navigate back"
  open_examples_link "Memory Leak Demo, Test memory leak detection"
  sleep 1.5
  pop_nav
  wait_for_ui "DebugSwift Examples" 8
  sleep 1
}

prep_oslog_traffic() {
  echo "  [flow] OSLog Console Test → log messages"
  open_examples_link "OSLog Console Test, Test OSLog capture with various log levels"
  wait_for_ui "Log Info Message|OSLog" 8
  tap_label "Log Info Message" 0.8 || tap_coord 201 200 0.8
  tap_label "Log Error Message" 0.8 || true
  pop_nav
  wait_for_ui "DebugSwift Examples" 8
}

tap_ui_matching() {
  local pattern="$1"
  local delay="${2:-1.2}"
  local coords
  coords="$(ui_json | python3 -c "
import json,sys,re
pat=re.compile(sys.argv[1], re.I)
data=json.load(sys.stdin)
def walk(n):
    label=n.get('AXLabel') or ''
    if pat.search(label):
        f=n.get('frame',{})
        print(int(f.get('x',0)+f.get('width',0)/2), int(f.get('y',0)+f.get('height',0)/2))
        return True
    for c in n.get('children',[]) or []:
        if walk(c): return True
    return False
for r in data:
    if walk(r): break
" "$pattern" 2>/dev/null)"
  if [[ -n "$coords" ]]; then
    tap_coord ${coords// / } "$delay"
    return 0
  fi
  return 1
}

tap_first_network_row() {
  tap_ui_matching "jsonplaceholder|typicode|posts/1" 1.2 || tap_coord 201 330 1.2
}

open_network_request_detail() {
  tap_first_network_row
  wait_for_ui "Request Details|Details|Replay|Response" 8
}

open_view_hierarchy() {
  ensure_examples_home
  show_debug_ball_on_home
  sleep 0.5
  axe touch --udid "$SIM" -x 30 -y 357 --down --up --delay 1.0 2>/dev/null || true
  sleep 1.5
  wait_for_ui "Snapshot|Hierarchy" 10
}

open_response_modifier() {
  open_network_with_requests || return 1
  tap_network_nav_icon injection
  wait_for_ui "^Network Injection$" 8 || return 1
  tap_label "Response Modifier" 1.0 || tap_ui_matching "^Response Modifier$" 1.0
  wait_for_ui "^Response Modifier$" 8
}
