var readData = require('./readData');

module.exports = async function() {

        var getNoActivityDesc =  "SELECT * FROM noactivitydescriptions";
        var results = await readData(getNoActivityDesc);
        
        return { 
           results
        }
    }