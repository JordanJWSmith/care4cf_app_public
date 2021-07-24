var readPrivData = require('./readPrivData');

module.exports = async function(email) {

    if ( (typeof email !== "string")) {
        return {
            logIn: false 
        }          
    } else {

        // var checkLogin = 'SELECT * FROM users WHERE email = "' + email + '"';
        var checkLogin =  "SELECT userID FROM users WHERE email = ?";
        var data = [email];
        var results = await readPrivData(checkLogin, data);
        
        console.log('userExistsPriv results:', results);
        // console.log('userExists check: ', results.length > 0);

        return { 
           logIn: (results.length > 0),
           userID: results[0].userID 
        }
    }
    
}