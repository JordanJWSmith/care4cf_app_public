var readData = require('./readData');

module.exports = async function() {
/** 
* @summary Retrieves all adjunct time descriptions
* @return {object} An object containing all adjunct time descriptions
*/
   

        var checkLogin =  "SELECT * FROM adjuncttimes";
        var results = await readData(checkLogin);
        
        return { 
           results
        }
    }