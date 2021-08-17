var readData = require('./readData');
const updateToken = require('./updateToken');
// var updateRecords = require('./updateRecords');
// const fetch = require('node-fetch');


module.exports = async function(userDetails) {
    // console.log('new user Details: ', userDetails);


    var newUser = 'INSERT INTO users SET ? ';

    // var results = await updateRecords(newUser, userDetails);
    // console.log('newUser results:', results);
    await readData(newUser, userDetails)
    .then(async function(results) {
        // var accessToken = userDetails.msalToken;
        // var userID = userDetails.userID;
        // await updateToken(accessToken, userID)
        // .then(function(results){
        //     return true;
        // })

        // console.log('new user results:', results)
        return true;
    })
    .then(function(results) {
        return true
    })
    return true;
}