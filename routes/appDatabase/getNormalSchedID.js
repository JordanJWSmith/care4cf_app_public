var readData = require('./readData');

module.exports = async function(userID) {

        var getNormalSched =  "SELECT scheduleID FROM normalschedules WHERE main = 1 AND userID = ?";
        var normalSchedValue = [userID];
        // var data = ['Device-Free', 'Device-Dependent'];
        var results = await readData(getNormalSched, normalSchedValue);

      //   console.log(results);
        
        return { 
           results
        }
    }
    