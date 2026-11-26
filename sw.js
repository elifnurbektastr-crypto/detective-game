// Çevrimdışı oynayabilmek için uygulama dosyalarını önbellekte tutar.
// Dosyalar değişince SURUM'u artırın.
var SURUM = "sorgu-odasi-v5";
var DOSYALAR = [
  "./", "index.html", "print.html", "manifest.webmanifest",
  "css/style.css", "css/print.css",
  "js/engine.js", "js/portrait.js", "js/docs.js", "js/sound.js", "js/daily.js", "js/ui.js", "js/print.js",
  "cases/son-hasat.js", "cases/gece-treni.js",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(SURUM).then(function (c) { return c.addAll(DOSYALAR); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== SURUM; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

// Önce ağ, olmazsa önbellek: güncellemeler hemen gelir, internet yokken de açılır.
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request, { cache: "no-cache" }).then(function (res) {
      if (res.ok && new URL(e.request.url).origin === location.origin) {
        var copy = res.clone();
        caches.open(SURUM).then(function (c) { c.put(e.request, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || caches.match("index.html"); });
    })
  );
});
