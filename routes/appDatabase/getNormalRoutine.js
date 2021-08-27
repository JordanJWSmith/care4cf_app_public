var readData = require('./readData');
const arrangeDescriptions = require('./arrangeDescriptions');
const idsToDescriptions = require('./idsToDescriptions');

module.exports = async function(userID) {

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

   

