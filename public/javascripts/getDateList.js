function getDateList() {
    var dateList = [];
    var today = new Date();
    for (var i = 0; i < 7; i++) {
        var newDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());
        dateList.push(newDate);
        today.setDate(today.getDate()-1);
    }

    return dateList;

}