var express = require('express');
const changeGamif = require('./appDatabase/changeGamif');
// const saveSubscription = require('./appDatabase/saveSubscription');
var router = express.Router();

router.post('/', async function(req, res, next) {
  // console.log('req body: ', req.body);
//   saveSubscription(req.body)
//   .then(function(results) {
//     res.send(results);
//   })

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