var AuswahlHersteller = document.getElementById('ListeHersteller');
var AuswahlModell = document.getElementById('ListeModelle');

document.body.onload = function(){

	//Schnellzugriff zu den Betankungen
	var refuel = document.getElementById('vehicleFromId');
	//console.log(refuel);

	for (var i = 0; i < fahrzeuge.length; i++){
		var listElement = document.createElement('li');
		var reference = document.createElement('a');
		reference.text = fahrzeuge[i].marke + ' ' + fahrzeuge[i].modell;
		reference.href = "/neueBetankung";
		listElement.appendChild(reference);
		refuel.appendChild(listElement);
	}

	//Einfache Suche
	prepareSearch();
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
	console.log(marke);
	console.log(modell);

};