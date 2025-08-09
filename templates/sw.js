const CACHE_NAME = "songbook-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./logo.png"
  // Se tiver CSS ou JS externos, adicione aqui também
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna cache ou faz fetch da rede
      return response || fetch(event.request);
    })
  );
});
