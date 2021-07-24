
var readData = require('./readData');

module.exports = async function(cookieToken) {

    if ((!cookieToken) || (typeof cookieToken !== "string")) {
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
        var checkLogin = "SELECT userID FROM users WHERE msalToken = ?";
        var data = [cookieToken];
        var results = await readData(checkLogin, data);

        // console.log('query results: ', results);
        // console.log('query length: ', results.length);
        // console.log(results.length == 1);

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