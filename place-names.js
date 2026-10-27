// Signage-first place names. The Japanese field uses the name visitors should look for on site.
const tripPlaceNames = [
  { terms: ["羽田第 3 航廈", "羽田第3航廈", "羽田機場第 3 航廈", "羽田機場第3航廈"], jp: "羽田空港第3ターミナル", roman: "Haneda Kūkō Dai-san Tāminaru" },
  { terms: ["東京國際機場", "羽田機場", "羽田"], jp: "羽田空港", roman: "Haneda Kūkō" },
  { terms: ["桃園機場"], jp: "台湾桃園国際空港", roman: "Taiwan Tōen Kokusai Kūkō" },
  { terms: ["品川站", "品川"], jp: "品川駅", roman: "Shinagawa-eki" },
  { terms: ["池袋站"], jp: "池袋駅", roman: "Ikebukuro-eki" },
  { terms: ["池袋"], jp: "池袋", roman: "Ikebukuro" },
  { terms: ["川越站西口"], jp: "川越駅西口", roman: "Kawagoe-eki Nishiguchi" },
  { terms: ["川越站觀光案內所"], jp: "川越駅観光案内所", roman: "Kawagoe-eki Kankō Annaijo" },
  { terms: ["川越站"], jp: "川越駅", roman: "Kawagoe-eki" },
  { terms: ["川越"], jp: "川越市", roman: "Kawagoe-shi" },
  { terms: ["本川越站"], jp: "本川越駅", roman: "Hon-Kawagoe-eki" },
  { terms: ["鶴ヶ島站", "鶴島站", "鶴ヶ島", "鶴島"], jp: "鶴ヶ島駅", roman: "Tsurugashima-eki" },
  { terms: ["大宮站", "大宮"], jp: "大宮駅", roman: "Ōmiya-eki" },
  { terms: ["高崎站"], jp: "高崎駅", roman: "Takasaki-eki" },
  { terms: ["高崎"], jp: "高崎市", roman: "Takasaki-shi" },
  { terms: ["東京站"], jp: "東京駅", roman: "Tōkyō-eki" },
  { terms: ["澀谷"], jp: "渋谷駅", roman: "Shibuya-eki" },
  { terms: ["新宿"], jp: "新宿駅", roman: "Shinjuku-eki" },
  { terms: ["濱松町站", "濱松町"], jp: "浜松町駅", roman: "Hamamatsuchō-eki" },
  { terms: ["長野站", "長野"], jp: "長野駅", roman: "Nagano-eki" },
  { terms: ["松本站"], jp: "松本駅", roman: "Matsumoto-eki" },
  { terms: ["松本"], jp: "松本市", roman: "Matsumoto-shi" },
  { terms: ["新島島站", "新島々站", "新島島", "新島々"], jp: "新島々駅", roman: "Shin-Shimashima-eki" },
  { terms: ["上諏訪站"], jp: "上諏訪駅", roman: "Kami-Suwa-eki" },
  { terms: ["下諏訪站"], jp: "下諏訪駅", roman: "Shimo-Suwa-eki" },
  { terms: ["伊佐沼入口"], jp: "伊佐沼入口", roman: "Isanuma Iriguchi" },
  { terms: ["森林公園"], jp: "森林公園駅", roman: "Shinrin-kōen-eki" },
  { terms: ["藏造老街", "藏造街"], jp: "蔵造りの町並み", roman: "Kurazukuri no Machinami" },
  { terms: ["時之鐘"], jp: "時の鐘", roman: "Toki no Kane" },
  { terms: ["菓子屋橫丁"], jp: "菓子屋横丁", roman: "Kashiya Yokochō" },
  { terms: ["川越冰川神社", "冰川神社"], jp: "川越氷川神社", roman: "Kawagoe Hikawa Jinja" },
  { terms: ["喜多院"], jp: "喜多院", roman: "Kita-in" },
  { terms: ["小江戶溫泉 KASHIBA", "KASHIBA"], jp: "小江戸温泉 KASHIBA", roman: "Koedo Onsen KASHIBA" },
  { terms: ["Sunshine City"], jp: "サンシャインシティ", roman: "Sunshine City" },
  { terms: ["南池袋公園"], jp: "南池袋公園", roman: "Minami-Ikebukuro Kōen" },
  { terms: ["高崎 Arena", "高崎アリーナ", "Arena"], jp: "高崎アリーナ", roman: "Takasaki Arīna" },
  { terms: ["Dormy Inn 高崎", "Dormy Inn"], jp: "ドーミーイン高崎", roman: "Dōmī In Takasaki" },
  { terms: ["Hotel M Matsumoto"], jp: "Hotel M Matsumoto", roman: "Hoteru Emu Matsumoto" },
  { terms: ["Nippon Rent-A-Car 高崎西口站前店", "Nippon 高崎西口站前店"], jp: "ニッポンレンタカー高崎西口駅前営業所", roman: "Nippon Rentakā Takasaki Nishiguchi Ekimae Eigyōsho" },
  { terms: ["澤渡巴士總站"], jp: "さわんどバスターミナル", roman: "Sawando Basu Tāminaru" },
  { terms: ["澤渡停車場"], jp: "さわんど駐車場", roman: "Sawando Chūshajō" },
  { terms: ["澤渡"], jp: "さわんど", roman: "Sawando" },
  { terms: ["上高地巴士總站"], jp: "上高地バスターミナル", roman: "Kamikōchi Basu Tāminaru" },
  { terms: ["上高地"], jp: "上高地", roman: "Kamikōchi" },
  { terms: ["大正池"], jp: "大正池", roman: "Taishō-ike" },
  { terms: ["大正池站"], jp: "大正池バス停", roman: "Taishō-ike Basutei" },
  { terms: ["田代池"], jp: "田代池", roman: "Tashiro-ike" },
  { terms: ["田代濕原"], jp: "田代湿原", roman: "Tashiro Shitsugen" },
  { terms: ["河童橋"], jp: "河童橋", roman: "Kappa-bashi" },
  { terms: ["明神橋"], jp: "明神橋", roman: "Myōjin-bashi" },
  { terms: ["田代橋"], jp: "田代橋", roman: "Tashiro-bashi" },
  { terms: ["岳澤濕原"], jp: "岳沢湿原", roman: "Dakesawa Shitsugen" },
  { terms: ["明神池"], jp: "明神池", roman: "Myōjin-ike" },
  { terms: ["穗高神社奧宮"], jp: "穂高神社奥宮", roman: "Hotaka Jinja Okumiya" },
  { terms: ["松本城"], jp: "松本城", roman: "Matsumoto-jō" },
  { terms: ["繩手通"], jp: "なわて通り", roman: "Nawate-dōri" },
  { terms: ["中町通"], jp: "中町通り", roman: "Nakamachi-dōri" },
  { terms: ["舊開智學校"], jp: "旧開智学校", roman: "Kyū Kaichi Gakkō" },
  { terms: ["立石公園"], jp: "立石公園", roman: "Tateishi Kōen" },
  { terms: ["諏訪湖間欠泉中心", "諏訪間欠泉中心", "間欠泉中心"], jp: "諏訪湖間欠泉センター", roman: "Suwako Kanketsusen Sentā" },
  { terms: ["湖畔公園"], jp: "諏訪市湖畔公園", roman: "Suwa-shi Kohan Kōen" },
  { terms: ["タケヤ味噌会館"], jp: "タケヤ味噌会館", roman: "Takeya Miso Kaikan" },
  { terms: ["湖畔公園足湯", "湖畔足湯"], jp: "湖畔公園足湯", roman: "Kohan Kōen Ashiyu" },
  { terms: ["諏訪湖"], jp: "諏訪湖", roman: "Suwa-ko" },
  { terms: ["諏訪"], jp: "諏訪市", roman: "Suwa-shi" },
  { terms: ["安曇野"], jp: "安曇野市", roman: "Azumino-shi" },
  { terms: ["木曾"], jp: "木曽", roman: "Kiso" },
  { terms: ["群馬"], jp: "群馬県", roman: "Gunma-ken" },
  { terms: ["埼玉"], jp: "埼玉県", roman: "Saitama-ken" },
  { terms: ["諏訪大社 · 下社秋宮", "諏訪大社下社秋宮", "下社秋宮"], jp: "諏訪大社 下社秋宮", roman: "Suwa Taisha Shimosha Akimiya" },
  { terms: ["片倉館 · 千人風呂", "片倉館"], jp: "片倉館", roman: "Katakurakan" },
  { terms: ["上田城跡公園"], jp: "上田城跡公園", roman: "Ueda Jōseki Kōen" },
  { terms: ["大王山葵農場"], jp: "大王わさび農場", roman: "Daiō Wasabi Nōjō" },
  { terms: ["奈良井宿"], jp: "奈良井宿", roman: "Narai-juku" },
  { terms: ["姨捨 SA", "姨捨SA"], jp: "姨捨サービスエリア（下り）", roman: "Obasute Sābisu Eria (Kudari)" },
  { terms: ["東武東上線"], jp: "東武東上線", roman: "Tōbu Tōjō-sen" },
  { terms: ["京急"], jp: "京急線", roman: "Keikyū-sen" },
  { terms: ["JR 山手線", "山手線"], jp: "JR山手線", roman: "JR Yamanote-sen" },
  { terms: ["京濱東北線"], jp: "JR京浜東北線", roman: "JR Keihin-Tōhoku-sen" },
  { terms: ["JR 川越線", "川越線"], jp: "JR川越線", roman: "JR Kawagoe-sen" },
  { terms: ["JR 高崎線", "高崎線"], jp: "JR高崎線", roman: "JR Takasaki-sen" },
  { terms: ["北陸新幹線"], jp: "北陸新幹線", roman: "Hokuriku Shinkansen" },
  { terms: ["東京單軌電車", "東京モノレール", "單軌電車"], jp: "東京モノレール", roman: "Tōkyō Monorēru" },
  { terms: ["松本電鐵", "上高地線"], jp: "アルピコ交通 上高地線", roman: "Arupiko Kōtsū Kamikōchi-sen" },
  { terms: ["長野道", "長野自動車道"], jp: "長野自動車道", roman: "Nagano Jidōshadō" },
  { terms: ["上信越道"], jp: "上信越自動車道", roman: "Jōshin'etsu Jidōshadō" },
  { terms: ["岡谷 JCT", "岡谷JCT"], jp: "岡谷ジャンクション", roman: "Okaya Jankushon" },
  { terms: ["更埴 JCT", "更埴JCT"], jp: "更埴ジャンクション", roman: "Kōshoku Jankushon" },
  { terms: ["諏訪 IC", "諏訪IC"], jp: "諏訪インターチェンジ", roman: "Suwa Intāchenji" },
  { terms: ["松本 IC", "松本IC"], jp: "松本インターチェンジ", roman: "Matsumoto Intāchenji" },
  { terms: ["泉天空之湯", "泉天空の湯"], jp: "泉天空の湯 羽田空港", roman: "Izumi Tenkū no Yu Haneda Kūkō" },
  { terms: ["Airport Garden", "羽田 Airport Garden", "羽田機場花園"], jp: "羽田エアポートガーデン", roman: "Haneda Eapōto Gāden" },
  { terms: ["NODOKA"], jp: "エアポートカフェラウンジ NODOKA", roman: "Eapōto Kafe Raunji Nodoka" },
];

