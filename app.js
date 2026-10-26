const places = {
  kawagoe: [
    { name: "川越站", note: "早餐、寄行李；回程在此取行李", lat: 35.90708, lng: 139.48329, query: "川越駅", transit: true },
    { name: "藏造老街／時之鐘", note: "星期五最具代表性的川越街景", lat: 35.92348, lng: 139.48334, query: "川越 時の鐘" },
    { name: "菓子屋橫丁", note: "從時之鐘步行可達", lat: 35.92461, lng: 139.48106, query: "川越 菓子屋横丁" },
    { name: "川越冰川神社", note: "從菓子屋橫丁步行約 22 分鐘", lat: 35.92756, lng: 139.48855, query: "川越氷川神社" },
    { name: "小江戶溫泉 KASHIBA", note: "從神社搭川越 06 到伊佐沼入口，再步行約 15 分鐘", lat: 35.92652, lng: 139.51092, query: "小江戸温泉 KASHIBA" },
    { name: "鶴ヶ島站", note: "晚上與朋友會合；宿舍地址不公開", lat: 35.93694, lng: 139.42367, query: "鶴ヶ島駅", transit: true },
  ],
  ikebukuro: [
    { name: "池袋站", note: "寄行李、早餐；轉東武東上線", lat: 35.73023, lng: 139.71149, query: "池袋駅", transit: true },
    { name: "Sunshine City", note: "水族館、展望台或購物擇一兩項", lat: 35.72912, lng: 139.71914, query: "サンシャインシティ 池袋" },
    { name: "南池袋公園", note: "可選的午後休息點", lat: 35.72755, lng: 139.71435, query: "南池袋公園" },
    { name: "鶴ヶ島站", note: "晚上與朋友會合；宿舍地址不公開", lat: 35.93694, lng: 139.42367, query: "鶴ヶ島駅", transit: true },
  ],
};

const googleMaps = query => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
const list = document.querySelector("#place-list");
let currentRoute = "kawagoe";
let map;
let mapItems = [];
let routeLine;

function drawList(route) {
  const title = route === "kawagoe" ? "川越主線 · 地點順序" : "池袋備案 · 地點順序";
  list.innerHTML = `<div class="place-list-head">${title}</div>${places[route].map((place, index) => `
    <div class="place-item"><span class="place-number ${place.transit ? "transit" : ""}">${index + 1}</span><div>
      <h3>${place.name}</h3><p>${place.note}</p><a href="${googleMaps(place.query)}" target="_blank" rel="noreferrer">Google Maps 開啟 ↗</a>
    </div></div>`).join("")}`;
}

function clearMap() {
  mapItems.forEach(item => map.removeLayer(item));
  mapItems = [];
  if (routeLine) map.removeLayer(routeLine);
}

function fitMap(includeLast = true) {
  if (!map) return;
  const visible = includeLast ? places[currentRoute] : places[currentRoute].slice(0, -1);
  map.fitBounds(visible.map(place => [place.lat, place.lng]), { padding: [38, 38], maxZoom: 15 });
}

function drawMap(route) {
  if (!map) return;
  clearMap();
  const points = places[route];
  points.forEach((place, index) => {
    const marker = L.marker([place.lat, place.lng], {
      icon: L.divIcon({
        html: `<span class="map-pin ${place.transit ? "transit" : ""}">${index + 1}</span>`,
        className: "map-pin-icon", iconSize: [30, 30], iconAnchor: [15, 15],
      }),
    });
    marker.bindPopup(`<strong>${place.name}</strong><span>${place.note}</span><a href="${googleMaps(place.query)}" target="_blank" rel="noreferrer">Google Maps 導航 ↗</a>`);
    marker.addTo(map);
    mapItems.push(marker);
  });
  routeLine = L.polyline(points.map(place => [place.lat, place.lng]), {
    color: "#c7654d", weight: 2, opacity: 0.7, dashArray: "6 8",
  }).addTo(map);
  fitMap(false);
  setTimeout(() => map.invalidateSize(), 0);
}

