var fahrzeugAuswahl = function(beschreibung){
    var beschreibung = beschreibung;
    //var Beschreibung = fahrzeugBeschreibungen;
    var fahrzeuge = document.getElementById('Fahrzeug');
    console.log("Fahrzeugbeschreibung: "+beschreibung);
    
    while(fahrzeuge.hasChildNodes()){
        fahrzeuge.removeChild(fahrzeuge.childNodes[0]);
    }
    
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

var autofilTacho = function(betankung){
    
}

var autofilDistanz = function(tachoAlt){
    
}