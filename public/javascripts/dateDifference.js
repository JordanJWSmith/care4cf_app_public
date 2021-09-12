function dateDifference(first, second) {
      /** 
    * 
    * @summary Calculate the difference in days between two dates
    * @param {Date} first - A date object
    * @param {Date} second - A date object
    * @return {Number} A number representing the difference in days between the two arguments
    */
    if ((Object.prototype.toString.call(first) !== '[object Date]') 
    || (Object.prototype.toString.call(second) !== '[object Date]')
    || (arguments.length !== 2)) {
        return false;
    }
    
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}

