// // This is the service worker with the Cache-first network

// const CACHE = "pwabuilder-precache";

// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// self.addEventListener("message", (event) => {
//   if (event.data && event.data.type === "SKIP_WAITING") {
//     self.skipWaiting();
//   }
// });

// workbox.routing.registerRoute(
//   new RegExp('/*'),
//   new workbox.strategies.CacheFirst({
//     cacheName: CACHE
//   })
// );


// // Appended push notification code

// // Respond to a server push with a user notification.
// self.addEventListener('push', function (event) {
//   if (Notification.permission === "granted") {
//       const notificationText = event.data.text();
//       const showNotification = self.registration.showNotification('Sample PWA', {
//           body: notificationText,
//           icon: 'images/icon512.png'
//       });
//       // Ensure the toast notification is displayed before exiting the function.
//       event.waitUntil(showNotification);
//   }
// });

// // Respond to the user selecting the toast notification.
// self.addEventListener('notificationclick', function (event) {
//   console.log('On notification click: ', event.notification.tag);
//   event.notification.close();
  
//   // This attempts to display the current notification if it is already open and then focuses on it.
//   event.waitUntil(clients.matchAll({
//       type: 'window'
//   }).then(function (clientList) {
//       for (var i = 0; i < clientList.length; i++) {
//           var client = clientList[i];
//           if (client.url == 'http://localhost:1337/' && 'focus' in client)
//               return client.focus();
//       }
//       if (clients.openWindow)
//           return clients.openWindow('/');
//   }));
// });


