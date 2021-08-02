var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    
    res.render('normalRoutine', {title: 'My Routine'})
})

module.exports = router;