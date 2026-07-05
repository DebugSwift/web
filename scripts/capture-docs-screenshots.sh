#!/usr/bin/env bash
# Capture documentation screenshots one-by-one with UI verification.
#
# Each shot runs a real user flow (e.g. fire HTTP request → open debugger → Network tab)
# and verifies the expected screen before saving.
#
# Usage:
#   ./scripts/capture-docs-screenshots.sh
#   ./scripts/capture-docs-screenshots.sh --only network-inspector,performance
#   ./scripts/capture-docs-screenshots.sh --list
#
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
WEB="$(cd "$(dirname "$0")/.." && pwd)"
DOC_OUT="$WEB/public/app-screenshots/docs"

# shellcheck source=lib/sim-capture.sh
source "$(dirname "$0")/lib/sim-capture.sh"

trap stop_websocket_server EXIT

FAILED=()
SKIPPED=()
ONLY_FILTER=""

ALL_TARGETS=(
  main-window network-inspector interface-tools resources
  floating-debug-ball-on-app-screen network-tab-with-captured-requests
  xcode-package-dependency-dialog programmatic-debugger-presentation
  performance-metrics-panel http-monitoring-json-body-detail
  websocket-inspector-connection-list websocket-inspector-frame-detail
  encrypted-response-ciphertext-view encrypted-response-decrypted-json-view
  response-modifier-rules-list response-modifier-rule-editor
  request-thresholds-configuration request-thresholds-alert-state
  performance performance-metrics-detailed-charts performance-disk-io-monitoring performance-battery-monitoring
  memory-leak-detection-leaked-objects-list memory-leak-stack-trace-detail
  thread-checker-violation-list thread-checker-stack-trace
  performance-widget-overlay-on-app-ui
  crash-reports-list crash-reports-detail-with-stack-trace
  console-logs-live-output device-info-panel apns-token-display
  custom-actions-menu custom-actions-grouped-sections
  grid-overlay view-borders-highlighting-layout
  3d-view-hierarchy-inspector view-hierarchy-per-view-attributes
  touch-indicators-on-screen slow-motion-animation-control
  swiftui-render-tracking-overlay render-tracking-settings-and-stats
  documentation-recorder documentation-recorder-export-grid
  file-browser-file-preview userdefaults-key-value-browser keychain-inspector
  sqlite-database-browser database-table-row-detail push-notification-simulator
  swiftdata-model-browser swiftdata-record-detail-and-export
  troubleshooting-network-capture-verification
)

want() {
  local name="$1"
  [[ -z "$ONLY_FILTER" ]] && return 0
  local item
  IFS=',' read -ra items <<< "$ONLY_FILTER"
  for item in "${items[@]}"; do
    [[ "$item" == "$name" ]] && return 0
  done
  return 1
}

shot() {
  local file="$1" desc="$2"
  shift 2
  local patterns=("$@")

  if ! want "$file"; then return 0; fi

  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📸 $file.png"
  echo "   $desc"

  for p in "${patterns[@]}"; do
    if ! ui_has "$p"; then
      echo "   ✗ verify failed — expected UI: /$p/" >&2
      FAILED+=("$file — missing '$p'")
      return 1
    fi
  done
  [[ ${#patterns[@]} -gt 0 ]] && echo "   ✓ screen verified"

  if screenshot "$DOC_OUT/$file.png"; then
    echo "   ✓ saved → $DOC_OUT/$file.png"
  else
    FAILED+=("$file — screenshot failed")
    echo "   ✗ screenshot failed" >&2
    return 1
  fi
}

skip() {
  local file="$1" reason="$2"
  want "$file" || return 0
  SKIPPED+=("$file — $reason")
  echo ""
  echo "⊘ skip $file.png — $reason"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --list) printf '%s\n' "${ALL_TARGETS[@]}"; exit 0 ;;
    --only) ONLY_FILTER="${2:-}"; shift 2 ;;
    -h|--help)
      sed -n '2,12p' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    *) echo "Unknown option: $1" >&2; exit 1 ;;
  esac
done

mkdir -p "$DOC_OUT"

# ── Bootstrap ──────────────────────────────────────────────────────────────────

build_and_launch
dismiss_alert
ensure_examples_home

# ── 1. Floating debug ball ─────────────────────────────────────────────────────

if want floating-debug-ball-on-app-screen; then
  ensure_examples_home
  show_debug_ball_on_home
  shot floating-debug-ball-on-app-screen \
    "Floating debug ball visible on Examples home" \
    "DebugSwift Examples"
