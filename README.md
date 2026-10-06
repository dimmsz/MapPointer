# MapPointer

Leaflet と OpenStreetMap を利用した、地図上の位置と緯度・経度を確認するためのシンプルなWebアプリです。

PCではマウスカーソルを地図上で動かすと、その位置の緯度・経度を表示します。スマートフォンなどのタッチ端末では、地図をタップするとタップした位置を地図の中心へ移動し、その位置の緯度・経度を表示します。

## Features

- OpenStreetMap を利用した地図表示
- Leaflet 1.9.4 による地図操作
- 名古屋市周辺を初期表示
- 地図の中心位置の緯度・経度を表示
- 地図をクリック／タップした位置を表示の中心に移動
- 緯度・経度は小数点以下6桁まで表示
- GitHub Pages による公開に対応
- APIキー不要で利用可能

## Demo

GitHub Pages にデプロイすると、以下のURLから利用できます。

https://dimmsz.github.io/MapPointer/

## Usage

### PC

1. 地図上の目的地点をクリックします。
2. クリックした地点が画面中央になります。
3. 画面上部に中央地点の緯度・経度が表示されます。

### スマートフォン・タブレット

1. 地図上の目的地点をタップします。
2. タップした地点が画面中央になります。
3. 画面上部に中央地点の緯度・経度が表示されます。

## Initial Location

現在の初期表示位置は名古屋市周辺です。

- Latitude: `35.1815`
- Longitude: `136.9066`
- Zoom: `12`

初期位置を変更する場合は `app.js` の `center` と `zoom` を変更してください。

```javascript
const map = L.map("map", {
  center: [35.1815, 136.9066],
  zoom: 12,
  zoomControl: true
});
```

## Technology

- HTML
- CSS
- JavaScript
- Leaflet 1.9.4
- OpenStreetMap

Leaflet はCDNから読み込み、地図タイルには OpenStreetMap の標準タイルを使用しています。

## Project Structure

```text
MapPointer/
├── index.html
├── app.js
├── style.css
└── .github/
    └── workflows/
        └── pages.yml
```

### index.html

Webページの基本構造とLeafletの読み込みを定義しています。

### app.js

地図の初期化、OpenStreetMapタイルの追加、地図の中心座標の表示、座標コピーを担当します。

### style.css

ツールバー、座標表示、地図領域、レスポンシブ表示を定義しています。

### .github/workflows/pages.yml

GitHub Actions を利用して GitHub Pages へ自動デプロイします。`main` ブランチへのpushを契機にデプロイします。

## Local Development

特別なビルド環境は必要ありません。リポジトリを取得して `index.html` をWebブラウザで開くだけでも動作します。

```bash
git clone https://github.com/dimmsz/MapPointer.git
cd MapPointer
```

開発時には、VS CodeなどのローカルWebサーバーを利用する方法もあります。

## GitHub Pages

GitHub Pages の設定で GitHub Actions を利用するように設定してください。このリポジトリには `.github/workflows/pages.yml` が用意されているため、`main` ブランチへのpush後に自動デプロイされます。

## Attribution

### Leaflet

https://leafletjs.com/

### OpenStreetMap

地図データ © OpenStreetMap contributors

https://www.openstreetmap.org/copyright

OpenStreetMap の利用にあたっては、公式の利用ポリシーを確認してください。

## License

このリポジトリのライセンスについては、GitHubリポジトリのライセンス設定を確認してください。