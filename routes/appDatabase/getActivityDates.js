var readData = require('./readData');
var dateStreaks = require('date-streaks');
var moment = require('moment');

module.exports = async function(userID) {

        var getDates =  "SELECT date FROM activities WHERE userID = ?";
        var getDatesValue = [userID];
        var results = await readData(getDates, getDatesValue);

        var dateArr = []
        for (i=0; i<results.length; i++) {
            // console.log('date: ', results[i].date, typeof results[i].date);
            // var dateFormat = (results[i].date)
            var dateFormat = moment(results[i].date).add(1, 'days');
            // console.log('valid? ', da);
            // console.log(new Date((dateFormat, typeof dateFormat)));
            dateArr.push(dateFormat);
        }

        // console.log('dates: ', dateArr);

        var streakSummary = dateStreaks.summary(dateArr);

        console.log(dateStreaks.summary(dateArr));

        // console.log('dates: ', results)
        
        return streakSummary;
           
        
    }