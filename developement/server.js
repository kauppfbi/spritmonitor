var express = require ('express');
var fs = require('fs');
var app = express();

/*app.configure(function(){
	app.use(express.static(__dirname + '/public'));
});*/


//Get-Methoden:
//Profilinfo --> get /profil?id=...
//Statistik --> get /statistik?id=...
//Fahrzeuge --> get /fahrzeug?id=...
app.get('/', function(req, res){
	//Code, der ausgeführt werden soll, wenn vom Client eine GET-Anfrage auf das Root-Verzeichnis gestartet wird
	fs.readFile('public/html/index.html', function(err, data){
		res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
		res.write(data);
		res.end;
	});
});

app.get('/statistik', function(req, res){
	//Code, der ausgeführt werden soll, wenn vom Client eine GET-Anfrage für /statistik gestartet wird
	fs.readFile('public/html/statistik.html', function(err, data){
		res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
		res.write(data);
		res.end;
	});	
});

app.get('/einfacheSuche', function(req, res){
	//Code, der ausgeführt werden soll, wenn vom Client eine GET-Anfrage für /einfacheSuche gestartet wird
	fs.readFile('HTML_Module/einfacheSuche_Fabian.html', function(err, data){
		res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
		res.write(data);
		res.end;
	});	
});


//Post-Methoden:

//neue Betankung --> post /betankung 
//neues Profil --> post /...
//Profil bearbeiten
//Fahrzeug bearbeiten
//Betankung bearbeiten 

//Anfrage zur Anmeldung --> Post-Redirect-Get
app.post('/anmeldung', function(req, res){
	//Verarbeitung der Login-Informationen hier 


	//Redirect zur entsprechenden Seite

});


app.listen(3000);