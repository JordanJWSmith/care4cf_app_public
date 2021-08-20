var readData = require('./readData');

module.exports = async function(userID) {

        var getGamification =  "SELECT gamification FROM users WHERE userID = ?";
        var gamificationValue = [userID]; 
        var results = await readData(getGamification, gamificationValue);

        // console.log('gamification:', results[0].gamification);
        // console.log('gamification:', results)
        
        return  results[0].gamification;
        
    }