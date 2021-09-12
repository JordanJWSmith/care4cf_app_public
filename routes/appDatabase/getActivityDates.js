var readData = require('./readData');
var dateStreaks = require('date-streaks');
var moment = require('moment');

module.exports = async function(userID) {

    /** 
    * Brief description of the function here.
    * @summary Checks the current user's logging activity and returns details of logging streaks
    * @param {number} userID - The current user's ID against which to check activity
    * @return {object} An object containing logging streak information
    */

    if (typeof userID !== 'number') {
        return false;
    }

    var getDates =  "SELECT date FROM activities WHERE userID = ?";
    var getDatesValue = [userID];
    var results = await readData(getDates, getDatesValue);

    var dateArr = []
    for (var i=0; i<results.length; i++) {
        var dateFormat = moment(results[i].date).add(1, 'days');
        dateArr.push(dateFormat);
    }

    var streakSummary = dateStreaks.summary(dateArr);

    if (!streakSummary.todayInStreak) {
        streakSummary.currentStreak = 0;
    }
    
    return streakSummary;
             
    }