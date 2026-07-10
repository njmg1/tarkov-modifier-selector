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
// Three source PNGs were cropped mid-sentence (09/28/32); their Korean lines
// were completed by the translator rather than read off the image.

// Bumped by hand. Shown in the header, the share image, and the footer.
const APP_VERSION = '0.9';

// `en` is the source game's own text (verbatim from the block images) and
// also doubles as the English UI translation — it needed no separate pass.
// `koName`/`ko` and `jaName`/`ja` are fan translations (title / body text),
// not BSG's — koName/jaName in particular appear nowhere in the source
// images, since the overlays only ever translated the description lines.
const MODIFIERS = [
  // ---------------------------------------------------------------- global
  { id: 1, cat: 'global', name: 'NO INSURANCE', koName: '보험 없음', jaName: '保険なし', value: null,
    en: ['Cannot insure items before raid'],
    ko: ['아이템 보험 가입 불가'],
    ja: ['アイテムの保険加入不可'] },
  { id: 2, cat: 'global', name: 'BLACK DIVISION', koName: '블랙 디비전', jaName: 'ブラックディビジョン', value: null,
    en: ['Black Division operatives can be encountered on specific locations'],
    ko: ['특정 장소에서 블랙 디비전을 조우할 수 있음'],
    ja: ['特定の場所でブラックディビジョンと遭遇することがある'] },
  { id: 3, cat: 'global', name: 'NO FIR FOR HIDEOUT', koName: '하이드아웃 인레이드 면제', jaName: 'ハイドアウトのFIR免除', value: null,
    en: ["Hideout zones don't require the Found in Raid status"],
    ko: ['하이드아웃엔 인레이드 필요 없음 (건설만 해당하는게 아닌듯?)'],
    ja: ['ハイドアウトにはFIR(レイド内発見)が不要 (建設だけではない模様?)'] },
  { id: 4, cat: 'global', name: 'ARMOR SHORTAGE', koName: '방탄복 부족', jaName: '防弾ベスト不足', value: null,
    en: ['Traders across Tarkov are experiencing an armor shortage'],
    ko: ['상인들이 방탄복 부족에 시달림'],
    ja: ['トレーダーが防弾ベスト不足に悩まされている'] },
  { id: 5, cat: 'global', name: 'HANDYMAN', koName: '만능 수리공', jaName: '万能修理工', value: null,
    en: ['Item crafting time is reduced by 50%', 'Crafting skill starts at level 51'],
    ko: ['아이템 크래프팅 시간 50% 감소', '크래프팅 스킬이 51레벨(!)로 시작'],
    ja: ['アイテムのクラフト時間が50%短縮', 'クラフトスキルがレベル51(!)からスタート'] },
  { id: 6, cat: 'global', name: 'SEASONED PMCS', koName: '노련한 PMC', jaName: '熟練したPMC', value: null,
    en: ['Your character gains 25% more raid experience'],
    ko: ['레이드 경험치 25% 증가'],
    ja: ['レイド経験値が25%増加'] },

  // -------------------------------------------------------- personal positive
  { id: 7, cat: 'positive', name: 'MARATHON RUNNER', koName: '마라토너', jaName: 'マラソンランナー', value: -3,
    en: ['Arm and leg stamina is consumed 15% slower'],
    ko: ['팔과 다리 스테미너 소모량 15% 감소'],
    ja: ['腕と脚のスタミナ消費が15%減少'] },
  { id: 8, cat: 'positive', name: 'SAFECRACKER', koName: '금고털이', jaName: '金庫破り', value: -6,
    en: ['Mechanical keys have a 20% chance not to lose durability when used'],
    ko: ['기계식 열쇠가 20% 확률로 내구도 (사용 횟수)가 소모되지 않는다'],
    ja: ['機械式の鍵が20%の確率で耐久度(使用回数)が消費されない'] },
  { id: 9, cat: 'positive', name: 'BUSHBORNE', koName: '부시본 (하이드 온 부쉬)', jaName: 'ブッシュボーン（ハイド・オン・ブッシュ）', value: -5,
    en: ['Walking in vegetation generates 50% less noise and movement slowdown'],
    ko: ['나무 식생 안에서 걸을 때 소리와 이동 속도 감소가 50% 줄어듦'],
    ja: ['植生の中を歩く際の音と移動速度低下が50%軽減'] },
  { id: 10, cat: 'positive', name: 'JUICE TIME', koName: '주스 타임', jaName: 'ジュースタイム', value: -2,
    en: ['Consuming a juice drink grants the Painkiller effect for 60 seconds'],
    ko: ['쥬스 마시면 60초간 진통제 효과'],
    ja: ['ジュースを飲むと60秒間ペインキラー効果'] },
  { id: 11, cat: 'positive', name: "SAILOR'S NOSTALGIA", koName: '뱃사람의 향수', jaName: '船乗りの郷愁', value: -2,
    en: ['Consuming canned fish grants the Health Regeneration (+2) effect for 10 seconds'],
    ko: ['생선 통조림을 먹으면 10초간, 체력 리젠 +2 효과를 얻는다.'],
    ja: ['魚の缶詰を食べると10秒間、体力リジェネ+2効果を得る'] },
  { id: 12, cat: 'positive', name: 'YOUTH', koName: '젊음', jaName: '若さ', value: -3,
    en: ['Energy is consumed 20% slower', 'Arm and leg stamina is increased by 10'],
    ko: ['에너지 소모가 20% 느려짐. 팔과 다리 스테미너가 10 늘어남'],
    ja: ['エネルギー消費が20%遅くなる。腕と脚のスタミナが10増加'] },
  { id: 13, cat: 'positive', name: 'STREET TAX', koName: '자릿세', jaName: 'みかじめ料', value: -1,
    en: ['Once per week, some Scavs pay you protection money'],
    ko: ['1주에 한번, 스캐브가 당신에게 보호비를 상납한다.'],
    ja: ['週に一度、スカブがあなたにみかじめ料を納める'] },
  { id: 14, cat: 'positive', name: 'THE TARKOV SHOOTER', koName: '타르코프 슈터', jaName: 'タルコフシューター', value: -3,
    en: ['Bolt-action Rifles skill leveling speed is increased by 100%', 'Bolt-action Rifles skill starts at level 10'],
    ko: ['볼트 액션 라이플 스킬 레벨업 속도 100%, 레벨 10으로 시작함.'],
    ja: ['ボルトアクションライフルスキルのレベルアップ速度100%増加、レベル10からスタート'] },
  { id: 15, cat: 'positive', name: 'DIET', koName: '다이어트', jaName: 'ダイエット', value: -1,
    en: ['All provisions consume 50% less resource'],
    ko: ['모든 식량이 50% 덜 소모됨 (용량 2배 증가)'],
    ja: ['すべての食料消費が50%軽減（実質容量2倍）'] },
  { id: 16, cat: 'positive', name: 'HERCULES', koName: '헤라클레스', jaName: 'ヘラクレス', value: -3,
    en: ['Strength and Endurance skills start at level 15'],
    ko: ['힘과 인듀가 15레벨로 시작함'],
    ja: ['筋力と持久力がレベル15からスタート'] },
  { id: 17, cat: 'positive', name: 'SPRINTER', koName: '단거리 주자', jaName: 'スプリンター', value: -2,
    en: ['Running speed is increased by 5%'],
    ko: ['달리기 속도가 5% 증가함'],
    ja: ['走る速度が5%増加'] },
  { id: 18, cat: 'positive', name: 'THROMBOPHILIA', koName: '혈전 성향', jaName: '血栓傾向', value: -2,
    en: ['Bleeding chance is decreased by 25%'],
    ko: ['출혈 확률이 25% 감소'],
    ja: ['出血確率が25%減少'] },
  { id: 19, cat: 'positive', name: 'HYPODIPSIA', koName: '갈증 감소', jaName: '渇き軽減', value: -2,
    en: ['Hydration is consumed 15% slower'],
    ko: ['수분 소모량 15% 감소'],
    ja: ['水分消費量が15%減少'] },
  { id: 20, cat: 'positive', name: 'POLYPHAGIA', koName: '다식증', jaName: '過食症', value: -2,
    en: ['Energy is consumed 15% slower'],
    ko: ['에너지 소모가 15% 느려짐'],
    ja: ['エネルギー消費が15%遅くなる'] },
  { id: 21, cat: 'positive', name: 'STURDY BONES', koName: '튼튼한 뼈', jaName: '頑丈な骨', value: -3,
    en: ['Limb fracture chance is decreased by 15%', 'Falling from heights deals 15% less damage'],
    ko: ['팔다리 골절 확률이 15% 감소, 낙하 데미지 15% 감소'],
    ja: ['四肢骨折確率が15%減少、落下ダメージが15%減少'] },
  { id: 22, cat: 'positive', name: 'AVERAGE', koName: '평범함', jaName: '平凡', value: -10,
    en: ['All character skills start at level 25 but cannot be increased further (Excluding Crafting)'],
    ko: ['모든 캐릭터 스킬이 25레벨로 고정됨 (크래프팅 제외하고 레벨업 불가)'],
    ja: ['全キャラクタースキルがレベル25に固定（クラフト以外はレベルアップ不可）'] },
  { id: 23, cat: 'positive', name: 'KAPPA PROTOCOL', koName: '카파 프로토콜', jaName: 'カッパプロトコル', value: -21,
    en: ['Immediately receive Secure container Kappa'],
    ko: ['즉시 카파 컨테이너를 받는다 (!)'],
    ja: ['即座にカッパコンテナを受け取る（！）'] },

  // -------------------------------------------------------- personal negative
  { id: 24, cat: 'negative', name: 'HEMOPHILIA', koName: '혈우병', jaName: '血友病', value: 2,
    en: ['Bleeding chance is increased by 25%'],
    ko: ['출혈 확률 25% 증가'],
    ja: ['出血確率が25%増加'] },
  { id: 25, cat: 'negative', name: 'OSTEOPOROSIS', koName: '골다공증', jaName: '骨粗しょう症', value: 3,
    en: ['Limb fracture chance is increased by 15%', 'Falling from heights deals 15% more damage'],
    ko: ['팔다리 골절 확률 15% 증가, 낙하 데미지 15% 증가'],
    ja: ['四肢骨折確率が15%増加、落下ダメージが15%増加'] },
  { id: 26, cat: 'negative', name: 'EXHAUSTION', koName: '탈진', jaName: '疲労困憊', value: 4,
    en: ['Arm and leg stamina recovers 15% slower', 'Arm and leg stamina is reduced by 10'],
    ko: ['팔과 다리 스태미너 회복 15% 느려짐, 스태미너 10 감소'],
    ja: ['腕と脚のスタミナ回復が15%遅くなり、スタミナが10減少'] },
  { id: 27, cat: 'negative', name: 'WELL THAT HURT!', koName: '개아픔;;', jaName: 'マジ痛い;;', value: 2,
    en: ['All medkit uses consume 25% more resource'],
    ko: ['모든 치료템이 용량을 25% 더 소모함'],
    ja: ['すべての治療アイテムの消費量が25%増加'] },
  { id: 28, cat: 'negative', name: 'INCOMPETENT', koName: '무능', jaName: '無能', value: 4,
    en: ['All character skills are leveled 25% slower (Excluding Bolt-action Rifles)', 'All character skills can only be increased up to level 30 (Excluding Crafting)'],
    ko: ['모든 스킬 레벨업 속도 25% 감소 (볼트 액션 제외), 최대 30레벨 까지만 올라감 (크래프팅 제외)'],
    ja: ['全スキルのレベルアップ速度が25%減少（ボルトアクション除く）、最大レベル30までしか上がらない（クラフト除く）'] },
  { id: 29, cat: 'negative', name: 'POLYDIPSIA', koName: '다갈증', jaName: '多渇症', value: 1,
    en: ['Hydration is consumed 15% faster'],
    ko: ['수분 소모 속도 15% 빨라짐'],
    ja: ['水分消費速度が15%速くなる'] },
  { id: 30, cat: 'negative', name: 'CHRONIC FATIGUE SYNDROME', koName: '만성 피로 증후군', jaName: '慢性疲労症候群', value: 1,
    en: ['Energy is consumed 15% faster'],
    ko: ['에너지 소모가 15% 빨라짐'],
    ja: ['エネルギー消費が15%速くなる'] },
  { id: 31, cat: 'negative', name: 'PERSONALITY VACUUM', koName: '인성 이슈', jaName: '個性の欠如', value: 2,
    en: ['Charisma skill cannot be increased', 'All trader items cost 20% more'],
    ko: ['카리스마 스킬이 오르지 않음. 모든 상인 아이템 가격 20% 증가(!)'],
    ja: ['カリスマスキルが上がらない。すべてのトレーダーアイテム価格が20%上昇(!)'] },
  { id: 32, cat: 'negative', name: 'DR. JEKYLL', koName: '지킬박사', jaName: 'ジキル博士', value: 1,
    en: ['After gaining the Fresh Wound status, it cannot be removed until the end of the raid'],
    ko: ['Fresh wound 디버프를 얻으면, 레이드 종료까지 사라지지 않음 (과다 출혈 치료시 생기는 디버프)'],
    ja: ['Fresh Wound(フレッシュウーンド)デバフを得ると、レイド終了まで消えない（大量出血の治療時に発生するデバフ）'] },
  { id: 33, cat: 'negative', name: 'ALLERGIC', koName: '알레르기', jaName: 'アレルギー', value: 3,
    en: ['Become allergic to 2 random items from the Provisions or Medication category'],
    ko: ['식량 혹은 치료아이템 카테고리에서 랜덤하게 아이템 2개에 알레르기 생김 (!)'],
    ja: ['食料または治療アイテムカテゴリーからランダムに2つのアイテムにアレルギーが発生(!)'] },
  { id: 34, cat: 'negative', name: 'BROKEN SECURE CONTAINER', koName: '고장난 시큐어 컨테이너', jaName: '破損したシークレットコンテナ', value: 4,
    en: ['Secure container is restricted to cash, keys, dogtags, special equipment, and certain containers'],
    ko: ['시큐어 컨테이너 제한이 강화 - 현찰, 열쇠, 독택, 특수 아이템과 몇몇 케이스만 넣을 수 있음'],
    ja: ['シークレットコンテナの制限が強化 — 現金、鍵、ドッグタグ、特殊アイテムと一部のケースしか入れられない'] },
  { id: 35, cat: 'negative', name: 'NO FLEA MARKET', koName: '플리마켓 금지', jaName: 'フリーマーケット禁止', value: 6,
    en: ['Trading with players on the Flea Market is disabled'],
    ko: ['다른 플레이어와의 플리마켓 거래 금지됨'],
    ja: ['他プレイヤーとのフリーマーケット取引が禁止される'] },
  { id: 36, cat: 'negative', name: 'THIRD LEG', koName: '세 번째 다리 "나 오늘 장사 안해"', jaName: '三本目の足「今日は商売しない」', value: 1,
    en: ['Movement speed is decreased by 1%', 'Buying items at Therapist is 5% cheaper'],
    ko: ['이동속도 1% 감소, 테라피스트와의 거래 가격 5% 인하(?)'],
    ja: ['移動速度が1%減少、セラピストとの取引価格が5%引き下げ(?)'] },
];

