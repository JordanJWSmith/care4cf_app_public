var readData = require('./readData');

module.exports = async function(scheduleDetails) {
/** 
* @summary Save a given schedule in the database
* @param {object} scheduleDetails - An object containing details of the user's routine.
* @return {object} An object containing results of the database query
*/
    

    var techDict = {};
    var adjunctDict = {};
    var duration = scheduleDetails.duration;
    var frequency = scheduleDetails.frequency;
    var saveAsNormal = JSON.parse(scheduleDetails.saveAsNormal);
    var user = scheduleDetails.user;
    var counter = parseInt(scheduleDetails.maxCounter, 10) + 1;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    var insertSchedule = "INSERT INTO schedules (duration, frequencyID) VALUES (?, ?); SELECT LAST_INSERT_ID();";
    var scheduleValues = [duration, frequency];
    var insertIntoSchedules = await readData(insertSchedule, scheduleValues)
    .then(
        async function(insertResults) {
            var scheduleID = insertResults[1][0]['LAST_INSERT_ID()'];
            var keys = Object.keys(scheduleDetails);

            for (var i = 0; i < counter; i++) {
                if (keys.includes('act'+i)) {
                    if (keys.includes('subact'+i)) {
                        techDict[i] = {'scheduleID': scheduleID, 'techniqueID': scheduleDetails['subact'+i]}
                    } else {
                        techDict[i] = {'scheduleID': scheduleID, 'techniqueID': scheduleDetails['act'+i]};
                    }
                }
                if (keys.includes('adjuncts'+i)) {
                    adjunctDict[i] = {'scheduleID': scheduleID, 'adjunctID': scheduleDetails['adjuncts'+i], 'adjunctTimeID': scheduleDetails['adjunctTime'+i]};
                }
            }

            if (saveAsNormal) {
                var resetPrimary = "UPDATE normalschedules SET main = 0 WHERE userID = ?"
                var primaryUser = [user];
                await readData(resetPrimary, primaryUser)
                .then(async function() {
                    var insertNormal = "INSERT INTO normalschedules (scheduleID, userID, dateAdded, main) VALUES (?, ?, ?, ?)";
                    var normalValues = [scheduleID, user, date, 1];
                    await readData(insertNormal, normalValues);
                })
            }
            
            return insertResults;
        }
    )
    .then(async function(insertResults) {
        var techKeys = Object.keys(techDict);
        var insertTechniques = "INSERT INTO techniques SET ?";
        for (var i = 0; i < techKeys.length; i++) {
                await readData(insertTechniques, techDict[i]);
            }
            var adjunctKeys = Object.keys(adjunctDict);
            var insertAdjuncts = "INSERT INTO adjuncts SET ?";
        for (var i = 0; i < adjunctKeys.length; i++) {
            await readData(insertAdjuncts, adjunctDict[i]);
        }   
        return insertResults
    })

    return insertIntoSchedules;
}


