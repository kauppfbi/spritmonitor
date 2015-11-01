var data = require('../data');
var Fahrzeug = require('../app/models/fahrzeuge');
var Betankung = require('../app/models/betankung');
var User = require('../app/models/user');
var betankData = require('../data/betankungen.json');
//var fs = require('fs');
/*var multer = require('multer');
var uploading = multer({
  dest: __dirname + '../public/uploads/',
  limits: {fileSize: 1000000, files:1},
});*/

module.exports = function(app, passport){
    'use strict';
	// =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {

        if (typeof req.user === 'undefined') {
        // variable is undefined
        res.redirect('/login');
        } else {
            res.redirect('/startseite');
        }
        
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
            modelle : data.modelle, 
            user : req.user, // get the user out of session and pass to template
            fahrzeuge : fahrzeugeProfil
        });
    });

    app.get('/profilAendern', isLoggedIn, function(req, res){
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);

        res.render('profilinformationenAendern', {
            modelle : data.modelle, 
            user : req.user, 
            fahrzeuge : fahrzeugeProfil
        });
    });

    app.get('/erweitertesuche', isLoggedIn, function(req, res){
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        res.render('erweiterteSuche', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil});
    });

    app.get('/favoriten', isLoggedIn, function(req, res){
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        res.render('favoriten', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil});
    });

    app.get('/neuesFahrzeug', isLoggedIn, function(req, res){
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        res.render('fahrzeugAnlegen', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil});
    });

    app.get('/neueBetankung', isLoggedIn, function(req, res){
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        
        var fahrzeugBeschreibungen = Fahrzeug.getFahrzeugbeschreibungByProfilID(req.user.id);
        
        console.log("Beschreibung: " + fahrzeugBeschreibungen);
        
        if(fahrzeugBeschreibungen==null){
            console.error("Kein Fahrzeug zu ID");
            res.render('betankungHinzufuegen', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil, beschreibung: null});
        }
        res.render('betankungHinzufuegen', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil, beschreibung: fahrzeugBeschreibungen});
    });

    app.get('/spritverlauf', isLoggedIn, function(req, res){
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        res.render('spritverlauf', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil});
    });

    app.get('/fahrzeuge', isLoggedIn, function(req, res){
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        var fahrzeugBeschreibungen = Fahrzeug.getFahrzeugbeschreibungByProfilID(req.user.id);
        res.render('fahrzeuge', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil, beschreibung: fahrzeugBeschreibungen});
    });

    app.get('/startseite', isLoggedIn, function(req, res){
        console.log(req.user);
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        res.render('startseite', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil});
    });
    app.get('/meineBetankungen', isLoggedIn, function(req, res){
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        res.render('meineBetankungen', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil, betankungen :             {
                "profilID": 0,
                "Datum": "2015-10-01",
                "Kraftstoff": "Super",
                "Liter": "10",
                "Kilometer": "20000"
            }});
    });
    
    app.get('/suche', isLoggedIn, function(req, res){
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        res.render('suche', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil});
        
    });

    app.get('/suchergebnisse', isLoggedIn, function(req, res) {


        var marke = req.query.marke;
        var modell = req.query.modell;

        console.log('Marke, Modell: ' + marke + modell);

        var suchergebnis = Fahrzeug.search(marke, modell);
        console.log(suchergebnis);

        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        res.render('suchergebnisse', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil, suchergebnis : suchergebnis});
    });
    
    app.get('/fahrzeuginformationen', isLoggedIn, function(req, res){
        
        var fahrzeugId = req.params.id;
        
        //get specific vehicle from id here
        var fahrzeug = Fahrzeug.findById(fahrzeugId);
        
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        res.render('fahrzeuginformationen', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil, fahrzeug : fahrzeug});
    });
    
    app.get('/fahrzeugLoeschen', isLoggedIn, function(req, res){
        var vehicleID = req.query.id; 

        Fahrzeug.deleteFahrzeug(vehicleID, req.user.id);

        res.redirect('/fahrzeuge');
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
        successRedirect : '/startseite', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/startseite', // redirect to the secure profile section
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
        fahrzeug.extras = req.body.Extras;
        fahrzeug.aktiv = true; 

        console.log(fahrzeug);

        Fahrzeug.createVehicle(fahrzeug, profilID);

        res.redirect('/neuesFahrzeug');
    });
    
    
    //in Arbeit-noch kein Anspruch auf Vollständigkeit
    app.post('/neueBetankung', isLoggedIn, function(req, res){
        
        var profilID = req.user.id;
        console.log("ProfilID = "+profilID);
        var betankung = {};
        //var vehicleID = Fahrzeug.getFahrzeugbeschreibungByProfilID(profilID);
        //var vehicleID = vehicleID.split(" #");
        var vehicleID = (req.body.Fahrzeug).split("#");
        var vehicleID = vehicleID[1];
        console.log("VehicleID: "+vehicleID);
                
        betankung.profilID = profilID;
        betankung.vehicleID = vehicleID;
        betankung.Fahrzeug = req.body.Fahrzeug;
        betankung.Datum = req.body.Datum;
        betankung.Kraftstoff = req.body.Sorte;
        betankung.Liter = req.body.Menge;
        betankung.Kilometer = req.body.Tachostand;
        betankung.Vollbetankung = req.body.Vollbetankung;
        betankung.Distanz = req.body.Distanz;
        betankung.Kosten = req.body.Kosten;
        betankung.Bemerkung = req.body.Bemerkung;
        betankung.Reifen = req.body.Reifen;
        betankung.Fahrweise = req.body.Fahrweise;
        betankung.Strecken = req.body.Strecken;
        betankung.Tankstelle = req.body.Tankstelle;
        betankung.Boardcomputer = req.body.Boardcomputer;
        
        console.log(betankung);
        Betankung.createBetankung(betankung, profilID, vehicleID);
        
        res.redirect('/neueBetankung');        
    });

    app.post('/profilAendern', isLoggedIn, function(req, res){
        var user = {};
        
        user.id = req.user.id;
        user.email = req.user.email; 
        user.password = req.user.password;
        user.Anrede = req.body.Anrede;
        user.Nachname = req.body.Nachname;
        user.Vorname = req.body.Vorname;
        user.Straße = req.body.Straße;
        user.Hausnummer = req.body.Hausnummer;
        user.Postleitzahl = req.body.Postleitzahl;
        user.Ort = req.body.Ort;
        user.Land = req.body.Land;
        
        User.updateUser(user);
        
        res.redirect('/profilAendern');        
    });

    app.post('/suche', isLoggedIn, function(req, res){
        var bedingungen = new Object(); 

        /*

        bedingungen.typ
        bedingungen.marke
        bedingungen.modell
        bedingungen.kraftstoff
        bedingungen.getriebe
        bedingungen.baujahr => [von, bis]
        bedingungen.leistung -> [von, bis]

        wenn nichts angegeben ist, dann mit 'alle' befüllen!
        */

        bedingungen.typ = 'alle';
        bedingungen.marke = 'Audi';
        bedingungen.modell = 'alle';
        bedingungen.kraftstoff = 'alle';
        bedingungen.getriebe = 'alle';
        bedingungen.baujahr = 'alle';
        bedingungen.leistung = 'alle';
        var ergebnis = Fahrzeug.searchExtended(bedingungen);

        //console.log(ergebnis);

        //do something 
        res.redirect('/suchergebnisse');
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