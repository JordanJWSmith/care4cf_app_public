var readData = require('./readData');
const arrangeDescriptions = require('./arrangeDescriptions');
const idsToDescriptions = require('./idsToDescriptions');

module.exports = async function(userID) {

    var allNormals = "SELECT scheduleID FROM normalschedules WHERE userID = ?";
    var allNormalsValue = [userID];

    var allNormalsResults = await readData(allNormals, allNormalsValue)
    .then(function(allNormalsResults) {
        console.log('user saved schedules: ', allNormalsResults);
        return allNormalsResults;
    })

    var schedDict = {}

    for (i=0; i < allNormalsResults.length; i++) {
        var scheduleID = allNormalsResults[i].scheduleID;
        console.log('scheduleID: ', scheduleID);
        var getIDs =  `
            SELECT t.scheduleID, t.techniqueID FROM techniques t WHERE t.scheduleID = ?;
        
            SELECT * FROM schedules WHERE scheduleID = ?;

            SELECT * FROM adjuncts WHERE scheduleID = ?;
        `;
        var getIDValues = [scheduleID, scheduleID, scheduleID];

        var descriptionResults = await readData(getIDs, getIDValues)
        .then(async function(idResults) {
            console.log('idResults: ', idResults);
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

    console.log('schedDict: ', schedDict);
 
    return schedDict;

}