#!/usr/bin/env python3
"""Season-2 cover art, in the same visual language as season 1's og.png:
dark hatched plate, wide-tracked wordmark, three status chips, the 노잼망겜
mascot on the right. Season 1 keyed on green; season 2 keys on UN blue.

Run from docs/season2/:  python3 build_cover.py
Outputs assets/cover_square.png (1080x1080, YouTube community / X)
    and assets/og.png          (1200x630, link preview)
"""
import os
from PIL import Image, ImageDraw, ImageFont

FONT = "/System/Library/Fonts/AppleSDGothicNeo.ttc"
BOLD, SEMI, REG, LIGHT = 6, 4, 0, 8
BG0, BG1 = (13, 15, 17), (23, 26, 30)
TEXT, DIM, FAINT = (233, 236, 239), (157, 165, 174), (110, 118, 126)
BLUE = (109, 160, 214)       # UN blue — season 2's accent
RED = (216, 120, 120)
MASCOT = Image.open("../assets/character.png").convert("RGBA")


def f(size, idx=REG):
    return ImageFont.truetype(FONT, size, index=idx)


def plate(w, h):
    """Diagonal-hatched gradient plate."""
    im = Image.new("RGB", (w, h), BG0)
    d = ImageDraw.Draw(im)
    for y in range(h):                       # vertical gradient
        t = y / h
        d.line([(0, y), (w, y)],
               fill=tuple(round(a + (b - a) * t) for a, b in zip(BG0, BG1)))
    hatch = Image.new("RGB", (w, h), (0, 0, 0))
    hd = ImageDraw.Draw(hatch)
    for x in range(-h, w, 7):                # 45-degree hatch, very low contrast
        hd.line([(x, h), (x + h, 0)], fill=(10, 11, 12), width=1)
    return Image.blend(im, Image.blend(im, hatch, .35), .5)


def tracked(d, xy, text, font, fill, track):
    """Letter-spaced text; PIL has no tracking of its own."""
    x, y = xy
    for ch in text:
        d.text((x, y), ch, font=font, fill=fill)
        x += d.textlength(ch, font=font) + track
    return x


def tracked_w(d, text, font, track):
    return sum(d.textlength(c, font=font) + track for c in text) - track


def chip(d, x, y, label, color, fnt, pad=(15, 10)):
    w = d.textlength(label, font=fnt) + pad[0] * 2
    h = fnt.size + pad[1] * 2
    d.rounded_rectangle([x, y, x + w, y + h], 7, outline=color, width=2)
    d.text((x + pad[0], y + pad[1] - 1), label, font=fnt, fill=color)
    return x + w + 12


def mascot_at(im, height, right, bottom):
    """The source art is cropped at the bottom, so it only reads right when
    that cut edge runs off the canvas — same as season 1's cover."""
    m = MASCOT.resize((round(MASCOT.width * height / MASCOT.height), height),
                      Image.LANCZOS)
    im.paste(m, (right - m.width, bottom - m.height), m)


def square():
    W = H = 1080
    im = plate(W, H)
    d = ImageDraw.Draw(im)
    M = 76

    y = 96
    tracked(d, (M, y), "SEASON 2", f(27, SEMI), BLUE, 9)
    y += 54
    tracked(d, (M, y), "UNTAR", f(96, BOLD), TEXT, 5)
    y += 104
    tracked(d, (M, y), "CONTROL", f(96, BOLD), TEXT, 5)
    y += 128

    d.line([(M, y), (M + 92, y)], fill=BLUE, width=4)
    y += 34

    x = d.text((M, y), "모디파이어 ", font=f(52, BOLD), fill=TEXT) or \
        M + d.textlength("모디파이어 ", font=f(52, BOLD))
    d.text((x, y), "시뮬레이터", font=f(52, BOLD), fill=BLUE)
    y += 76
    d.text((M, y), "특성 62종 · 합계가 0 이상이면 통과", font=f(29), fill=DIM)
    y += 48
    d.text((M, y), "디버프로 포인트를 벌어 퍽에 씁니다", font=f(29), fill=FAINT)

    mascot_at(im, 436, W - 24, H + 6)

    # Two chips only here: the mascot owns the bottom-right of a square.
    cy = H - 268
    cf = f(25, SEMI)
    cx = chip(d, M, cy, "디버프 최대 +73", RED, cf)
    chip(d, cx, cy, "퍽 -97", BLUE, cf)

    d.text((M, H - 86), "njmg1.github.io/tarkov-modifier-selector/season2/",
           font=f(23), fill=FAINT)
    nm = f(27, BOLD)
    d.text((W - M - d.textlength("노잼망겜", font=nm), 96), "노잼망겜", font=nm, fill=TEXT)
    hf = f(20)
    d.text((W - M - d.textlength("@NoJamMangGame", font=hf), 134),
           "@NoJamMangGame", font=hf, fill=FAINT)
    return im


def wide():
    W, H = 1200, 630
    im = plate(W, H)
    d = ImageDraw.Draw(im)
    M = 76

    y = 62
    tracked(d, (M, y), "SEASON 2", f(21, SEMI), BLUE, 8)
    y += 42
    tracked(d, (M, y), "UNTAR", f(74, BOLD), TEXT, 4)
    x_end = tracked(d, (M + tracked_w(d, "UNTAR", f(74, BOLD), 4) + 26, y),
                    "CONTROL", f(74, BOLD), TEXT, 4)
    y += 104
    d.line([(M, y), (M + 76, y)], fill=BLUE, width=4)
    y += 28

    d.text((M, y), "모디파이어 ", font=f(40, BOLD), fill=TEXT)
    d.text((M + d.textlength("모디파이어 ", font=f(40, BOLD)), y),
           "시뮬레이터", font=f(40, BOLD), fill=BLUE)
    y += 60
    d.text((M, y), "특성 62종 · 합계가 0 이상이면 통과", font=f(23), fill=DIM)

    mascot_at(im, 352, W - 26, H + 6)

    cy = H - 126
    cf = f(20, SEMI)
    cx = chip(d, M, cy, "디버프 최대 +73", RED, cf)
    cx = chip(d, cx, cy, "퍽 -97", BLUE, cf)
    chip(d, cx, cy, "PASS / OVER BUDGET", (150, 157, 164), cf)

    d.text((M, H - 62), "njmg1.github.io/tarkov-modifier-selector/season2/",
           font=f(19), fill=FAINT)
    nm = f(23, BOLD)
    d.text((W - M - d.textlength("노잼망겜", font=nm), 62), "노잼망겜", font=nm, fill=TEXT)
    hf = f(17)
    d.text((W - M - d.textlength("@NoJamMangGame", font=hf), 94),
           "@NoJamMangGame", font=hf, fill=FAINT)
    return im


os.makedirs("assets", exist_ok=True)
square().save("assets/cover_square.png")
wide().save("assets/og.png")
print("assets/cover_square.png (1080x1080), assets/og.png (1200x630)")
