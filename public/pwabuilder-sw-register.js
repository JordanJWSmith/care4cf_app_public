// This is the service worker with the Cache-first network

// Add this below content to your HTML page inside a <script type="module"></script> tag, or add the js file to your page at the very top to register service worker
// If you get an error about not being able to import, double check that you have type="module" on your <script /> tag

/*
 This code uses the pwa-update web component https://github.com/pwa-builder/pwa-update to register your service worker,
 tell the user when there is an update available and let the user know when your PWA is ready to use offline.
*/

import 'https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate';


function getCook(cookiename) {
    // Get name followed by anything except a semicolon
    var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

const el = document.createElement('pwa-update');
document.body.appendChild(el);



// Ask the user for permission to send push notifications.

navigator.serviceWorker.ready
    .then(function (registration) {

        // Check if the user has an existing subscription
            return registration.pushManager.getSubscription()
            .then(async function (subscription) {
                
                if (subscription) {                
                    if (navigator.onLine) {
                        var subExistResponse = await fetch('/checkSubscriptionAPI', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({subscription})
                        })
                    var subExistContent = await subExistResponse.json();
                    
                    if ((getCook('accessToken')) && (!subExistContent.subExists)) {
                        var accessToken = getCook('accessToken');
                        var saveSubResponse = await fetch('/saveSubscriptionAPI', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                           
                            body: JSON.stringify({
                                subscription: JSON.stringify(subscription),
                                token: accessToken
                            })
                        })
                        var saveSubContent = await saveSubResponse.json();
                    } else {
                        console.log('subscription already saved');
                    }

                    }

                    return subscription;
                }

                // no subscription registered - register it

                const response = await fetch('./vapidPublicKey');
                const vapidPublicKey = await response.text();      
                
                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
                });
            })
            
    })
    .catch(err => console.log('notification registration error: ', err));

    

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




