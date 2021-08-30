var readData = require('./readData');

module.exports = async function() {

    /** 
* @summary Retrieves all subscription objects
* @return {object} An object containing all stored subscriptions
*/ 

        var getSubs =  "SELECT subscription FROM subscriptions";
        var results = await readData(getSubs);
        
        return { 
           results
        }
    }