const getRoutine = require('./getRoutine');
var readData = require('./readData');

module.exports = async function(userID, offset) {

    var today = new Date();
    today.setDate(today.getDate() - offset)
    // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());

    routineList = [];

    for (var i = 0; i < 7; i++) {
        // today.setDate(today.getDate()-1);
        newDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate())
        // console.log('newDate', newDate);
        await getRoutine(userID, newDate)
        .then(function(routineResult) {
            // console.log(newDate, routineResult);
            routineList.push(routineResult)
        })
        today.setDate(today.getDate()-1);
        // console.log(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate() - i))
    }

    // console.log('routineList: ', routineList);
    return routineList;

}