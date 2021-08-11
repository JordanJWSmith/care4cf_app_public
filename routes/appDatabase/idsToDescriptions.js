var readData = require('./readData');

function buildQuery(sql, index, colName, res) {
    for (var i = 0; i < res[index].length; i++) {
        if (i == (res[index].length - 1)) {
            sql = sql.concat(colName + ' = ' + res[index][i][colName] + '; ');
        } else {
            sql = sql.concat(colName + ' = ' + res[index][i][colName] + ' OR ');
        }
    
    }
    console.log('SQL: ', sql)
    return sql;
}

module.exports = async function(routineResults) {

    console.log('IDToDescription routineResults: ', routineResults);

    var techDescriptions = "SELECT title, subtitle FROM techdescriptions WHERE ";
    var adjunctDescriptions = "SELECT adjunctTitle FROM adjunctdescriptions WHERE ";
    var adjunctTimeDescriptions = "SELECT adjunctTime FROM adjuncttimes WHERE ";

    var durFreq = routineResults[1][0];

    var techQuery = buildQuery(techDescriptions, 0, 'techniqueID', routineResults);
    var durFreqQuery = "SELECT d.duration, f.frequency FROM durations d, frequencies f WHERE d.durationID = " + durFreq.duration  + " AND f.frequencyID = " + durFreq.frequencyID  + "; ";
    var descQuery = techQuery.concat(durFreqQuery)

    if (routineResults[2].length !== 0) {
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

}