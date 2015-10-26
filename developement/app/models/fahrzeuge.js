//in Bearbeitung

var file = '../developement/data/fahrzeuge.json';

var jsonfile = require('jsonfile');
var fs = require('fs');
var util = require('util');


/*
returns Fahrzeug-Objekt mit der übergebenen ID
*/
var findById = function(id){

};

//vehicle ist das aufbereitete fahrzeug-Objekt
var createVehicle = function(vehicle, profilID){
	var obj = jsonfile.readFileSync(file);
	var alleFahrzeuge = obj.fahrzeuge;
	var fahrzeuge = alleFahrzeuge[profilID];
	
	fahrzeuge.push(vehicle);

	obj.fahrzeuge[profilID] = fahrzeuge;

	fs.writeFile(file, JSON.stringify(obj, null, 4), function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("JSON saved to " + file);
		}
	}); 
};

var getVehicleByProfilID = function(profilID){
	var obj = jsonfile.readFileSync(file);
	var alleFahrzeuge = obj.fahrzeuge;

	return alleFahrzeuge[profilID];
};

var createUser = function(){
	console.log("Platzhalter in fahrzeuge.json für neuen User eingerichtet!");
	var obj = jsonfile.readFileSync(file);
	var alleFahrzeuge = obj.fahrzeuge;

	alleFahrzeuge.push(new Array());

	obj.fahrzeuge = alleFahrzeuge;

	fs.writeFile(file, JSON.stringify(obj, null, 4), function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("JSON saved to " + file);
		}
	}); 
};

exports.findById = findById;
exports.createVehicle = createVehicle;
exports.getVehicleByProfilID = getVehicleByProfilID;
exports.createUser = createUser;

