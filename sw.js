const CACHE_NAME = "deluxtable-offline";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.webmanifest"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith("deluxtable-") && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const requestURL = new URL(event.request.url);
  const isSameOrigin = requestURL.origin === self.location.origin;
  const isNavigation = event.request.mode === "navigate";

  if (!isSameOrigin) return;

  // Pages: prefer the newest version when online, but fall back to the
  // cached app when offline.
  if (isNavigation) {
    event.respondWith(
      fetch(event.request, { cache: "no-cache" })
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put("./index.html", copy));
          }
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Static files: cache first for reliable offline loading, then refresh
  // the cached copy in the background when a newer file is available.
  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkUpdate = fetch(event.request, { cache: "no-cache" })
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkUpdate;
    })
  );
});
