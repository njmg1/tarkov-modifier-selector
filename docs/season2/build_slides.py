#!/usr/bin/env python3
"""Square (1080x1080) slide set for YouTube community / X, rendered from
data.js rather than cropped from the source sheet — so the whole set shares
the site's UN-blue theme, spacing and type.

Run from docs/season2/:  python3 build_slides.py
Outputs slides/untar_s2_01..NN.png  (01 is the cover)
"""
import base64, io, json, os, re, subprocess
from PIL import Image, ImageDraw, ImageFont

S = 1080
FONT = "/System/Library/Fonts/AppleSDGothicNeo.ttc"
BOLD, SEMI, REG, LIGHT = 6, 4, 0, 8

BG0, BG1 = (10, 14, 19), (23, 30, 42)      # matches --bg / --panel-2
CARD = (22, 29, 40)
CARD_EDGE = (39, 49, 62)
TEXT = (212, 218, 227)
DIM = (122, 132, 146)
FAINT = (84, 93, 106)
UN = (62, 134, 193)
UN_HI = (90, 163, 220)
POS = (169, 196, 108)
NEG = (217, 139, 129)

MARGIN = 50
CARD_H = 96
GAP = 9
FOOT_Y = 1040


def f(size, idx=REG):
    return ImageFont.truetype(FONT, size, index=idx)


def plate():
    im = Image.new("RGB", (S, S), BG0)
    d = ImageDraw.Draw(im)
    for y in range(S):
        t = (y / S) ** 1.1
        d.line([(0, y), (S, y)],
               fill=tuple(round(a + (b - a) * t) for a, b in zip(BG0, BG1)))
    hatch = Image.new("RGB", (S, S), (0, 0, 0))
    hd = ImageDraw.Draw(hatch)
    for x in range(-S, S * 2, 7):
        hd.line([(x, S), (x + S, 0)], fill=(8, 10, 13))
    return Image.blend(im, Image.blend(im, hatch, .3), .5)


def wrap(d, text, font, width):
    """Break on spaces first — Korean wraps per character, but splitting a
    word mid-syllable ("있습 / 니다.") reads badly. Falls back to per-character
    only for a single word that is itself too long."""
    out, line = [], ""
    for word in text.split(" "):
        cand = word if not line else line + " " + word
        if d.textlength(cand, font=font) <= width:
            line = cand
            continue
        if line:
            out.append(line)
        while d.textlength(word, font=font) > width:
            cut = len(word)
            while cut > 1 and d.textlength(word[:cut], font=font) > width:
                cut -= 1
            out.append(word[:cut])
            word = word[cut:]
        line = word
    if line:
        out.append(line)
    return out


def header(im, d, title, accent, page=None, sub=None):
    y = 40
    d.rectangle((MARGIN, y, MARGIN + 7, y + 42), fill=accent)
    d.text((MARGIN + 22, y - 3), title, font=f(38, BOLD), fill=TEXT)
    if page:
        pf = f(24, SEMI)
        d.text((S - MARGIN - d.textlength(page, font=pf), y + 11), page,
               font=pf, fill=FAINT)
    if sub:
        d.text((MARGIN + 22, y + 50), sub, font=f(22), fill=DIM)
    return y + (75 if not sub else 105)


def desc_lines(d, mod, w):
    out = []
    for ln in mod["ko"]:
        out += wrap(d, "· " + ln, f(21), w - 108 - 90)
    return out


def card_h(d, mod, w):
    return max(CARD_H, 46 + len(desc_lines(d, mod, w)) * 26 + 14)


