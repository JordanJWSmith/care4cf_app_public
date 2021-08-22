const getEmailPriv = require('../privDatabase/getEmailPriv');
const readData = require('./readData');


module.exports = async function(userID) {

    if ( (typeof userID !== "number")) {
        return false   
    } else {

        var emailResult = await getEmailPriv(userID)

        // console.log ('emailResults: ', emailResult)

        if (emailResult.logIn) {
            var email = emailResult.email[0].email;

            var getAdmin =  "SELECT adminEmail FROM admins WHERE adminEmail = ?";
            var data = [email];
            var results = await readData(getAdmin, data);

            // console.log('admin results: ', results);

            return (results.length > 0) 
        } else {
            return false
        }
        
    }
    
}