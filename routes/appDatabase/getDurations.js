var readData = require('./readData');

module.exports = async function() {

        var checkLogin =  "SELECT * FROM durations";
        // var data = ['Device-Free', 'Device-Dependent'];
        var results = await readData(checkLogin);
        
        return { 
           results
        }
    }
    