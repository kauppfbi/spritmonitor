window.onload = FahrzeugAuswahl;
console.log(fahrzeugBeschreibungen);

var FahrzeugAuswahl = function(){
    var Beschreibung = fahrzeugBeschreibungen;
    var FahrzeugAuswahl = document.getElementById('Fahrzeug');
    
    while(FahrzeugAuswahl.hasChildNodes()){
        FahrzeugAuswahl.removeChild(FahrzeugAuswahl.childNodes[0]);
    }
    
    for(var i=0; i<Beschreibung.length; i++){
        var option = document.createElement('option');
        option.text = Beschreibung;
        option.value = Beschreibung;
        FahrzeugAuswahl.appendChild(option);
    }
}