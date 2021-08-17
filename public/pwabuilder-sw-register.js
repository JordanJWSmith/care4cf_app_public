// This is the service worker with the Cache-first network

// Add this below content to your HTML page inside a <script type="module"></script> tag, or add the js file to your page at the very top to register service worker
// If you get an error about not being able to import, double check that you have type="module" on your <script /> tag

/*
 This code uses the pwa-update web component https://github.com/pwa-builder/pwa-update to register your service worker,
 tell the user when there is an update available and let the user know when your PWA is ready to use offline.
*/

import 'https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate';
// const cron = require('node-cron');
// import * as saveSubscription from '../routes/appDatabase/saveSubscription';
// var saveSubscription = require('../routes/appDatabase/saveSubscription');
// import './javascripts/getCook.js';

function getCook(cookiename) {
    // Get name followed by anything except a semicolon
    var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

const el = document.createElement('pwa-update');
document.body.appendChild(el);

// function ab2str(buf) {
//     return String.fromCharCode.apply(null, new Uint8Array(buf));
//   }

// var testBuff = [4, 91, 154, 91, 178, 221, 177, 193, 93, 219, 233, 141, 254, 84, 239, 32, 179, 165, 138, 55, 253, 99, 52, 231, 85, 202, 155, 171, 138, 96, 81, 83, 242, 204, 225, 143, 164, 225, 104, 33, 46, 89, 201, 231, 167, 70, 247, 51, 210, 54, 120, 202, 197, 178, 158, 241, 95, 110, 8, 23, 104, 50, 9, 64, 173]

// var enc = new TextDecoder("utf-8");
// var arr = new Int8Array(testBuff);


// // Appended push notification code

// Ask the user for permission to send push notifications.
   

navigator.serviceWorker.ready
    .then(function (registration) {
        // Check if the user has an existing subscription
        return registration.pushManager.getSubscription()
            .then(async function (subscription) {
                if (subscription) {
                    console.log('subscription: ', subscription);
                    console.log('options: ', subscription.options.applicationServerKey);
                   
                    // console.log('getKey', subscription.toJSON());
                    // console.log('decode: ', enc.decode(arr));
                    // console.log(ab2str(testBuff));
                    
                    
                    // subscription.unsubscribe().then(function(successful) {
                    //     console.log('success:', successful)
                    //     // You've successfully unsubscribed
                    //   }).catch(function(e) {
                    //       console.log('failed: ', e)
                    //     // Unsubscription failed
                    //   })

                    // console.log('subscription: ', JSON.stringify(subscription));
                    // console.log(JSON.parse(document.cookie));
                    // console.log(getCook('accessToken'));

                    if ((getCook('accessToken')) && (!getCook('subscription'))) {
                        var accessToken = getCook('accessToken');
                        (async () => {
                            const rawResponse = await fetch('/saveSubscriptionAPI', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                            //   body: JSON.stringify({a: 1, b: 'Textual content'})
                                body: JSON.stringify({
                                    subscription: JSON.stringify(subscription),
                                    token: accessToken
                                })
                            });
                            const content = await rawResponse.text();
                          
                            console.log('content: ', content);
                          })()
                          .then(function() {
                              document.cookie = "subscription=true"
                              console.log('save sub cookie');
                          })
                    }

                    
                   

                    (async () => {
                        const rawResponse = await fetch('/sendNotification', {
                          method: 'POST',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                        //   body: JSON.stringify({a: 1, b: 'Textual content'})
                            body: JSON.stringify(subscription)
                        });
                        const content = await rawResponse.text();
                      
                        console.log('SendNotifcontent: ', content);
                      })()

                    // save subscription object to database
                    // saveSubscription(subscription);

                    // console.log('pushManager: ', registration.pushManager)
                    // subscription.showNotification('Hello World!');
                    // console.log('subscription: ', subscription);
                    // postData('./register', subscription);    
                    return subscription;
                }

                const response = await fetch('./vapidPublicKey');
                const vapidPublicKey = await response.text();      
                console.log('registgering  key: ', vapidPublicKey);  
                // var vapidPublicKey = 'BIe57AWCNKGIPXrdKOGrf68a3vv7krH9aWE4jCSbrcgktfLk02CDfXDJERxhaaa8t0kgni3HoFZz21BJlkRpa5c';
                // var vapidPublicKey = process.env.VAPID_PUBLIC_KEY

                
                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
                    // applicationServerKey: vapidPublicKey
                });
            })
            
    })
    

    function showNotification() {
          Notification.requestPermission(function(result) {
              console.log('request permission: ', result);
              if (result === 'granted') {
                  navigator.serviceWorker.ready
                  .then(async function(registration) {
                      console.log('registration:', registration);
                      var timeStamp = new Date()
                      // console.log(msToHMS(timeStamp.getTime()));
                      
                      await registration.showNotification('Atomated notification test' + timeStamp, {
                          body: 'Buzz! Buzz!',
                          // icon: '../images/touch/chrome-touch-icon-192x192.png',
                          vibrate: [200, 100, 200, 100, 200, 100, 200],
                          tag: 'vibration-sample'
                      })
                      .then(console.log('end of function'));
                  });
              }
          });
        }
    
    // added test
    // .then(function(subscription) {
    //     // Send the subscription details to the server using the Fetch API.
    //     fetch('./register', {
    //         method: 'post',
    //         headers: {
    //         'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //         subscription: subscription
    //         }),
    //     })
    //     fetch('./sendNotification', {
    //         method: 'post',
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             subscription: subscription,
    //             delay: 2,
    //             ttl: 0,
    //         })
    //     })
    // });

    
    async function postData(url, data) {
        // Default options are marked with *
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
        }

    

// Utility function for browser interoperability
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
        
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    
    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}




