var readData = require('./readData');

module.exports = async function() {

    

        var checkLogin =  "SELECT * FROM techdescriptions WHERE techniqueType = ? OR techniqueType = ? ORDER BY techniqueType DESC";
        var data = ['Device-Free', 'Device-Dependent'];
        var results = await readData(checkLogin, data);
        
        return { 
           results
        }
    }
    
