var express = require('express');
var router = express.Router();

router.get('/erweitertesuche', function(req, res){
	res.render('index');
});

module.exports = router;