//in Bearbeitung

var file = './data/betankungen.json';

var jsonfile = require('jsonfile');
var fs = require('fs');
var util = require('util');


var findById = function (id) {
	/*
    var obj = jsonfile.readFileSync(file);
	var betankungen = obj.betankungen;
	return betankungen[id]; */
};

//Hier müssen noch die Daten aus den Fromularen übergeben werden
/* 
Daten werden zur besseren Übersicht in einem 'Betankungs-Objekt' zusammengefasst übergeben
Die Zusammenfassung der Daten in einem Objekt erfolgt innerhalb der aufrufenden Methode
*/
var createBetankung = function (betankung, profilID){
	var obj = jsonfile.readFileSync(file);
	var alleBetankungen = obj.betankungen;
    var betankungen = alleBetankungen[profilID];

	betankungen.push(betankung);
	obj.betankungen[profilID] = betankungen;

	fs.writeFile(file, JSON.stringify(obj, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + file);
    }
}); 
};


var getBetankungByProfilID = function(profilID){
    var obj = jsonfile.readFileSync(file);
    var alleBetankungen = obj.betankungen;
    return alleBetankungen[profilID];
}


var updateBetankung = function(betankung, profilID){
    var obj = jsonfile.readFileSync(file);
    var alleBetankungen = obj.betankungen;
    
    alleBetankungen[profilID]=betankung;
    
}

//Exports
exports.createBetankung = createBetankung;
exports.getBetankungByProfilID = getBetankungByProfilID;