fi

skip xcode-package-dependency-dialog "manual — Xcode → File → Add Package Dependencies"

# ── 2. Programmatic debugger (ladybug) ─────────────────────────────────────────

if want programmatic-debugger-presentation; then
  ensure_examples_home
  open_debugger
  shot programmatic-debugger-presentation \
    "Debugger opened via ladybug toolbar button" \
    "^Network$"
fi

# ── 3. Network: request first, then debugger ───────────────────────────────────

if want main-window || want network-inspector || want network-tab-with-captured-requests \
  || want troubleshooting-network-capture-verification || want http-monitoring-json-body-detail \
  || want encrypted-response-ciphertext-view || want encrypted-response-decrypted-json-view; then
  open_network_with_requests || FAILED+=("network-prep — could not capture HTTP request")
fi

if want main-window; then
  shot main-window "DebugSwift main window on Network tab" "^Network$" "jsonplaceholder|typicode"
fi

if want network-inspector; then
  shot network-inspector "Network inspector request list" "jsonplaceholder|typicode"
fi

if want network-tab-with-captured-requests; then
  shot network-tab-with-captured-requests "Network tab with captured requests" "jsonplaceholder|typicode"
fi

if want troubleshooting-network-capture-verification; then
  shot troubleshooting-network-capture-verification "Network capture working" "jsonplaceholder|typicode"
fi

if want http-monitoring-json-body-detail; then
  open_network_request_detail || FAILED+=("http-monitoring-json-body-detail — could not open request detail")
  shot http-monitoring-json-body-detail "HTTP request JSON body detail" "Request Details|Details|Replay|Response"
  pop_nav
fi

# ── 4. WebSocket ───────────────────────────────────────────────────────────────

if want websocket-inspector-connection-list || want websocket-inspector-frame-detail; then
  close_debugger
  fire_websocket_connection || FAILED+=("websocket-prep — connect failed")
  open_debugger_on_network_tab
  tap_label "WebSocket" 1.0 || tap_coord 250 120 1.0
  sleep 1
fi

if want websocket-inspector-connection-list; then
  shot websocket-inspector-connection-list "WebSocket connection list" "WebSocket|localhost|127\\.0\\.0\\.1|Connected"
fi

if want websocket-inspector-frame-detail; then
  tap_coord 201 280 1.2
  sleep 0.8
  shot websocket-inspector-frame-detail "WebSocket frame detail" "Frame|WebSocket|Text|Binary"
  pop_nav
  tap_label "HTTP" 0.8 || tap_coord 80 120 0.8
fi

# ── 5. Response modifier ───────────────────────────────────────────────────────

if want response-modifier-rules-list || want response-modifier-rule-editor; then
  open_response_modifier || FAILED+=("response-modifier — could not open")
fi

if want response-modifier-rules-list; then
  shot response-modifier-rules-list "Response Modifier rules list" "^Response Modifier$"
fi

if want response-modifier-rule-editor; then
  tap_label "Add Rule" 1.0 \
    || tap_label "No Response Modifier Rules" 1.0 \
    || tap_ui_matching "Add Rule|No Response Modifier" 1.0
  sleep 0.8
  shot response-modifier-rule-editor "Response Modifier rule editor" "Response Modifier|Response Editor|Rule|URL"
  pop_nav
  pop_nav
fi

# ── 6. Request thresholds ──────────────────────────────────────────────────────

if want request-thresholds-configuration || want request-thresholds-alert-state; then
  open_network_with_requests || true
  tap_network_nav_icon threshold
  wait_for_ui "Request Threshold|Threshold" 8
fi

if want request-thresholds-configuration; then
  shot request-thresholds-configuration "Request Threshold configuration" "Threshold|Request"
fi

if want request-thresholds-alert-state; then
  shot request-thresholds-alert-state "Request Threshold screen" "Threshold|Request"
  pop_nav
fi

# ── 7. Encryption views (best effort — needs encrypted body in traffic) ─────────

if want encrypted-response-ciphertext-view || want encrypted-response-decrypted-json-view; then
  open_network_with_requests || true
  open_network_request_detail || true
  sleep 0.8
fi

if want encrypted-response-ciphertext-view; then
  shot encrypted-response-ciphertext-view "Network request detail" "Request Details|Details|jsonplaceholder|Response"
fi

