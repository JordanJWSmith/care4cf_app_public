var readData = require('./readData');

module.exports = async function(cookieToken, userID) {

    if ((typeof cookieToken !== "string") || (typeof userID !== "number")) {
        console.log('incorrect types when updating token');
        return false          
    } else {

        // var updateToken = 'UPDATE users SET msalToken = "' + cookieToken + '" WHERE email = "' + email + '"';
        var updateToken = "UPDATE users SET msalToken = ? WHERE userID = ?";
        var data = [cookieToken, userID];
        var results = await readData(updateToken, data);
        console.log('updateToken results:', results);

        return true
        // {
        //    logIn: (results.length > 0),
        //    fName: results[0].fName 
        // }
        
    }
    
}