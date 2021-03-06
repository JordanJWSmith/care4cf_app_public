const getEmailPriv = require('../privDatabase/getEmailPriv');
const readData = require('./readData');


module.exports = async function(userID) {
/** 
* @summary Check to see if the current user is listed as an Admin
* @param {number} userID - the ID of the current user, used to retrieve the associated email address
* @return {Boolean} True if the user is Admin, false otherwise
*/
    

    if (typeof userID !== "number") {
        return false   
    } else {

        var emailResult = await getEmailPriv(userID)

        if (emailResult.logIn) {
            var email = emailResult.email[0].email;

            var getAdmin =  "SELECT adminEmail FROM admins WHERE adminEmail = ?";
            var data = [email];
            var results = await readData(getAdmin, data);

            return (results.length > 0) 
        } else {
            return false
        }
        
    }
    
}