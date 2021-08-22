var readPrivData = require('./readPrivData');

module.exports = async function(userID) {

    if ( (typeof userID !== "number")) {
        return {
            logIn: false 
        }          
    } else {

        // var checkLogin = 'SELECT * FROM users WHERE email = "' + email + '"';
        var getEmail =  "SELECT email FROM users WHERE userID = ?";
        var data = [userID];
        var results = await readPrivData(getEmail, data);

        // console.log('email results: ', results);
        
        // console.log('userExistsPriv results:', results);
        // console.log('userExists check: ', results.length > 0);

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