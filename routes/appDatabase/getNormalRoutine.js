var readData = require('./readData');
const arrangeDescriptions = require('./arrangeDescriptions');
const idsToDescriptions = require('./idsToDescriptions');

module.exports = async function(userID) {
/** 
* @summary Retrieves a description of a given user's current normal schedule
* @param {number} userID - The current user's ID against which to check saved schedules
* @return {object} An object containing descriptions of the given user's current normal schedule
*/
    

    // if ((typeof userID !== "number") || (arguments.length !== 1)) {
    //     return false
    // }

    if (typeof userID !== "number") {
        return false
    }

    var getNormal =  `
    SELECT t.scheduleID, t.techniqueID FROM techniques t WHERE t.scheduleID = (
        SELECT scheduleID FROM normalschedules WHERE main = 1 AND userID = ?
    );
    
    SELECT * FROM schedules WHERE scheduleID = (
        SELECT scheduleID FROM normalschedules WHERE main = 1 AND userID = ?
    );

    SELECT * FROM adjuncts WHERE scheduleID = (
        SELECT scheduleID FROM normalschedules WHERE main = 1 AND userID = ?
    );
    `;

    var getNormalValues = [userID, userID, userID];

    var normalResults = await readData(getNormal, getNormalValues)
    .then(async function(getNormalResults) {
        if (getNormalResults[0].length < 1) {
            // console.log('getNormalRoutine: No normal results')
            return false
        }
        // console.log('idResults: ', getNormalResults);
        descriptions = await idsToDescriptions(getNormalResults)
        .then(async function(descResults) {
            // console.log('descResults: ', descResults);
            // return descResults;
            var arranged = await arrangeDescriptions(descResults)
            .then(async function(arrangeResults) {
                // console.log('arrangeResults: ', arrangeResults);
                return arrangeResults
            })
            return arranged;
        })

        return descriptions;
    })
    

    // console.log('normalResults: ', normalResults);
    return normalResults;
}

   

