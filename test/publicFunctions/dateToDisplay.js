module.exports = function dateToString(date) {
    if (typeof date !== "string") {
        return false
    }

    convDate = new Date(date.replace(/-/g, "/"));
    // console.log('convDate: ', convDate);
    var weekDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var dayIndex = convDate.getDay();
    // console.log('dayIndex: ', dayIndex);
    var monthIndex = convDate.getMonth();
    // var dayString = convDate.getDate().toString();
    var day = convDate.getDate();
    // var lastChar = dayString.charAt(dayString.length-1);

    appDict = {
        1:'st',
        2:'nd',
        3:'rd',
        21:'st',
        22:'nd',
        23:'rd',
        31:'st'
    }

    if (appDict[parseInt(day)]) {
        var append = appDict[parseInt(day)];
    } else {
        var append = "th";
    }

    // console.log('test');
    // console.log(weekDays[dayIndex] + ' ' + day + append + ' ' + (months[monthIndex]) + ' ' + convDate.getFullYear());
    return weekDays[dayIndex] + '<br>' + day + append + ' ' + (months[monthIndex]) + ' ' + convDate.getFullYear();
}