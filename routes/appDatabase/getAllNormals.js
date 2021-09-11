var readData = require('./readData');
const arrangeDescriptions = require('./arrangeDescriptions');
const idsToDescriptions = require('./idsToDescriptions');



module.exports = async function(userID) {

    /** 
    * @summary Retrieves descriptions of all schedules saved by a given user
    * @param {number} userID - The current user's ID against which to check saved routines
    * @return {object} An object containing decriptions of the give user's saved schedules
    */

    if (typeof userID !== "number") {
        return false;
    }

    var allNormals = "SELECT scheduleID FROM normalschedules WHERE userID = ?";
    var allNormalsValue = [userID];

    var allNormalsResults = await readData(allNormals, allNormalsValue)
    .then(function(allNormalsResults) {
        return allNormalsResults;
    })

    var schedDict = {}

    for (i=0; i < allNormalsResults.length; i++) {
        var scheduleID = allNormalsResults[i].scheduleID;
        var getIDs =  `
            SELECT t.scheduleID, t.techniqueID FROM techniques t WHERE t.scheduleID = ?;
        
            SELECT * FROM schedules WHERE scheduleID = ?;

            SELECT * FROM adjuncts WHERE scheduleID = ?;
        `;
        var getIDValues = [scheduleID, scheduleID, scheduleID];

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
        schedDict[scheduleID] = descriptionResults;
    }
 
    return schedDict;

}