window.onload = function(){
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
};
