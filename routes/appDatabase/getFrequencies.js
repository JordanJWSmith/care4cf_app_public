var readData = require('./readData');

module.exports = async function() {

   /** 
* @summary Retrieves all frequency descriptions
* @return {object} An object containing all frequency descriptions
*/
   

        var getFrequencies =  "SELECT * FROM frequencies";
        var results = await readData(getFrequencies);
        
        return { 
           results
        }
    }