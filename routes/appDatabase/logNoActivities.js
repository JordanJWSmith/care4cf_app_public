var readData = require('./readData');

module.exports = async function(userID, date, activityType, reasonID) {
    /** 
    * @summary Log an activity under the 'no activities' option
    * @param {number} userID - The current user's ID against which to log the activity
    * @param {string} date - The date of the logged activity
    * @param {number} activityType - The activity type of the logged activity
    * @param {number} reasonID - The ID correlating to the reason chosen for logging no activities
    * @return {Boolean} True
    */
    

    var insertNoActivities = "INSERT INTO activities (userID, date, routineType) VALUES (?, ?, ?); SELECT LAST_INSERT_ID();";
    var activityValues = [userID, date, activityType];
    await readData(insertNoActivities, activityValues)

    .then(async function(results) {
        var activityID = results[1][0]['LAST_INSERT_ID()'];
        var insertReason = "INSERT INTO noactivityreasons VALUES (?, ?)";
        var insertReasonValues = [activityID, reasonID];
        await readData(insertReason, insertReasonValues)
        .then(function() {
            return true;
        })

    })
}