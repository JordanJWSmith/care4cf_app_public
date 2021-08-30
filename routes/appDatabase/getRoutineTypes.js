var readData = require('./readData');

module.exports = async function() {

    /** 
* @summary Retrieves all routine type descriptions
* @return {object} An object containing all routine type descriptions
*/ 

        var getRoutineType =  "SELECT * FROM routinetype";
        var results = await readData(getRoutineType);
        
        return { 
           results
        }
    }