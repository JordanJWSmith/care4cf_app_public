const getRoutine = require('./getRoutine');
var readData = require('./readData');

module.exports = async function(userID, offset) {

/** 
* Brief description of the function here.
* @summary Get the routine descriptions of activities for a given week
* @param {number} userID - The current user's ID against which to check activities
* @param {number} offset - An offset to determine how many weeks in the past to jump (i.e. 0 -> current week, 1 -> one week ago)
* @return {object} An object containing two objects: An array of dates comprising the given week, and an object containing descriptions of the activities logged within that week
*/
    

    if ((typeof userID !== 'number') || (typeof offset !== 'number') || arguments.length !== 2) {
        return false;
    } else {

        var today = new Date();
        today.setDate(today.getDate() - (offset * 7));

        var dateList = [];
        var routineDict = {};

        for (var i = 0; i < 7; i++) {
            var newDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate())
            await getRoutine(userID, newDate)
            .then(function(routineResult) {
                dateList.push(newDate);
                routineDict[newDate] = routineResult;
            })
            today.setDate(today.getDate()-1);
        }

        return {
            dateList: dateList,
            routineDict: routineDict
        }
    }
}