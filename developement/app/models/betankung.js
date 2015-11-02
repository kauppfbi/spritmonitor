//TODO:
//alle Methoden außer createUser, createVehicle & getBetankungByFzgID müssen zwangsläufig überarbeitet werden!!!!

var file = './data/betankungen.json';

var jsonfile = require('jsonfile');
var fs = require('fs');
var util = require('util');
var Fahrzeug = require('./fahrzeuge');

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
        profilID = parseInt(String(vehicleID).charAt(0))-1;
    } else{
        profilID = parseInt(String(vehicleID).charAt(0) + String(vehicleID).charAt(1))-1;
    }
    
    return alleBetankungen[profilID][vehicleID-(100*(profilID+1))];
};

var getDatumVerbrauch = function(profilID, vehicleID){
    
    //parameter profilId muss aus vehicleid ausgeslesen werden!
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
        "kraftstoff" : null,
        "Kilometer" : null, 
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

    //console.log(betankungenFahrzeug);

    var anfangsKMStand = Fahrzeug.getAnfangsKMStandByVehicleId(vehicleID);
    var gefahreneKM = betankungenFahrzeug[betankungenFahrzeug.length-1].Kilometer - anfangsKMStand;
    var mengeGesamt = 0; 
    //Menge Reifen
    var mengeWinterreifen = 0;
    var mengeSommerreifen = 0; 
    var mengeGanzjahresreifen = 0; 
    //menge Fahrweise
    var mengeSparsam = 0; 
    var mengeNormal = 0; 
    var mengeSchnell = 0; 
    // menge strecken
    var mengeAutobahn = 0;
    var mengeLandstrasse = 0; 
    var mengeStadt = 0;
    //menge kraftsstoffsorte
    var mengeDiesel = 0; 
    var mengeSuper = 0;
    var mengeE10 = 0; 
    var mengeSuperPlus = 0;  
    var mengeErdgas = 0;


    //Deklaration der Kilometer-Variablen
    var streckeWinterreifen = 0;
    var streckeSommerreifen = 0; 
    var streckeGanzjahresreifen = 0; 
    //strecke Fahrweise
    var streckeSparsam = 0; 
    var streckeNormal = 0; 
    var streckeSchnell = 0; 
    // strecke strecken
    var streckeAutobahn = 0;
    var streckeLandstrasse = 0; 
    var streckeStadt = 0;

    var streckeDiesel = 0;
    var streckeSuper = 0;
    var streckeSuperPlus = 0; 
    var streckeE10 = 0;  
    var streckeErdgas = 0; 

    var kosten = 0;

    for (var i = 0; i < betankungenFahrzeug.length; i++){
        
        if(typeof betankungenFahrzeug[i].Strecken !== 'undefined'){
            console.log('Strecken ' + i + ' not undefined');
            //console.log('Type of ' + i + typeof betankungenFahrzeug[i].Strecken);
            

            if(typeof betankungenFahrzeug[i].Strecken == 'string'){
                if(betankungenFahrzeug[i].Strecken == 'Land'){
                    streckeLandstrasse += parseInt(betankungenFahrzeug[i].Distanz);
                    mengeLandstrasse += parseInt(betankungenFahrzeug[i].Liter);
                } else if (betankungenFahrzeug[i].Strecken == 'Autobahn'){
                    streckeAutobahn += parseInt(betankungenFahrzeug[i].Distanz);
                    mengeAutobahn += parseInt(betankungenFahrzeug[i].Liter);
                } else if (betankungenFahrzeug[i].Strecken == 'Stadt'){
                    streckeStadt += parseInt(betankungenFahrzeug[i].Distanz);
                    mengeStadt += parseInt(betankungenFahrzeug[i].Liter);
                } 
            } else {
                
                for(var j = 0; j < betankungenFahrzeug[i].Strecken.length; j++){
                    if(betankungenFahrzeug[i].Strecken == 'Land'){
                        streckeLandstrasse += parseInt(betankungenFahrzeug[i].Distanz);
                        mengeLandstrasse += parseInt(betankungenFahrzeug[i].Liter);
                    } else if (betankungenFahrzeug[i].Strecken == 'Autobahn'){
                        streckeAutobahn += parseInt(betankungenFahrzeug[i].Distanz);
                        mengeAutobahn += parseInt(betankungenFahrzeug[i].Liter);
                    } else if (betankungenFahrzeug[i].Strecken == 'Stadt'){
                        streckeStadt += parseInt(betankungenFahrzeug[i].Distanz);
                        mengeStadt += parseInt(betankungenFahrzeug[i].Liter);
                    } 
                }
                
            }

            
        }
        

        if(betankungenFahrzeug[i].Reifen != 'undefined'){
            if(betankungenFahrzeug[i].Reifen == 'Sommerreifen'){
                streckeSommerreifen += parseInt(betankungenFahrzeug[i].Distanz);
                mengeSommerreifen += parseInt(betankungenFahrzeug[i].Liter);
            } else if(betankungenFahrzeug[i].Reifen == 'Winterreifen'){
                streckeWinterreifen += parseInt(betankungenFahrzeug[i].Distanz);
                mengeWinterreifen += parseInt(betankungenFahrzeug[i].Liter);
            } else if(betankungenFahrzeug[i].Reifen == 'Ganzjahresreifen'){
                streckeGanzjahresreifen += parseInt(betankungenFahrzeug[i].Distanz);
                mengeGanzjahresreifen += parseInt(betankungenFahrzeug[i].Liter);
            }
        }


        if(betankungenFahrzeug[i].Fahrweise != 'undefined'){
            if(betankungenFahrzeug[i].Fahrweise == 'sparsam'){
                streckeSparsam += parseInt(betankungenFahrzeug[i].Distanz);
                mengeSparsam += parseInt(betankungenFahrzeug[i].Liter);
            } else if(betankungenFahrzeug[i].Fahrweise == 'normal'){
                streckeNormal += parseInt(betankungenFahrzeug[i].Distanz);
                mengeNormal += parseInt(betankungenFahrzeug[i].Liter);
            } else if(betankungenFahrzeug[i].Fahrweise == 'schnell'){
                streckeSchnell += parseInt(betankungenFahrzeug[i].Distanz);
                mengeSchnell+= parseInt(betankungenFahrzeug[i].Liter);
            }
        }

        if (betankungenFahrzeug[i].Kraftstoff != 'undefined'){
            if(betankungenFahrzeug[i].Kraftstoff == 'Diesel'){
                streckeDiesel += parseInt(betankungenFahrzeug[i].Distanz);
                mengeDiesel += parseInt(betankungenFahrzeug[i].Liter);
            } else if(betankungenFahrzeug[i].Kraftstoff == 'Super'){
                streckeSuper += parseInt(betankungenFahrzeug[i].Distanz);
                mengeSuper += parseInt(betankungenFahrzeug[i].Liter);
            } else if(betankungenFahrzeug[i].Kraftstoff == 'SuperPlus'){
                streckeSuperPlus += parseInt(betankungenFahrzeug[i].Distanz);
                mengeSuperPlus += parseInt(betankungenFahrzeug[i].Liter);
            } else if (betankungenFahrzeug[i].Kraftstoff == 'E10'){
                streckeE10 += parseInt(betankungenFahrzeug[i].Distanz);
                mengeE10 += parseInt(betankungenFahrzeug[i].Liter);
            } else if (betankungenFahrzeug[i].Kraftstoff == 'Erdgas'){
                streckeErdgas += parseInt(betankungenFahrzeug[i].Distanz);
                mengeErdgas += parseInt(betankungenFahrzeug[i].Liter);
            }
        }

        mengeGesamt += parseInt(betankungenFahrzeug[i].Liter);
        kosten += parseInt(betankungenFahrzeug[i].Kosten);
    }

    //Verbrauch auf 100km
    mainStats.verbrauch = mengeGesamt/gefahreneKM*100;
    //console.log(mainStats.verbrauch);

    if(mengeSommerreifen != 0 || mengeWinterreifen != 0 || mengeGanzjahresreifen != 0){
        var reifen = new Object(); 
        if(mengeSommerreifen != 0){
            reifen.sommerreifen = mengeSommerreifen/streckeSommerreifen*100;
        } else if (mengeWinterreifen != 0){
            reifen.winterreifen = mengeWinterreifen/streckeWinterreifen*100;
        } else if (mengeGanzjahresreifen != 0){
            reifen.ganzjahresreifen = mengeGanzjahresreifen/streckeGanzjahresreifen*100;
        }

        mainStats.reifen = reifen; 
    }

    if(mengeSparsam != 0 || mengeNormal != 0 || mengeSchnell != 0){
        var fahrweise = new Object(); 
        if(mengeSparsam != 0){
            fahrweise.sparsam = mengeSparsam/streckeSparsam*100;
        } else if (mengeNormal != 0){
            fahrweise.normal = mengeNormal/streckeNormal*100;
        } else if (mengeSchnell != 0){
            fahrweise.schnell = mengeSchnell/streckeSchnell*100;
        }

        mainStats.fahrweise = fahrweise; 
    }

    if(mengeAutobahn != 0 || mengeLandstrasse != 0 || mengeStadt != 0){
        var strecken = new Object(); 
        if(mengeAutobahn != 0){
            strecken.autobahn = mengeAutobahn/streckeAutobahn*100;
        } else if (mengeLandstrasse != 0){
            strecken.landstrasse = mengeLandstrasse/streckeLandstrasse*100;
        } else if (mengeStadt != 0){
            strecken.stadt = mengeStadt/streckeStadt*100;
        }

        mainStats.strecken = strecken; 
    }

    if(mengeDiesel != 0 || mengeSuper != 0 || mengeSuperPlus != 0 || mengeE10 != 0 || mengeErdgas != 0 ){
        var kraftstoff = new Object();
        if(mengeDiesel != 0){
            kraftstoff.diesel = mengeDiesel/streckeDiesel*100;
        } else if(mengeSuper != 0){
            kraftstoff.super = mengeSuper/streckeSuper*100;
        } else if(mengeSuperPlus != 0){
            kraftstoff.superPlus = mengeSuperPlus/streckeSuperPlus*100;
        } else if(mengeE10 != 0){
            kraftstoff.e10 = mengeE10/streckeE10*100;
        } else if(mengeErdgas != 0){
            kraftstoff.erdgas = mengeErdgas/streckeErdgas*100;
        }
        mainStats.kraftstoff = kraftstoff;
    }
    mainStats.kosten = kosten;
    mainStats.Kilometer = gefahreneKM;

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
<<<<<<< HEAD
exports.getBetankungByFzgID = getBetankungByFzgID;
=======
exports.getBetankungByFzgID = getBetankungByFzgID;
>>>>>>> origin/master