function activateRoute(route) {
  if (!places[route]) return;
  currentRoute = route;
  document.querySelectorAll(".route-tab").forEach(button => {
    const selected = button.dataset.route === route;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  document.querySelectorAll(".route-panel").forEach(panel => { panel.hidden = panel.id !== `panel-${route}`; });
  drawList(route);
  drawMap(route);
}

function startMap() {
  if (!window.L) {
    document.querySelector("#map").hidden = true;
    document.querySelector("#map-fallback").hidden = false;
    document.querySelector(".map-actions").hidden = true;
    return;
  }
  map = L.map("map", { scrollWheelZoom: false });
  const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19, attribution: "&copy; OpenStreetMap contributors",
  });
  let tileErrors = 0;
  tiles.on("tileerror", () => {
    tileErrors += 1;
    if (tileErrors >= 5) {
      document.querySelector("#map").hidden = true;
      document.querySelector("#map-fallback").hidden = false;
      document.querySelector(".map-actions").hidden = true;
    }
  });
  tiles.addTo(map);
  drawMap(currentRoute);
}

document.querySelectorAll(".route-tab").forEach(button => {
  button.addEventListener("click", () => activateRoute(button.dataset.route));
  button.addEventListener("keydown", event => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = button.dataset.route === "kawagoe" ? "ikebukuro" : "kawagoe";
    activateRoute(next);
    document.querySelector(`[data-route="${next}"]`).focus();
  });
});
document.querySelector("#fit-route").addEventListener("click", () => fitMap(true));
document.querySelector("#focus-area").addEventListener("click", () => fitMap(false));
drawList(currentRoute);
startMap();

const kamikochiPoints = {
  takasaki: { name: "高崎站／Arena", note: "週日比賽後的出發地", lat: 36.3225, lng: 139.0128, kind: "shared", label: "高" },
  nagano: { name: "長野站", note: "B：週日新幹線轉特急", lat: 36.6431, lng: 138.1886, kind: "rail", label: "長" },
  matsumoto: { name: "松本站", note: "週日抵達，週一可搭上高地線", lat: 36.2304, lng: 137.9643, kind: "rail", label: "松" },
  matsumotoHotel: { name: "Hotel M Matsumoto", note: "週日晚住宿已確認；松本站東口步行約 3 分鐘", lat: 36.2296723, lng: 137.9673017, kind: "shared", label: "宿" },
  shinShimashima: { name: "新島々站", note: "B：電車轉預約優先巴士", lat: 36.18973, lng: 137.82165, kind: "rail", label: "新" },
  sawando: { name: "澤渡巴士總站", note: "A：停車後搭免預約接駁車", lat: 36.16459, lng: 137.65534, kind: "drive", label: "澤" },
  taisho: { name: "大正池", note: "兩案在此下車，開始散步", lat: 36.2283, lng: 137.6222, kind: "walk", label: "1" },
  tashiro: { name: "田代池／田代濕原", note: "大正池與河童橋之間的自然研究路", lat: 36.2356, lng: 137.6245, kind: "walk", label: "2" },
  kappa: { name: "河童橋", note: "午餐、休息；視天氣決定是否續走", lat: 36.2483, lng: 137.6376, kind: "walk", label: "3" },
  dakesawa: { name: "岳澤濕原", note: "河童橋往明神池的右岸步道", lat: 36.2537, lng: 137.6431, kind: "walk", label: "4" },
  myojin: { name: "明神池", note: "此行最深入的位置，沒有公車站", lat: 36.25397, lng: 137.66384, kind: "walk", label: "5" },
  terminal: { name: "上高地巴士總站", note: "回程在此搭車；A 往澤渡、B 往新島々", lat: 36.2458, lng: 137.6364, kind: "shared", label: "巴" },
};
const kamikochiRoutes = {
  drive: ["takasaki", "matsumotoHotel", "sawando", "taisho"],
  rail: ["takasaki", "nagano", "matsumoto", "matsumotoHotel", "matsumoto", "shinShimashima", "taisho"],
  walk: ["taisho", "tashiro", "kappa", "dakesawa", "myojin", "kappa", "terminal"],
};
let kamikochiMap;
const kamikochiLayers = {};
const kamikochiMarkers = {};

