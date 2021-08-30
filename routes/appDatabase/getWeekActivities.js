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
        today.setDate(today.getDate() - (offset * 7))

        // var start = new Date();
        // start.setDate(start.getDate() - (offset * 7));
        // var startDate = start.getFullYear()+'-'+(start.getMonth()+1)+'-'+(start.getDate())
        
        // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());

        // var routineList = [];
        var dateList = [];
        var routineDict = {};

        for (var i = 0; i < 7; i++) {
            // today.setDate(today.getDate()-1);
            newDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate())
            // console.log('newDate', newDate);
            await getRoutine(userID, newDate)
            .then(function(routineResult) {
                // console.log(newDate, routineResult);
                // routineList.push(routineResult)
                dateList.push(newDate);
                routineDict[newDate] = routineResult;
            })
            today.setDate(today.getDate()-1);
            // console.log(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate() - i))
        }

        // console.log('dateList: ', dateList)
        // console.log('routineList: ', routineList);
        // console.log('startDate: ', startDate);
        // console.log('routineDict from funcftion: ', routineDict);
        return {
            // routine: routineList,
            dateList: dateList,
            // startDate: startDate,
            routineDict: routineDict
        }
    }
}