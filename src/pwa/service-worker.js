const cacheName = 'ROCO_v1';
const toCache = [
    '/',
    // '../html/*.html',
    // '../js/*.js',
    // '../css/*.css',
    // '../lib/*',
    // '../wasm/*',
    '../html/index.html',
    '../html/sensors.html',
    '../html/aruco.html',
    '../html/apriltag.html',
    '../html/mqtt_comm.html',
    '../html/slider_control.html',
    '../js/sensors.js',
    '../js/aruco.js',
    '../js/mqtt_comm.js',
    '../js/slider_control.js',
    '../js/apriltag.js',
    '../css/bootstrap.min.css',
    // './js/aruco.js'
    './app_config.js',
    './pwa.webmanifest',
    './pwa.js',
    
    // './status.js',
    // './status.js',
    // './status.js',
    // './status.js',
    './status.js'
];


// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
      try {
          const cache = await caches.open(cacheName);
          console.log('[Service Worker] Caching Started: app shell and content');
          await cache.addAll(toCache);
          console.log('[Service Worker] Caching Finished: app shell and content');
      } catch (err) {
          console.log('[Service Worker] Caching failed. Error: ', err);
      }

  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});



self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (key === cacheName) { return; }
      return caches.delete(key);
    }))
  }));
});
