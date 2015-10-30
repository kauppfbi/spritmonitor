window.onload = FahrzeugAuswahl;

var FahrzeugAuswahl = function(beschreibung){
    var Beschreibung = beschreibung;
    //var Beschreibung = fahrzeugBeschreibungen;
    var FahrzeugAuswahl = document.getElementById('Fahrzeug');
    console.log("Fahrzeugbeschreibung: "+Beschreibung);
    /*
    while(FahrzeugAuswahl.hasChildNodes()){
        FahrzeugAuswahl.removeChild(FahrzeugAuswahl.childNodes[0]);
    }
    */
    
    for(var i=0; i<Beschreibung.length; i++){
        var option = document.createElement('option');
        option.text = Beschreibung[i];
        option.value = Beschreibung[i];
        FahrzeugAuswahl.appendChild(option);
    }
}