// NO LONGER USED

var readData = require('./readData');

module.exports = async function(userID) {

    

    if ( (typeof userID !== "number")) {
        return {
            scheduleExists: false 
        }          
    } else {

        // var checkLogin = 'SELECT * FROM users WHERE email = "' + email + '"';
        var checkLogin =  "SELECT normalID FROM normalschedules WHERE userID = ?";
        var data = [userID];
        var results = await readData(checkLogin, data);
        // console.log('normalExists results:', results);
        // console.log('normalExists check: ', results.length > 0);
        
        return { 
           scheduleExists: (results.length > 0),
        //    fName: results[0].fName 
        }
    }
    
}