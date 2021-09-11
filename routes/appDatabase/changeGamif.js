var readData = require('./readData');

module.exports = async function(set, userID) {
/** 
* @summary Changes one user's Boolean gamification settings
* @param {number} set - The Boolean flag to which the gamification setting is set 
* @param {number} userID - The userID to determine which gamification setting is changed
* @return {object} Details of the database transaction.
*/
    

        var getGamification =  "UPDATE users SET gamification = ? WHERE userID = ?";
        var gamificationValue = [set, userID]; 
        var results = await readData(getGamification, gamificationValue);

        return  results;
        
    }