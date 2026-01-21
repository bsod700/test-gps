const CACHE_NAME = 'lehakshiva-v2';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // מאפשר לאפליקציה לעבוד מהר יותר על ידי טעינה מהרשת/מטמון
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});