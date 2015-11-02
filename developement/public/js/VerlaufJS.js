var canvas ;
var context ;
var Val_max;
var Val_min;
var sections;
var xScale;
var yScale;


console.log(datumVerbrauch);

var verbrauch =  [5, 4.8, 4.7, 4.8, 5, 5.6, 6, 5.5, 4.9, 5.6, 5.1, 5.5];
var datum = [" ", "1.10", "8.10", "15.10", "22.10",
	"29.10", "6.11", "13.11", "20.11", "27.11", "4.12", "11.12", "18.12"] 
init();

function init() {
        
    var max = 0;
    for(var i = 0; i < verbrauch.length; i++)
    {
        if(verbrauch[i] > max)
            max = verbrauch[i];
        }
	
    var maxi=Math.round(max);
	Val_max = maxi+3;
	Val_min = 0;
	var stepSize = 0.5;
	var columnSize = 100;
	var rowSize = 50;
	var margin = 10;
    sections = verbrauch.length;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	context.fillStyle = "black"
	context.font = "10pt Verdana"
    
	yScale = (canvas.height - columnSize - margin) / (Val_max - Val_min);
	xScale = (canvas.width - rowSize) / sections;
	
	context.strokeStyle="black"; // Linienfarbe
	context.beginPath();
		// Parameters auf X-Achse
	for (i=1;i<=sections;i++) {
		var x = i * xScale;
		context.fillText(datum[i], x,columnSize - margin);
	}
		// Zeilenkopf, Hilfslinien
	var count =  0;
	for (scale=Val_max;scale>=Val_min;scale = scale - stepSize) {
		var y = columnSize + (yScale * count * stepSize); 
		context.fillText(scale, margin,y + margin);
		context.moveTo(rowSize,y)
		context.lineTo(canvas.width,y)
		count++; 
	}
	context.stroke();
	
	context.translate(rowSize,canvas.height + Val_min * yScale);
	context.scale(1,-1 * yScale);
	
		// Datenstyle
		
	context.strokeStyle="#CF5C3F";
    context.lineWidth = 0.2;
	plotData(verbrauch);
    

}

function plotData(dataSet) {
	context.beginPath();
	context.moveTo(0, dataSet[0]);
	for (i=1;i<sections;i++) {
		context.lineTo(i * xScale, dataSet[i]);
	}
	context.stroke();
}