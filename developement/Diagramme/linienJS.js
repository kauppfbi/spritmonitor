var canvas ;
var context ;
var Val_max;
var Val_min;
var sections;
var xScale;
var yScale;
		// Values for the Data Plot, they can also be obtained from a external file
var Auto1 =  [5, 4.8, 4.7, 4.8, 5, 5.3, 4.9, 4.9, 4.7, 5.1, 5.3, 4.8];
var Auto2 = [6.3, 6.5, 6.7, 6.8, 6.9, 6, 6.5, 6.1, 6.5, 6.2, 6.9, 7];
var Auto3 =   [9.2, 9.1, 9.2, 9.5, 9.4, 9.5, 9.1, 9.8, 9.3, 9.3, 9.5, 9.8];


		// set these values for your data 
function init() {
    
    var max = 0;
    for(var i = 0; i < Auto1.length; i++)
    {
        if(Auto1[i] > max)
            max = Auto1[i];
    }
	var maxi=Math.round(max);
    
	Val_max = maxi+3;
	Val_min = 0;
	var stepSize = 0.5;
	var columnSize = 100;
	var rowSize = 50;
	var margin = 10;
	var xAxis = [" ", "Jan", "Feb", "Mar", "Apr",
	"May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] 
    sections = xAxis.length -1;
		//

    
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	context.fillStyle = "black"
	context.font = "20 pt Verdana"
	
	yScale = (canvas.height - columnSize - margin) / (Val_max - Val_min);
	xScale = (canvas.width - rowSize) / sections;
	
	context.strokeStyle="black"; // color of grid lines
	context.beginPath();
		// Parameters auf X-Achse, and grid lines on the graph
	for (i=1;i<=sections;i++) {
		var x = i * xScale;
		context.fillText(xAxis[i], x,columnSize - margin);
		//context.moveTo(x, columnSize);
		//context.lineTo(x, canvas.height - margin);
	}
		// print row header and draw horizontal grid lines
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
	
		// Color of each dataplot items
		
	context.strokeStyle="red";
    context.lineWidth = 0.2;
	plotData(Auto1);
	context.strokeStyle="blue";
    context.lineWidth = 0.2;
	plotData(Auto2);
	context.strokeStyle="green";
    context.lineWidth = 0.2;
	plotData(Auto3);
}

function plotData(dataSet) {
	context.beginPath();
	context.moveTo(0, dataSet[0]);
	for (i=1;i<sections;i++) {
		context.lineTo(i * xScale, dataSet[i]);
	}
	context.stroke();
}

/**function canvas_clear() 
{
    
    context.clearRect(0, 0, 600, 400);
    
}

function changeAuto1(){
    if (document.getElementById("checkbox_Auto1").checked){
    context.strokeStyle="red";
    context.lineWidth = 0.2;
    plotData(Auto1);
    }
    else{
   // context.strokeStyle ="blue";
    //context.globalCompositeOperation = "destination-out";
    //context.lineWidth = 0.2;
    //plotData(Auto1);
        canvas_clear();
    }
}

function changeAuto2(){
    if (document.getElementById("checkbox_Auto2").checked){
    context.strokeStyle="blue";
    context.lineWidth = 0.2;
    plotData(Auto2);}
    else{
    alert("Hello");
    }
}

function changeAuto3(){
    if (document.getElementById("checkbox_Auto3").checked){
    context.strokeStyle="green";
    context.lineWidth = 0.2;
    plotData(Auto3);}
    else{
    alert("Hello");
    }
}*/