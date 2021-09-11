var express = require('express');
const changeGamif = require('./appDatabase/changeGamif');
var router = express.Router();

// Change the user's gamification settings and 
// send the result
router.post('/', async function(req, res, next) {

    var body = req.body;
    var set = body.set;
    var userID = body.userID;
    console.log('gamificaton settings received: ', body)

    var changed = await changeGamif(set, userID)
    .then(function(changeResults) {
        console.log('changed: ', changeResults)
        res.send(changed);
    })

    

});
  
module.exports = router;