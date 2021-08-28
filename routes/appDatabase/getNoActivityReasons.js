var readData = require('./readData');

module.exports = async function() {

     /** 
* @summary Retrieves all descriptions of reasons for no activity
* @return {object} An object containing all descriptions of reasons for no activity
*/

        var getNoActivityDesc =  "SELECT * FROM noactivitydescriptions";
        var results = await readData(getNoActivityDesc);
        
        return { 
           results
        }
    }