function focusKamikochi(view) {
  if (!kamikochiMap) return;
  const ids = view === "all" ? [...new Set(Object.values(kamikochiRoutes).flat())]
    : [...new Set(kamikochiRoutes[view] || kamikochiRoutes.walk)];
  const bounds = ids.map(id => [kamikochiPoints[id].lat, kamikochiPoints[id].lng]);
  kamikochiMap.fitBounds(bounds, { padding: [35, 35], maxZoom: view === "walk" ? 13 : 11 });
  Object.entries(kamikochiLayers).forEach(([name, line]) => line.setStyle({
    opacity: view === "all" || view === name ? 0.82 : 0.2,
  }));
  Object.entries(kamikochiMarkers).forEach(([id, marker]) => marker.setOpacity(
    view === "all" || ids.includes(id) ? 1 : 0.35,
  ));
  document.querySelectorAll("[data-kamikochi-view]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.kamikochiView === view));
  });
}

function startKamikochiMap() {
  if (!window.L) {
    document.querySelector("#kamikochi-map").hidden = true;
    document.querySelector("#kamikochi-map-fallback").hidden = false;
    document.querySelector(".kamikochi-map-actions").hidden = true;
    return;
  }
  kamikochiMap = L.map("kamikochi-map", { scrollWheelZoom: false });
  const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19, attribution: "&copy; OpenStreetMap contributors",
  });
  let tileErrors = 0;
  tiles.on("tileerror", () => {
    tileErrors += 1;
    if (tileErrors >= 5) {
      document.querySelector("#kamikochi-map").hidden = true;
      document.querySelector("#kamikochi-map-fallback").hidden = false;
      document.querySelector(".kamikochi-map-actions").hidden = true;
    }
  });
  tiles.addTo(kamikochiMap);
  const colors = { drive: "#bd7144", rail: "#496f9c", walk: "#328163" };
  Object.entries(kamikochiRoutes).forEach(([name, route]) => {
    kamikochiLayers[name] = L.polyline(route.map(id => {
      const point = kamikochiPoints[id];
      return [point.lat, point.lng];
    }), { color: colors[name], weight: name === "walk" ? 4 : 3, opacity: 0.82, dashArray: name === "walk" ? undefined : "8 7" }).addTo(kamikochiMap);
  });
  Object.entries(kamikochiPoints).forEach(([id, point]) => {
    const marker = L.marker([point.lat, point.lng], {
      icon: L.divIcon({
        html: `<span class="kamikochi-pin pin-${point.kind}">${point.label}</span>`,
        className: "kamikochi-pin-icon", iconSize: [27, 27], iconAnchor: [13, 13],
      }),
    });
    marker.bindPopup(`<strong>${point.name}</strong><span>${point.note}</span><a href="${googleMaps(point.name)}" target="_blank" rel="noreferrer">Google Maps 開啟 ↗</a>`);
    marker.addTo(kamikochiMap);
    kamikochiMarkers[id] = marker;
  });
  focusKamikochi("all");
}

document.querySelectorAll("[data-kamikochi-view]").forEach(button => {
  button.addEventListener("click", () => focusKamikochi(button.dataset.kamikochiView));
});
startKamikochiMap();

const dayTabs = [...document.querySelectorAll(".day-bar [data-day]")];
const dayPanels = [...document.querySelectorAll("[data-day-panel]")];
function activateDay(day, scroll = true) {
  const panel = dayPanels.find(item => item.dataset.dayPanel === day);
  if (!panel) return;
  dayTabs.forEach(tab => {
    const selected = tab.dataset.day === day;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected) tab.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
  });
  dayPanels.forEach(item => { item.hidden = item !== panel; });
  if (scroll) {
    history.replaceState(null, "", `#${panel.id}`);
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
dayTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateDay(tab.dataset.day));
  tab.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? dayTabs.length - 1
      : (index + (event.key === "ArrowRight" ? 1 : -1) + dayTabs.length) % dayTabs.length;
    activateDay(dayTabs[next].dataset.day);
    dayTabs[next].focus();
  });
});
const initialPanel = dayPanels.find(item => `#${item.id}` === location.hash);
if (initialPanel) activateDay(initialPanel.dataset.dayPanel, false);

document.querySelectorAll("[data-check]").forEach(box => {
  const key = `jp-trip-discussion-${box.dataset.check}`;
  try { box.checked = localStorage.getItem(key) === "true"; } catch (_) { /* local storage may be unavailable */ }
  box.addEventListener("change", () => {
    try { localStorage.setItem(key, String(box.checked)); } catch (_) { /* checklist remains usable this visit */ }
  });
});
