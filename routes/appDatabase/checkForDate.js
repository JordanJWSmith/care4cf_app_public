var readData = require('./readData');

module.exports = async function(userID, date) {

    /** 
    * @summary Checks to see if an activity has been logged by a given user on a given date
    * @param {number} userID - The current userID against which to check activity
    * @param {string} date - The date against which to check activity
    * @return {Boolean} True if the given user has logged an activity for the given date, false otherwise
    */
    

    if ((typeof userID !== 'number') || (typeof date !== "string") || (arguments.length !== 2)) {
        return false;
    }

    var checkDate = "SELECT activityID, routineType FROM activities WHERE userID = ? AND date = ?";
    var checkDateValues = [userID, date];

    var dateResults = await readData(checkDate, checkDateValues)
    .then(function(results) {
        return results;
    })

    if (dateResults.length == 0) {
        return false
    } else if (dateResults.length == 1) {
        return dateResults;
    } else if (dateResults.length > 1) {
        throw Error('Duplicate activity entry');
    }
    
}