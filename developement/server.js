var express = require ('express');
var fs = require('fs');
var app = express();

/*app.configure(function(){
	app.use(express.static(__dirname + '/public'));
});*/

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

app.listen(3000);