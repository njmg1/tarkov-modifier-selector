# KORD BREACH 모디파이어 시뮬레이터 <sub>v0.10</sub>

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

디버프를 전부 켜도 +34뿐이라 모든 퍽을 살 수는 없습니다. 그게 이 시뮬레이터의 전부입니다.

## 동시 선택 불가

같은 스탯을 반대 방향으로 움직이는 조합은 서로를 막습니다 (`data.js`의 `EXCLUSIONS`).

| 퍽 (−) | 디버프 (+) | 축 | 근거 |
|---|---|---|---|
| THROMBOPHILIA | HEMOPHILIA | 출혈 확률 | 효과 문구 |
| STURDY BONES | OSTEOPOROSIS | 골절·낙하 피해 | 효과 문구 |
| HYPODIPSIA | POLYDIPSIA | 수분 소모 | 효과 문구 |
| POLYPHAGIA | CHRONIC FATIGUE | 에너지 소모 | 효과 문구 |
| YOUTH | CHRONIC FATIGUE | 에너지 소모 | 효과 문구 |
| YOUTH | EXHAUSTION | 팔·다리 스태미너 | 효과 문구 |
| AVERAGE | INCOMPETENT | 스킬 레벨 상한 | **추측** |

앞의 여섯은 카드에 "상반된 효과 선택됨"으로, 마지막 하나는 게임의 실제 규칙을
확인하지 못했으므로 "추측하기론 동시 선택 안될듯"으로 표시됩니다.

일부러 **막지 않은** 조합:

- `MARATHON RUNNER`(스태미너 소모) + `EXHAUSTION`(스태미너 회복) — 다른 축
- `SPRINTER`(달리기 속도) + `THIRD LEG`(이동 속도) — 다른 스탯
- `THE TARKOV SHOOTER` + `INCOMPETENT` — 후자가 "볼트액션 제외"를 명시
- `KAPPA PROTOCOL` + `BROKEN SECURE CONTAINER` — 카파를 받고 제한될 수 있음

## 다국어 (한국어 / 日本語 / English)

배너의 언어 선택기로 전환합니다. 기본은 한국어, 선택은 `localStorage`에 저장됩니다.

- 모디파이어 36종의 제목·설명, 상단 툴바, 사이드바/하단 시트, 배타 조합 안내,
  모달, 공유 이미지까지 전부 언어를 따라갑니다. 문자열은 `data.js`의 `STRINGS`에 모여 있습니다.
- 영어는 게임 원본 텍스트(`en` 배열, 블록 이미지에 있던 그대로)를 그대로 씁니다.
  한국어·일본어 제목(`koName`/`jaName`)과 설명(`ko`/`ja`)은 팬 번역입니다.
- 채널명은 한국어에서만 "노잼망겜", 일본어·영어에서는 "NJMG"로 표시됩니다.

## 이미지로 공유하기

"이미지 저장"을 누르면 선택한 조합을 캔버스에 그려 미리보기 모달을 띄웁니다.
iOS Safari가 `<a download>`를 무시하고 파일 앱으로 떨어뜨리는 문제 때문에,
다운로드 대신 이미지를 먼저 보여주고 거기서 저장/공유하게 만들었습니다.

- **이미지 복사**: Clipboard API로 PNG를 클립보드에 직접 씁니다 (Ctrl/Cmd+V로 채팅창에 바로 붙여넣기).
  지원 브라우저에서만 버튼이 뜹니다.
- **공유**: Web Share API (`navigator.share`)가 파일 공유를 지원하는 환경(iOS/일부 데스크톱)에서만 노출됩니다.
- **다운로드**: 항상 가능한 최후 수단.
- 폰에서는 이미지를 길게 눌러 저장할 수 있습니다 (data URI라 롱프레스 메뉴가 뜹니다).

## 랜덤 뽑기 / 프리셋

툴바의 "랜덤"은 배타 규칙을 지키면서 합계 0 이상이 되는 조합을 하나 무작위로
뽑습니다 (재미용). "프리셋"은 `data.js`의 `PRESETS`에 등록된 조합을 나열해
"적용"할 수 있는 패널입니다 — **읽기 전용**이며, 현재 조합을 새 프리셋으로
저장하는 기능은 아직 없습니다 (패널 안 비활성 버튼으로 TODO 표시).

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
./dev/verify.sh            # 헤드리스 Chrome, 데스크톱/폰 두 뷰포트에서 329개 어서션
```

`dev/shot.mjs`는 CDP로 브라우저를 몰아 스크린샷을 찍습니다. Chrome의 `--screenshot`
플래그는 뷰포트 지정을 무시하고 이미지 디코드를 기다리지 않아, 마스크 아이콘이
빈 칸으로 찍힙니다.

## 출처 주의

- 한글 **설명문**은 원본 이미지의 자막을 그대로 옮긴 것입니다. 단 세 장
  (`09`, `28`, `32`)은 원본이 잘려 있어 번역자가 문장을 마저 채웠습니다.
- 한글 **제목**(`koName`)은 원본에 없습니다. 이 저장소에서 붙인 이름입니다.
- `AVERAGE` × `INCOMPETENT` 배타는 추측입니다.
