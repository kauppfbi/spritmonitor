var fillHerstellerAuswahl = function(herstellerAuswahl){
	for (var i = 0; i <= 5; i++){
		if (i == 5){
			var option = document.createElement('option');
			option.text = 'Andere';
			option.value = 'Andere';
			herstellerAuswahl.appendChild(option);
		}
		else{
			var option = document.createElement('option');
			option.text = modelle[i][0];
			option.value = modelle[i][0];
			herstellerAuswahl.appendChild(option);
		}		
	}
};

var update = function (herstellerAuswahl){
	console.log(herstellerAuswahl.id);
	var modellAuswahl;
	var parentNode = herstellerAuswahl.parentNode;
	console.log('ID parentNode: ' + parentNode.id)

	if(parentNode.id == 'einfacheSuche'){
		modellAuswahl = document.getElementById('Modellauswahl1');
	}else if (parentNode.id == 'erweiterteSuche'){
		modellAuswahl = document.getElementById('Modellauswahl2');
	}else {
		console.error('kein Select-Element für modellAuswahl gefunden!');
	}

	if(modellAuswahl.nodeName == 'INPUT'){
		var selectField = document.createElement('select');
		if(herstellerAuswahl.id == 'Herstellerauswahl1'){
			selectField.id = 'Modellauswahl1';	
		} else if (herstellerAuswahl.id == 'Herstellerauswahl2'){
			selectField.id = 'Modellauswahl2'
		} else {
			console.error('Fehler im clientseitigen JS!');
		}
		modellAuswahl.parentNode.insertBefore(selectField, modellAuswahl);
		modellAuswahl.parentNode.removeChild(modellAuswahl);
		modellAuswahl = document.getElementById(selectField.id);

	}else{
		while(modellAuswahl.hasChildNodes()){
			modellAuswahl.removeChild(modellAuswahl.childNodes[0]);
		}
	}

	if(herstellerAuswahl.value == 'Audi'){
		for(var i = 1; i < modelle[0].length; i++){
			var option = document.createElement('option');
			option.text = modelle[0][i];
			option.value = modelle[0][i];
			modellAuswahl.appendChild(option);
		}
	}
	else if (herstellerAuswahl.value == 'BMW'){
		for(var i = 1; i < modelle[1].length; i++){
			var option = document.createElement('option');
			option.text = modelle[1][i];
			option.value = modelle[1][i];
			modellAuswahl.appendChild(option);
		}
	}
	else if (herstellerAuswahl.value == 'Mercedes'){
		for(var i = 1; i < modelle[2].length; i++){
			var option = document.createElement('option');
			option.text = modelle[2][i];
			option.value = modelle[2][i];
			modellAuswahl.appendChild(option);
		}
	}
	else if (herstellerAuswahl.value == 'Volkswagen'){
		for(var i = 1; i < modelle[3].length; i++){
			var option = document.createElement('option');
			option.text = modelle[3][i];
			option.value = modelle[3][i];
			modellAuswahl.appendChild(option);
		}
	}
	else if (herstellerAuswahl.value == 'Porsche'){
		for(var i = 1; i < modelle[4].length; i++){
			var option = document.createElement('option');
			option.text = modelle[4][i];
			option.value = modelle[4][i];
			modellAuswahl.appendChild(option);
		}
	}
	else if(herstellerAuswahl.value == 'Andere'){
		var inputField = document.createElement('input');
		var id = modellAuswahl.id; 
		inputField.id = id; 
		modellAuswahl.parentNode.insertBefore(inputField, modellAuswahl);
		modellAuswahl.parentNode.removeChild(modellAuswahl);
	}
	
};

//einfache Suche
var herstellerAuswahl1 = document.getElementById('Herstellerauswahl1');
var modellAuswahl1 = document.getElementById('Modellauswahl1');

//Erweiterte Suche
var herstellerAuswahl2 = document.getElementById('Herstellerauswahl2');
var modellAuswahl2 = document.getElementById('Modellauswahl2');


fillHerstellerAuswahl(herstellerAuswahl1);
fillHerstellerAuswahl(herstellerAuswahl2);

	//fill 'modellAuswahl' dynamically with options
update(herstellerAuswahl1);
update(herstellerAuswahl2);




