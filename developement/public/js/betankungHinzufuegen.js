var fahrzeugAuswahl = function(beschreibung){
    var beschreibung = beschreibung;
    //var Beschreibung = fahrzeugBeschreibungen;
    var fahrzeuge = document.getElementById('Fahrzeug');
    console.log("Fahrzeugbeschreibung: "+beschreibung);
    
    /*
    while(fahrzeuge.hasChildNodes()){
        fahrzeuge.removeChild(fahrzeuge.childNodes[0]);
    } */
    
    for(var i=0; i<beschreibung.length; i++){
        var option = document.createElement('option');
        option.text = beschreibung[i];
        option.value = beschreibung[i];
        fahrzeuge.appendChild(option);
    }
}

var storeSorte = function(){
    var spritsorte = document.getElementById('Sorte');
    localStorage.setItem("sorte", spritsorte);
}

var getSorte = function(){
    document.getElementById('Sorte').innerHTML = localStorage.getItem("sorte");
}

var autofilTacho = function(betankung, profilID, fahrzeug){
    var fahrzeugID = (document.getElementById('Fahrzeug').value).split("#");
    var fahrzeugID = (fahrzeugID[1]-((1+profilID)*100));
    
    console.log("FahrzeugID: "+fahrzeugID);
    console.log("fahrzeug: "+fahrzeug);
    
    var tachostand = fahrzeug[fahrzeugID].kilometerstand;
    
    console.log("Tachostand: "+tachostand);
    
    document.getElementById('Tachostand').value = tachostand;
}

var autofilDistanz = function(betankung, profilID, fahrzeug){
    var tachostand = document.getElementById('Tachostand').value;
    console.log("Tachostand: "+tachostand);
    
    var fahrzeugID = (document.getElementById('Fahrzeug').value).split("#");
    var fahrzeugID = (fahrzeugID[1]-((1+profilID)*100));
    
    var tachostandalt = fahrzeug[fahrzeugID].kilometerstand;
    
    var distanz = tachostand-tachostandalt;
    
    document.getElementById('Distanz').value = distanz;
}

/*
var validateForm = function() {
    var x = document.forms["myForm"]["fname"].value;
    if (x == null || x == "") {
        alert("Name must be filled out");
        return false;
    }
} */