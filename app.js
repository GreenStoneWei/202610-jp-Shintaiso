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
