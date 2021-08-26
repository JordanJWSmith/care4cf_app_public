var readData = require('./readData');
var crypto = require('crypto');

module.exports = async function(subscription) {

    // console.log('received subscription: ', subscription);

    var sub = JSON.stringify(subscription.subscription);
    // console.log('received subscription: ', sub);

    var hash = crypto.createHash('md5').update(sub).digest("hex"); 
    // console.log('hash: ', hash);

    var checkSub = "SELECT hashSubscription FROM subscriptions WHERE hashSubscription = ?";
    var checkSubValue = [hash];
    var checkSubResult = await readData(checkSub, checkSubValue)

    return {
        subExists: (checkSubResult.length > 0)
    }
    
}