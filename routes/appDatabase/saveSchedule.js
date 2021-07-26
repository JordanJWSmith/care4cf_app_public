var readData = require('./readData');

module.exports = async function(scheduleDetails) {

    
    console.log('new schedule details: ', scheduleDetails);

    techDict = {};
    adjunctDict = {};
    var duration = scheduleDetails.duration;
    var frequency = scheduleDetails.frequency;
    var date = scheduleDetails.date;
    var saveAsNormal = scheduleDetails.saveAsNormal;
    var user = scheduleDetails.user;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    console.log('duration: ', duration);
    console.log('frequency: ', frequency);
    console.log('date: ', date);
    console.log('saveAsNormal: ', saveAsNormal)
    console.log('user: ', user);

    var insertSchedule = "INSERT INTO schedules (duration, date, frequencyID) VALUES (?, ?, ?)";
    var scheduleValues = [duration, date, frequency];

    await readData(insertSchedule, scheduleValues).then(
        async function(results) {
            var retrieveScheduleID = "SELECT max(scheduleID) FROM schedules";
            await readData(retrieveScheduleID).then(
                async function(schedResults) {
                    
                    var scheduleID = schedResults[0]['max(scheduleID)'];
                    
                    if (saveAsNormal) {
                        var insertNormal = "INSERT INTO normalschedules (scheduleID, userID, dateAdded, main) VALUES (?, ?, ?, ?)";
                        var normalValues = [scheduleID, user, date, 1];

                        // MOVE THIS TO ESCAPE THE SAVEASNORMAL BLOCK - REORDER?
                        await readData(insertNormal, normalValues).then(
                            async function(normResults) {
                                console.log(normResults);
                                // var insertTechniques = "INSERT INTO techniques VALUES (?, ?)";
                                // var insertAdjuncts = "INSERT INTO adjuncts VALUES (?, ?, ?)";
                                var keys = Object.keys(scheduleDetails);
                                for (var i = 0; i < keys.length; i++) {
                                    if (keys.includes('act'+i)) {
                                        if (keys.includes('subact'+i)) {
                                            techDict[i] = {'scheduleID': scheduleID, 'techniqueID': scheduleDetails['subact'+i]}
                                            // techniqueValues = [scheduleID, scheduleDetails['subact'+i]];
                                            // readData(insertTechniques, techniqueValues);
                                        } else {
                                            techDict[i] = {'scheduleID': scheduleID, 'techniqueID': scheduleDetails['act'+i]};
                                            techniqueValues = [scheduleID, scheduleDetails['subact'+i]];
                                            // readData(insertTechniques, techniqueValues);
                                        }
                                    }
                                    if (keys.includes('adjuncts'+i)) {
                                        adjunctDict[i] = {'scheduleID': scheduleID, 'adjunctID': scheduleDetails['adjuncts'+i], 'adjunctTimeID': scheduleDetails['adjunctTime'+i]};
                                        // adjunctValues = [scheduleID, scheduleDetails['adjuncts'+i], scheduleDetails['adjunctTime'+i]];
                                        // readData(insertAdjuncts, adjunctValues);
                                    }
                                }
                                // await readData()
                            }

                        )
                    }
                }
            )
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
        // await readData()
    })

    // insert into schedules, return scheduleID
    // insert into normalSchedules


    // var keys = Object.keys(scheduleDetails);
    

    // console.log('keys: ', Object.keys(scheduleDetails));
    // // console.log(keys.length);

    // for (var i = 0; i < keys.length; i++) {
    //     if (keys.includes('act'+i)) {
    //         if (keys.includes('subact'+i)) {
    //             techDict[i] = {'scheduleID': 'test', 'techniqueID': scheduleDetails['subact'+i]}
    //         } else {
    //             techDict[i] = {'scheduleID': 'test', 'techniqueID': scheduleDetails['act'+i]};
    //         }
    //     }
    //     if (keys.includes('adjuncts'+i)) {
    //         adjunctDict[i] = {'scheduleID': 'test', 'adjunctID': scheduleDetails['adjuncts'+i], 'adjunctTimeID': scheduleDetails['adjunctTime'+i]};
    //     }
    // }

    console.log('techniqueDict: ', techDict);
    console.log('adjunctDict: ', adjunctDict);




    // var newUser = 'INSERT INTO users SET ? ';

    // var results = await updateRecords(newUser, userDetails);
    // console.log('newUser results:', results);
    // await readData(newUser, userDetails).then(function(results) {
        // console.log('new user results:', results)
        // return true;
    // })
    // .then(function(results) {
        // return true
    // })
    // return true;
}