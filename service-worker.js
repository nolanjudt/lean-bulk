// Service Worker for Recomp Plan PWA
// Bump this version string whenever you redeploy to force a cache refresh.
const CACHE_NAME = 'recomp-plan-cache-v34';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

// Install: pre-cache the core app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate: clean up caches from older versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: network-first so edits show up, falling back to cache when offline
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // Page loads skip the HTTP cache entirely so a redeploy is picked up on
  // the next launch; other files use the normal network-first path.
  const req = event.request.mode === 'navigate'
    ? new Request(event.request.url, { cache: 'no-store', credentials: 'same-origin' })
    : event.request;
  event.respondWith(
    fetch(req)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((r) => r || caches.match('./index.html')))
  );
});
