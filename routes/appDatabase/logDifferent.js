var readData = require('./readData');

module.exports = async function(userID, date, scheduleID, activityType) {

    var insertDiffActivity = "INSERT INTO activities (userID, date, scheduleID, routineType) VALUES (?, ?, ?, ?)";
    var diffValues = [userID, date, scheduleID, activityType];
    await readData(insertDiffActivity, diffValues)
    .then(function() {
        return true;
    })

}