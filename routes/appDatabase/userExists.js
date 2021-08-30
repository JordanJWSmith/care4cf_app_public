var readData = require('./readData');

module.exports = async function(userID) {

/** 
* @summary Check to see if a given user exists in the database
* @param {number} userID - The ID of the user to check
* @return {Boolean} True if the user exists, false otherwise
*/
    

    if ( (typeof userID !== "number")) {
        return {
            logIn: false 
        }          
    } else {

        // var checkLogin = 'SELECT * FROM users WHERE email = "' + email + '"';
        var checkLogin =  "SELECT userID FROM users WHERE userID = ?";
        var data = [userID];
        var results = await readData(checkLogin, data);
        // console.log('userExists results:', results);
        // console.log('userExists check: ', results.length > 0);

        return { 
           logIn: (results.length > 0),
        //    fName: results[0].fName 
        }
    }
    
}