// Each `id` matches the `NN_` prefix of its source block in
// source/blocks/ and its icon key in icons.js (built by
// build_icons.py from those same files).

// Modifiers that cannot be taken together.
//
//   kind: 'opposite' — the two move the same stat in opposite directions.
//                      Read straight off the effect text; not a judgement call.
//   kind: 'guess'    — they contradict each other but the game's actual rule
//                      is unconfirmed. Said so in the UI rather than pretending.
//
// Deliberately NOT listed, because the effects sit on different axes:
//   MARATHON RUNNER (stamina *drain*)  vs EXHAUSTION (stamina *recovery*)
//   SPRINTER (running speed)           vs THIRD LEG (movement speed)
//   THE TARKOV SHOOTER                 vs INCOMPETENT — the latter says
//                                         "Excluding Bolt-action Rifles", so
//                                         they are designed to coexist
//   KAPPA PROTOCOL                     vs BROKEN SECURE CONTAINER — you can
//                                         receive Kappa and have it restricted
// Saved builds shown in the (still read-only) Presets panel.
//
// TODO: this is a placeholder — there is no UI yet to save the CURRENT
// selection as a new preset. For now PRESETS is a hardcoded demo list;
// wiring up "save this build" is future work.
const PRESETS = [
  {
    id: 'demo-kappa-zero',
    name: { ko: '예시 조합 — 카파 프로토콜', ja: 'サンプル — カッパプロトコル', en: 'Example — Kappa Protocol' },
    // rolled by the random-build button; kept because it lands on exactly
    // 0 (the tightest possible pass) while still taking KAPPA PROTOCOL
    ids: [11, 13, 15, 23, 25, 26, 27, 28, 31, 32, 33, 35],
  },
];

