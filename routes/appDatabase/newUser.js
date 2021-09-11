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

    await readData(newUser, newUserValues)
    .then(async function(results) {
        return true;
    })
    .then(function(results) {
        return true
    })
    return true;
}