def card(im, d, x, y, w, mod, icons):
    h = card_h(d, mod, w)
    d.rounded_rectangle([x, y, x + w, y + h], 10, fill=CARD, outline=CARD_EDGE)

    ic = icons.get(mod["id"])
    if ic:
        box = 68
        ic2 = ic.resize((box, box), Image.LANCZOS)
        tint = Image.new("RGB", (box, box), (205, 213, 224))
        im.paste(tint, (x + 20, y + (h - box) // 2), ic2)

    tx = x + 108
    val = mod.get("value")
    name = mod["koName"] + (" ◆" if mod.get("koGuess") else "")
    nf = f(29, BOLD)
    d.text((tx, y + 13), name, font=nf, fill=TEXT)
    if val is not None:
        col = NEG if val > 0 else POS
        vf = f(27, BOLD)
        label = f"+{val}" if val > 0 else f"{val}"
        d.text((x + w - 24 - d.textlength(label, font=vf), y + 14), label,
               font=vf, fill=col)

    df = f(21)
    for i, ln in enumerate(desc_lines(d, mod, w)):
        d.text((tx, y + 46 + i * 26), ln, font=df, fill=DIM)
    return h


def slide(title, accent, mods, page, icons, note=None):
    im = plate()
    d = ImageDraw.Draw(im)
    top = header(im, d, title, accent, page)
    w = S - MARGIN * 2
    block = sum(card_h(d, m, w) + GAP for m in mods) - GAP
    if top + block > FOOT_Y - 24:
        print(f"  ! 넘침: {title} {page} — {top + block - (FOOT_Y - 24)}px")
    y = top + max(0, (FOOT_Y - 24 - top - block) // 2)
    for m in mods:
        y += card(im, d, MARGIN, y, w, m, icons) + GAP
    foot = note or "njmg1.github.io/tarkov-modifier-selector/season2/"
    d.text((MARGIN, FOOT_Y), foot, font=f(20), fill=FAINT)
    return im


def load_icons():
    js = open("icons.js", encoding="utf-8").read()
    out = {}
    for i, b64 in re.findall(r"(\d+): 'data:image/png;base64,([^']+)'", js):
        out[int(i)] = Image.open(io.BytesIO(base64.b64decode(b64)))
    return out


def main():
    mods = json.loads(subprocess.check_output(
        ["node", "-e",
         "const vm=require('vm'),fs=require('fs');const s={};vm.createContext(s);"
         "vm.runInContext(fs.readFileSync('data.js','utf8'),s);"
         "process.stdout.write(JSON.stringify(vm.runInContext('MODIFIERS',s)))"]))
    icons = load_icons()
    by = lambda c: [m for m in mods if m["cat"] == c]

    os.makedirs("slides", exist_ok=True)
    pages = [Image.open("assets/cover_square.png").convert("RGB")]

    pages.append(slide("전체 공통 변경 사항", UN, by("global"), None, icons,
                       "항상 적용 · 포인트 비용 없음"))

    probe = ImageDraw.Draw(Image.new("RGB", (8, 8)))
    CAP = FOOT_Y - 22 - 115          # header bottom for a paged slide

    def fits(group):
        w = S - MARGIN * 2
        return sum(card_h(probe, m, w) + GAP for m in group) - GAP <= CAP

    def paginate(rows):
        """Spread the rows evenly over the fewest pages that still fit — a
        greedy fill leaves a last page holding one card."""
        for n in range(1, len(rows) + 1):
            base, extra, out, i = divmod(len(rows), n)[0], len(rows) % n, [], 0
            for k in range(n):
                size = base + (1 if k < extra else 0)
                out.append(rows[i:i + size]); i += size
            if all(fits(g) for g in out):
                return out
        raise SystemExit("한 장에 담기지 않는 카드가 있습니다")

    pos = paginate(by("positive"))
    for i, g in enumerate(pos):
        pages.append(slide("개인 긍정 특성 (퍽)", POS, g, f"{i+1}/{len(pos)}", icons))
    neg = paginate(by("negative"))
    for i, g in enumerate(neg):
        note = ("※ 밸런스 조정으로 시즌 시작 전 수치가 바뀔 수 있습니다."
                if i == len(neg) - 1 else None)
        pages.append(slide("개인 부정 특성 (디버프)", NEG, g, f"{i+1}/{len(neg)}",
                           icons, note))

    for i, p in enumerate(pages, 1):
        p.save(f"slides/untar_s2_{i:02d}.png")
    print(f"{len(pages)}장 → slides/")


main()
