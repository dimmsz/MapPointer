const coordEl = document.getElementById("coords");
const copyCoordsEl = document.getElementById("copyCoords");

function formatCoords(latlng) {
  return latlng.lat.toFixed(6) + ", " + latlng.lng.toFixed(6);
}

function showCenterCoords() {
  const center = map.getCenter();
  coordEl.textContent =
    "緯度: " + center.lat.toFixed(6) +
    "　経度: " + center.lng.toFixed(6);
}

const map = L.map("map", {
  center: [35.1815, 136.9066],
  zoom: 12,
  zoomControl: true
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 地図をクリックした場所を表示の中心にする。
map.on("click", (event) => {
  map.setView(event.latlng, map.getZoom(), { animate: false });
  showCenterCoords();
});

// 地図をドラッグ・ズームした場合も、表示の中心座標を更新する。
map.on("moveend", showCenterCoords);
map.whenReady(showCenterCoords);

// 座標コピー
copyCoordsEl.addEventListener("click", async () => {
  const text = formatCoords(map.getCenter());

  try {
    await navigator.clipboard.writeText(text);
    copyCoordsEl.textContent = "コピーしました";
    setTimeout(() => {
      copyCoordsEl.textContent = "座標をコピー";
    }, 1200);
  } catch {
    // Clipboard APIが使えない環境向けのフォールバック
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();

    copyCoordsEl.textContent = "コピーしました";
    setTimeout(() => {
      copyCoordsEl.textContent = "座標をコピー";
    }, 1200);
  }
});
