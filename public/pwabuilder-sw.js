// This is the service worker with the Cache-first network

// const { cache } = require("ejs");

const CACHE = "pwabuilder-precache";
// const CACHE = "pwabuilder-offline-page";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("message", (event) => {
    console.log('messageTest');
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// comment
// This caches all the pages?
self.addEventListener( "install", function( event ){
    event.waitUntil(
        caches.open( CACHE )
              .then(function( cache ){
                console.log('caching pages');
                  return cache.addAll([
                      // "/css/main.css",
                      // "/js/main.js",
                      // "/img/favicon.png",
                      // "/offline/"
                      "/calendar",
                      '/',
                      '/loginUser',
                      '/myRoutines',
                      '/newSchedule',
                      '/normalRoutine',
                      '/somethingDifferent',
                      // '/w/1',
                      // 'w/0?r=1',
                      // 'w/0',

                  ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log('Claiming control');
    return self.clients.claim();
  });

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.NetworkFirst({
    cacheName: CACHE
  })
);

// self.addEventListener("fetch", (event) => {
//     console.log('event: ', event);
// })



// This is the service worker with the combined offline experience (Offline page + Offline copy of pages)

// const CACHE = "pwabuilder-offline-page";

// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "offline.html";
const routineDescription = "javascripts/routineDescription.js";
const getCook = "javascripts/getCook.js";
// const logOut = "javascripts/logout.js";

// self.addEventListener("message", (event) => {
//   if (event.data && event.data.type === "SKIP_WAITING") {
//     self.skipWaiting();
//   }
// });

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
    .then(function(cache) {
      cache.add(offlineFallbackPage);
      cache.add(routineDescription);
      cache.add(getCook);
    })
      // .then((cache) => cache.add(offlineFallbackPage))
      // .then((cache) => cache.add(routineDescription))
  );
});

// if (workbox.navigationPreload.isSupported()) {
//   workbox.navigationPreload.enable();
// }

// workbox.routing.registerRoute(
//   new RegExp('/*'),
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: CACHE
//   })
// );

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      } 
    })());
  }
});


// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
// const offlineFallbackPage = "offline.html";

// workbox.routing.registerRoute(
//   new RegExp('/*'),
//   new workbox.strategies.NetworkFirst({
//     cacheName: CACHE
//   })
// );

// self.addEventListener("message", (event) => {
//   if (event.data && event.data.type === "SKIP_WAITING") {
//     self.skipWaiting();
//   }
// });

// self.addEventListener('install', async (event) => {
//   event.waitUntil(
//     caches.open(CACHE)
//       .then((cache) => cache.add(offlineFallbackPage))
//   );
// });

// if (workbox.navigationPreload.isSupported()) {
//   workbox.navigationPreload.enable();
// }

// self.addEventListener('fetch', (event) => {
//     console.log('event: ', event);
//   if (event.request.mode === 'navigate') {
//     event.respondWith((async () => {
//       try {
//         const preloadResp = await event.preloadResponse;

//         if (preloadResp) {
//           return preloadResp;
//         }

//         const networkResp = await fetch(event.request);
//         return networkResp;
//       } catch (error) {

//         const cache = await caches.open(CACHE);
//         const cachedResp = await cache.match(offlineFallbackPage);
//         return cachedResp;
//       }
//     })());
//   }
// });



// Appended push notification code

// Respond to a server push with a user notification.
self.addEventListener('push', function (event) {
  if (Notification.permission === "granted") {
      const notificationText = event.data.text();
      const showNotification = self.registration.showNotification('Sample PWA', {
          body: notificationText,
          icon: './images/icon512.png'
      });
      // Ensure the toast notification is displayed before exiting the function.
      event.waitUntil(showNotification);
  }
});

// Respond to the user selecting the toast notification.
self.addEventListener('notificationclick', function (event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();
  
  // This attempts to display the current notification if it is already open and then focuses on it.
  event.waitUntil(clients.matchAll({
      type: 'window'
  }).then(function (clientList) {
      for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == 'http://localhost:1337/' && 'focus' in client)
              return client.focus();
      }
      if (clients.openWindow)
          return clients.openWindow('/');
  }));
});


