function drawLegende (){
var canvas = document.getElementById("legende");
var context = canvas.getContext("2d");


        context.fillStyle = "#505050";
        context.fillRect (50, 150, 20, 20);

        context.fillStyle = "orange";
        context.fillRect (50, 200, 20, 20);
    
        context.fillStyle = "#C0C0C0";
        context.fillRect (50, 250, 20, 20);
}