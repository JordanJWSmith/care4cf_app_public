var readData = require('./readData');

module.exports = async function() {

    today = new Date();
    var todayString = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());

    var getSubs = `
    SELECT * FROM subscriptions s
    INNER JOIN
	    (SELECT userID FROM care4cf.users WHERE userID NOT IN 
		    (SELECT userID FROM care4cf.activities WHERE date = ?)
	    ) u
    ON s.userID = u.userID
    `
    var getSubsValues = [todayString];
        // var getUsers =  "SELECT * FROM users";
        // var data = ['Device-Free', 'Device-Dependent'];
    var subsResults = await readData(getSubs, todayString);
    // console.log('subsResults: ', subsResults);
    return { 
           subsResults
    }
}
    