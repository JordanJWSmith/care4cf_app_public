const getNotLoggedToday = require('./getNotLoggedToday.js');
const sendPush = require('./sendPush.js');
var readData = require('./readData');


module.exports = async function() {

var counter = 0;

await getNotLoggedToday()
.then(function(subs) {
    // console.log('subs: ', subs);
    for (i=0; i<subs.subsResults.length; i++) {
        var subscription = subs.subsResults[i].subscription
        var payload = 'Don\'t forget to log your activities today!';
        // console.log(subscription);
        sendPush(JSON.parse(subscription), payload);
        counter++;
    }
})
   
return counter;
}
    