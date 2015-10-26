var data = require('../data');
var Fahrzeug = require('../app/models/fahrzeuge');

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

        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);

        res.render('profilinformationen', {
            user : req.user, // get the user out of session and pass to template
            fahrzeuge : fahrzeugeProfil
        });
    });

    app.get('/erweitertesuche', isLoggedIn, function(req, res){
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        res.render('erweiterteSuche', {fahrzeuge : fahrzeugeProfil});
    });

    app.get('/favoriten', isLoggedIn, function(req, res){
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        res.render('favoriten', {fahrzeuge : fahrzeugeProfil});
    });

    app.get('/neuesFahrzeug', isLoggedIn, function(req, res){
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        res.render('fahrzeugAnlegen', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil});
    });

    app.get('/neueBetankung', isLoggedIn, function(req, res){
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        res.render('BetankungHinzufuegen', {fahrzeuge : fahrzeugeProfil});
    });

    app.get('/spritverlauf', isLoggedIn, function(req, res){
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        res.render('spritverlauf', {fahrzeuge : fahrzeugeProfil});
    });

    app.get('/fahrzeuge', isLoggedIn, function(req, res){
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        res.render('fahrzeuge', {fahrzeuge : fahrzeugeProfil});
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
        var profilID = req.user.id;
        console.log(profilID);
        var fahrzeug = {};

        fahrzeug.typ = req.body.Fahrzeugtyp;
        fahrzeug.marke = req.body.Hersteller;
        fahrzeug.modell = req.body.Modell;
        fahrzeug.bezeichnung = req.body.Bezeichnung;
        fahrzeug.baujahr = req.body.Baujahr;
        fahrzeug.leistung = req.body.Leistung;
        fahrzeug.antriebsart = req.body.Antriebsart;
        fahrzeug.getriebeart = req.body.Getriebeart;
        fahrzeug.kilometerstand = req.body.Kilometerstand;

        console.log(fahrzeug);

        Fahrzeug.createVehicle(fahrzeug, profilID);

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