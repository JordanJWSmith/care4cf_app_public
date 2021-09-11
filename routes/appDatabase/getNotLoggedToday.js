var readData = require('./readData');

module.exports = async function() {
    /** 
    * Brief description of the function here.
    * @summary Retrieve subscriptions for all users that have not logged an activity for the current day
    * @return {object} An object containing subscriptions
    */
    

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
    var subsResults = await readData(getSubs, todayString);

    return { 
           subsResults
    }
}
    