var AuswahlHersteller = document.getElementById('ListeHersteller');
var AuswahlModell = document.getElementById('ListeModelle');

document.body.onload = function(){

	//Schnellzugriff zu den Betankungen
	var refuel = document.getElementById('vehicleFromId');
	//console.log(refuel);
	var location = "";
	location = window.location.pathname;
	console.log(window.location.pathname);
	if(location.indexOf("startseite") == -1){
		for (var i = 0; i < fahrzeuge.length; i++){
			var listElement = document.createElement('li');
			var reference = document.createElement('a');
			reference.text = fahrzeuge[i].marke + ' ' + fahrzeuge[i].modell;
			reference.href = "/neueBetankung?id=" + fahrzeuge[i].id;
			listElement.appendChild(reference);
			refuel.appendChild(listElement);
		}}

	//Einfache Suche
	prepareSearch();
    
    updateFahrzeuginfo();
    
    updateSpritverlauf();
};


var prepareSearch = function(){
	//fill 'AuswahlHersteller' with options
	HerstellerAuswahlfill(AuswahlHersteller);

	//fill 'AuswahlModell' dynamically with options
	ModellAuswahlUpdate();
};

var HerstellerAuswahlfill = function(AuswahlHersteller){
	for (var i = 0; i <= 4; i++){
		var option = document.createElement('option');
		option.text = modelle[i][0];
		option.value = modelle[i][0];
		AuswahlHersteller.appendChild(option);	
	}
};

var ModellAuswahlUpdate = function(){
    console.log('Update');
	while(AuswahlModell.hasChildNodes()){
		AuswahlModell.removeChild(AuswahlModell.childNodes[0]);
	}

	if(AuswahlHersteller.value == 'Audi'){
		for(var i = 1; i < modelle[0].length; i++){
			var option = document.createElement('option');
			option.text = modelle[0][i];
			option.value = modelle[0][i];
			AuswahlModell.appendChild(option);
		}
	}
	else if (AuswahlHersteller.value == 'BMW'){
		for(var i = 1; i < modelle[1].length; i++){
			var option = document.createElement('option');
			option.text = modelle[1][i];
			option.value = modelle[1][i];
			AuswahlModell.appendChild(option);
		}
	}
	else if (AuswahlHersteller.value == 'Mercedes'){
		for(var i = 1; i < modelle[2].length; i++){
			var option = document.createElement('option');
			option.text = modelle[2][i];
			option.value = modelle[2][i];
			AuswahlModell.appendChild(option);
		}
	}
	else if (AuswahlHersteller.value == 'Volkswagen'){
		for(var i = 1; i < modelle[3].length; i++){
			var option = document.createElement('option');
			option.text = modelle[3][i];
			option.value = modelle[3][i];
			AuswahlModell.appendChild(option);
		}
	}
	else if (AuswahlHersteller.value == 'Porsche'){
		for(var i = 1; i < modelle[4].length; i++){
			var option = document.createElement('option');
			option.text = modelle[4][i];
			option.value = modelle[4][i];
			AuswahlModell.appendChild(option);
		}
	}
};

var search = function(){
	var marke = document.getElementById('ListeHersteller').value;
	var modell = document.getElementById('ListeModelle').value;
	
	var searchQuery = window.location.origin + '/suchergebnisse?marke=' + marke + '&modell=' + modell;
	console.log(searchQuery);

	window.location.assign(searchQuery);


};

function updateFahrzeuginfo() {  
    var meineFahrzeuge = document.getElementById('meineFahrzeuge');
    var startseiteFahrzeuge = document.getElementById('startseiteFahrzeuge');
   var updateQuery = "";
    
    if(fahrzeuge.length == 1){
        updateQuery = '/fahrzeug?id=' + String(fahrzeuge[0].id);
    } else{
        updateQuery += '/fahrzeuge?id=';
        for(var i=0;i<fahrzeuge.length;i++){  
            if(i==fahrzeuge.length-1){
                updateQuery += fahrzeuge[i].id;
            }else{
                updateQuery += fahrzeuge[i].id + ",";
            }
        }
    }
    meineFahrzeuge.href = updateQuery;
    startseiteFahrzeuge.href = updateQuery;
};

function updateSpritverlauf() {  
    var meinVerlauf = document.getElementById('meinVerlauf');
    var starteiteVerlauf = document.getElementById('startseiteVerlauf');
   var updateVerlauf = "";
    
    if(fahrzeuge.length == 1){
        updateVerlauf = '/spritverlauf?id=' + String(fahrzeuge[0].id);
    } else{
        updateVerlauf += '/fahrzeuge?id=';
        for(var i=0;i<fahrzeuge.length;i++){  
            if(i==fahrzeuge.length-1){
                updateVerlauf += fahrzeuge[i].id;
            }else{
                updateVerlauf += fahrzeuge[i].id + ",";
            }
        }
    }
    meinVerlauf.href = updateVerlauf;
    startseiteVerlauf.href = updateVerlauf;
};