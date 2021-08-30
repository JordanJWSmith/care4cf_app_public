var readData = require('./readData');

module.exports = async function(userID, schedID) {
/** 
* @summary Make a given schedule a user's normal schedule
* @param {number} userID - The current user's ID against which to alter the schedule status
* @param {number} schedID - The ID of the chosen schedule to become designated normal
* @return {object} An object containing results of the database query
*/
    

    var makeNormal = `
    UPDATE care4cf.normalschedules SET main = 0 WHERE userID = ?;
    UPDATE care4cf.normalschedules SET main = 1 WHERE userID = ? AND scheduleID = ?;
    `;

    var makeNormalValues = [userID, userID, schedID];

    var results = await readData(makeNormal, makeNormalValues)
    
    return results;

}
    
