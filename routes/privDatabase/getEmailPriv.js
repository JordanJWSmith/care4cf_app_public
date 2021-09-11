var readPrivData = require('./readPrivData');

module.exports = async function(userID) {

/** 
* Brief description of the function here.
* @summary Retrieve the email address associated with a given user's userID
* @param {number} userID - The ID of the user to retrieve the associated email address
* @return {object} An object containing a Boolean to describe whether the user exists, and if True, the associated email
*/
    

    if ( (typeof userID !== "number")) {
        return {
            logIn: false 
        }          
    } else {

        var getEmail =  "SELECT email FROM users WHERE userID = ?";
        var data = [userID];
        var results = await readPrivData(getEmail, data);

        if (results.length > 0) {
            return { 
                logIn: true,
                email: results 
             }
        } else {
            return {
                logIn: false 
            } 
        }
    }
    
}