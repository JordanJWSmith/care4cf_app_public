var webPush = require('web-push');

module.exports = async function(subscription, payload) {

/** 
* Brief description of the function here.
* @summary Send a web push notification to a given subscription
* @param {object} subscription - An object containing details of the user's subscription as retrieved by web-push
* @param {string} payload - The content of the notification
* @return {object} An object containing the results of the web-push
*/
    
    var push = webPush.sendNotification(subscription, payload)
    .then(function(results){
        return results;
    })
    .catch(function(error) {
        return error;
    })
    return push;
}