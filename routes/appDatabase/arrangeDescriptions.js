var readData = require('./readData');

module.exports = async function(routineResults) {

    console.log('routineResults: ', routineResults);

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
    // THROWS ERROR
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