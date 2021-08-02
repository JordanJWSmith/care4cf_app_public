var readData = require('./readData');

function buildQuery(sql, index, colName, res) {
    for (var i = 0; i < res[index].length; i++) {
        if (i == (res[index].length - 1)) {
            sql = sql.concat(colName + ' = ' + res[index][i][colName] + '; ');
        } else {
            sql = sql.concat(colName + ' = ' + res[index][i][colName] + ' OR ');
        }
    
    }

    return sql;
}


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
    var routineResults = await readData(getNormal, getNormalValues)
    .then(async function(routineResults) {
        
        var techDescriptions = "SELECT title, subtitle FROM techdescriptions WHERE ";
        var adjunctDescriptions = "SELECT adjunctTitle FROM adjunctdescriptions WHERE ";
        var adjunctTimeDescriptions = "SELECT adjunctTime FROM adjuncttimes WHERE ";

        var durFreq = routineResults[1][0];
 
        var techQuery = buildQuery(techDescriptions, 0, 'techniqueID', routineResults);
        var durFreqQuery = "SELECT d.duration, f.frequency FROM durations d, frequencies f WHERE d.durationID = " + durFreq.duration  + " AND f.frequencyID = " + durFreq.frequencyID  + "; ";
        var descQuery = techQuery.concat(durFreqQuery)

        if (routineResults[2]) {
            var adjQuery = buildQuery(adjunctDescriptions, 2, 'adjunctID', routineResults);
            var adjTimeQuery = buildQuery(adjunctTimeDescriptions, 2, 'adjunctTimeID', routineResults);
            var descQuery = descQuery.concat(adjQuery).concat(adjTimeQuery);
        }

        var descriptions = await readData(descQuery)
        .then(function(descriptionResults) {
            // console.log('descResults: ', descriptionResults);
            return descriptionResults;
        })

        return descriptions;
        // console.log('descQuery: ', descQuery);
    })


    techList = []
    for (var i = 0; i < routineResults[0].length; i++) {
        // console.log('techs: ', routineResults[0][i]);
        if (routineResults[0][i].subtitle) {
            // console.log(routineResults[0][i].subtitle);
            techList.push(routineResults[0][i].subtitle);
        } else {
            // console.log(routineResults[0][i].title);
            techList.push(routineResults[0][i].title);
        }
    }

    adjunctList = []
    if (routineResults.length > 2) {
        for (var i = 0; i < routineResults[2].length; i++) {
            adjunctList.push([routineResults[2][i].adjunctTitle, routineResults[3][i].adjunctTime]);
            // console.log(routineResults[2][i].adjunctTitle, routineResults[3][i].adjunctTime);

        }
    }

    // console.log(techList);
    // console.log(adjunctList);

    
    // console.log('routineResults: ', routineResults);
    // console.log('length: ', routineResults.length);
    resDict = {};
    resDict['techniques'] = JSON.stringify(techList);
    resDict['duration'] = routineResults[1][0].duration;
    resDict['frequency'] = routineResults[1][0].frequency;


    if (routineResults.length > 2) {
        resDict['adjuncts'] = JSON.stringify(adjunctList);
        // resDict['adjunctTimes'] = routineResults[3];
    } else {
        resDict['adjuncts'] = false;
        // resDict['adjunctTimes'] = false;
    }

    return resDict;
    
}


