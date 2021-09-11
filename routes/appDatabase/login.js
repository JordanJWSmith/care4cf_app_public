
var readData = require('./readData');

module.exports = async function(cookieToken) {

/** 
* Brief description of the function here.
* @summary Checks the user's accessToken against the saved tokens for that user
* @param {string} cookieToken - An accessToken JWT generated from pwaAuth Microsoft login and saved as a cookie
* @return {object} An object containing a Boolean login status, and if true, the associated userID
*/
    

    if ((!cookieToken) || (typeof cookieToken !== "string")) {
        return {
            logIn: false
        }
    } 

    else {

        var checkLogin = "SELECT * FROM accesstokens WHERE accessToken = ?"
        var data = [cookieToken];
        var results = await readData(checkLogin, data);

        if (results.length == 1) {
            return {
                logIn: true,
                userID: results[0].userID
            }
        } else {
            return {
                logIn: false
            }
        }
    }
}