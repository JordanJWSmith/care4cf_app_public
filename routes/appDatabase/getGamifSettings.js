var readData = require('./readData');

module.exports = async function(userID) {

/** 
* @summary Retrieves the gamification settings of a given user
* @param {number} userID - The current user's ID against which to check the gamification settings
* @return {number} A number acting as a Boolean flag to determine the given user's gamification settings
*/
    

    if ((typeof userID !== "number") || (arguments.length !== 1)) {
        return false
    }

        var getGamification =  "SELECT gamification FROM users WHERE userID = ?";
        var gamificationValue = [userID]; 
        var results = await readData(getGamification, gamificationValue);

        if (results.length < 1 ) {
            return false
        } else {
            return  results[0].gamification;
        }

        
        
    }