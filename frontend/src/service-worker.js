self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("go-docs-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/src/icons/icon-192x192.png",
        "/src/icons/icon-512x512.png",
        // Outros arquivos estáticos que você deseja armazenar no cache
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});