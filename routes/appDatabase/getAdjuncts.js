var readData = require('./readData');

module.exports = async function() {
/** 
* @summary Retrieves all adjunct descriptions
* @return {object} An object containing all adjunct descriptions
*/
   

        var checkLogin =  "SELECT * FROM adjunctdescriptions";
        var results = await readData(checkLogin);
        
        return { 
           results
        }
    }