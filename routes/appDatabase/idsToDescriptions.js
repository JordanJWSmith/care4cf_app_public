var readData = require('./readData');
var buildQuery = require('./buildQuery');

module.exports = async function(routineResults) {

/** 
* @summary Take an object containing IDs representing elements of a routine, and return an object containing the associated descriptions
* @param {object} routineResults - An object containing IDs representing one complete routine (i.e. techniqueIDs, frequencyID, durationID, adjunctIDs, adjunctTimeIDs)
* @return {object} An object containing a description of one routine
*/
    

    if ((typeof routineResults !== "object") || (Object.keys(routineResults).length < 1)) {
        console.log('idsToDescriptions not an object')
        return false
    }

    // console.log('IDToDescription routineResults: ', routineResults);

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