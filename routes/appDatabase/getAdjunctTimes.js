var readData = require('./readData');

module.exports = async function() {

        var checkLogin =  "SELECT * FROM adjuncttimes";
        // var data = ['Device-Free', 'Device-Dependent'];
        var results = await readData(checkLogin);
        
        return { 
           results
        }
    }