var readData = require('./readData');

module.exports = async function() {

        var getRoutineType =  "SELECT * FROM routinetype";
        var results = await readData(getRoutineType);
        
        return { 
           results
        }
    }