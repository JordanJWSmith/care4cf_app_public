const login = require('./login');
var readData = require('./readData');
var crypto = require('crypto');

module.exports = async function(subscription) {

/** 
* Brief description of the function here.
* @summary Takes a subscription object and stores it in the database
* @param {string} subscription - A stringified JSON object containing details of a user's subscription and the current user's accessToken
* @return {object} An object containing results of the database query
*/
    
    console.log('received subscription to save: ', subscription);
    var subObject = subscription.subscription;
    var token = subscription.token;

    var hash = crypto.createHash('md5').update(subObject).digest("hex"); 
    console.log('save hash: ', hash);
    

    var loginDetails = await login(token);
    if (loginDetails.logIn) {
        var userID = loginDetails.userID;

        var saveSub = "INSERT INTO subscriptions VALUES (?, ?, ?)";
        var saveSubValues = [hash, userID, subObject];

        console.log('saving subscription');
        var results = await readData(saveSub, saveSubValues)
        .then(function(results) {
            return results;
        })

        return results

    } else {
        return false
    }

}
