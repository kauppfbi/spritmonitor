window.onload = drawLegende();

function drawLegende (){
var canvas = document.getElementById("legende");
var context = canvas.getContext("2d");


        context.fillStyle = "#505050";
        context.fillRect (50, 70, 10, 10);

        context.fillStyle = "orange";
        context.fillRect (50, 100, 10, 10);
    
        context.fillStyle = "#C0C0C0";
        context.fillRect (50, 130, 10, 10);
    
        context.font="15px Georgia";
        context.fillStyle="#CF5C3F";
        context.fillText("Autobahn",90,80);
    
        context.font="15px Georgia";
        context.fillText("Landstraße",90,110);
    
        context.font="15px Georgia";
        context.fillText("Stadt",90,140);
}