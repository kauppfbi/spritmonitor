var data = require('../data');
var Fahrzeug = require('../app/models/fahrzeuge');
var Betankung = require('../app/models/betankung');
var User = require('../app/models/user');
var bcrypt = require('bcrypt-nodejs');


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

        var selecetedVehicleID = req.query.id; 
        console.log('Selected vehicle: ' + selecetedVehicleID);
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        var betankung = Betankung.
        var fahrzeugBeschreibungen = Fahrzeug.getFahrzeugbeschreibungByProfilID(req.user.id, selecetedVehicleID);
        
        console.log("Beschreibung: " + fahrzeugBeschreibungen);
        
        if(fahrzeugBeschreibungen==null){
            console.error("Kein Fahrzeug zu ID");
            res.render('betankungHinzufuegen', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil, beschreibung: null});
        }
        res.render('betankungHinzufuegen', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil, beschreibung: fahrzeugBeschreibungen});
    });

    app.get('/spritverlauf', isLoggedIn, function(req, res){
        
        //var fzgId = req.query.id;
        var datumVerbrauch = Betankung.getDatumVerbrauch(3, 400);
        //console.log(datumVerbrauch);
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        res.render('spritverlauf', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil, datumVerbrauch : datumVerbrauch});
    });

    app.get('/fahrzeuge', isLoggedIn, function(req, res){
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        var fahrzeugBeschreibungen = Fahrzeug.getFahrzeugbeschreibungByProfilID(req.user.id);
        res.render('fahrzeuge', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil, beschreibung: fahrzeugBeschreibungen});
    });

    app.get('/404', isLoggedIn, function(req, res){
       res.render('404'); 
    });
    
    app.get('/startseite', isLoggedIn, function(req, res){
        console.log(req.user);
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        res.render('startseite', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil});
    });
    app.get('/meineBetankungen', isLoggedIn, function(req, res){
        var fahrzeugeProfil = Fahrzeug.getVehiclesByProfilID(req.user.id);
        var betankungen = Betankung.getBetankungByProfilID(req.user.id);
        var userID = req.user.id;
        res.render('meineBetankungen', {modelle : data.modelle, fahrzeuge : fahrzeugeProfil, betankungen: betankungen, userID: userID});
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

    app.get('/profilLoeschen', isLoggedIn, function(req, res){
        var profilId = req.query.id;

        User.deleteUser(profilId);

        res.redirect('/signup');
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/404', isLoggedIn, function(req, res){
        
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
        fahrzeug.anfangskilometerstand = fahrzeug.kilometerstand;
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
        
        var passwordHash = bcrypt.hashSync(req.body.Passwort, bcrypt.genSaltSync(8), null);
        console.log(passwordHash);
        if(passwordHash == req.user.password){
            user.id = req.user.id;
            user.email = req.body.eMail;
            user.password = req.user.password;
            user.anrede = req.body.Anrede;
            user.nachname = req.body.Nachname;
            user.vorname = req.body.Vorname;
            user.geburtsdatum = req.body.Geburtsdatum;
            user.straße = req.body.Straße;
            user.hausnummer = req.body.Hausnummer;
            user.postleitzahl = req.body.Postleitzahl;
            user.ort = req.body.Ort;
            user.land = req.body.Land;

            User.updateUser(user);
        } else {
           user.id = req.user.id;
            user.email = req.body.eMail;
            user.password = passwordHash;
            user.anrede = req.body.Anrede;
            user.nachname = req.body.Nachname;
            user.vorname = req.body.Vorname;
            user.geburtsdatum = req.body.Geburtsdatum;
            user.straße = req.body.Straße;
            user.hausnummer = req.body.Hausnummer;
            user.postleitzahl = req.body.Postleitzahl;
            user.ort = req.body.Ort;
            user.land = req.body.Land;

            User.updateUser(user); 
        }   
        
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