var readData = require('./readData');
const updateToken = require('./updateToken');
// var updateRecords = require('./updateRecords');
// const fetch = require('node-fetch');


module.exports = async function(userID) {
    console.log('new user Details: ', userID);
/** 
* @summary Add a new user to the database
* @param {number} userID - The ID of the current user to add to the database
* @return {Boolean} True
*/
    


    var newUser = 'INSERT INTO users VALUES (?, 1) ';
    newUserValues = [userID];

    // var results = await updateRecords(newUser, userDetails);
    // console.log('newUser results:', results);
    await readData(newUser, newUserValues)
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