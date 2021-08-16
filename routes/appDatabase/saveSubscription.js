const login = require('./login');
var readData = require('./readData');

module.exports = async function(subscription) {
    var subObject = JSON.stringify(subscription.subscription);
    var token = subscription.token;

    // console.log('aaccess token: ', token);
    

    var loginDetails = await login(token);
    // console.log('loginDetails: ', loginDetails.logIn);
    if (loginDetails.logIn) {
        var userID = loginDetails.userID;
        var saveSub = "UPDATE users SET pushNotificationKey = ? WHERE userID = ?";
        var saveSubValues = [subObject, userID];
        console.log('saving subscription');
        var results = await readData(saveSub, saveSubValues)
        .then(function(results) {
            return results;
        })
        return results
    } else {
        return false
    }


    // console.log('saveSubscription: ', subObject);
}
