var readData = require('./readData');
// const updateToken = require('./updateToken');


module.exports = async function(userID) {

    // valList = []
    today = new Date();
    dateString = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

    // for (i=0; i<3; i++) {
    //     today.setDate(today.getDate()-1);
    //     dateString = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    //     valList.push(dateString);
        
    // }

    // valList.push(userID);
    
    // console.log('valList: ', valList);

    // SELECT * FROM care4cf.activities WHERE userID = 160 AND scheduleID > 0 AND date != ? ORDER BY date DESC LIMIT 3

    // var getActivities = "SELECT * FROM activities WHERE (date = ? OR date = ? OR date = ?) AND userID = ?"
    // var getActivitiesValues = valList;

    var getActivities = "SELECT * FROM activities WHERE userID = ? AND scheduleID > 0 AND date != ? ORDER BY date DESC LIMIT 3"
    var getActivitiesVal = [userID, dateString];
    var activitiesResults = await readData(getActivities, getActivitiesVal)
    .then(function(results) {
        return results
    })

    // var testPacket = [
    //     {
    //       activityID: 52,
    //       userID: 160,
    //       date: 2021-08-14,
    //       scheduleID: 93,
    //       routineType: 2,
    //       productive: null,
    //       mood: null
    //     },
    //      {
    //       activityID: 51,
    //       userID: 160,
    //       date: 2021-08-13,
    //       scheduleID: 93,
    //       routineType: 2,
    //       productive: null,
    //       mood: null
    //     },
    //      {
    //       activityID: 49,
    //       userID: 160,
    //       date: 2021-08-12,
    //       scheduleID: 93,
    //       routineType: 2,
    //       productive: null,
    //       mood: null
    //     }
    //   ]

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
    
    // console.log(activitiesResults, typeCheck(activitiesResults));
    // console.log(testPacket, typeCheck(testPacket));

    // return typeCheck(testPacket)
    return typeCheck(activitiesResults);
}