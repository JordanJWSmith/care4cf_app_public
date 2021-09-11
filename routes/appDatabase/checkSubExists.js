var readData = require('./readData');
var crypto = require('crypto');

module.exports = async function(subscription) {
/** 
* @summary Check to see if a given subscription is already saved in the database
* @param {string} subscription - A stringified JSON object containing  the user's subscription data
* @return {Boolean} True if the given subscription exists, false otherwise
*/
    
    var sub = JSON.stringify(subscription.subscription);

    var hash = crypto.createHash('md5').update(sub).digest("hex"); 

    var checkSub = "SELECT hashSubscription FROM subscriptions WHERE hashSubscription = ?";
    var checkSubValue = [hash];
    var checkSubResult = await readData(checkSub, checkSubValue)

    return {
        subExists: (checkSubResult.length > 0)
    }
    
}