const CACHE_NAME = 'lehakshiva-cache-v3';
const ASSETS = [
  'index.html',
  'manifest.json',
  'https://cdn-icons-png.flaticon.com/512/684/684908.png'
];

// התקנה ושמירה במטמון
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// מחיקת מטמון ישן כשמעדכנים גרסה
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    })
  );
});

// אסטרטגיית "Network First": מנסה להביא מהאינטרנט, אם אין - מביא מהמטמון
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});