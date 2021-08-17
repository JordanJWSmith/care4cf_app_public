var readData = require('./readData');

module.exports = async function() {

        var getSubs =  "SELECT subscription FROM subscriptions";
        var results = await readData(getSubs);
        
        return { 
           results
        }
    }