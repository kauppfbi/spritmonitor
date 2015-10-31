window.onload = function(){
	console.log(fahrzeuge);
	console.log(fahrzeuge.isEmpty);
	var refuelParent = document.getElementById('refuel');
	var refuel = refuelParent.childNodes[0];

	for (var i = 0; i < fahrzeuge.length; i++){
		var listElement = document.createElement('li');
		var reference = document.createElement('a');
		reference.text = fahrzeuge[i].marke + ' ' + fahrzeuge[i].modell;
		reference.href = "/neueBetankung";
		listElement.appendChild(reference);
		refuel.appendChild(listElement);
	}
};
