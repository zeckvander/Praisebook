// Nome do cache (mude a versão para forçar atualização)
const CACHE_NAME = "praisebook-v5";

// Arquivos para cache
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./logo.png",
  // Adicione aqui todos os arquivos que seu site usa, incluindo CSS e JS
  // Exemplo:
  // "./style.css",
  // "./script.js",
  // Se você tiver um arquivo JSON com as músicas, adicione-o aqui
  // "https://seusite.com/musicas.json"
];

// O restante do código do Service Worker permanece o mesmo...

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
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).catch(() => caches.match("index.html"));
    })
  );
});
