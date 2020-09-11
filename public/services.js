const weathros = "weathros-1-0-0";
const assets = [
  "./",
  "./index.html",
  "./assets/css/main.css",
  "./assets/js/main.js",
  "./assets/img/icons/icon-72x72.png",
  "./assets/img/icons/icon-96x96.png",
  "./assets/img/icons/icon-128x128.png",
  "./assets/img/icons/icon-144x144.png",
  "./assets/img/icons/icon-152x152.png",
  "./assets/img/icons/icon-192x192.png",
  "./assets/img/icons/icon-384x384.png",
  "./assets/img/icons/icon-512x512.png",
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(weathros).then(cache => {
      return cache.addAll(assets);
    })
  )
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request);
      })
    )
  });