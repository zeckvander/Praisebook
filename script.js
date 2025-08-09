// script.js

// Verifica se o navegador suporta Service Workers
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
            .then(reg => {
                console.log("✅ Service Worker registrado com sucesso:", reg.scope);
            })
            .catch(err => {
                console.error("❌ Falha ao registrar o Service Worker:", err);
            });
    });
}

// Detecta se o usuário está offline
window.addEventListener("offline", () => {
    console.warn("⚠ Você está offline.");
});

// Detecta se o usuário voltou a ficar online
window.addEventListener("online", () => {
    console.log("✅ Conexão restaurada.");
});
