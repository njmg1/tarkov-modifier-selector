#!/bin/bash
# Drives index.html in headless Chrome and runs dev/test.html's assertions
# against the real DOM. Also writes a screenshot to /tmp/kord-shot.png.
#
#   ./dev/verify.sh        (run from docs/)
set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "Chrome not found at $CHROME"; exit 1; }

trap 'rm -f _run.html' EXIT
python3 -c "
idx = open('index.html').read()
tst = open('dev/test.html').read()
open('_run.html','w').write(idx.replace('</body>', tst + '\n</body>'))
"

"$CHROME" --headless=new --disable-gpu --no-first-run --virtual-time-budget=8000 \
  --dump-dom "file://$PWD/_run.html" 2>/dev/null > /tmp/kord-dom.html

python3 - <<'PY'
import re, sys
d = open('/tmp/kord-dom.html').read()
out = re.search(r'<div id="OUT"[^>]*>(.*?)</div>', d, re.S)
if not out:
    sys.exit('harness produced no output — a script threw before asserting')
lines = out.group(1).strip().splitlines()
fails = [l for l in lines if l.startswith('FAIL')]
print(f'{len(lines)} assertions, {len(fails)} failures')
for l in fails:
    print('  ' + l)
sys.exit(1 if fails else 0)
PY

# mask-image icons only paint once decoded; `--screenshot` races that, so the
# screenshot goes through CDP instead.
node dev/shot.mjs index.html /tmp/kord-shot.png 1500 2200
echo "screenshot: /tmp/kord-shot.png"
