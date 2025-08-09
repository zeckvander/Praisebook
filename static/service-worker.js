const CACHE_NAME = "songbook-cache-v1";
const urlsToCache = [
  "/",
  "/offline",
  "/static/style.css",
  "/static/app.js",
  "/static/logo.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then(resp => {
      return resp || caches.match("/offline");
    }))
  );
});
const CACHE_NAME = "songbook-v1";
const URLS_TO_CACHE = [
    "/",
    "/offline",
    "/static/manifest.json",
    "/static/service-worker.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Cache aberto");
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request)
                .then(response => response || caches.match("/offline"));
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );
});
