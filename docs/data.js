// KORD BREACH — Season 1 modifiers.
//
// Values cross-checked twice: once from the master screenshot
// (source/modifier-screenshot.jpeg) and once by OCR of each individual
// block PNG in source/blocks/. Both passes agree on all 36.
//
// Rule: sum of the values of every SELECTED modifier must be >= 0.
//   - global   : no value, always active, costs nothing
//   - positive : perks. Negative value = they cost you budget.
//   - negative : handicaps. Positive value = they grant you budget.
//
// Total budget if every handicap is taken: +34
// Total cost if every perk is taken:       -71
// => you can never take everything. That is the whole game.
//
// koTruncated: the source PNG was cropped at 545px / 790px and clipped the
// Korean overlay mid-sentence. The text below is verbatim from the image;
// the missing tail is noted in `koNote`. Fix by re-cropping the original.

//
// koName is a translation of the modifier's TITLE. Unlike `ko` (the body text),
// it does not appear anywhere in the source images — the overlays only ever
// translated the description lines. These titles are ours, not BSG's.
const MODIFIERS = [
  // ---------------------------------------------------------------- global
  { id: 1, cat: 'global', name: 'NO INSURANCE', koName: '보험 없음', value: null,
    en: ['Cannot insure items before raid'],
    ko: ['아이템 보험 가입 불가'] },
  { id: 2, cat: 'global', name: 'BLACK DIVISION', koName: '블랙 디비전', value: null,
    en: ['Black Division operatives can be encountered on specific locations'],
    ko: ['특정 장소에서 블랙 디비전을 조우할 수 있음'] },
  { id: 3, cat: 'global', name: 'NO FIR FOR HIDEOUT', koName: '하이드아웃 인레이드 면제', value: null,
    en: ["Hideout zones don't require the Found in Raid status"],
    ko: ['하이드아웃엔 인레이드 필요 없음 (건설만 해당하는게 아닌듯?)'] },
  { id: 4, cat: 'global', name: 'ARMOR SHORTAGE', koName: '방탄복 부족', value: null,
    en: ['Traders across Tarkov are experiencing an armor shortage'],
    ko: ['상인들이 방탄복 부족에 시달림'] },
  { id: 5, cat: 'global', name: 'HANDYMAN', koName: '만능 수리공', value: null,
    en: ['Item crafting time is reduced by 50%', 'Crafting skill starts at level 51'],
    ko: ['아이템 크래프팅 시간 50% 감소', '크래프팅 스킬이 51레벨(!)로 시작'] },
  { id: 6, cat: 'global', name: 'SEASONED PMCS', koName: '노련한 PMC', value: null,
    en: ['Your character gains 25% more raid experience'],
    ko: ['레이드 경험치 25% 증가'] },

  // -------------------------------------------------------- personal positive
  { id: 7, cat: 'positive', name: 'MARATHON RUNNER', koName: '마라토너', value: -3,
    en: ['Arm and leg stamina is consumed 15% slower'],
    ko: ['팔과 다리 스테미너 소모량 15% 감소'] },
  { id: 8, cat: 'positive', name: 'SAFECRACKER', koName: '금고털이', value: -6,
    en: ['Mechanical keys have a 20% chance not to lose durability when used'],
    ko: ['기계식 열쇠가 20% 확률로 내구도 (사용 횟수)가 소모되지 않는다'] },
  { id: 9, cat: 'positive', name: 'BUSHBORNE', koName: '부시본 (하이드 온 부쉬)', value: -5,
    en: ['Walking in vegetation generates 50% less noise and movement slowdown'],
    ko: ['나무 식생 안에서 걸을 때 소리와 이동 속도 감소가 50% 줄'],
    koTruncated: true, koNote: '원본 PNG가 545px에서 잘림 — "…50% 줄어듦" 정도로 추정' },
  { id: 10, cat: 'positive', name: 'JUICE TIME', koName: '주스 타임', value: -2,
    en: ['Consuming a juice drink grants the Painkiller effect for 60 seconds'],
    ko: ['쥬스 마시면 60초간 진통제 효과'] },
  { id: 11, cat: 'positive', name: "SAILOR'S NOSTALGIA", koName: '뱃사람의 향수', value: -2,
    en: ['Consuming canned fish grants the Health Regeneration (+2) effect for 10 seconds'],
    ko: ['생선 통조림을 먹으면 10초간, 체력 리젠 +2 효과를 얻는다.'] },
  { id: 12, cat: 'positive', name: 'YOUTH', koName: '젊음', value: -3,
    en: ['Energy is consumed 20% slower', 'Arm and leg stamina is increased by 10'],
    ko: ['에너지 소모가 20% 느려짐. 팔과 다리 스테미너가 10 늘어남'] },
  { id: 13, cat: 'positive', name: 'STREET TAX', koName: '자릿세', value: -1,
    en: ['Once per week, some Scavs pay you protection money'],
    ko: ['1주에 한번, 스캐브가 당신에게 보호비를 상납한다.'] },
  { id: 14, cat: 'positive', name: 'THE TARKOV SHOOTER', koName: '타르코프 슈터', value: -3,
    en: ['Bolt-action Rifles skill leveling speed is increased by 100%', 'Bolt-action Rifles skill starts at level 10'],
    ko: ['볼트 액션 라이플 스킬 레벨업 속도 100%, 레벨 10으로 시작함.'] },
  { id: 15, cat: 'positive', name: 'DIET', koName: '다이어트', value: -1,
    en: ['All provisions consume 50% less resource'],
    ko: ['모든 식량이 50% 덜 소모됨 (용량 2배 증가)'] },
  { id: 16, cat: 'positive', name: 'HERCULES', koName: '헤라클레스', value: -3,
    en: ['Strength and Endurance skills start at level 15'],
    ko: ['힘과 인듀가 15레벨로 시작함'] },
  { id: 17, cat: 'positive', name: 'SPRINTER', koName: '단거리 주자', value: -2,
    en: ['Running speed is increased by 5%'],
    ko: ['달리기 속도가 5% 증가함'] },
  { id: 18, cat: 'positive', name: 'THROMBOPHILIA', koName: '혈전 성향', value: -2,
    en: ['Bleeding chance is decreased by 25%'],
    ko: ['출혈 확률이 25% 감소'] },
  { id: 19, cat: 'positive', name: 'HYPODIPSIA', koName: '갈증 감소', value: -2,
    en: ['Hydration is consumed 15% slower'],
    ko: ['수분 소모량 15% 감소'] },
  { id: 20, cat: 'positive', name: 'POLYPHAGIA', koName: '다식증', value: -2,
    en: ['Energy is consumed 15% slower'],
    ko: ['에너지 소모가 15% 느려짐'] },
  { id: 21, cat: 'positive', name: 'STURDY BONES', koName: '튼튼한 뼈', value: -3,
    en: ['Limb fracture chance is decreased by 15%', 'Falling from heights deals 15% less damage'],
    ko: ['팔다리 골절 확률이 15% 감소, 낙하 데미지 15% 감소'] },
  { id: 22, cat: 'positive', name: 'AVERAGE', koName: '평범함', value: -10,
    en: ['All character skills start at level 25 but cannot be increased further (Excluding Crafting)'],
    ko: ['모든 캐릭터 스킬이 25레벨로 고정됨 (크래프팅 제외하고 레벨업 불가)'] },
  { id: 23, cat: 'positive', name: 'KAPPA PROTOCOL', koName: '카파 프로토콜', value: -21,
    en: ['Immediately receive Secure container Kappa'],
    ko: ['즉시 카파 컨테이너를 받는다 (!)'] },

  // -------------------------------------------------------- personal negative
  { id: 24, cat: 'negative', name: 'HEMOPHILIA', koName: '혈우병', value: 2,
    en: ['Bleeding chance is increased by 25%'],
    ko: ['출혈 확률 25% 증가'] },
  { id: 25, cat: 'negative', name: 'OSTEOPOROSIS', koName: '골다공증', value: 3,
    en: ['Limb fracture chance is increased by 15%', 'Falling from heights deals 15% more damage'],
    ko: ['팔다리 골절 확률 15% 증가, 낙하 데미지 15% 증가'] },
  { id: 26, cat: 'negative', name: 'EXHAUSTION', koName: '탈진', value: 4,
    en: ['Arm and leg stamina recovers 15% slower', 'Arm and leg stamina is reduced by 10'],
    ko: ['팔과 다리 스태미너 회복 15% 느려짐, 스태미너 10 감소'] },
  { id: 27, cat: 'negative', name: 'WELL THAT HURT!', koName: '개아픔;;', value: 2,
    en: ['All medkit uses consume 25% more resource'],
    ko: ['모든 치료템이 용량을 25% 더 소모함'] },
  { id: 28, cat: 'negative', name: 'INCOMPETENT', koName: '무능', value: 4,
    en: ['All character skills are leveled 25% slower (Excluding Bolt-action Rifles)', 'All character skills can only be increased up to level 30 (Excluding Crafting)'],
    ko: ['모든 스킬 레벨업 속도 25% 감소 (볼트 액션 제외), 최대 30레벨 까지만 올라감 (크래프팅 제외'],
    koTruncated: true, koNote: '원본 PNG가 790px에서 잘림 — 닫는 괄호 ")" 누락' },
  { id: 29, cat: 'negative', name: 'POLYDIPSIA', koName: '다갈증', value: 1,
    en: ['Hydration is consumed 15% faster'],
    ko: ['수분 소모 속도 15% 빨라짐'] },
  { id: 30, cat: 'negative', name: 'CHRONIC FATIGUE SYNDROME', koName: '만성 피로 증후군', value: 1,
    en: ['Energy is consumed 15% faster'],
    ko: ['에너지 소모가 15% 빨라짐'] },
  { id: 31, cat: 'negative', name: 'PERSONALITY VACUUM', koName: '성격 결여', value: 2,
    en: ['Charisma skill cannot be increased', 'All trader items cost 20% more'],
    ko: ['카리스마 스킬이 오르지 않음. 모든 상인 아이템 가격 20% 증가(!)'] },
  { id: 32, cat: 'negative', name: 'DR. JEKYLL', koName: '지킬박사', value: 1,
    en: ['After gaining the Fresh Wound status, it cannot be removed until the end of the raid'],
    ko: ['Fresh wound 상태 (과다출혈 치료시 디버프, 재출혈 확률 있'],
    koTruncated: true, koNote: '원본 PNG가 545px에서 잘림 — "…있음)를 얻으면 레이드가 끝날 때까지 사라지지 않음" 정도로 추정' },
  { id: 33, cat: 'negative', name: 'ALLERGIC', koName: '알레르기', value: 3,
    en: ['Become allergic to 2 random items from the Provisions or Medication category'],
    ko: ['식량 혹은 치료아이템 카테고리에서 랜덤하게 아이템 2개에 알레르기 생김 (!)'] },
  { id: 34, cat: 'negative', name: 'BROKEN SECURE CONTAINER', koName: '파손된 시큐어 컨테이너', value: 4,
    en: ['Secure container is restricted to cash, keys, dogtags, special equipment, and certain containers'],
    ko: ['시큐어 컨테이너 제한이 강화 - 현찰, 열쇠, 독택, 특수 아이템과 몇몇 케이스만 넣을 수 있음'] },
  { id: 35, cat: 'negative', name: 'NO FLEA MARKET', koName: '플리마켓 금지', value: 6,
    en: ['Trading with players on the Flea Market is disabled'],
    ko: ['다른 플레이어와의 플리마켓 거래 금지됨'] },
  { id: 36, cat: 'negative', name: 'THIRD LEG', koName: '세 번째 다리', value: 1,
    en: ['Movement speed is decreased by 1%', 'Buying items at Therapist is 5% cheaper'],
    ko: ['이동속도 1% 감소, 테라피스트와의 거래 가격 5% 인하(?)'] },
];

// Each `id` matches the `NN_` prefix of its source block in
// source/blocks/ and its icon key in icons.js (built by
// build_icons.py from those same files).
