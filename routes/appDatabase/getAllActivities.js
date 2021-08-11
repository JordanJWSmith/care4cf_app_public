const getRoutine = require('./getRoutine');
var readData = require('./readData');

module.exports = async function(userID) {

    if ((typeof userID !== 'number') || arguments.length !== 1) {
        return false;
    } else {

        var allActivities = 'SELECT scheduleID, date FROM activities WHERE userID = ?';
        var allActivitiesValue = userID;
        var activities = await readData(allActivities, allActivitiesValue)
        .then(function(results) {
            // console.log('getAllActivities: ', results);
            return results;
        })

        var routineDict = {};

        for (i=0; i<activities.length; i++) {
            var scheduleID = activities[i].scheduleID;
            var date = activities[i].date;
            dateString = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate());
            // console.log('schedID and date: ', scheduleID, dateString);

            await getRoutine(userID, dateString)
            .then(function(routineResult) {
                routineDict[dateString] = routineResult;
            })

        }

        // console.log(routineDict);
        return routineDict;
    }

}