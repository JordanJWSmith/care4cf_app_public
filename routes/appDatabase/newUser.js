var readData = require('./readData');
const updateToken = require('./updateToken');



module.exports = async function(userID) {
/** 
* @summary Add a new user to the database
* @param {number} userID - The ID of the current user to add to the database
* @return {Boolean} True
*/
    


    var newUser = 'INSERT INTO users VALUES (?, 1) ';
    var newUserValues = [userID];

    await readData(newUser, newUserValues)
    .then(async function(results) {
        return true;
    })
    .then(function(results) {
        return true
    })
    return true;
}