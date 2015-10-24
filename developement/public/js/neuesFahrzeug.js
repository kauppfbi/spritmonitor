document.onload = function(){
	console.log(modelle);
	var herstellerAuswahl = document.getElementById('Herstellerauswahl');
	var modellAuswahl = document.getElementById('Modellauswahl');

	//fill 'herstellerAuswahl' with options
	fillHerstellerAuswahl(herstellerAuswahl);

	//fill 'modellAuswahl' dynamically with options
	updateModellAuswahl(herstellerAuswahl, modellAuswahl);


};

var fillHerstellerAuswahl = function(herstellerAuswahl){
	for (var i = 0; i <= modelle.length; i++){
		if (i == modelle.length){
			var option = document.createElement('option');
			option.text = 'Andere';
			option.value = 'Andere';
			herstellerAuswahl.add(option);
		}
		else{
			var option = document.createElement('option');
			option.text = modelle[i][0];
			option.value = modelle[i][0];
			herstellerAuswahl.add(option);
		}		
	}
};

var updateModellAuswahl = function(herstellerAuswahl, modellAuswahl){
	while(modellAuswahl.hasChildNodes()){
		modellAuswahl.removeChild(modellAuswahl.childNodes[0]);
	}

	if(herstellerAuswahl.value == 'Audi'){
		for(var i = 1; i < modelle[0].length; i++){
			var option = document.createElement('option');
			option.text = modelle[0][i];
			option.value = modelle[0][i];
			modellAuswahl.add(option);
		}
	}
	else if (herstellerAuswahl.value == 'BMW'){
		for(var i = 1; i < modelle[1].length; i++){
			var option = document.createElement('option');
			option.text = modelle[1][i];
			option.value = modelle[1][i];
			modellAuswahl.add(option);
		}
	}
	else if (herstellerAuswahl.value == 'Mercedes'){
		for(var i = 1; i < modelle[2].length; i++){
			var option = document.createElement('option');
			option.text = modelle[2][i];
			option.value = modelle[2][i];
			modellAuswahl.add(option);
		}
	}
	else if (herstellerAuswahl.value == 'Volkswagen'){
		for(var i = 1; i < modelle[3].length; i++){
			var option = document.createElement('option');
			option.text = modelle[3][i];
			option.value = modelle[3][i];
			modellAuswahl.add(option);
		}
	}
	else if (herstellerAuswahl.value == 'Porsche'){
		for(var i = 1; i < modelle[4].length; i++){
			var option = document.createElement('option');
			option.text = modelle[4][i];
			option.value = modelle[4][i];
			modellAuswahl.add(option);
		}
	}
	else if(herstellerAuswahl.value == 'Andere'){
		var inputField = document.createElement('input');

	}

};
