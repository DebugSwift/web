#!/usr/bin/env bash
# Capture DebugSwift Example app screenshots for the marketing site.
# Uses XcodeBuildMCP (build/run/screenshot) + bundled axe (arm64 UI automation).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
WEB="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$WEB/public/app-screenshots"
SIM_NAME="${SIM_NAME:-iPhone 17 Pro}"
DERIVED="${DERIVED_DATA_PATH:-/tmp/DebugSwiftDerived}"
NPX_CACHE="$(ls -d "$HOME"/.npm/_npx/*/node_modules/xcodebuildmcp 2>/dev/null | tail -1)"
AXE="${AXE:-$NPX_CACHE/bundled/axe}"
NODE_ARM="${NODE_ARM:-/Users/matheussilva/.local/share/cursor-agent/versions/2025.09.18-7ae6800/node}"

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

capture_xbmcp() {
  local dest="$1"
  local result
  result="$(run_xbmcp simulator screenshot --simulator-id "$SIM" --return-format path --output json)"
  local src
  src="$(echo "$result" | python3 -c "import json,sys; print(json.load(sys.stdin)['data']['artifacts']['screenshotPath'])")"
  magick "$src" "$dest"
}

stitch_row() {
  local dest="$1"
  shift
  magick "$@" +append -background '#1a1a2e' -gravity center -extent '%[fx:max(w)]x%[fx:max(h)]' "$dest"
}

echo "Building and launching Example app..."
BUILD_JSON="$(run_xbmcp simulator build-and-run \
  --project-path "$ROOT/Example/Example.xcodeproj" \
  --scheme Example \
  --simulator-name "$SIM_NAME" \
  --derived-data-path "$DERIVED" \
  --output json)"

SIM="$(echo "$BUILD_JSON" | python3 -c "import json,sys; print(json.load(sys.stdin)['data']['artifacts']['simulatorId'])")"
BUNDLE="$(echo "$BUILD_JSON" | python3 -c "import json,sys; print(json.load(sys.stdin)['data']['artifacts']['bundleId'])")"

echo "Simulator: $SIM"
sleep 2

mkdir -p "$OUT/flows/network" "$OUT/flows/performance" "$OUT/flows/interface" "$OUT/flows/resources" "$OUT/frames"

tap_label() {
  axe tap --udid "$SIM" --label "$1" --post-delay "${2:-0.8}" >/dev/null
}

tap_ladybug() {
  axe tap --udid "$SIM" --label "ladybug" --post-delay 1.2 >/dev/null
}

# --- Generate network traffic ---
echo "Generating REST API traffic..."
tap_label "REST API Demo, Test all HTTP methods with fake REST API + TLS security example" 1.2

fire_request() {
  local label="$1"
  tap_label "$label" 0.5
  axe describe-ui --udid "$SIM" >/dev/null 2>&1 || true
  if axe tap --udid "$SIM" --label "Make Request" --wait-timeout 3 --post-delay 1.5 2>/dev/null; then
    return 0
  fi
  # iPhone compact layout: endpoint tap may auto-fire or need scroll
  sleep 1
}

for ep in \
  "GET, Get All Albums, Fetch all albums (100 items)" \
  "PUT, Update Post (PUT), Replace entire post with new data" \
  "PATCH, Update Post (PATCH), Update only specific fields of the post" \
  "DELETE, Delete Post, Delete post with ID 1" \
  "GET, Invalid Endpoint (404), Test endpoint that doesn't exist" \
  "GET, User Not Found (404), Request that returns 404 error"
do
  fire_request "$ep" || true
done

# --- Network flow (3 frames) ---
echo "Capturing network inspector flow..."
tap_ladybug

# Network tab is first; wait for requests to appear
sleep 1
screenshot "$OUT/flows/network/01-list.png"

# Tap first HTTP request in list
axe tap --udid "$SIM" -x 201 -y 220 --post-delay 1.2 >/dev/null
screenshot "$OUT/flows/network/02-details.png"

# Tap replay button (toolbar)
axe tap --udid "$SIM" --label "Replay" --wait-timeout 2 --post-delay 0.8 2>/dev/null \
  || axe tap --udid "$SIM" -x 360 -y 66 --post-delay 0.8 >/dev/null
screenshot "$OUT/flows/network/03-replay-modal.png"

stitch_row "$OUT/network-inspector.png" \
  "$OUT/flows/network/01-list.png" \
  "$OUT/flows/network/02-details.png" \
  "$OUT/flows/network/03-replay-modal.png"

# Dismiss modal and debugger
axe tap --udid "$SIM" --label "Cancel" --post-delay 0.5 2>/dev/null || true
axe button --udid "$SIM" --button home --post-delay 0.5 2>/dev/null || true

echo "Capturing performance flow..."
tap_ladybug
axe tap --udid "$SIM" --label "Performance" --wait-timeout 3 --post-delay 1.2 2>/dev/null \
  || axe tap --udid "$SIM" -x 120 -y 830 --post-delay 1.2 >/dev/null
screenshot "$OUT/flows/performance/01-dashboard.png"
cp "$OUT/flows/performance/01-dashboard.png" "$OUT/performance.png"

echo "Capturing interface flow..."
axe tap --udid "$SIM" --label "Interface" --wait-timeout 3 --post-delay 1.2 2>/dev/null \
  || axe tap --udid "$SIM" -x 201 -y 830 --post-delay 1.2 >/dev/null
screenshot "$OUT/flows/interface/01-tools.png"
cp "$OUT/flows/interface/01-tools.png" "$OUT/interface-tools.png"

echo "Capturing resources flow..."
axe tap --udid "$SIM" --label "Resources" --wait-timeout 3 --post-delay 1.2 2>/dev/null \
  || axe tap --udid "$SIM" -x 280 -y 830 --post-delay 1.2 >/dev/null
screenshot "$OUT/flows/resources/01-browser.png"
cp "$OUT/flows/resources/01-browser.png" "$OUT/resources.png"

echo "Done. Screenshots in $OUT"
ls -la "$OUT"/*.png "$OUT/flows/network/"*.png 2>/dev/null
