#!/bin/bash
# Drives index.html in headless Chrome and runs dev/test.html's assertions
# against the real DOM, at both layouts. Also writes a screenshot.
#
#   ./dev/verify.sh        (run from docs/)
set -uo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "Chrome not found at $CHROME"; exit 1; }

trap 'rm -f _run.html' EXIT
python3 -c "
idx = open('index.html').read()
tst = open('dev/test.html').read()
open('_run.html','w').write(idx.replace('</body>', tst + '\n</body>'))
"

# Below 1080px the aside is hidden and the phone sheet takes over; below 620px
# the cards re-flow. Both paths need exercising — a lone 800x600 viewport would
# silently skip the desktop layout altogether.
rc=0
for size in 1400,1000 390,844; do
  "$CHROME" --headless=new --disable-gpu --no-first-run --virtual-time-budget=8000 \
    --window-size="$size" \
    --dump-dom "file://$PWD/_run.html" 2>/dev/null > /tmp/kord-dom.html

  SIZE="$size" python3 - <<'PY' || rc=1
import os, re, sys
size = os.environ['SIZE']
d = open('/tmp/kord-dom.html').read()
out = re.search(r'<div id="OUT"[^>]*>(.*?)</div>', d, re.S)
if not out:
    print(f'{size:>9} : no output — a script threw before asserting')
    sys.exit(1)
lines = out.group(1).strip().splitlines()
fails = [l for l in lines if l.startswith('FAIL')]
print(f'{size:>9} : {len(lines)} assertions, {len(fails)} failures')
for l in fails:
    print('            ' + l)
sys.exit(1 if fails else 0)
PY
done

# mask-image icons only paint once decoded; `--screenshot` races that, so the
# screenshot goes through CDP instead.
node dev/shot.mjs index.html /tmp/kord-shot.png 1500 2200
echo "screenshot: /tmp/kord-shot.png"
exit $rc
