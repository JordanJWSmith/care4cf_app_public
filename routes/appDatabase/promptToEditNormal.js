var readData = require('./readData');
// const updateToken = require('./updateToken');


module.exports = async function(userID) {
/** 
* @summary Check a given user's logging history to see if they need prompting to update their normal schedule
* @param {number} userID - The ID of the current user against which the activities are checked
* @return {Boolean} True if the given user's previous three activities logged are 'something different', false otherwise
*/
    

    today = new Date();
    dateString = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

    var getActivities = "SELECT * FROM activities WHERE userID = ? AND scheduleID > 0 AND date != ? ORDER BY date DESC LIMIT 3"
    var getActivitiesVal = [userID, dateString];
    var activitiesResults = await readData(getActivities, getActivitiesVal)
    .then(function(results) {
        return results
    })


    function typeCheck(a) {
        if (a.length == 3) {
            for (i=0; i<a.length; i++) {
                if (a[i].routineType !== 2) {
                    return false
                }
            }
        } else {
            return false
        }
        return true;
    }

    return typeCheck(activitiesResults);
}