var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');



/* GET buttons page. */
router.get('/', function(req, res, next) {
    res.redirect('/');
});



module.exports = router;
