var readData = require('./readData');

module.exports = async function(userID) {

  if ((typeof userID !== "number") || (arguments.length !== 1)) {
    return false
}

        var getNormalSched =  "SELECT scheduleID FROM normalschedules WHERE main = 1 AND userID = ?";
        var normalSchedValue = [userID];
        // var data = ['Device-Free', 'Device-Dependent'];
        var results = await readData(getNormalSched, normalSchedValue);

      //   console.log(results);

      if (results.length < 1) {
        return false
      }
        
      return { 
          results
      }
}
    