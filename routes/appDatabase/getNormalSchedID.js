var readData = require('./readData');

module.exports = async function(userID) {

  /** 
  * Brief description of the function here.
  * @summary Retrieve the ID of the given user's current normal schedule
  * @param {number} userID - The current users ID against which to check schedules
  * @return {object} An object containing the given user's current normal schedule ID
  */
   

  if ((typeof userID !== "number") || (arguments.length !== 1)) {
    return false
}

        var getNormalSched =  "SELECT scheduleID FROM normalschedules WHERE main = 1 AND userID = ?";
        var normalSchedValue = [userID];
        var results = await readData(getNormalSched, normalSchedValue);

      if (results.length < 1) {
        return false
      }
        
      return { 
          results
      }
}
    