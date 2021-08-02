var readData = require('./readData');

module.exports = async function(scheduleDetails) {

    
    // console.log('new schedule details: ', scheduleDetails);

    techDict = {};
    adjunctDict = {};
    var duration = scheduleDetails.duration;
    var frequency = scheduleDetails.frequency;
    var saveAsNormal = JSON.parse(scheduleDetails.saveAsNormal);
    var user = scheduleDetails.user;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    // console.log('duration: ', duration);
    // console.log('frequency: ', frequency);
    // console.log('date: ', date);
    // console.log('saveAsNormal: ', saveAsNormal)
    // console.log('user: ', user);

    var insertSchedule = "INSERT INTO schedules (duration, frequencyID) VALUES (?, ?); SELECT LAST_INSERT_ID();";
    // var insertSchedule = "UPDATE schedules SET duration = ?, frequencyID = ? "
    var scheduleValues = [duration, frequency];

    var insertIntoSchedules = await readData(insertSchedule, scheduleValues).then(
        async function(insertResults) {
            // console.log('insertResults:', insertResults);
            var retrieveScheduleID = "SELECT max(scheduleID) FROM schedules";

            // NO LONGER NEEDED
            await readData(retrieveScheduleID).then(
                async function(schedResults) {
                    var scheduleID = schedResults[0]['max(scheduleID)'];
                    var keys = Object.keys(scheduleDetails);
 
                    // CHANGE TO LENGTH OF COUNTER?
                    for (var i = 0; i < keys.length; i++) {
                        if (keys.includes('act'+i)) {
                            if (keys.includes('subact'+i)) {
                                techDict[i] = {'scheduleID': scheduleID, 'techniqueID': scheduleDetails['subact'+i]}
                            } else {
                                techDict[i] = {'scheduleID': scheduleID, 'techniqueID': scheduleDetails['act'+i]};
                                techniqueValues = [scheduleID, scheduleDetails['subact'+i]];
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
                    // return schedResults;
                }
            )
            .then(async function() {
                techKeys = Object.keys(techDict);
                var insertTechniques = "INSERT INTO techniques SET ?";
                for (var i = 0; i < techKeys.length; i++) {
                        await readData(insertTechniques, techDict[i]);
                    }
                    adjunctKeys = Object.keys(adjunctDict);
                    var insertAdjuncts = "INSERT INTO adjuncts SET ?";
                    for (var i = 0; i < adjunctKeys.length; i++) {
                        await readData(insertAdjuncts, adjunctDict[i]);
                    }   
            })

            return insertResults;
        }
    )

    return insertIntoSchedules;
        // console.log('insertIntoSchedules: ', insertIntoSchedules);
    // console.log('techniqueDict: ', techDict);
    // console.log('adjunctDict: ', adjunctDict);
}