const CACHE_NAME = 'note-ajsr-v4';

// Lista de archivos que se guardarán en el celular para que carguen rápido
const ASSETS = [
  './',
  './index.html',
  './mensajes.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icono-192.png',
  './icono-512.png'
];

// Instalación del Service Worker y guardado en caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache abierto, guardando archivos...');
      return cache.addAll(ASSETS);
    })
  );
});

// Estrategia para responder: primero busca en caché, si no hay, va a internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Limpiar cachés antiguos si decides actualizar la versión (v2, v3...)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
