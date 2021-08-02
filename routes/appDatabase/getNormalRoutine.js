var readData = require('./readData');

module.exports = async function(userID) {

    var getNormal =  `
    SELECT t.scheduleID, t.techniqueID FROM techniques t WHERE t.scheduleID = (
        SELECT scheduleID FROM normalschedules WHERE main = 1 AND userID = ?
    );
    
    SELECT * FROM adjuncts WHERE scheduleID = (
        SELECT scheduleID FROM normalschedules WHERE main = 1 AND userID = ?
    );
    
    SELECT * FROM schedules WHERE scheduleID = (
        SELECT scheduleID FROM normalschedules WHERE main = 1 AND userID = ?
    );
    `;

    var getNormalValues = [userID, userID, userID];
    var routineResults = await readData(getNormal, getNormalValues)
    .then(function(routineResults) {
        console.log('results: ', routineResults);

        var techDescriptions = "SELECT * FROM techdescriptions WHERE ";

        // console.log('techniques: ', routineResults[0]);
        // console.log('test: ', routineResults[0][0])


        for (var i = 0; i < routineResults[0].length; i++) {
            // console.log('index: ', i);
            // console.log('length: ', routineResults[0].length);
            // console.log(routineResults[0][i].techniqueID)
            if (i == (routineResults[0].length - 1)) {
                techDescriptions = techDescriptions.concat('techniqueID = ' + routineResults[0][i].techniqueID + ';');
            } else {
                techDescriptions = techDescriptions.concat('techniqueID = ' + routineResults[0][i].techniqueID + ' OR ');
            }
        }

        var adjunctDescriptions = "SELECT * FROM adjunctdescriptions WHERE ";
        for (var i = 0; i < routineResults[1].length; i++) {
            if (i == (routineResults[1].length - 1)) {
                adjunctDescriptions = adjunctDescriptions.concat('adjunctID = ' + routineResults[1][i].adjunctID + ';');
            } else {
                adjunctDescriptions = adjunctDescriptions.concat('adjunctID = ' + routineResults[1][i].adjunctID + ' OR ');
            }
        
        }

        var adjunctTimeDescriptions = "SELECT * FROM adjuncttimes WHERE ";
        for (var i = 0; i < routineResults[1].length; i++) {
            if (i == (routineResults[2].length - 1)) {
                adjunctTimeDescriptions = adjunctTimeDescriptions.concat('adjunctTimeID = ' + routineResults[1][i].adjunctTimeID + ';');
            } else {
                adjunctTimeDescriptions = adjunctTimeDescriptions.concat('adjunctTimeID = ' + routineResults[1][i].adjunctTimeID + ' OR ');
            }
        
        }

        console.log(techDescriptions);
        console.log(adjunctDescriptions);
        console.log(adjunctTimeDescriptions);
    })
    

    

    return { 
       routineResults
    }
}


