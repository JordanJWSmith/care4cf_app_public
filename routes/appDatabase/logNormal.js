var readData = require('./readData');

module.exports = async function(userID, date, activityType) {
/** 
* @summary Log a given user's normal activity
* @param {number} userID - The current user's ID against which to log the activity
* @param {string} date - The date against which to log the activity
* @param {number} activityType - The activity type of the logged activity
* @return {Boolean} True
*/
    

    var findScheduleID = "SELECT scheduleID FROM normalSchedules WHERE userID = ? AND main = 1";
    var scheduleValues = [userID];

    await readData(findScheduleID, scheduleValues)
    .then(async function(schedResults) {
        // console.log('scheduleID: ', schedResults[0]['scheduleID']);
        scheduleID = schedResults[0]['scheduleID'];
        var logActivity = "INSERT INTO activities (userID, date, scheduleID, routineType) VALUES (?, ?, ?, ?)";
        var activityValues = [userID, date, scheduleID, activityType];
        await readData(logActivity, activityValues)
        .then(function() {
            return true;
        })
    })
}