const nameByTerm = new Map(tripPlaceNames.flatMap(entry => entry.terms.map(term => [term, entry])));
const sortedTerms = [...nameByTerm.keys()].sort((a, b) => b.length - a.length);

function findNameAt(value, offset) {
  return sortedTerms.find(term => value.startsWith(term, offset));
}

function annotatePlaceNames(root) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim() || node.parentElement.closest("a, button, label, script, style, .status-chip, .place-name")) return NodeFilter.FILTER_REJECT;
      return sortedTerms.some(term => node.nodeValue.includes(term)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  const matches = [];
  while (walker.nextNode()) matches.push(walker.currentNode);
  matches.forEach(node => {
    const value = node.nodeValue;
    const fragment = document.createDocumentFragment();
    let plainStart = 0;
    for (let i = 0; i < value.length;) {
      const term = findNameAt(value, i);
      if (!term) { i += 1; continue; }
      if (i > plainStart) fragment.append(document.createTextNode(value.slice(plainStart, i)));
      const entry = nameByTerm.get(term);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "place-name";
      button.textContent = term;
      button.title = `${entry.jp} · ${entry.roman}`;
      button.setAttribute("aria-label", `${term}，日文 ${entry.jp}，羅馬拼音 ${entry.roman}`);
      button.dataset.placeTerm = term;
      fragment.append(button);
      i += term.length;
      plainStart = i;
    }
    if (plainStart < value.length) fragment.append(document.createTextNode(value.slice(plainStart)));
    node.replaceWith(fragment);
  });
}

