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
    var betankungen = new Array();
    
    if(alleBetankungen[profilID].length == 0){
        return null;
    }else{ if(alleBetankungen[profilID].length == 1){
        for(var i=0; z<alleBetankungen[profilID][0].length; i++){
            betankungen[0][i] = alleBetankungen[profilID][0][i];
        }
    }else{
    for(var i=0; i<alleBetankungen[profilID].length; i++){
        for(var z=0; z<alleBetankungen[profilID][i].length; z++){
            betankung[i][z] = alleBetankungen[profilID][i][z];
        }
    } 
}}
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
    var vehicleIndex = (vehicleID-(100*(profilID+1)));
    
    var betankungen = alleBetankungen[profilID][vehicleIndex];
    var datumVerbrauch = new Array();
    
    var betankungenFahrzeug = alleBetankungen[profilID][vehicleIndex];
    console.log(betankungenFahrzeug);
    
    for(var i=0; i<betankungenFahrzeug.length; i++){
        var durchVerbrauch = (betankungenFahrzeug[i].Liter / (betankungenFahrzeug[i].Distanz))*100;
        var temp = new Array();
        temp.push(betankungenFahrzeug[i].Datum);
        temp.push(durchVerbrauch);
        datumVerbrauch.push(temp);
    }
    
    return datumVerbrauch;
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

var getMainStats = function(vehicleID){
    var mainStats = {
        "verbrauch" : null,
        "reifen" : null,
        "fahrweise" : null,
        "strecken" : null, 
        "krafststoff" : null, 
        "kosten" : null
    }; 

    var obj = jsonfile.readFileSync(file);
    var alleBetankungen = obj.betankungen;

    var profilID;
    if (String(vehicleID).length == 3){
        profilID = parseInt(String(vehicleID).charAt(0))-1;
    } else if (String(vehicleID).length == 4){
        profilID = parseInt(String(vehicleID).charAt(0) + String(vehicleID).charAt(1))-1;
    }

    var vehicleIndex = (vehicleID-(100*(profilID+1)));

    var betankungenFahrzeug = alleBetankungen[profilID][vehicleIndex];

    var anfangsKMStand = Fahrzeug.getAnfangsKMStandByVehicleId(vehicleID);
    var gefahreneKM = anfangsKMStand - betankungenFahrzeug[betankungenFahrzeug.length-1].Kilometer;
    var mengeGesamt; 
    for (var i = 0; i < betankungenFahrzeug.length; i++){
        mengeGesamt += betankungenFahrzeug[i].Liter;
    }

    mainStats.verbrauch = gefahreneKM/mengeGesamt;


    return mainStats; 
};

//Exports
exports.createBetankung = createBetankung;
exports.getBetankungByProfilID = getBetankungByProfilID;
exports.deleteBetankung = deleteBetankung;
exports.updateBetankung = updateBetankung;
exports.createUser = createUser;
exports.createVehicle = createVehicle;
exports.getDatumVerbrauch = getDatumVerbrauch;
exports.getMainStats = getMainStats;