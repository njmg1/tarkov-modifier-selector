// UNTAR CONTROL — Season 2 modifiers.
//
// Transcribed from the Korean community card sheet
// (untar_control_original_template_korean_final_v2_1.png, 2936x4094, 2026-11-20):
// 6 global + 31 positive + 25 negative = 62 cards. The sheet itself carries
// the disclaimer that BSG may still rebalance the values before the season
// opens, so treat every number here as pre-season.
//
// Verified 2026-11-20 against BSG's own English announcement image
// (x.com/tarkov/status/2123390196154859630): all 62 entries match on both
// point value and effect text.
//
// NOTE: a different Korean translation sheet (~1063x1480) circulating on
// Discord/DCInside is an AI mistranslation — it renders 마감 기한 as "임무 기한
// 3일 증가", puts 무능력자 at +6, and invents a perk that does not exist
// ("다리 피로 +6"). Do not reconcile this file against that one.
//
// The sheet is Korean-only, so unlike season 1 this data set has no `ja`/`en`
// text and the page ships without the language switch.
//
// Rule: sum of the values of every SELECTED modifier must be >= 0 — carried
// over from season 1, because the season-2 sheet states no budget rule of its
// own. Flagged in the UI footer as an assumption, not a quoted rule.
//   - global   : no value, always active, costs nothing
//   - positive : perks. Negative value = they cost you budget.
//   - negative : handicaps. Positive value = they grant you budget.
//
// Sum of all handicaps: +74 — but 인격적 결함 x 세 번째 다리 are exclusive, so
// the reachable budget is +73. Cost of every perk: -97. As in season 1 you can
// never take everything.

const APP_VERSION = '2.0';
const SEASON_NAME = 'UNTAR CONTROL';

