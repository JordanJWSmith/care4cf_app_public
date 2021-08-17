var readData = require('./readData');
var crypto = require('crypto');

module.exports = async function(cookieToken, userID) {

    if ((typeof cookieToken !== "string") || (typeof userID !== "number")) {
        console.log('incorrect types when updating token');
        return false          
    } else {

        var hash = crypto.createHash('md5').update(cookieToken).digest("hex");


        // var updateToken = 'UPDATE users SET msalToken = "' + cookieToken + '" WHERE email = "' + email + '"';
        // var updateToken = "UPDATE users SET msalToken = ? WHERE userID = ?";
        // var data = [cookieToken, userID];
        // var results = await readData(updateToken, data);
        // console.log('updateToken results:', results);

        var updateTokenTable = "INSERT IGNORE INTO accesstokens VALUES (?, ?, ?)";
        var updateTokenTableValues = [hash, userID, cookieToken];
        var updateResults = await readData(updateTokenTable, updateTokenTableValues)
        .then(function(results) {
            // console.log('updated token: ', results)
        })

        return true
        // {
        //    logIn: (results.length > 0),
        //    fName: results[0].fName 
        // }
        
    }
    
}