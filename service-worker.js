const CACHE_NAME = "Praisebook-v2";
const URLS_TO_CACHE = [
  "/offline.html",
  "/manifest.json",
  "/logo.png",
  "/style.css",
  "/script.js"
];

// Instalação - cacheia apenas arquivos essenciais, não o index.html
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Cache aberto");
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

// Fetch - tenta rede primeiro, depois cache, e offline.html se não achar
self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                return response;
            })
            .catch(() => {
                return caches.match(event.request)
                    .then(resp => resp || caches.match("/offline.html"));
            })
    );
});

// Ativação - limpa caches antigos
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