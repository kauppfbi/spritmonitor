var express = require ('express');
var app = express();

app.set('port', process.env.PORT || 3000);

//Get-Methoden:
//Profilinfo --> get /profil?id=...
//Statistik --> get /statistik?id=...
//Fahrzeuge --> get /fahrzeug?id=...
app.get('/', function(req, res){
	//Code, der ausgeführt werden soll, wenn vom Client eine GET-Anfrage auf das Root-Verzeichnis gestartet wird
	fs.readFile('html/index.html', function(err, data){
		res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
		res.write(data);
		res.end;
	});
});

app.get('/statistik', function(req, res){
	//Code, der ausgeführt werden soll, wenn vom Client eine GET-Anfrage für /statistik gestartet wird
	fs.readFile('html/statistik.html', function(err, data){
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



//Error Handling
app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Internal Error');
});


exports.start = function(){
	app.listen(app.get('port'), function(){
		console.log('Express ready on http://127.0.0.1:' + app.get('port'));
	});
};