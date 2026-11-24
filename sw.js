/**
 * CLINTON RESTAURANT — Progressive Web App Service Worker
 * Provides offline caching, network-first strategy, and seamless app installation.
 */

const CACHE_NAME = 'clinton-prive-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './about.html',
  './services.html',
  './contact.html',
  './manifest.json',
  './assets/css/style.css',
  './assets/css/components.css',
  './assets/css/pages.css',
  './assets/css/webapp.css',
  './assets/js/main.js',
  './assets/js/slider.js',
  './assets/js/menu.js',
  './assets/js/reservation.js',
  './assets/js/app-state.js',
  './assets/js/webapp.js',
  './assets/images/logo-crest.svg',
  './assets/images/signature.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Cache external or internal successful responses
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Fallback to cache if offline
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
