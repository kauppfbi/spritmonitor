var data = require('../data');

module.exports = function(app, passport){
	// =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index');
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profil', isLoggedIn, function(req, res) {
        res.render('profilinformationen', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/erweitertesuche', isLoggedIn, function(req, res){
        res.render('erweiterteSuche');
    });

    app.get('/favoriten', isLoggedIn, function(req, res){
        res.render('favoriten');
    });

    app.get('/neuesFahrzeug', isLoggedIn, function(req, res){
        res.render('fahrzeugAnlegen', {modelle : data.modelle});
    });

    app.get('/neueBetankung', isLoggedIn, function(req, res){
        res.render('BetankungHinzufuegen');
    });

    app.get('/spritverlauf', isLoggedIn, function(req, res){
        res.render('spritverlauf');
    });

    app.get('/fahrzeuge', isLoggedIn, function(req, res){
        res.render('fahrzeuge');
    });
    
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/favoriten', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/favoriten', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/neuesFahrzeug', isLoggedIn, function(req, res){
        //fetch all parameters
        var marke = req.body.Hersteller;
        var modell = req.body.Modell;

        //getting them in one Object
        //{ProfilID, modelle[brand].index, Baujahr, PS, Kraftstoffart, Getriebeart, Kilometerstand}

        console.log('Marke: ' + marke + '\nModell: ' + modell);

        res.redirect('/neuesFahrzeug');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};