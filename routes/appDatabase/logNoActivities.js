var readData = require('./readData');

module.exports = async function(userID, date, activityType, reasonID) {

    var insertNoActivities = "INSERT INTO activities (userID, date, routineType) VALUES (?, ?, ?); SELECT LAST_INSERT_ID();";
    var activityValues = [userID, date, activityType];
    await readData(insertNoActivities, activityValues)
    // .then(function() {
    //     return true;
    // })
    .then(async function(results) {
        var activityID = results[1][0]['LAST_INSERT_ID()'];
        var insertReason = "INSERT INTO noactivityreasons VALUES (?, ?)";
        var insertReasonValues = [activityID, reasonID];
        await readData(insertReason, insertReasonValues)
        .then(function() {
            return true;
        })

        // console.log(results[1]);
        // console.log(results[1][0]['LAST_INSERT_ID()']);
    })
}