var readData = require('./readData');

module.exports = async function(userID) {

    if ((typeof userID !== "number") || (arguments.length !== 1)) {
        return false
    }

        var getGamification =  "SELECT gamification FROM users WHERE userID = ?";
        var gamificationValue = [userID]; 
        var results = await readData(getGamification, gamificationValue);

        // console.log('gamification:', results[0].gamification);
        console.log('gamification:', results)

        if (results.length < 1 ) {
            return false
        } else {
            return  results[0].gamification;
        }

        
        
    }