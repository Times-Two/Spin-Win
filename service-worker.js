const CACHE_NAME = "spin-win-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/service-worker.js",
];

// On install, cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// On fetch, respond with cached or fetch from network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// On activate, clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    })
  );
});
