//in Bearbeitung

var file = './data/betankungen.json';

var jsonfile = require('jsonfile');
var fs = require('fs');
var util = require('util');


var findById = function (id) {
	var obj = jsonfile.readFileSync(file);
	var betankungen = obj.betankungen;
	return betankungen[id];
};

//Hier müssen noch die Daten aus den Fromularen übergeben werden
/* 
Daten werden zur besseren Übersicht in einem 'Betankungs-Objekt' zusammengefasst übergeben
Die Zusammenfassung der Daten in einem Objekt erfolgt innerhalb der aufrufenden Methode
*/
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


//Keine Ahnung ob das so funktioniert...
var readBetankung = function(profilID){
    
}


//Exports
exports.createBetankung = createBetankung;
exports.findById = findById;