function createPlaceNameCard() {
  const card = document.createElement("aside");
  card.className = "place-name-card";
  card.hidden = true;
  card.setAttribute("aria-live", "polite");
  card.innerHTML = '<button type="button" class="place-name-close" aria-label="關閉日文對照">×</button><small>日本現場名稱 · 點「複製日文」可直接出示</small><strong class="place-name-jp" lang="ja"></strong><span class="place-name-roman"></span><div class="place-name-actions"><button type="button" class="place-name-copy">複製日文</button></div>';
  document.body.append(card);
  let current;
  document.addEventListener("click", event => {
    const button = event.target.closest(".place-name");
    if (button) {
      current = nameByTerm.get(button.dataset.placeTerm);
      card.querySelector(".place-name-jp").textContent = current.jp;
      card.querySelector(".place-name-roman").textContent = current.roman;
      card.querySelector(".place-name-copy").textContent = "複製日文";
      card.hidden = false;
    } else if (event.target.closest(".place-name-close")) {
      card.hidden = true;
    } else if (event.target.closest(".place-name-copy") && current) {
      if (!navigator.clipboard?.writeText) {
        card.querySelector(".place-name-copy").textContent = "請長按日文複製";
        return;
      }
      navigator.clipboard.writeText(current.jp).then(() => {
        card.querySelector(".place-name-copy").textContent = "已複製";
      }).catch(() => {
        card.querySelector(".place-name-copy").textContent = "請長按日文複製";
      });
    }
  });
  document.addEventListener("keydown", event => { if (event.key === "Escape") card.hidden = true; });
}

window.annotatePlaceNames = annotatePlaceNames;
window.tripPlaceName = term => nameByTerm.get(term);
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".day-panel").forEach(annotatePlaceNames);
  createPlaceNameCard();
});
