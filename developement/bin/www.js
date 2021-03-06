var express = require ('express');
var app = express();
//app.use(app.router);
var router = express.Router();
//console.log("Router: "+ router);
var data = require('../data');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var busboy = require('connect-busboy');
//var multer  = require('multer');

var session = require('express-session');

//routes
var index = require('../routes/index');
//var posts = require('../routes/posts');

var homeRoute = require('../routes/home');
var profilRoute = require('../routes/profil');
var fahrzeugRoute = require ('../routes/fahrzeuge');
var statistikRoute = require('../routes/statistik');


// configuration ===============================================================

// pass passport for configuration
require('../config/passport')(passport); 
//set up application

//log every request to the console
app.use(morgan('dev'));
//read cookies
app.use(cookieParser());
//get information from html forms
app.use(bodyParser());
//app.use(busboy());

//View engine
//set directory
app.set('views', './views');
//set jade as template engine
app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('../app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


app.set('port', process.env.PORT || 3000);

//Middleware
app.use(express.static('./public'));


app.use('/', index);
//app.use('/posts', index);
app.use('/home', homeRoute);
app.use('/meinprofil', profilRoute);
app.use('/meinefahrzeuge', fahrzeugRoute);
app.use('/statistik', statistikRoute);


//Error Handling
app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Internal Error' + err.stack);
});


exports.start = function(){
	app.listen(app.get('port'), function(){
		console.log('Express ready on http://127.0.0.1:' + app.get('port'));
		//console.log("Router:\n" + router);
		//console.log(data.modelle['audi'][0]);
	});
};