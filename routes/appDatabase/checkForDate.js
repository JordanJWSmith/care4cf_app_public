var readData = require('./readData');

module.exports = async function(userID, date) {

    var checkDate = "SELECT * FROM activities WHERE userID = ? AND date = ?";
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
        return true
    } else if (dateResults.length > 1) {
        throw Error('Duplicate activity entry');
    }
    // return dateResults;

    // var checkActivity = "SELECT"

    // if ( (typeof userID !== "number")) {
    //     return {
    //         scheduleExists: false 
    //     }          
    // } else {

        // var checkLogin = 'SELECT * FROM users WHERE email = "' + email + '"';
        // var checkLogin =  "SELECT * FROM normalschedules WHERE userID = ?";
        // var data = [userID];
        // var results = await readData(checkLogin, data);
        // console.log('normalExists results:', results);
        // console.log('normalExists check: ', results.length > 0);
        
        // return { 
        //    scheduleExists: (results.length > 0),
        //    fName: results[0].fName 
        // }
    // }
    
}