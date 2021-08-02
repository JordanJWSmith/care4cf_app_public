var readData = require('./readData');

module.exports = async function() {

        var getFrequencies =  "SELECT * FROM frequencies";
        var results = await readData(getFrequencies);
        
        return { 
           results
        }
    }