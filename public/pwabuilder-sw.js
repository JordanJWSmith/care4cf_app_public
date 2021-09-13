// This is the service worker


const CACHE = "pwabuilder-precache";


importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
 
// This caches all the pages
self.addEventListener( "install", function( event ){
    event.waitUntil(
        caches.open( CACHE )
              .then(function( cache ){
                console.log('caching pages');
                  return cache.addAll([
                      "./calendar",
                      './',
                      './loginUser',
                      './myRoutines',
                      './newSchedule',
                      './normalRoutine',
                      './somethingDifferent',
                      './images/adjunctsIcon.png',
                      './images/Calendar_Icon.png',
                      './images/descriptionIcon.png',
                      './images/durationIcon.png',
                      './images/frequencyIcon.png',
                      './images/hamburgerDots.png',
                      './images/icon512.png',
                      './images/favicon.ico',
                      './images/Sample_User_Icon.png',
                      './images/techniquesIcon.png',
                      './images/circleIcon.png',
                      './images/myRoutinesIcon.png',
                      './images/tickIcon.png',
                      './images/plusIcon.png',
                      './images/backArrowIcon.png',
                      './images/recordIcon.png',
                      './images/streakIcon.png',
                      './images/msLogo.png',
                      './images/uclGOSLogo.png',
                      './images/uclLogo.svg',
                  ]);
        })
    );
});



self.addEventListener('activate', function(event) {
    console.log('Claiming control');
    return self.clients.claim();
  });

workbox.routing.registerRoute(
  // new RegExp('/calendar'),
  '/calendar',
  // new workbox.strategies.NetworkFirst({
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
    networkTimeoutSeconds: 8
  })
);

workbox.routing.registerRoute(
  // new RegExp('/'),
  '/',
  new workbox.strategies.NetworkFirst({
    cacheName: CACHE,
    networkTimeoutSeconds: 8
  })
);

workbox.routing.registerRoute(
  // new RegExp('/loginTest'),
  '/loginTest',
  new workbox.strategies.NetworkFirst({
    cacheName: CACHE,
    networkTimeoutSeconds: 8
  })
);

workbox.routing.registerRoute(
  // new RegExp('/loginUser'),
  '/loginUser',
  new workbox.strategies.NetworkFirst({
    cacheName: CACHE,
    networkTimeoutSeconds: 8
  })
); 

workbox.routing.registerRoute(
  // new RegExp('/myRoutines'),
  '/myRoutines',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
    networkTimeoutSeconds: 8
  })
);

workbox.routing.registerRoute(
  // new RegExp('/newSchedule'),
  '/newSchedule',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
    networkTimeoutSeconds: 8
  })
);

workbox.routing.registerRoute(
  // new RegExp('/normalRoutine'),
  '/normalRoutine',
  new workbox.strategies.NetworkFirst({
    cacheName: CACHE,
    networkTimeoutSeconds: 8
  })
);
 
workbox.routing.registerRoute(
  // new RegExp('/somethingDifferent'),
  '/somethingDifferent',
  new workbox.strategies.NetworkFirst({
    cacheName: CACHE,
    networkTimeoutSeconds: 8
  })
);



workbox.routing.registerRoute(
  new RegExp('/images/*'),
  // new workbox.strategies.StaleWhileRevalidate({
    new workbox.strategies.CacheFirst({
    cacheName: CACHE,
  })
);

workbox.routing.registerRoute(
  new RegExp('/javascripts/*'),
  // new workbox.strategies.StaleWhileRevalidate({
    new workbox.strategies.CacheFirst({
    cacheName: CACHE
  })
);

workbox.routing.registerRoute(
  new RegExp('/favicon.ico'),
  // new workbox.strategies.StaleWhileRevalidate({
    new workbox.strategies.CacheFirst({
    cacheName: CACHE
  })
);

workbox.routing.registerRoute(
  new RegExp('/stylesheets/*'),
  // new workbox.strategies.StaleWhileRevalidate({
    new workbox.strategies.CacheFirst({
    cacheName: CACHE
  })
);

workbox.routing.registerRoute(
  new RegExp('/manifest.json'),
  // new workbox.strategies.StaleWhileRevalidate({
    new workbox.strategies.CacheFirst({
    cacheName: CACHE
  })
);

workbox.routing.registerRoute(
  new RegExp('/jquery/jquery-3.6.0.min.js'),
  // new workbox.strategies.StaleWhileRevalidate({
    new workbox.strategies.CacheFirst({
    cacheName: CACHE
  })
);



const offlineFallbackPage = "offline.html";
const routineDescription = "javascripts/routineDescription.js";
const getCook = "javascripts/getCook.js";
const dateToDisplay = "javascripts/dateToDisplay.js";
const abbreviate = "javascripts/abbreviate.js";
const checkLocal = "javascripts/checkLocal.js";
const generateCalendar = "javascripts/generateCalendar.js";
const getDateList = "javascripts/getDateList.js";
const dateDifference = "javascripts/dateDifference.js";
const logout = "javascripts/logout.js";
const jquery = "jquery/jquery-3.6.0.min.js";


self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
    .then(function(cache) {
      cache.add(offlineFallbackPage);
      cache.add(routineDescription);
      cache.add(getCook);
      cache.add(dateToDisplay);
      cache.add(abbreviate);
      cache.add(checkLocal);
      cache.add(generateCalendar);
      cache.add(getDateList);
      cache.add(dateDifference);
      cache.add(jquery);
      cache.add(logout);
    }) 

  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}



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



// Appended push notification code

// Respond to a server push with a user notification.
self.addEventListener('push', function (event) {
  console.log('PUSH EVENT TRIGGERED');
  if (Notification.permission === "granted") {
      const notificationText = event.data.text();
      const showNotification = self.registration.showNotification('CARE4CF', {
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


