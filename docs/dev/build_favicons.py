#!/usr/bin/env python3
"""Favicons for both seasons — same mark, each season's accent colour.

  season 1 (KORD BREACH)   green
  season 2 (UNTAR CONTROL) UN blue

The mark is a checkmark in a rounded tile: both pages are "tick the modifiers
you want" selectors, and a thick tick is one of the few shapes that still
reads at 16px. Colours come straight from each page's own CSS variables.

  python3 docs/dev/build_favicons.py
"""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]

SEASONS = {
    # out dir            bg         ring       tick
    'docs':           ('#0c0e0d', '#6e8a44', '#a9c46c'),   # --bg / --pos-line-hi / --pos
    'docs/season2':   ('#0a0e13', '#3e86c1', '#5aa3dc'),   # --bg / --un / --un-hi
}

SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="{bg}"/>
  <rect x="1.4" y="1.4" width="29.2" height="29.2" rx="5.8"
        fill="none" stroke="{ring}" stroke-width="2.4"/>
  <path d="M8.6 16.6 L13.6 21.6 L23.4 10.2" fill="none" stroke="{tick}"
        stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
"""


def png(path, size, bg, ring, tick):
    """Draw at 8x and downscale — PIL has no antialiasing of its own."""
    s, k = size * 8, size * 8 / 32
    im = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([0, 0, s - 1, s - 1], radius=7 * k, fill=bg)
    d.rounded_rectangle([1.4 * k, 1.4 * k, s - 1 - 1.4 * k, s - 1 - 1.4 * k],
                        radius=5.8 * k, outline=ring, width=max(1, round(2.4 * k)))
    d.line([(8.6 * k, 16.6 * k), (13.6 * k, 21.6 * k), (23.4 * k, 10.2 * k)],
           fill=tick, width=max(1, round(4 * k)), joint='curve')
    # round the tick's open ends, which `joint` does not reach
    r = 2 * k
    for x, y in ((8.6 * k, 16.6 * k), (23.4 * k, 10.2 * k)):
        d.ellipse([x - r, y - r, x + r, y + r], fill=tick)
    im.resize((size, size), Image.LANCZOS).save(path)


for rel, (bg, ring, tick) in SEASONS.items():
    out = ROOT / rel
    (out / 'favicon.svg').write_text(SVG.format(bg=bg, ring=ring, tick=tick), encoding='utf-8')
    png(out / 'favicon-32.png', 32, bg, ring, tick)
    png(out / 'apple-touch-icon.png', 180, bg, ring, tick)
    print(f'{rel}: favicon.svg, favicon-32.png, apple-touch-icon.png  ({tick})')
