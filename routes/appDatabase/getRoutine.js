const arrangeDescriptions = require('./arrangeDescriptions');
const checkForDate = require('./checkForDate');
const idsToDescriptions = require('./idsToDescriptions');
var readData = require('./readData');

module.exports = async function(userID, date) {

/** 
* Brief description of the function here.
* @summary Retrieve a description of a given user's activity logged on a given date
* @param {number} userID - The current user's ID against which to check activities
* @param {string} date - A string representing the given date against which to check activity
* @return {object} A description of the activity logged by the given user on the given date. If none, return false.
*/
    

    if ((typeof userID !== 'number') || (typeof date !== "string") || (arguments.length !== 2)) {
        // console.log('incorrect userID');
        return false;
    }

    var dateCheck = await checkForDate(userID, date)
    .then(async function(dateResults) {
        // console.log('dateResults getRoutine: ', dateResults)
        if (dateResults) {
            // console.log('dateResults: ', dateResults);
            var routineType = dateResults[0].routineType;

            // CHANGE TO 3?
            if (routineType < 3) {
                // console.log('get routine');
                    var getIDs =  `
                        SELECT t.scheduleID, t.techniqueID FROM techniques t WHERE t.scheduleID = (
                            SELECT scheduleID FROM activities WHERE userID = ? AND date = ?
                        );
                        
                        SELECT * FROM schedules WHERE scheduleID = (
                            SELECT scheduleID FROM activities WHERE userID = ? AND date = ?
                        );
            
                        SELECT * FROM adjuncts WHERE scheduleID = (
                            SELECT scheduleID FROM activities WHERE userID = ? AND date = ?
                        );
                    `;
            
                    var getIDValues = [userID, date, userID, date, userID, date];
            
                    // console.log('getRoutine');
            
                    var descriptionResults = await readData(getIDs, getIDValues)
                    .then(async function(idResults) {
                        // console.log('idResults: ', idResults);
                        descriptions = await idsToDescriptions(idResults)
                        .then(async function(descResults) {
                            // console.log('descResults: ', descResults);
                            var arranged = await arrangeDescriptions(descResults)
                            .then(async function(arrangeResults) {
                                // console.log('arrangeResults: ', arrangeResults);
                                return arrangeResults
                            })
                            return arranged;
                        })
            
                        return descriptions;
                    })
                    
                    var getRoutineType = "SELECT routine FROM routinetype WHERE routineID = ?; ";
                    var routineTypeValue = [routineType];
                    var routineTypeResults = await readData(getRoutineType, routineTypeValue)
                    .then(function(routineTypeResults) {
                        // console.log('routineTypeResults: ', routineTypeResults)
                        return routineTypeResults;
                    })

                    descriptionResults['title'] = routineTypeResults[0].routine;
                    // console.log('routineTypeResults: ', routineTypeResults[0].routine)
                    // console.log('descriptionResults: ', descriptionResults);
                    return descriptionResults;

            } else {
                // console.log('getRoutine: no activities');
                resDict = {}
                var activityID = dateResults[0].activityID;
                var getReason = `
                    SELECT description FROM noactivitydescriptions WHERE reasonID = (
                        SELECT reasonID FROM noactivityreasons WHERE activityID = ?
                    ); 
                    SELECT routine FROM routinetype WHERE routineID = ?;
                    `
                var getReasonValue = [activityID, routineType];
                var getReasonResults = await readData(getReason, getReasonValue)
                .then(function(reasonResults) {
                    // console.log('reasonResults: ', reasonResults[0]);
                    // console.log('activityType: ', reasonResults[1]);
                    resDict['title'] = reasonResults[1][0].routine;
                    resDict['description'] = reasonResults[0][0].description;
                    // console.log('getRoutine resDict for no activity: ', resDict);
                    return resDict;
                })
                // console.log('getRoutine getReasonResults for no activity:', getReasonResults);
                return getReasonResults;
            }
        } else {
            // console.log('dateResult failed');
            return false
        }
    })
    // console.log('dateCheck result: ', dateCheck);
    return dateCheck

}