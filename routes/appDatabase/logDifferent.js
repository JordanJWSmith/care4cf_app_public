var readData = require('./readData');

module.exports = async function(userID, date, scheduleID, activityType) {
/** 
* @summary Log an activity under the 'something different' option
* @return {Boolean} true
*/
    

    var insertDiffActivity = "INSERT INTO activities (userID, date, scheduleID, routineType) VALUES (?, ?, ?, ?)";
    var diffValues = [userID, date, scheduleID, activityType];
    await readData(insertDiffActivity, diffValues)
    .then(function(results) {
        return true;
    })

}