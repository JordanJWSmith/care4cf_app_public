var readPrivData = require('./readPrivData');

module.exports = async function(email) {

/** 
* @summary Check to see if a user exists in the private database
* @param {string} email - The email address of the user to check
* @return {object} An object containing a Boolean to signify whether the user exists, and if true, the user's userID
*/
    

    if ( (typeof email !== "string")) {
        return {
            logIn: false 
        }          
    } else {

        // var checkLogin = 'SELECT * FROM users WHERE email = "' + email + '"';
        var checkLogin =  "SELECT userID FROM users WHERE email = ?";
        var data = [email];
        var results = await readPrivData(checkLogin, data);
        
        // console.log('userExistsPriv results:', results);
        // console.log('userExists check: ', results.length > 0);

        if (results.length > 0) {
            return { 
                logIn: (results.length > 0),
                userID: results[0].userID 
             }
        } else {
            return {
                logIn: false 
            } 
        }
    }
    
}