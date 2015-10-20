var data = [80, 100, 180];
var labels = ["Autobahn", "Landstraße", "Stadt"];
var colors = ["#505050", "orange", "#C0C0C0"];

    
function drawSegment(canvas, context, i) {
    context.save();
    var centerX = Math.floor(canvas.width / 2);
    var centerY = Math.floor(canvas.height / 2);
    radius = Math.floor(canvas.width / 2)
    
    var startingAngle = degreesToRadians(sumTo(data, i));
    var arcSize = degreesToRadians(data[i]);
    var endingAngle = startingAngle + arcSize;

    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, 
                startingAngle, endingAngle, false);
    context.closePath();

    context.fillStyle = colors[i];
    context.fill();

    context.restore();

   // drawSegmentLabel(canvas, context, i);
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI)/180;
}
function sumTo(a, i) {
    var sum = 0;
    for (var j = 0; j < i; j++) {
      sum += a[j];
    }
    return sum;
}

/**function drawSegmentLabel(canvas, context, i) {
   context.save();
   var x = Math.floor(canvas.width / 2);
   var y = Math.floor(canvas.height / 2);
   var angle = degreesToRadians(sumTo(data, i));

   context.translate(x, y);
   context.rotate(angle);
   var dx = Math.floor(canvas.width * 0.5) - 10;
   var dy = Math.floor(canvas.height * 0.05);

   context.textAlign = "right";
   var fontSize = Math.floor(canvas.height / 25);
   context.font = fontSize + "pt Helvetica";

   context.fillText(labels[i], dx, dy);

   context.restore();
}*/

canvas = document.getElementById("piechart");
var context = canvas.getContext("2d");
for (var i = 0; i < data.length; i++) {
    drawSegment(canvas, context, i);
}