if want encrypted-response-decrypted-json-view; then
  tap_network_nav_icon encryption
  dismiss_alert
  shot encrypted-response-decrypted-json-view "Network request detail (decryption)" "Request Details|Details|jsonplaceholder|Response"
  pop_nav
fi

# ── 8. Performance ─────────────────────────────────────────────────────────────

if want performance || want performance-metrics-panel || want performance-metrics-detailed-charts; then
  close_debugger
  open_debugger
  tap_tab Performance
  wait_for_ui "CPU|Memory|FPS|Show Floating HUD" 10
fi

if want performance; then
  shot performance "Real-time CPU, memory, and FPS" "CPU|Memory|FPS"
fi

if want performance-metrics-panel; then
  shot performance-metrics-panel "Performance metrics panel" "CPU|Memory|FPS"
fi

if want performance-metrics-detailed-charts; then
  scroll_down
  shot performance-metrics-detailed-charts "Performance detailed charts" "CPU|Memory|Disk|Battery"
  scroll_up
fi

if want performance-disk-io-monitoring; then
  scroll_down
  shot performance-disk-io-monitoring "Performance disk I/O monitoring" "Disk I/O Monitoring|Disk Usage|Total Space"
  scroll_up
fi

if want performance-battery-monitoring; then
  scroll_down
  shot performance-battery-monitoring "Performance battery monitoring" "Battery Monitoring|Battery Level|Energy Impact"
  scroll_up
fi

# ── 9. Memory leaks ────────────────────────────────────────────────────────────

if want memory-leak-detection-leaked-objects-list || want memory-leak-stack-trace-detail; then
  close_debugger
  prep_memory_leak
  open_debugger
  tap_tab Performance
  scroll_down
  tap_label "⚠️ Show Leaks" 1.2 || { scroll_down; tap_label "⚠️ Show Leaks" 1.2; }
  sleep 1
fi

if want memory-leak-detection-leaked-objects-list; then
  shot memory-leak-detection-leaked-objects-list "Memory leaks list" "Leak|leak|Leaks|No data"
fi

if want memory-leak-stack-trace-detail; then
  tap_coord 201 280 1.2 || true
  sleep 0.8
  shot memory-leak-stack-trace-detail "Memory leak stack trace" "Leak|Stack|leak|No data"
  pop_nav
fi

# ── 10. Thread checker ─────────────────────────────────────────────────────────

if want thread-checker-violation-list || want thread-checker-stack-trace; then
  open_debugger
  tap_tab Performance
  scroll_down
  tap_label "Thread Checker" 1.2 || { scroll_down; tap_label "Thread Checker" 1.2; }
  wait_for_ui "Thread Checker" 8
fi

if want thread-checker-violation-list; then
  shot thread-checker-violation-list "Thread Checker violations" "Thread Checker"
fi

if want thread-checker-stack-trace; then
  tap_coord 201 280 1.2 || true
  shot thread-checker-stack-trace "Thread Checker detail" "Thread Checker|Stack|violation|disabled"
  pop_nav
fi

# ── 11. Performance widget HUD ─────────────────────────────────────────────────

if want performance-widget-overlay-on-app-ui; then
  open_debugger
  tap_tab Performance
  tap_label "Show Floating HUD" 0.8 || { scroll_up; tap_label "Show Floating HUD" 0.8; }
  close_debugger
  ensure_examples_home
  sleep 1
  shot performance-widget-overlay-on-app-ui "Performance HUD overlay on app" "DebugSwift Examples|CPU|Memory|FPS|HUD"
fi

# ── 12. Interface ──────────────────────────────────────────────────────────────

if want interface-tools || want grid-overlay; then
  open_debugger
  tap_tab Interface
  wait_for_ui "Grid overlay|Colorized view borders|Interface" 8
fi

if want interface-tools; then
  shot interface-tools "Interface tools list" "Grid overlay|Colorized view borders|Slow animations"
fi

if want grid-overlay; then
  tap_label "Grid overlay" 1.0
  wait_for_ui "Grid overlay|Show grid" 8
  shot grid-overlay "Grid overlay settings" "Grid overlay|grid"
  pop_nav
fi

if want view-borders-highlighting-layout; then
  open_debugger
  tap_tab Interface
  tap_label "Colorized view borders" 0.8 || true
  close_debugger
  ensure_examples_home
  sleep 0.8
  shot view-borders-highlighting-layout "View borders on app UI" "DebugSwift Examples"
fi

