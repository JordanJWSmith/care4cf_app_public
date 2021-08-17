var readData = require('./readData');

module.exports = async function() {

        var getSubs =  "SELECT pushNotificationKey FROM users";
        var results = await readData(getSubs);
        
        return { 
           results
        }
    }