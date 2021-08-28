module.exports = async function(routineResults) {
/** 
* Takes an array of objects 
* @summary Takes an array of objects and returns an object containing key:value pairs representing a complete description of one routine
* @param {Array} routineResults - An array of objects, where each object is a different element of a routine (techniques, frequency, duration, adjuncts)
* @return {JSON} A JSON-formatted object containing an accurate description of one routine
*/
    
    // console.log('type of routineResults: ', typeof routineResults);
    // console.log('routineResults: ', routineResults);

    if ((typeof routineResults !== "object") || (Object.keys(routineResults).length == 0)) {
        return false
    }

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


    // console.log('arrangeDescription returned object: ', resDict, typeof resDict);

    return resDict;
}