
var readData = require('./readData');

module.exports = async function(cookieToken) {

    if ((!cookieToken) || (typeof cookieToken !== "string")) {
        console.log('cookieToken not string')
        return {
            logIn: false
        }

    // } else if (typeof cookieToken !== "string")  {
    //     console.log('cookieToken error: ', cookieToken);
    //     // throw new TypeError('Cookie should be string.');
    //     return {
    //         logIn: false
    //     }
    } 
    else {
        // var checkLogin = 'SELECT * FROM users WHERE msalToken = "' + cookieToken + '"';
        // var checkLogin = "SELECT userID FROM users WHERE msalToken = ?";
        var checkLogin = "SELECT * FROM accesstokens WHERE accessToken = ?"
        var data = [cookieToken];
        var results = await readData(checkLogin, data);

        // console.log('login token results: ', results);
        // console.log('query length: ', results.length);
        // console.log(results.length == 1);

        if (results.length == 1) {
            var userID = results[0].userID;
            console.log('new userID: ', userID)
            return {
                logIn: true,
                userID: results[0].userID
            }
        } else {
            console.log('results not 1');
            console.log('loginResult: ', results);
            return {
                logIn: false
            }
        }
    }
}