

var express= require('express');
//console.log(express);
var router = express.Router();

	router.get('/', function(req, res){
		res.render('index');
	});


module.exports = router;