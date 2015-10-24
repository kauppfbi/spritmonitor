//in Bearbeitung

var file = '../developement/data/fahrzeuge.json';

var jsonfile = require('jsonfile');
var fs = require('fs');
var util = require('util');

var findById = function(id){

};

//vehicle ist das aufbereitete fahrzeug-Objekt
var createVehicle = function(vehicle){
	var obj = jsonfile.readFileSync(file);
	var fahrzeuge = obj.fahrzeuge;

	fahrzeuge.push(vehicle);
	obj.fahrzeuge = fahrzeuge;

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

