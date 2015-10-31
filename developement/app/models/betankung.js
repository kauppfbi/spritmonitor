//TODO:
//alle Methoden außer createUser, createVehicle & getBetankungByFzgID müssen zwangsläufig überarbeitet werden!!!!

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

    //var betankungID = (profilID+1)*100+betankungen.length;
	//betankungen.id = betankungID;
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

//TODO: muss der neuen json struktur angepasst werden!
var getBetankungByProfilID = function(profilID){
    var obj = jsonfile.readFileSync(file);
    var alleBetankungen = obj.betankungen;
    return alleBetankungen[profilID];
};

var getBetankungByFzgID = function(vehicleID){
    var obj = jsonfile.readFileSync(file);
    var alleBetankungen = obj.betankungen;

    var profilID;
    if(String(vehicleID).length == 3){
        profilID = parseInt(String(vehicleID).charAt(0));
    } else{
        profilID = parseInt(String(vehicleID).charAt(0) + String(vehicleID).charAt(1));
    }
    
    return alleBetankungen[profilID][vehicleID-(100*profilID)];
};

//Betankung wird übergeben
//entsprechende Betankung wird herausgesucht und
//ersetzt
var updateBetankung = function(betankung, profilID){
    var obj = jsonfile.readFileSync(file);
    var alleBetankungen = obj.betankungen;
    
    console.log(betankung);
    console.log(betankung.laufendeNr);
    
    for(var i=0; i<=alleBetankungen.length; i++){
        if(alleBetankungen[profilID].laufendeNr==betankung.laufendeNr){
            alleBetankungen[profilID] = betankung;
        }
    }
};


//Keine Vollständige Implementierung
var deleteBetankung = function(betankung, profilID){
    var obj = jsonfile.readFileSync(file);
    var alleBetankungen = obj.betankungen;
    
    console.log(profilID);
    console.log(betankung.laufendeNr);
    
    if(alleBetankungen[profilID].laufendeNr==betankung.laufendeNr){

        console.log("Eintrag gelöscht");
    }    
};

var createUser = function(){
    var obj = jsonfile.readFileSync(file);
    var alleBetankungen = obj.betankungen;

    alleBetankungen.push(new Array());

    obj.betankungen = alleBetankungen;

    fs.writeFile(file, JSON.stringify(obj, null, 4), function(err) {
        if(err) {
          console.log(err);
      } else {
          console.log("JSON saved to " + file);
      }
  });
};

var createVehicle = function(profilID){
    var obj = jsonfile.readFileSync(file);
    var alleBetankungen = obj.betankungen;

    alleBetankungen[profilID].push(new Array());

    obj.betankungen = alleBetankungen;

    fs.writeFile(file, JSON.stringify(obj, null, 4), function(err) {
        if(err) {
          console.log(err);
      } else {
          console.log("JSON saved to " + file);
      }
  });
};

//Exports
exports.createBetankung = createBetankung;
exports.getBetankungByProfilID = getBetankungByProfilID;
exports.deleteBetankung = deleteBetankung;
exports.updateBetankung = updateBetankung;
exports.createUser = createUser;
exports.createVehicle = createVehicle;