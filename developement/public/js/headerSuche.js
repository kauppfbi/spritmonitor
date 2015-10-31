window.onload = function(){
	var AuswahlHersteller = document.getElementById('ListeHersteller');
	var AuswahlModell = document.getElementById('ListeModelle');

	//fill 'AuswahlHersteller' with options
	HerstellerAuswahlfill(AuswahlHersteller);

	//fill 'AuswahlModell' dynamically with options
	ModellAuswahlUpdate();


};

var HerstellerAuswahlfill = function(AuswahlHersteller){
	for (var i = 0; i <= 5; i++){
		if (i == 4){
			var option = document.createElement('option');
			option.text = 'Andere';
			option.value = 'Andere';
			AuswahlHersteller.appendChild(option);
		}
		else{
			var option = document.createElement('option');
			option.text = modelle[i][0];
			option.value = modelle[i][0];
			AuswahlHersteller.appendChild(option);
		}		
	}
};

var ModellAuswahlUpdate = function(){
    console.log('Update');
	var AuswahlHersteller = document.getElementById('ListeHersteller');
	var AuswahlModell = document.getElementById('ListeModelle');
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
	else if(AuswahlHersteller.value == 'Andere'){
		var inputField = document.createElement('input');

	}

};