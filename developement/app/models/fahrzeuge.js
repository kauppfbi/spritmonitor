var file = '../developement/data/fahrzeuge.json';

var jsonfile = require('jsonfile');
var fs = require('fs');
var util = require('util');
var Betankung = require('./betankung');

/*
returns Fahrzeug-Objekt mit der übergebenen ID
*/
var findById = function(id){
	
};

//vehicle ist das aufbereitete fahrzeug-Objekt
var createVehicle = function(vehicle, profilID){
	Betankung.createVehicle(profilID);
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

	var fahrzeugeProfil = new Array();

	for(var i = 0; i < alleFahrzeuge[profilID].length; i++){
		if(alleFahrzeuge[profilID][i].aktiv)
		fahrzeugeProfil.push(alleFahrzeuge[profilID][i]);
	}

	return fahrzeugeProfil;
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
	Betankung.createUser();
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
		if(fahrzeugeProfil[i].aktiv)
		fahrzeugeBeschreibungen.push(fahrzeugeProfil[i].marke + " " + fahrzeugeProfil[i].modell+" #"+fahrzeugeProfil[i].id);
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

var deleteFahrzeug = function(vehicleID, profilID){
	var obj = jsonfile.readFileSync(file);
	var alleFahrzeuge = obj.fahrzeuge;
	var fahrzeugeProfil = alleFahrzeuge[profilID];


	var index = vehicleID-(profilID+1)*100;
	fahrzeugeProfil[index].aktiv = false;

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

var searchExtended = function(bedingungen){
	console.log(bedingungen);
	var returnFahrzeuge = new Array();
	var obj = jsonfile.readFileSync(file);
	var alleFahrzeuge = obj.fahrzeuge;

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
        //console.log(alleFahrzeuge.length);
        for(var i = 0; i < alleFahrzeuge.length; i++){

        	var length = alleFahrzeuge[i].length;
        	//console.log(length);
        	for(var j = 0; j < length; j++){
        		if(bedingungen.typ == 'alle' || bedingungen.typ == alleFahrzeuge[i][j].typ){
        			//console.log('Typ gefunden');
        			if(bedingungen.marke == 'alle' || bedingungen.marke == alleFahrzeuge[i][j].marke){
        				//console.log('Marke gefunden');
        				if(bedingungen.modell == 'alle' || bedingungen.modell == alleFahrzeuge[i][j].modell){
        					//console.log('Modell gefunden');
        					if(bedingungen.kraftstoff == 'alle' || bedingungen.kraftstoff == alleFahrzeuge[i][j].antriebsart){
        						if(bedingungen.getriebe == 'alle' || bedingungen.getriebe == alleFahrzeuge[i][j].getriebeart){
        							if(bedingungen.baujahr == 'alle' || (bedingungen.baujahr[0] >= alleFahrzeuge[i][j].baujahr && bedingungen.baujahr[1] <= alleFahrzeuge[i][j].baujahr)){
        								if(bedingungen.leistung == 'alle' || (bedingungen.leistung[0] >= alleFahrzeuge[i][j].leistung && bedingungen.leistung[1] <= alleFahrzeuge[i][j].leistung)){
        									console.log('Passendes Fahrzeug gefunden!');
        									returnFahrzeuge.push(alleFahrzeuge[i][j]);
        								}
        							}
        						}
        					}
        				}
        			}
        		}
        	}

        }
        console.log(returnFahrzeuge);
        return returnFahrzeuge;
};


//exports.findById = findById;
exports.createVehicle = createVehicle;
exports.getVehiclesByProfilID = getVehiclesByProfilID;
exports.createUser = createUser;
exports.search = search;
exports.getFahrzeugbeschreibungByProfilID = getFahrzeugbeschreibungByProfilID;
exports.updateFahrzeug = updateFahrzeug;
exports.deleteFahrzeug = deleteFahrzeug;
exports.searchExtended = searchExtended;