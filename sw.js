// Nome do cache (mude a versão para forçar atualização)
const CACHE_NAME = "praisebook-v3"; // Versão atualizada para forçar a nova instalação

// Arquivos para cache
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./logo.png"
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

// Busca no cache primeiro, se não tenta a rede.
// Se a rede falhar, retorna o index.html do cache para continuar a navegação.
self.addEventListener("fetch", (event) => {
  if (event.request.mode === 'navigate') { // Captura a navegação principal (recarregar página)
    event.respondWith(
      fetch(event.request).catch(() => caches.match("index.html"))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
