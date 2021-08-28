var readData = require('./readData');

module.exports = async function() {

   /** 
   * @summary Retrieves all duration descriptions
   * @return {object} An object containing all duration descriptions
   */
   

        var checkLogin =  "SELECT * FROM durations";
        // var data = ['Device-Free', 'Device-Dependent'];
        var results = await readData(checkLogin);
        
        return { 
           results
        }
    }
    