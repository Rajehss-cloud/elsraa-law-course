self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('al-israa-v1').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './courses.html',
        './course-details.html',
        './login.html',
        './register.html',
        './forgot-password.html',
        './dashboard.html',
        './community.html',
        './admin.html',
        './css/style.css',
        './js/config.js',
        './js/script.js',
        './manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
