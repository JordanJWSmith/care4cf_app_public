function dateToString(date) {
      /** 
    * 
    * @summary Convert a short formatted date into a long formatted date
    * @param {String} date - A date string
    * @return {String} A string containing a long formatted date
    */
   
    if ((typeof date !== "string") || (!(Date.parse(date.replace(/-/g, "/"))))) {
        console.log('error in date', date, typeof date)
        return false
    }
    
    var convDate = new Date(date.replace(/-/g, "/"));
    var weekDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var dayIndex = convDate.getDay();
    var monthIndex = convDate.getMonth();
    var day = convDate.getDate();

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

    return weekDays[dayIndex] + '<br>' + day + append + ' ' + (months[monthIndex]) + ' ' + convDate.getFullYear();
}