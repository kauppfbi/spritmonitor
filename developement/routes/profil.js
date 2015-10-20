var express = require('express');
var router = express.Router();

console.log('hierhierhier')
router.get('/meinprofil', function(req, res){
	res.render('Profil_infos.jade');
});

module.exports = router;