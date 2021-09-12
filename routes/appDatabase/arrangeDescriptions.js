module.exports = async function(routineResults) {
/** 
* 
* @summary Takes an array of objects and returns an object containing key:value pairs representing a complete description of one routine
* @param {Array} routineResults - An array of objects, where each object is a different element of a routine (techniques, frequency, duration, adjuncts)
* @return {JSON} A JSON-formatted object containing an accurate description of one routine
*/

    if ((typeof routineResults !== "object") || (Object.keys(routineResults).length == 0)) {
        return false
    }

    var techList = []
    for (var i = 0; i < routineResults[0].length; i++) {
        if (routineResults[0][i].subtitle) {
            techList.push(routineResults[0][i].subtitle);
        } else {
            techList.push(routineResults[0][i].title);
        }
    }

    var adjunctList = []
    
    if (routineResults.length > 2) {
        for (var i = 0; i < routineResults[2].length; i++) {
            adjunctList.push([routineResults[2][i].adjunctTitle, routineResults[3][i].adjunctTime]);
        }
    }

    var resDict = {};
    resDict['techniques'] = JSON.stringify(techList);
    resDict['duration'] = routineResults[1][0].duration;
    resDict['frequency'] = routineResults[1][0].frequency;


    if (routineResults.length > 2) {
        resDict['adjuncts'] = JSON.stringify(adjunctList);
    } else {
        resDict['adjuncts'] = false;
    }

    return resDict;
}