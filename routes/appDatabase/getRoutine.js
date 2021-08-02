const arrangeDescriptions = require('./arrangeDescriptions');
const checkForDate = require('./checkForDate');
const idsToDescriptions = require('./idsToDescriptions');
var readData = require('./readData');

module.exports = async function(userID, date) {

    var dateCheck = await checkForDate(userID, date)
    .then(function(dateResults) {
        // console.log('dateResults getRoutine: ', dateResults)
        if (dateResults) {
            return true
        } else {
            return false
        }
    })

    // console.log('dateCheck: ', dateCheck);

    if (dateCheck) {
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
        

        // console.log('descriptionResults: ', descriptionResults);
        return descriptionResults;
    } else {
        return false;
    }

}