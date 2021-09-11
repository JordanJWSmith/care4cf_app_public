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
        return false;
    }

    var dateCheck = await checkForDate(userID, date)
    .then(async function(dateResults) {
        if (dateResults) {
            var routineType = dateResults[0].routineType;

            // CHANGE TO 3?
            if (routineType < 3) {
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
                        
                    var descriptionResults = await readData(getIDs, getIDValues)
                    .then(async function(idResults) {
                        descriptions = await idsToDescriptions(idResults)
                        .then(async function(descResults) {
                            var arranged = await arrangeDescriptions(descResults)
                            .then(async function(arrangeResults) {
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
                        return routineTypeResults;
                    })

                    descriptionResults['title'] = routineTypeResults[0].routine;
                    return descriptionResults;

            } else {
                var resDict = {}
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
                    resDict['title'] = reasonResults[1][0].routine;
                    resDict['description'] = reasonResults[0][0].description;
                    return resDict;
                })
                return getReasonResults;
            }
        } else {
            return false
        }
    })
    return dateCheck

}