var readData = require('./readData');

module.exports = async function(userID, date) {

    var checkDate = "SELECT activityID, routineType FROM activities WHERE userID = ? AND date = ?";
    var checkDateValues = [userID, date];

    var dateResults = await readData(checkDate, checkDateValues)
    .then(function(results) {
        // console.log('checkDate results', results);
        // console.log('length: ', results.length);
        return results;
    })

    // console.log('dateResults: ', dateResults);

    if (dateResults.length == 0) {
        return false
    } else if (dateResults.length == 1) {
        return dateResults;
    } else if (dateResults.length > 1) {
        throw Error('Duplicate activity entry');
    }
    
}