const MODIFIERS = [
  // ---------------------------------------------------------------- global
  { id: 1, cat: 'global', koName: 'UN군 통제', value: null,
    ko: ['UN군이 타르코프 전역에 출현합니다. 규칙을 위반한 PMC뿐 아니라 모든 스캐브에게 적대적입니다.',
         'UN군은 각 지역의 여러 구역을 통제합니다.'] },
  { id: 2, cat: 'global', koName: '힘든 시기', value: null,
    ko: ['지역별 탈출 지점 이용이 제한됩니다.',
         '시즌 시작 시 플레이어 스캐브 대기시간이 크게 증가합니다.'] },
  { id: 3, cat: 'global', koName: '평화 시장', value: null,
    ko: ['새로운 전체 임무를 완료하면 모든 플레이어가 플리마켓을 이용할 수 있습니다.',
         '아이템 등록 제한이 최소화됩니다.'] },
  { id: 4, cat: 'global', koName: '보험 없음', value: null,
    ko: ['보험을 이용할 수 없습니다.'] },
  { id: 5, cat: 'global', koName: '물자 부족', value: null,
    ko: ['타르코프에서 식량, 의료품, 대형 배낭 및 폭발물이 부족해집니다.'] },
  { id: 6, cat: 'global', koName: '영리한 PMC', value: null,
    ko: ['스킬 숙련도 획득 속도가 25% 증가합니다.'] },

  // -------------------------------------------------------- personal positive
  { id: 7, cat: 'positive', koName: '자물쇠 따기', value: -1,
    ko: ['멀티툴을 사용해 문과 보관함의 자물쇠를 딸 수 있습니다.'] },
  { id: 8, cat: 'positive', koName: '내향적', value: -1,
    ko: ['혼자 플레이할 때 스킬 숙련도 획득 속도가 30% 증가합니다.'] },
  { id: 9, cat: 'positive', koName: '장전 및 조치', value: -1,
    ko: ['문제 해결 스킬 레벨 40으로 시작합니다.',
         '무기 오작동을 해결할 때 더 이상 점검이 필요하지 않습니다.'] },
  { id: 10, cat: 'positive', koName: '강화된 보안 컨테이너', value: -2,
    ko: ['보안 컨테이너 엡실론 X로 시작하며 사망 후에도 내부 아이템의 FIR 상태를 유지합니다.'] },
  { id: 11, cat: 'positive', koName: '빠른 제작', value: -2,
    ko: ['제작 스킬 레벨 40으로 시작합니다.',
         '해당 스킬의 숙련도 획득 속도가 100% 증가합니다.'] },
  { id: 12, cat: 'positive', koName: '레프의 건축가들', value: -2,
    ko: ['GP 코인과 레가 메달을 사용해 은신처 구역을 건설합니다.'] },
  { id: 13, cat: 'positive', koName: '도벽광', value: -2,
    ko: ['수색 스킬 레벨 40으로 시작합니다.',
         '해당 스킬의 숙련도 획득 속도가 100% 증가합니다.'] },
  { id: 14, cat: 'positive', koName: '친구의 탈출', value: -2,
    ko: ['각 PMC 레이드에서 추가 스캐브 탈출 지점을 이용할 수 있습니다.'] },
  { id: 15, cat: 'positive', koName: '헤비급', value: -2,
    ko: ['이동 속도가 5% 감소합니다.',
         '최대 운반 중량이 30kg 증가하고 과적 기준이 5kg 증가합니다.'] },
  { id: 16, cat: 'positive', koName: '냉혈한', value: -4,
    ko: ['레이드 중 체온이 낮아져 열화상 장비에 잘 발견되지 않습니다.'] },
  { id: 17, cat: 'positive', koName: '고급 은신처', value: -4,
    ko: ['비트코인 농장, 체육관, 스캐브 케이스 등 일부 시설이 건설된 상태로 시작합니다.'] },
  { id: 18, cat: 'positive', koName: '피스키퍼의 보험', value: -4,
    ko: ['피스키퍼가 유로화로 장비 보험 서비스를 제공합니다.'] },
  { id: 19, cat: 'positive', koName: '마라톤 주자', value: -5,
    ko: ['팔과 다리의 스태미나 소모량이 25% 감소합니다.'] },
  { id: 20, cat: 'positive', koName: '금고털이', value: -4,
    ko: ['기계식 열쇠와 키카드 사용 시 내구도가 감소하지 않을 확률이 50%입니다.'] },
  { id: 21, cat: 'positive', koName: '수풀의 달인', value: -4,
    ko: ['식생 속을 걸을 때 소음이 75% 감소하며 이동 속도 감소 효과가 발생하지 않습니다.'] },
  { id: 22, cat: 'positive', koName: '주스 타임', value: -1,
    ko: ['주스를 마시면 240초 동안 진통제 효과를 얻습니다.'] },
  { id: 23, cat: 'positive', koName: '선원의 향수', value: -2,
    ko: ['통조림 생선을 먹으면 600초 동안 체력 재생 (+1) 효과를 얻습니다.'] },
  { id: 24, cat: 'positive', koName: '젊음', value: -6,
    ko: ['에너지 소모량이 20% 감소합니다.',
         '팔과 다리의 스태미나가 25포인트 증가합니다.'] },
  // The sheet's own title is clipped by the icon plate — only "거리세" is
  // legible. The effect is confirmed: BSG's English image lists it as
  // STREET TAX (-2, "Once per week some Scavs pay you protection money").
  // The Korean spelling is still inferred, though — season 1 shipped the same
  // effect under a different name ("보호비"), so the hidden first syllable is
  // our reading (길), not something we have seen printed.
  { id: 25, cat: 'positive', koName: '길거리세', koGuess: true, value: -2,
    ko: ['일주일에 한 번 일부 스캐브가 보호비를 지불합니다.'] },
  { id: 26, cat: 'positive', koName: '타르코프의 저격수', value: -2,
    ko: ['볼트액션 소총 스킬 레벨 51로 시작합니다.'] },
  { id: 27, cat: 'positive', koName: '식단 조절', value: -1,
    ko: ['모든 보급품의 자원 소모량이 50% 감소합니다.'] },
  { id: 28, cat: 'positive', koName: '헤라클레스', value: -6,
    ko: ['근력 및 지구력 스킬 레벨 20으로 시작합니다.'] },
  { id: 29, cat: 'positive', koName: '단거리 주자', value: -4,
    ko: ['달리기 속도가 15% 증가합니다.'] },
  { id: 30, cat: 'positive', koName: '혈전증', value: -6,
    ko: ['출혈 발생 확률이 100% 감소합니다.'] },
  { id: 31, cat: 'positive', koName: '영재', value: -4,
    ko: ['스킬 숙련도 획득 속도가 20% 증가합니다.'] },
  { id: 32, cat: 'positive', koName: '수분 부족 둔감증', value: -2,
    ko: ['수분 소모량이 50% 감소합니다.'] },
  { id: 33, cat: 'positive', koName: '다식증', value: -2,
    ko: ['에너지 소모량이 45% 감소합니다.'] },
  { id: 34, cat: 'positive', koName: '튼튼한 뼈', value: -2,
    ko: ['사지 골절 확률이 50% 감소합니다.',
         '높은 곳에서 떨어질 때 받는 피해가 30% 감소합니다.'] },
  { id: 35, cat: 'positive', koName: '평균', value: -8,
    ko: ['모든 캐릭터 스킬이 레벨 30으로 설정되며 더 올릴 수 없습니다.'] },
  { id: 36, cat: 'positive', koName: '카파 프로토콜', value: -8,
    ko: ['보안 컨테이너 카파를 가지고 시작합니다.'] },
  { id: 37, cat: 'positive', koName: '행운아', value: -1,
    ko: ['Audentes fortuna iuvat! (행운은 용감한 자에게 미소 짓는다!)'] },

  // -------------------------------------------------------- personal negative
  { id: 38, cat: 'negative', koName: '외향적', value: 3,
    ko: ['혼자 플레이할 때 스킬 숙련도 획득 속도가 30% 감소합니다.'] },
  { id: 39, cat: 'negative', koName: '환청', value: 2,
    ko: ['캐릭터가 가끔 환청을 듣습니다.'] },
  { id: 40, cat: 'negative', koName: '수리 불가', value: 2,
    ko: ['상인을 통한 아이템 수리가 불가능합니다.'] },
  { id: 41, cat: 'negative', koName: '가벼운 입', value: 2,
    ko: ['캐릭터가 어떤 행동을 한 뒤 가끔 음성 대사를 내뱉습니다.'] },
  { id: 42, cat: 'negative', koName: '세 손가락', value: 2,
    ko: ['재장전할 때 탄창을 떨어뜨릴 확률이 15% 증가합니다.'] },
  { id: 43, cat: 'negative', koName: '펜스의 미움', value: 2,
    ko: ['펜스 평판 -7.0으로 시작합니다.'] },
  { id: 44, cat: 'negative', koName: '무일푼에서 영웅으로', value: 2,
    ko: ['추가 아이템 없이 완전히 빈 캐릭터로 시작합니다.'] },
  { id: 45, cat: 'negative', koName: '흔들리는 조준', value: 3,
    ko: ['3초 이상 조준하면 손 떨림, 통증 및 터널 시야가 발생합니다.'] },
  { id: 46, cat: 'negative', koName: '스캐브 플레이 불가', value: 3,
    ko: ['스캐브로 플레이할 수 없습니다.'] },
  { id: 47, cat: 'negative', koName: '마감 기한', value: 4,
    ko: ['30일 이내에 엔딩에 도달해야 합니다. 기한을 지키지 못하면 시즌 캐릭터가 초기화됩니다.'] },
  { id: 48, cat: 'negative', koName: '응고 장애', value: 3,
    ko: ['모든 출혈이 즉시 심한 출혈로 바뀝니다.'] },
  { id: 49, cat: 'negative', koName: '혈우병', value: 2,
    ko: ['출혈 발생 확률이 70% 증가합니다.'] },
  { id: 50, cat: 'negative', koName: '골다공증', value: 2,
    ko: ['사지 골절 확률이 50% 증가합니다.',
         '높은 곳에서 떨어질 때 받는 피해가 50% 증가합니다.'] },
  { id: 51, cat: 'negative', koName: '탈진', value: 5,
    ko: ['팔과 다리의 스태미나가 20포인트 감소합니다.'] },
  { id: 52, cat: 'negative', koName: '꽤 아프겠네', value: 1,
    ko: ['모든 의료 키트의 자원 소모량이 33% 증가합니다.'] },
  { id: 53, cat: 'negative', koName: '무능력자', value: 8,
    ko: ['스킬 숙련도 획득 속도가 100% 감소합니다.'] },
  { id: 54, cat: 'negative', koName: '다음증', value: 1,
    ko: ['수분 소모량이 25% 증가합니다.'] },
  { id: 55, cat: 'negative', koName: '만성 피로 증후군', value: 1,
    ko: ['에너지 소모량이 20% 증가합니다.'] },
  { id: 56, cat: 'negative', koName: '인격적 결함', value: 6,
    ko: ['카리스마 스킬을 올릴 수 없습니다.',
         '모든 상인 아이템과 서비스 가격이 50% 증가합니다.'] },
  { id: 57, cat: 'negative', koName: '지킬 박사', value: 2,
    ko: ['신선한 상처 상태가 발생하면 레이드가 끝날 때까지 제거할 수 없습니다.'] },
  { id: 58, cat: 'negative', koName: '알레르기', value: 2,
    ko: ['보급품 또는 의료품 카테고리에서 무작위 아이템 4개에 알레르기가 생깁니다.'] },
  { id: 59, cat: 'negative', koName: '고장 난 보안 컨테이너', value: 6,
    ko: ['현금, 열쇠, 인식표, 각성제, 특수 장비, 특정 컨테이너 및 배틀 패스 문서만 넣을 수 있습니다.'] },
  { id: 60, cat: 'negative', koName: '플리마켓 금지', value: 8,
    ko: ['플리마켓에서 다른 플레이어와 거래할 수 없습니다.'] },
  { id: 61, cat: 'negative', koName: '세 번째 다리', value: 1,
    ko: ['이동 속도가 2% 감소합니다.',
         '테라피스트에게서 아이템을 5% 저렴하게 구매할 수 있습니다.'] },
  { id: 62, cat: 'negative', koName: '불운아', value: 1,
    ko: ['당신의 불운은 때때로 심각한 결과를 초래할 수 있습니다.'] },
];

