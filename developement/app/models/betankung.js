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
var createBetankung = function (betankung, profilID, vehicleID){
	var obj = jsonfile.readFileSync(file);
	var alleBetankungen = obj.betankungen;
    var vehicleID = (vehicleID-((profilID+1)*100));
    console.log(vehicleID);
    var betankungen = alleBetankungen[profilID][vehicleID];
    
    if(betankungen.length == undefined){
        betankungID = vehicleID*100;
    }else{
        var betankungID = (((profilID*100)+vehicleID)*100)+betankungen.length;
    }
    

    betankung.id = betankungID;
    betankungen.push(betankung);
    obj.betankungen[profilID][vehicleID] = betankungen;

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
    var betankung = alleBetankungen[profilID];
    
    for(var i=0; i<alleBetankungen[profilID].length; i++){
        for(var z=0; z<alleBetankungen[profilID][i].length; z++){
            betankung[i] = alleBetankungen[profilID][i][z];
        }
    }  
    return betankung;
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

var getDatumVerbrauch = function(profilID, vehicleID){
    var obj = jsonfile.readFileSync(file);
    var alleBetankungen = obj.betankungen;
    var betankungen = alleBetankungen[profilID][vehicleID];
    var datumVerbrauch = {};
    
    for(var i=0; i<alleBetankungen[profilID][vehicleID].length); i++){
        var durchVerbrauch = (alleBetankungen[profilID][vehicleID][i].Liter / ((alleBetankungen[profilID][vehicleID][i].Distanz)*100);
        datumVerbrauch.push(alleBetankungen[profilID][vehicleID][i].Datum+" "+durchVerbrauch);
    }
}


var updateBetankung = function(betankung, profilID, vehicleID){
    var obj = jsonfile.readFileSync(file);
    var alleBetankungen = obj.betankungen;
    
    
    
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