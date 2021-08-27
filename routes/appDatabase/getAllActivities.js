const getRoutine = require('./getRoutine');
var readData = require('./readData');

module.exports = async function(userID) {

    if ((typeof userID !== 'number') || arguments.length !== 1) {
        console.log('incorrect userID');
        return false;
    } else {

        var allActivities = 'SELECT * FROM activities WHERE userID = ? ORDER BY date';
        var allActivitiesValue = userID;
        var activities = await readData(allActivities, allActivitiesValue)
        .then(function(results) {
            // console.log('getAllActivities: ', results);
            return results;
        })

        var routineDict = {};

        for (x=0; x<activities.length; x++) {
            // console.log('COUNTER: ', x)
            // console.log('activities: ', activities)
            // console.log('activities length: ', activities.length);
            // console.log('activities date: ', activities[i].date);
            var scheduleID = activities[x].scheduleID;
            var date = activities[x].date;
            dateString = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate());
            // console.log('schedID and date: ', scheduleID, dateString);

            await getRoutine(userID, dateString)
            .then(function(routineResult) {
                // console.log('getAllActivities routineResults: ', routineResult);
                routineDict[dateString] = routineResult;
            })
            // console.log('  ');

        }

        // console.log(routineDict);
        return routineDict;
    }

}