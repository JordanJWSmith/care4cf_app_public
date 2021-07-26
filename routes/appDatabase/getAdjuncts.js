var readData = require('./readData');

module.exports = async function() {

        var checkLogin =  "SELECT * FROM adjunctdescriptions";
        // var data = ['Device-Free', 'Device-Dependent'];
        var results = await readData(checkLogin);
        
        return { 
           results
        }
    }