if want 3d-view-hierarchy-inspector || want view-hierarchy-per-view-attributes; then
  close_debugger
  open_view_hierarchy || FAILED+=("view-hierarchy — long press failed")
fi

if want 3d-view-hierarchy-inspector; then
  shot 3d-view-hierarchy-inspector "3D view hierarchy" "Snapshot|Hierarchy"
fi

if want view-hierarchy-per-view-attributes; then
  tap_coord 201 400 0.8 || true
  shot view-hierarchy-per-view-attributes "View hierarchy attributes" "Snapshot|Hierarchy"
  close_debugger
fi

if want touch-indicators-on-screen; then
  open_debugger
  tap_tab Interface
  tap_label "Showing touches" 0.8 || true
  close_debugger
  ensure_examples_home
  tap_coord 201 400 0.5
  sleep 0.5
  shot touch-indicators-on-screen "Touch indicators" "DebugSwift Examples"
fi

if want slow-motion-animation-control; then
  open_debugger
  tap_tab Interface
  scroll_down || true
  tap_label "Slow animations" 0.8 || tap_ui_matching "Slow animations" 0.8
  shot slow-motion-animation-control "Slow animations toggle" "Slow animations"
fi

if want swiftui-render-tracking-overlay || want render-tracking-settings-and-stats; then
  open_debugger
  tap_tab Interface
  scroll_down || true
  tap_label "SwiftUI render tracking" 1.0 || tap_ui_matching "SwiftUI render tracking" 1.0
  wait_for_ui "SwiftUI|render" 8
fi

if want render-tracking-settings-and-stats; then
  shot render-tracking-settings-and-stats "SwiftUI render tracking settings" "SwiftUI|render"
fi

if want swiftui-render-tracking-overlay; then
  tap_label "Enable SwiftUI render tracking" 0.8 || true
  close_debugger
  ensure_examples_home
  sleep 0.8
  shot swiftui-render-tracking-overlay "Render tracking overlay" "DebugSwift Examples"
fi

if want documentation-recorder || want documentation-recorder-export-grid; then
  open_debugger
  tap_tab Interface
  scroll_down || true
  tap_label "Documentation Recorder" 1.0 || tap_ui_matching "Documentation Recorder" 1.0
  wait_for_ui "Doc Recorder|Documentation Recorder|Record" 8
fi

if want documentation-recorder; then
  shot documentation-recorder "Documentation Recorder panel" "Doc Recorder|Documentation Recorder|Record"
fi

if want documentation-recorder-export-grid; then
  tap_label "● Record" 1.0 || tap_label "Record" 1.0 || true
  sleep 0.5
  tap_coord 201 400 0.5
  open_debugger
  tap_tab Interface
  scroll_down || true
  tap_label "Documentation Recorder" 1.0 || tap_ui_matching "Documentation Recorder" 1.0
  shot documentation-recorder-export-grid "Documentation Recorder export" "Doc Recorder|Export|Record|Documentation"
  pop_nav
fi

# ── 13. Resources ──────────────────────────────────────────────────────────────

if want resources || want file-browser-file-preview || want userdefaults-key-value-browser \
  || want keychain-inspector || want sqlite-database-browser || want database-table-row-detail \
  || want swiftdata-model-browser || want swiftdata-record-detail-and-export; then
  open_debugger
  tap_tab Resources
  wait_for_ui "Files|Persistent Data|Resources" 8
fi

if want resources; then
  shot resources "Resources browser" "Files|Persistent Data|Database Browser"
fi

if want file-browser-file-preview; then
  tap_label "Files" 1.0
  wait_for_ui "Files|Sandbox|App Sandbox" 8
  tap_coord 201 220 1.0 || true
  sleep 0.8
  shot file-browser-file-preview "File browser preview" "Files|Sandbox"
  pop_nav
fi

if want userdefaults-key-value-browser || want keychain-inspector; then
  tap_label "Persistent Data" 1.0
  wait_for_ui "UserDefaults|Keychain" 8
fi

if want userdefaults-key-value-browser; then
  tap_label "UserDefaults" 0.8 || tap_ui_matching "UserDefaults|User defaults" 0.8
  sleep 0.8
  shot userdefaults-key-value-browser "UserDefaults browser" "UserDefaults|User defaults|user defaults"
fi

if want keychain-inspector; then
  tap_label "Keychain" 0.8 || tap_ui_matching "Keychain" 0.8
  sleep 0.8
  shot keychain-inspector "Keychain inspector" "Keychain"
  pop_nav
fi

