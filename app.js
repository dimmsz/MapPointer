const coordEl = document.getElementById("coords");
const setupEl = document.getElementById("setup");
const keyInput = document.getElementById("apiKey");
const saveKey = document.getElementById("saveKey");

function showCoords(latLng) {
  if (!latLng) {
    coordEl.textContent = "緯度: —　経度: —";
    return;
  }
  coordEl.textContent =
    "緯度: " + latLng.lat().toFixed(6) +
    "　経度: " + latLng.lng().toFixed(6);
}

function initMap() {
  const center = { lat: 35.1815, lng: 136.9066 }; // 名古屋駅付近
  const map = new google.maps.Map(document.getElementById("map"), {
    center,
    zoom: 12,
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true,
  });

  map.addListener("mousemove", (event) => showCoords(event.latLng));
  map.addListener("mouseout", () => showCoords(null));

  map.addListener("click", (event) => {
    if (event.latLng) {
      showCoords(event.latLng);
    }
  });
}

function loadGoogleMaps(apiKey) {
  const script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=" +
    encodeURIComponent(apiKey) +
    "&callback=initMap&loading=async";
  script.async = true;
  script.defer = true;
  script.onerror = () => {
    alert("Google Maps APIの読み込みに失敗しました。APIキーと許可設定を確認してください。");
  };
  document.head.appendChild(script);
}

function start() {
  const apiKey = localStorage.getItem("mappointer-google-maps-api-key");
  if (apiKey) {
    setupEl.classList.add("hidden");
    loadGoogleMaps(apiKey);
  } else {
    setupEl.classList.remove("hidden");
  }
}

saveKey.addEventListener("click", () => {
  const key = keyInput.value.trim();
  if (!key) return;
  localStorage.setItem("mappointer-google-maps-api-key", key);
  location.reload();
});

keyInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") saveKey.click();
});

window.initMap = initMap;
start();
