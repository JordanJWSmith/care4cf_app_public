function getDateList() {
      /** 
    * 
    * @summary Return an array containing the last seven days
    * @return {Array} An array containing date strings for the past seven days
    */


    var dateList = [];
    var today = new Date();
    for (var i = 0; i < 7; i++) {
        var newDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());
        dateList.push(newDate);
        today.setDate(today.getDate()-1);
    }

    return dateList;

}