// The season-2 sheet publishes NO exclusion list, so every pair below is
// INFERRED from the effect text — either a direct numeric opposite, or the
// season-1 equivalent of the same pair (season 1's official 1.1.0 list
// confirmed all of these shapes). Marked `inferred` so the UI can say so.
const EXCLUSIONS = [
  // direct numeric opposites
  { a: 8,  b: 38, kind: 'inferred', axis: { ko: '솔로 스킬 숙련도' } },
  { a: 30, b: 49, kind: 'inferred', axis: { ko: '출혈 확률' } },
  { a: 34, b: 50, kind: 'inferred', axis: { ko: '골절·낙하 피해' } },
  { a: 32, b: 54, kind: 'inferred', axis: { ko: '수분 소모' } },
  { a: 33, b: 55, kind: 'inferred', axis: { ko: '에너지 소모' } },
  { a: 24, b: 55, kind: 'inferred', axis: { ko: '에너지 소모' } },
  { a: 24, b: 51, kind: 'inferred', axis: { ko: '팔·다리 스태미나' } },
  { a: 19, b: 51, kind: 'inferred', axis: { ko: '팔·다리 스태미나' } },
  { a: 31, b: 53, kind: 'inferred', axis: { ko: '스킬 숙련도' } },
  // skill-cap conflicts: 평균 pins every skill at 30
  { a: 35, b: 53, kind: 'inferred', axis: { ko: '스킬 성장' } },
  { a: 35, b: 31, kind: 'inferred', axis: { ko: '스킬 성장' } },
  { a: 35, b: 9,  kind: 'inferred', axis: { ko: '스킬 시작 레벨' } },
  { a: 35, b: 11, kind: 'inferred', axis: { ko: '스킬 시작 레벨' } },
  { a: 35, b: 13, kind: 'inferred', axis: { ko: '스킬 시작 레벨' } },
  { a: 35, b: 26, kind: 'inferred', axis: { ko: '스킬 시작 레벨' } },
  { a: 35, b: 28, kind: 'inferred', axis: { ko: '스킬 시작 레벨' } },
  // season 1 made these official too: 다식증 x 젊음 (both cut energy drain)
  // and 인격적 결함 x 세 번째 다리 — the one handicap-vs-handicap pair.
  { a: 33, b: 24, kind: 'inferred', axis: { ko: '에너지 소모' } },
  { a: 56, b: 61, kind: 'inferred', axis: { ko: '상인 거래 가격' } },
  // movement perks (season 1 made MARATHON x SPRINTER official)
  { a: 19, b: 29, kind: 'inferred', axis: { ko: '이동 계열 퍽' } },
  { a: 15, b: 29, kind: 'inferred', axis: { ko: '이동 속도' } },
  { a: 29, b: 61, kind: 'inferred', axis: { ko: '이동 속도' } },
  // luck
  { a: 37, b: 62, kind: 'inferred', axis: { ko: '행운' } },
];