const EXCLUSIONS = [
  { a: 18, b: 24, kind: 'opposite', axis: { ko: '출혈 확률', ja: '出血確率', en: 'Bleeding chance' } },
  { a: 21, b: 25, kind: 'opposite', axis: { ko: '골절·낙하 피해', ja: '骨折・落下ダメージ', en: 'Fracture & fall damage' } },
  { a: 19, b: 29, kind: 'opposite', axis: { ko: '수분 소모', ja: '水分消費', en: 'Hydration drain' } },
  { a: 20, b: 30, kind: 'opposite', axis: { ko: '에너지 소모', ja: 'エネルギー消費', en: 'Energy drain' } },
  { a: 12, b: 30, kind: 'opposite', axis: { ko: '에너지 소모', ja: 'エネルギー消費', en: 'Energy drain' } },
  { a: 12, b: 26, kind: 'opposite', axis: { ko: '팔·다리 스태미너', ja: '腕・脚スタミナ', en: 'Arm/leg stamina' } },
  { a: 22, b: 28, kind: 'guess',    axis: { ko: '스킬 레벨 상한', ja: 'スキルレベル上限', en: 'Skill level cap' } },
];

// UI chrome strings, outside the 36 modifiers themselves. `t(key, vars)` in
// index.html looks these up; `{name}`-style placeholders are substituted in.
const STRINGS = {
  onlyBtn:        { ko: '선택만',       ja: '選択のみ',         en: 'Selected only' },
  shotBtn:        { ko: '이미지 저장',   ja: '画像を保存',       en: 'Save image' },
  shareBtn:       { ko: '링크 복사',     ja: 'リンクをコピー',    en: 'Copy link' },
  resetBtn:       { ko: '초기화',       ja: 'リセット',         en: 'Reset' },

  secGlobalKo:    { ko: '공통 적용 사항', ja: '共通適用事項',      en: 'Always applied' },
  secChoiceKo:    { ko: '선택 적용 사항', ja: '選択適用事項',      en: 'Your choice' },
  tallyGlobal:    { ko: '항상 적용 · 비용 없음', ja: '常に適用 ・ コストなし', en: 'Always active · no cost' },
  tallyCat:       { ko: '{n}/{total} 선택 · {sum}', ja: '{n}/{total} 選択 ・ {sum}', en: '{n}/{total} picked · {sum}' },

  asideTitle:     { ko: '선택 목록',    ja: '選択リスト',        en: 'Your picks' },
  meterDetail:    { ko: '디버프 +{gain} · 퍽 −{cost}', ja: 'デバフ +{gain} ・ パーク −{cost}', en: 'Debuffs +{gain} · Perks −{cost}' },
  gainLabel:      { ko: '디버프로 획득', ja: 'デバフで獲得',      en: 'Gained from debuffs' },
  costLabel:      { ko: '퍽에 사용',    ja: 'パークに使用',      en: 'Spent on perks' },
  leftLabel:      { ko: '잔여 포인트',  ja: '残りポイント',      en: 'Points left' },
  emptyPicks:     { ko: '아직 아무것도 선택하지 않았습니다.\n디버프를 켜서 포인트를 버세요.',
                    ja: 'まだ何も選択していません。\nデバフをオンにしてポイントを稼ぎましょう。',
                    en: "Nothing picked yet.\nTurn on a debuff to earn points." },
  groupNeg:       { ko: '디버프 (부정적 효과) — 포인트 획득', ja: 'デバフ（マイナス効果）— ポイント獲得', en: 'Debuffs (negative) — gain points' },
  groupPos:       { ko: '퍽 (긍정적 효과) — 포인트 소모',    ja: 'パーク（プラス効果）— ポイント消費',   en: 'Perks (positive) — spend points' },
  pickRemove:     { ko: '{name} — 클릭하면 해제', ja: '{name} — クリックで解除', en: '{name} — click to remove' },
  sheetCount:     { ko: '{n}개 선택',   ja: '{n}個選択',        en: '{n} picked' },
  sheetLeft:      { ko: '잔여',         ja: '残り',             en: 'Left' },

  promoKicker:    { ko: '시즌 캐릭터 모디파이어 (특성 퍽) 번역', ja: 'シーズンキャラクターモディファイア（特性パーク）翻訳', en: 'Season character modifier (trait perk) translations' },
  brandName:      { ko: '노잼망겜', ja: 'NJMG', en: 'NJMG' },
  promoNote:      { ko: '공식 한글화 번역 아님', ja: '公式翻訳ではありません', en: 'Fan translation, not official' },

  footerRule:     { ko: '합계가 <b>0 이상</b>이면 통과. 디버프(+)를 켜서 포인트를 벌고, 퍽(−)에 씁니다.',
                    ja: '合計が<b>0以上</b>ならパス。デバフ(+)でポイントを稼ぎ、パーク(−)に使います。',
                    en: 'Passes if the total is <b>0 or more</b>. Turn on debuffs (+) to earn points, spend them on perks (−).' },
  footerBudget:   { ko: '모든 디버프를 켜도 포인트는 <b>+34</b>, 모든 퍽의 총 비용은 <b>−71</b>입니다.',
                    ja: 'すべてのデバフをオンにしてもポイントは<b>+34</b>、すべてのパークの合計コストは<b>−71</b>です。',
                    en: 'Every debuff together only gives <b>+34</b>; every perk together costs <b>−71</b>.' },
  footerShare:    { ko: '선택 상태는 브라우저에 저장되고 URL <code>#b=…</code> 로도 공유됩니다. 수치는 시즌 시작 전 변경될 수 있습니다.',
                    ja: '選択状態はブラウザに保存され、URL <code>#b=…</code> でも共有されます。数値はシーズン開始前に変更される場合があります。',
                    en: 'Your picks are saved in the browser and shareable via the URL (<code>#b=…</code>). Values may change before the season starts.' },
  footerVersion:  { ko: '버전 {ver}', ja: 'バージョン {ver}', en: 'Version {ver}' },

  toastReset:     { ko: '초기화됨', ja: 'リセットしました', en: 'Reset' },
  toastLinkCopied:{ ko: '링크가 복사됨', ja: 'リンクをコピーしました', en: 'Link copied' },
  toastLinkPrompt:{ ko: '아래 주소를 복사하세요', ja: '下のアドレスをコピーしてください', en: 'Copy the address below' },
  toastPickFirst: { ko: '먼저 모디파이어를 선택하세요', ja: '先にモディファイアを選択してください', en: 'Pick a modifier first' },
  toastImgFail:   { ko: '이미지 생성 실패: {msg}', ja: '画像の生成に失敗しました: {msg}', en: 'Failed to generate image: {msg}' },
  toastCopyImgOk: { ko: '이미지가 복사됨 — 붙여넣기(Ctrl/Cmd+V) 하세요', ja: '画像をコピーしました — 貼り付け(Ctrl/Cmd+V)してください', en: 'Image copied — paste it (Ctrl/Cmd+V)' },
  toastCopyImgFail:{ ko: '이미지 복사 실패: {msg}', ja: '画像のコピーに失敗しました: {msg}', en: 'Failed to copy image: {msg}' },
  toastShareFail: { ko: '공유 실패: {msg}', ja: '共有に失敗しました: {msg}', en: 'Share failed: {msg}' },
  toastBlocked:   { ko: '{name}와(과) 동시 선택 불가 — {axis}', ja: '{name}と同時選択不可 — {axis}', en: 'Cannot combine with {name} — {axis}' },

  veilOpposite:   { ko: '상반된 효과 선택됨', ja: '相反する効果を選択中', en: 'Opposite effect picked' },
  veilGuess:      { ko: '추측하기론 동시 선택 안될듯', ja: '推測: 同時選択は多分不可', en: 'Guess: probably incompatible' },
  veilTitle:      { ko: '{name}와(과) 동시 선택 불가', ja: '{name}と同時選択不可', en: 'Cannot combine with {name}' },

  modalTitle:     { ko: '조합 이미지', ja: '組み合わせ画像', en: 'Build image' },
  modalClose:     { ko: '닫기', ja: '閉じる', en: 'Close' },
  modalDownload:  { ko: '다운로드', ja: 'ダウンロード', en: 'Download' },
  modalShare:     { ko: '공유', ja: '共有', en: 'Share' },
  modalCopyImg:   { ko: '이미지 복사', ja: '画像をコピー', en: 'Copy image' },
  modalAlt:       { ko: '선택한 모디파이어 조합', ja: '選択したモディファイアの組み合わせ', en: 'Selected modifier build' },
  promoCharAlt:   { ko: '노잼망겜 캐릭터', ja: 'ノジャムマンゲームのキャラクター', en: 'NoJamMangGame mascot' },
  shareTitle:     { ko: 'KORD BREACH 조합', ja: 'KORD BREACHの組み合わせ', en: 'KORD BREACH build' },
  hintTouch:      { ko: '이미지를 길게 눌러 저장하거나, 아래 버튼을 쓰세요', ja: '画像を長押しして保存するか、下のボタンをお使いください', en: 'Long-press the image to save it, or use the buttons below' },
  hintCopy:       { ko: '이미지 복사 버튼을 누르거나, 우클릭해 저장하세요', ja: '画像コピーボタンを押すか、右クリックで保存してください', en: 'Click Copy image, or right-click to save' },
  hintPlain:      { ko: '이미지를 우클릭해 저장하거나, 아래 버튼을 쓰세요', ja: '画像を右クリックして保存するか、下のボタンをお使いください', en: 'Right-click the image to save it, or use the buttons below' },

  imgGain:        { ko: '디버프로 획득', ja: 'デバフで獲得', en: 'Gained from debuffs' },
  imgCost:        { ko: '퍽에 사용',    ja: 'パークに使用', en: 'Spent on perks' },
  imgLeft:        { ko: '잔여 포인트',  ja: '残りポイント', en: 'Points left' },
  imgPicked:      { ko: '{n} / {total} 선택', ja: '{n} / {total} 選択', en: '{n} / {total} picked' },
  imgGlobalNote:  { ko: '글로벌 모디파이어 {n}종은 항상 적용', ja: 'グローバルモディファイア{n}種は常に適用', en: '{n} global modifiers are always active' },

  gridEmpty:      { ko: '선택한 항목이 없습니다', ja: '選択した項目がありません', en: 'Nothing selected' },

  randomBtn:      { ko: '랜덤', ja: 'ランダム', en: 'Random' },
  toastRandomOk:  { ko: '랜덤 조합을 뽑았습니다', ja: 'ランダムな組み合わせを選びました', en: 'Rolled a random build' },

  presetBtn:      { ko: '프리셋', ja: 'プリセット', en: 'Presets' },
  presetPanelTitle: { ko: '프리셋', ja: 'プリセット', en: 'Presets' },
  presetApply:    { ko: '적용', ja: '適用', en: 'Apply' },
  presetSaveTodo: { ko: '+ 새 프리셋 저장', ja: '+ 新規プリセット保存', en: '+ Save new preset' },
  presetSaveNote: { ko: '곧 지원 예정', ja: '近日対応予定', en: 'Coming soon' },
  presetEmpty:    { ko: '아직 프리셋이 없습니다', ja: 'まだプリセットがありません', en: 'No presets yet' },
  toastPresetOk:  { ko: '{name} 적용됨', ja: '{name} を適用しました', en: 'Applied {name}' },
};
