const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const gen = document.querySelector("#gen");
const eff = document.querySelector("#eff");
var isHit = false
var shapeToggle = false;
let coordinates = [];

eff.addEventListener("click", () => {

    clearCanvas(1);
})

gen.addEventListener("click", () => {

    if (coordinates.length > 2) {
        drawShape();
        shapeToggle = true;
    } else
        alert("nope");
})

window.addEventListener("load", () => {

    canvas.height = window.innerHeight / 1.2;
    canvas.width = window.innerWidth / 1.1;
    ctx.fillStyle = 'grey'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
})

canvas.addEventListener("mouseup", () => {

    if (isHit == true) {
        canvas.style.border = "5px solid #a8de5d"
        isHit = false;
    }
})

canvas.addEventListener("mousedown", (e) => {

    if (shapeToggle == true)
        isPointInsidePolygon([e.x - canvas.getBoundingClientRect().left - 7, e.y - canvas.getBoundingClientRect().top - 7], coordinates);
        if (isHit == true)
            canvas.style.border = "5px solid #de6c5d";
    else if (shapeToggle == false) {
        temp = [e.x - canvas.getBoundingClientRect().left - 7, e.y - canvas.getBoundingClientRect().top - 7]; // position absolue - offset canvas - offset arbitraire
        ctx.fillRect(temp[0], temp[1], 5, 5);
        coordinates = coordinates.concat([temp]);
    }
})

window.addEventListener("resize", () => {

    canvas.height = window.innerHeight / 1.2;
    canvas.width = window.innerWidth / 1.1;
     // le canva fait un truc bizarre quand je resize et il y a encore des points dessus, alors je le reset
    clearCanvas(1);
})

function clearCanvas(id) {

    ctx.clearRect(0, 0, 1920, 1080);
    ctx.fillStyle = "grey"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    if (id == 1) {
        coordinates = [];
        shapeToggle = false;
    }
}

function drawShape() {

    ctx.beginPath();
    ctx.moveTo(coordinates[0][0], coordinates[0][1]);
    clearCanvas(0);
    for (var i = 1; i != coordinates.length; i++) {
        ctx.lineTo(coordinates[i][0], coordinates[i][1]);
        ctx.stroke();
    }
    ctx.lineTo(coordinates[0][0], coordinates[0][1]);
    ctx.closePath();
    ctx.stroke();
}

function isInsideCheckArea(point, polygon) {

    var xArr = [];
    var yArr = [];

    for (var i = 0; i != polygon.length; i++) {
        xArr = xArr.concat(polygon[i][0]);
        yArr = yArr.concat(polygon[i][1]);
    }

    if ((point[0] > Math.min(...xArr) && point[0] < Math.max(...xArr))
    && (point[1] > Math.min(...yArr) && point[1] < Math.max(...yArr)))
        return true;
    return false;
}

function getHypothenuse(a, b) {

    xDelta = Math.abs(a[0] - b[0]);
    yDelta = Math.abs(a[1] - b[1]);

    return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2));
}

function checkIfCrossingLine(point, polygon) {

    var i = 0;
    var hypothenuseA = [];
    var hypothenuseB = [];
    var hypothenuseC = [];
    ctx.fillStyle = "Red";

    for (; i != polygon.length - 1; i++) {
        hypothenuseA = getHypothenuse(point, polygon[i]);
        hypothenuseB = getHypothenuse(point, polygon[i + 1]);
        hypothenuseC = getHypothenuse(polygon[i], polygon[i + 1]);

        if (hypothenuseA + hypothenuseB > hypothenuseC - 0.1
        && hypothenuseA + hypothenuseB < hypothenuseC + 0.1)
            ctx.fillRect(point[0], point[1], 5, 5);
    }

    hypothenuseA = getHypothenuse(point, polygon[0]);
    hypothenuseB = getHypothenuse(point, polygon[i]);
    hypothenuseC = getHypothenuse(polygon[0], polygon[i]);

    if (hypothenuseA + hypothenuseB > hypothenuseC - 0.1
    && hypothenuseA + hypothenuseB < hypothenuseC + 0.1)
        ctx.fillRect(point[0], point[1], 5, 5);
}

function isPointInsidePolygon(point, polygon) { // polygon is a list/array or points

    if (isInsideCheckArea(point, polygon) == false)
        return;
    for (; point[0] != canvas.width; point[0]++)
        checkIfCrossingLine(point, polygon);
    isHit = true;
}