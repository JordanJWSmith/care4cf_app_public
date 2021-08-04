var readData = require('./readData');

module.exports = async function(userID, schedID) {

    var makeNormal = `
    UPDATE care4cf.normalschedules SET main = 0 WHERE userID = ?;
    UPDATE care4cf.normalschedules SET main = 1 WHERE userID = ? AND scheduleID = ?;
    `;

    var makeNormalValues = [userID, userID, schedID];

    var results = await readData(makeNormal, makeNormalValues)
    
    return results;

}
    
