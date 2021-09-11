var readData = require('./readData');

module.exports = async function(userID) {
/** 
* @summary Check whether a given user has saved at least one normal routine
* @param {number} userID - The current user's ID against which to check normal schedules
* @return {Boolean} True if a normal schedule exists for the given user, false otherwise
*/
    

    if ( (typeof userID !== "number")) {
        return {
            scheduleExists: false 
        }          
    } else {

        var checkLogin =  "SELECT normalID FROM normalschedules WHERE userID = ?";
        var data = [userID];
        var results = await readData(checkLogin, data);
        
        return { 
           scheduleExists: (results.length > 0),
        }
    }
    
}