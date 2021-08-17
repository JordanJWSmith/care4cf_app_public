var webPush = require('web-push');

module.exports = async function(subscription, payload) {
    // console.log('webpush details: ', webPush.generateRequestDetails(subscription, payload));
    var push = webPush.sendNotification(subscription, payload)
    .then(function(results){
        return results;
    })
    .catch(function(error) {
        return error;
    })
    return push;
}