// Season 2's achievement list has not been published yet. The panel is hidden
// while these stay empty; drop the data in here when it lands.
const ACHIEVEMENTS = [];
const ACHV_BUILDS = [];

// UI chrome strings. Season 2's source sheet is Korean-only, so this data set
// carries no ja/en text and index.html ships with the language switch removed.
const STRINGS = {
  onlyBtn:         { ko: '선택만' },
  shotBtn:         { ko: '이미지 저장' },
  shareBtn:        { ko: '링크 복사' },
  resetBtn:        { ko: '초기화' },
  secGlobalKo:     { ko: '공통 적용 사항' },
  secChoiceKo:     { ko: '선택 적용 사항' },
  tallyGlobal:     { ko: '항상 적용 · 비용 없음' },
  tallyCat:        { ko: '{n}/{total} 선택 · {sum}' },
  asideTitle:      { ko: '선택 목록' },
  meterDetail:     { ko: '디버프 +{gain} · 퍽 −{cost}' },
  gainLabel:       { ko: '디버프로 획득' },
  costLabel:       { ko: '퍽에 사용' },
  leftLabel:       { ko: '잔여 포인트' },
  emptyPicks:      { ko: '아직 아무것도 선택하지 않았습니다.\n디버프를 켜서 포인트를 버세요.' },
  groupNeg:        { ko: '디버프 (부정적 효과) — 포인트 획득' },
  groupPos:        { ko: '퍽 (긍정적 효과) — 포인트 소모' },
  pickRemove:      { ko: '{name} — 클릭하면 해제' },
  sheetCount:      { ko: '{n}개 선택' },
  sheetLeft:       { ko: '잔여' },
  promoKicker:     { ko: '시즌 2 특성(모디파이어) 조합 시뮬레이터' },
  brandName:       { ko: '노잼망겜' },
  promoNote:       { ko: '커뮤니티 정리 자료 기준 · 공식 자료 아님' },
  footerRule:      { ko: '합계가 <b>0 이상</b>이면 통과. 디버프(+)를 켜서 포인트를 벌고, 퍽(−)에 씁니다.' },
  footerBudget:    { ko: '디버프 합계는 +74지만 배타 규칙 때문에 실제 최대는 <b>+73</b>, 모든 퍽의 총 비용은 <b>−97</b>입니다.' },
  footerShare:     { ko: '선택 상태는 브라우저에 저장되고 URL <code>#b=…</code> 로도 공유됩니다. 수치는 시즌 시작 전 변경될 수 있습니다.' },
  footerVersion:   { ko: '버전 {ver}' },
  toastReset:      { ko: '초기화됨' },
  toastLinkCopied: { ko: '링크가 복사됨' },
  toastLinkPrompt: { ko: '아래 주소를 복사하세요' },
  toastPickFirst:  { ko: '먼저 모디파이어를 선택하세요' },
  toastImgFail:    { ko: '이미지 생성 실패: {msg}' },
  toastCopyImgOk:  { ko: '이미지가 복사됨 — 붙여넣기(Ctrl/Cmd+V) 하세요' },
  toastCopyImgFail: { ko: '이미지 복사 실패: {msg}' },
  toastShareFail:  { ko: '공유 실패: {msg}' },
  toastBlocked:    { ko: '{name}와(과) 동시 선택 불가 — {axis}' },
  veilOfficial:    { ko: '동시 선택 불가 (공식)' },
  veilTitle:       { ko: '{name}와(과) 동시 선택 불가' },
  modalTitle:      { ko: '조합 이미지' },
  modalClose:      { ko: '닫기' },
  modalDownload:   { ko: '다운로드' },
  modalShare:      { ko: '공유' },
  modalCopyImg:    { ko: '이미지 복사' },
  modalAlt:        { ko: '선택한 모디파이어 조합' },
  promoCharAlt:    { ko: '노잼망겜 캐릭터' },
  shareTitle:      { ko: 'KORD BREACH 조합' },
  hintTouch:       { ko: '이미지를 길게 눌러 저장하거나, 아래 버튼을 쓰세요' },
  hintCopy:        { ko: '이미지 복사 버튼을 누르거나, 우클릭해 저장하세요' },
  hintPlain:       { ko: '이미지를 우클릭해 저장하거나, 아래 버튼을 쓰세요' },
  imgGain:         { ko: '디버프로 획득' },
  imgCost:         { ko: '퍽에 사용' },
  imgLeft:         { ko: '잔여 포인트' },
  imgPicked:       { ko: '{n} / {total} 선택' },
  imgGlobalNote:   { ko: '글로벌 모디파이어 {n}종은 항상 적용' },
  gridEmpty:       { ko: '선택한 항목이 없습니다' },
  randomBtn:       { ko: '랜덤' },
  toastRandomOk:   { ko: '랜덤 조합을 뽑았습니다' },
  presetBtn:       { ko: '프리셋' },
  presetPanelTitle: { ko: '내 프리셋' },
  presetPanelHint: { ko: '이 기기에 최대 3개까지 저장됩니다. 저장하면 통계에 집계됩니다.' },
  slotLabel:       { ko: '슬롯 {n}' },
  slotEmpty:       { ko: '비어있음' },
  slotLoad:        { ko: '불러오기' },
  slotOverwrite:   { ko: '덮어쓰기' },
  slotSaveHere:    { ko: '여기 저장' },
  slotClear:       { ko: '비우기' },
  slotSaveCurrent: { ko: '현재 조합 저장' },
  slotNamePlaceholder: { ko: '이름 (비워두면 시각)' },
  toastSlotSaved:  { ko: '저장됨 · {name}' },
  toastSlotLoaded: { ko: '{name} 불러옴' },
  toastSlotCleared: { ko: '슬롯을 비웠습니다' },
  toastNoEmptySlot: { ko: '빈 슬롯이 없습니다 — 덮어쓸 슬롯을 고르세요' },
  saveAskTitle:    { ko: '현재 조합을 저장할까요?' },
  saveAskMsg:      { ko: '이미지로 저장하기 전에, 이 조합을 이 기기의 슬롯에 저장할 수 있습니다.' },
  askImgOnly:      { ko: '이미지만' },
  askSaveImg:      { ko: '저장하고 이미지' },
  saveAskPick:     { ko: '저장할 슬롯을 고르세요' },
  veilInferred:    { ko: '동시 선택 불가 (추정)' },
  rulesNote:       { ko: '합계 규칙은 시즌 1 기준을 그대로 적용했습니다 — 시즌 2 자료에는 점수 한도가 적혀 있지 않습니다.' },
  valuesNote:      { ko: '※ 밸런스 조정을 위해 시즌 시작 전 특성 수치가 변경될 수 있습니다.' },
  exclNote:        { ko: '동시 선택 불가 쌍은 공식 목록이 아니라 효과 설명에서 추정한 것입니다.' },
  seasonSwitch:    { ko: '시즌 1 (KORD BREACH)' },
  // Kept even though the achievement panel is hidden: t() would throw if a
  // season-2 achievement list is dropped in before these are added back.
  achvApplied:     { ko: '{name} 적용됨' },
  achvCaution:     { ko: '주의' },
  achvCondNeed:    { ko: '필요: {list}' },
  achvCondNegMin:  { ko: '부정(디버프) {n}개 이상 선택' },
  achvCondNoPerks: { ko: '긍정(퍽)을 하나도 선택하지 않기' },
  achvCondPool:    { ko: '다음 중 {n}개: {list}' },
  achvPerkCount:   { ko: '퍽 {n}개' },
};
