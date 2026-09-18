const coordEl = document.getElementById("coords");

function showCoords(latlng) {
  if (!latlng) {
    coordEl.textContent = "緯度: —　経度: —";
    return;
  }
  coordEl.textContent =
    "緯度: " + latlng.lat.toFixed(6) +
    "　経度: " + latlng.lng.toFixed(6);
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

// PCではマウス位置の座標を表示する。
map.on("mousemove", (event) => showCoords(event.latlng));
map.on("mouseout", () => showCoords(null));

// スマホ・タッチ端末では、タップした場所を地図の中心に移動し、
// その位置の緯度・経度を表示する。
map.on("click", (event) => {
  if (L.Browser.touch) {
    map.setView(event.latlng, map.getZoom(), { animate: false });
  }
  showCoords(event.latlng);
});
