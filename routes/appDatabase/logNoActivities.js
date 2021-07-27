var readData = require('./readData');

module.exports = async function(userID, date, activityType) {

    var insertNoActivities = "INSERT INTO activities (userID, date, routineType) VALUES (?, ?, ?)";
    var activityValues = [userID, date, activityType];
    await readData(insertNoActivities, activityValues)
    .then(function() {
        return true;
    })

}