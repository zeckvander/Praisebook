// Nome do cache (mude a versão para forçar atualização)
const CACHE_NAME = "praisebook-v2";

// Arquivos para cache
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./logo.png",
  "./offline.html"
  // Adicione CSS, JS e imagens aqui também
];

// Instala e guarda no cache
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Instalando...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Arquivos armazenados no cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa e remove caches antigos
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Ativando...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Busca no cache primeiro, senão tenta buscar da rede
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => caches.match("./offline.html"))
      );
    })
  );
});
