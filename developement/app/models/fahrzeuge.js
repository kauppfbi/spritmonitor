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
	
	//add fahrzeugID here 
	var fahrzeugID = (profilID+1)*100+fahrzeuge.length;
	vehicle.id = fahrzeugID;
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

var getVehiclesByProfilID = function(profilID){
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

var search = function(marke, modell){
	var obj = jsonfile.readFileSync(file);
	var alleFahrzeuge = obj.fahrzeuge;

	var fahrzeuge = new Array();

	//durchlaufe alle Fahrzeuge und vergleiche, ob diese zu den Suchparametern passen
	for (var i = 0; i < alleFahrzeuge.length; i++){
		var fahrzeugeProfil = alleFahrzeuge[i];
		for (var j = 0; j < fahrzeugeProfil.length; j++){
			if (fahrzeugeProfil[j].marke == marke){
				if (fahrzeugeProfil[j].modell == modell){
					fahrzeuge.push(fahrzeugeProfil[j]);
				}
			}
		}

	}
	if (fahrzeuge.isEmpty){
		return null;
	}
	else 
		return fahrzeuge;
};

var getFahrzeugbeschreibungByProfilID = function(profilID){
	var fahrzeugeBeschreibungen = new Array(); 

	var fahrzeugeProfil = getVehiclesByProfilID(profilID);

	if (fahrzeugeProfil.isEmpty){
		return null; 
	}

	for (var i = 0; i < fahrzeugeProfil.length; i++){
		fahrzeugeBeschreibungen.push(fahrzeugeProfil[i].marke + " " + fahrzeugeProfil[i].modell);
	}
	return fahrzeugeBeschreibungen;
};

var updateFahrzeug = function (newVehicle, profilID){
	var obj = jsonfile.readFileSync(file);
	var alleFahrzeuge = obj.fahrzeuge;

	var fahrzeugeProfil = alleFahrzeuge[profilID];

	for (var i = 0; i < fahrzeugeProfil.length; i++){
		if (fahrzeugeProfil[i].id == vehicle.id){
			fahrzeugeProfil[i] = vehicle;
		}
	}
	alleFahrzeuge[profilID] = fahrzeugeProfil;
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
exports.getVehiclesByProfilID = getVehiclesByProfilID;
exports.createUser = createUser;
exports.search = search;
exports.getFahrzeugbeschreibungByProfilID = getFahrzeugbeschreibungByProfilID;
exports.updateFahrzeug = updateFahrzeug;