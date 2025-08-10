const CACHE_NAME = "Praisebook-v2";
const URLS_TO_CACHE = [
  "/offline.html",
  "/manifest.json",
  "/logo.png",
  "/style.css",
  "/script.js"
];

// Instala e armazena no cache os arquivos essenciais
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Cache aberto");
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Intercepta requisições
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // Se falhar, tenta no cache
      return caches.match(event.request)
        .then(response => {
          // Se não achar, mostra offline.html
          if (response) {
            return response;
          } else if (event.request.mode === "navigate") {
            return caches.match("/offline.html");
          }
        });
    })
  );
});

// Remove caches antigos
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