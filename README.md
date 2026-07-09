# KORD BREACH 모디파이어 선택기

Escape from Tarkov · KORD BREACH 시즌 1의 모디파이어(특성 퍽) 36종을 한글로 번역하고,
조합해서 통과 여부를 확인하는 페이지입니다.

**https://njmg1.github.io/tarkov-modifier-selector/**

> 공식 한글화 번역이 아닙니다. 수치는 시즌 시작 전 변경될 수 있습니다.

## 규칙

선택한 모디파이어의 **합계가 0 이상**이면 통과합니다.

| 분류 | 개수 | 값 | 의미 |
|---|---|---|---|
| Global | 6 | — | 항상 적용, 비용 없음 |
| Personal Positive (퍽) | 17 | 음수 | 포인트를 **소모** (전부 선택 시 −71) |
| Personal Negative (디버프) | 13 | 양수 | 포인트를 **획득** (전부 선택 시 +34) |

디버프를 전부 켜도 +34뿐이라 모든 퍽을 살 수는 없습니다. 그게 이 선택기의 전부입니다.

## 구조

```
docs/                 GitHub Pages가 서빙하는 디렉터리
  index.html          UI 전체 (CSS·JS 인라인)
  data.js             모디파이어 36종 (이름·값·영문/한글 설명)
  icons.js            아이콘 36개, data URI (생성물)
  char.js             마스코트 이미지, data URI (생성물)
  icons/              94×94 알파 PNG (생성물)
  assets/
    promo_banner.jpg  마스코트 원본
    character.png     배경 제거한 마스코트 (생성물)
    og.png            링크 미리보기 썸네일 (생성물)
  build_icons.py      source/blocks/*.png → icons/, icons.js
  build_char.py       assets/promo_banner.jpg → assets/character.png, char.js
  dev/                검증용 (배포에는 영향 없음)
source/
  blocks/             원본 모디파이어 블록 PNG 36장
  modifier-screenshot.jpeg
```

이미지는 전부 **data URI로 인라인**되어 있습니다. Chrome이 `file://`에서 CSS
`mask-image`의 상대 경로를 가져오지 않아 아이콘이 빈 칸으로 뜨기 때문이고,
덕분에 페이지를 그냥 열어도 정상 동작합니다.

## 생성물 다시 만들기

```sh
cd docs
python3 build_icons.py     # Pillow, numpy 필요
python3 build_char.py
```

## 검증

```sh
cd docs
./dev/verify.sh            # 헤드리스 Chrome에서 89개 어서션 + 스크린샷
```

`dev/shot.mjs`는 CDP로 브라우저를 몰아 스크린샷을 찍습니다. Chrome의 `--screenshot`
플래그는 뷰포트 지정을 무시하고 이미지 디코드를 기다리지 않아, 마스크 아이콘이
빈 칸으로 찍힙니다.

## 알려진 문제

원본 블록 PNG 3장은 오른쪽이 잘려 한글 자막이 문장 중간에서 끊깁니다.
`data.js`에 `koTruncated`로 표시되어 있고, UI에는 `◆`로 나타납니다.

| 블록 | 잘린 텍스트 |
|---|---|
| `09_BUSHBORNE` | `…감소가 50% 줄` |
| `28_INCOMPETENT` | `…(크래프팅 제외` (닫는 괄호 누락) |
| `32_DR_JEKYLL` | `…재출혈 확률 있` |
