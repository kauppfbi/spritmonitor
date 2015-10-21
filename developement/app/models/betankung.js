//in Bearbeitung

var file = './data/betankungen.json';

var bcrypt = require('bcrypt-nodejs');
var jsonfile = require('jsonfile');
var fs = require('fs');
var util = require('util');


var findById = function (id) {
	var obj = jsonfile.readFileSync(file);
	var user = obj.user;
	return user[id];
};

//Hier müssen noch die Daten aus den Fromularen übergeben werden
var createBetankung = function (profilID, Datum, Kraftstoff, Liter, Kilometer, Vollbetankung){
	var obj = jsonfile.readFileSync(file);
	var betankungen = obj.betankungen;

	var newBetankung = {};
	newBetankung.profilID = profilID;
    newBetankung.Datum = Datum;
    newBetankung.Kraftstoff = Kraftstoff;
    newBetankung.Liter = Liter;
    newBetankung.Kilometer = Kilometer;
    newBetankung.Vollbetanung = Vollbetankung;

	betankungen.push(newBetankung);
	obj.betankungen = betankungen;

	fs.writeFile(file, JSON.stringify(obj, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + file);
    }
    return newBetankung;
}); 
};


//Exports
exports.createBetankung = createBetankung;
exports.findById = findById;