if want sqlite-database-browser || want database-table-row-detail; then
  open_debugger
  tap_tab Resources
  tap_label "Database Browser" 1.0
  wait_for_ui "Database Browser|SQLite|Realm" 8
fi

if want sqlite-database-browser; then
  shot sqlite-database-browser "Database browser" "Database Browser|SQLite|Realm|No database"
fi

if want database-table-row-detail; then
  tap_coord 201 220 1.0 || true
  shot database-table-row-detail "Database row detail" "Database Browser|Table|SQLite|No database"
  pop_nav
fi

if want swiftdata-model-browser || want swiftdata-record-detail-and-export; then
  open_debugger
  tap_tab Resources
  tap_label "SwiftData Browser" 1.0
  wait_for_ui "SwiftData" 8
fi

if want swiftdata-model-browser; then
  shot swiftdata-model-browser "SwiftData model browser" "SwiftData"
fi

if want swiftdata-record-detail-and-export; then
  tap_coord 201 220 1.0 || true
  shot swiftdata-record-detail-and-export "SwiftData record detail" "SwiftData"
  pop_nav
fi

# ── 14. App tools ──────────────────────────────────────────────────────────────

if want device-info-panel || want apns-token-display || want crash-reports-list \
  || want crash-reports-detail-with-stack-trace || want console-logs-live-output \
  || want push-notification-simulator || want custom-actions-menu || want custom-actions-grouped-sections; then
  close_debugger
  ensure_examples_home
  open_debugger
  tap_tab App
  scroll_up || true
  wait_for_ui "^App$|Build Version:|App Version:|Versão do App:" 8
fi

if want device-info-panel; then
  shot device-info-panel "Device Info panel" "Build Version:|App Version:|Versão do App:|Bundle ID:"
fi

if want apns-token-display; then
  scroll_down
  shot apns-token-display "APNS token in device info" "Push Token:|Token:"
  scroll_up
fi

if want crash-reports-list || want crash-reports-detail-with-stack-trace; then
  tap_label "Crashes" 1.0 || tap_ui_matching "^Crashes$" 1.0
  wait_for_ui "^Crashes$|No data found" 8
fi

if want crash-reports-list; then
  shot crash-reports-list "Crash reports list" "Crashes|crash|No data"
fi

if want crash-reports-detail-with-stack-trace; then
  tap_coord 201 280 1.2 || true
  shot crash-reports-detail-with-stack-trace "Crash report detail" "Crashes|crash|Stack|No data"
  pop_nav
fi

if want console-logs-live-output; then
  close_debugger
  prep_oslog_traffic
  open_debugger
  tap_tab App
  tap_label "Console - Prints/NSlog" 1.0
  wait_for_ui "Console" 8
  shot console-logs-live-output "Console logs" "Console|No data"
  pop_nav
fi

if want push-notification-simulator; then
  open_debugger
  tap_tab App
  tap_label "Push Notifications" 1.0
  wait_for_ui "Push Notifications|📱" 8
  shot push-notification-simulator "Push notification simulator" "Push Notifications|notification"
  pop_nav
fi

if want custom-actions-menu || want custom-actions-grouped-sections; then
  open_debugger
  tap_tab App
  scroll_down
  tap_label "Environment Management" 1.0 || true
  sleep 0.8
fi

if want custom-actions-menu; then
  shot custom-actions-menu "Custom Actions menu" "Environment Management|Development Tools|Custom"
fi

if want custom-actions-grouped-sections; then
  tap_label "Clear Network History" 0.8 || tap_ui_matching "Clear|Development Tools|Reset" 0.8 || true
  shot custom-actions-grouped-sections "Custom Actions sections" "Environment Management|Development Tools|Clear|Reset"
  pop_nav || true
fi

close_debugger
stop_websocket_server

# ── Summary ────────────────────────────────────────────────────────────────────

echo ""
echo "════════════════════════════════════════"
echo "Done — $DOC_OUT"
ls "$DOC_OUT"/*.png 2>/dev/null | wc -l | xargs echo "PNG files:"

if ((${#SKIPPED[@]})); then
  echo ""
  echo "Skipped:"
  printf '  ⊘ %s\n' "${SKIPPED[@]}"
fi

if ((${#FAILED[@]})); then
  echo ""
  echo "Failed (${#FAILED[@]}):"
  printf '  ✗ %s\n' "${FAILED[@]}"
  exit 1
fi

echo ""
echo "All captures verified and saved."
