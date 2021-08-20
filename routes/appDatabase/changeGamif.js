var readData = require('./readData');

module.exports = async function(set, userID) {

        var getGamification =  "UPDATE users SET gamification = ? WHERE userID = ?";
        var gamificationValue = [set, userID]; 
        var results = await readData(getGamification, gamificationValue);

        // console.log('gamification:', results[0].gamification);
        // console.log('gamification:', results)
        
        return  results;
        
    }