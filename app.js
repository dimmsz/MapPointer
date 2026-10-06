const coordEl = document.getElementById("coords");
const copyCoordsEl = document.getElementById("copyCoords");

function formatCoords(latlng) {
  return latlng.lat.toFixed(6) + ", " + latlng.lng.toFixed(6);
}

function showCoords(latlng) {
  if (!latlng) {
    coordEl.textContent = "緯度: —　経度: —";
    return;
  }
  coordEl.textContent =
    "緯度: " + latlng.lat.toFixed(6) +
    "　経度: " + latlng.lng.toFixed(6);
}

function updateCenterCoords() {
  showCoords(map.getCenter());
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

// 地図の中心（画面中央）の座標を常に表示する。
map.on("move", updateCenterCoords);
map.whenReady(updateCenterCoords);

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
