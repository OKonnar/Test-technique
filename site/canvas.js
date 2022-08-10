const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const gen = document.querySelector("#gen");
const eff = document.querySelector("#eff");
var isHit = false
var shapeToggle = false;
let coordinates = [];
var exceptionCatcher = 0;

eff.addEventListener("click", () => {

    clearCanvas(1);
})

gen.addEventListener("click", () => {

    if (coordinates.length > 2) {
        coordinates.push(coordinates[0]);
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
        coordinates.push(temp);
    }
})

window.addEventListener("resize", () => {

    canvas.height = window.innerHeight / 1.2;
    canvas.width = window.innerWidth / 1.1;
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

// pré-test pour savoir si mon curseur est dans la zone du polygone
function isInsideCheckArea(point, polygon) {

    var xArr = [];
    var yArr = [];

    for (var i = 0; i != polygon.length; i++) {
        xArr.push(polygon[i][0]);
        yArr.push(polygon[i][1]);
    }
    if ((point[0] > Math.min(...xArr) && point[0] < Math.max(...xArr))
    && (point[1] > Math.min(...yArr) && point[1] < Math.max(...yArr)))
        return true;
    return false;
}

function checkWichSide(A, B, C) {

    // je formate pour avoir un résultat non biaiser par le sens des coordonées
    var top = B[1] > C[1] ? C : B;
    var bot = B[1] > C[1] ? B : C;

    // return true si a gauche et false si a droite
    return ((top[0] - A[0]) * (bot[1] - A[1]) - (top[1] - A[1]) * (bot[0] - A[0]) > 0);
}

function isACrossingLine(A, B, C) {

    // exception si mon point est a l'intersection de deux segment sur l'axe Y
    if (A[1] == B[1] || A[1] == C[1])
        if (checkWichSide(A, B, C) == true) {
            exceptionCatcher++;
            return 0;
        }

    // si (comparer a mon point) je n'ai pas de Y+ et Y-
    if (!(B[1] > A[1] && C[1] < A[1] || B[1] < A[1] && C[1] > A[1]))
        return 0;

    // si (comparer a mon point) le segment a deux valeur X superieur ou égal
    if (B[0] >= A[0] && C[0] >= A[0])
        return 1;

    // si (toujours comparer a mon point) le segment a un X- et un X+
    if (B[0] > A[0] && C[0] < A[0] || B[0] < A[0] && C[0] > A[0])
        if (checkWichSide(A, B, C) == true)
            return 1;

    return 0;
}

function isPointInsidePolygon(point, polygon) { // polygon is a list/array or points

    var lineCrossed = 0;

    if (isInsideCheckArea(point, polygon) == false) {
        ctx.fillStyle = "red"
        ctx.fillRect(point[0], point[1], 5, 5);
        return;
    }

    for (var i = 0; i != polygon.length - 1; i++) {
        lineCrossed += isACrossingLine(point, polygon[i], polygon[i + 1]);
        if (exceptionCatcher == 2) {
            lineCrossed++;
            exceptionCatcher = 0;
        }
    }

    if (lineCrossed % 2 == 1) {
        isHit = true;
        ctx.fillStyle = "green"
        ctx.fillRect(point[0], point[1], 5, 5);
    } else {
        ctx.fillStyle = "red"
        ctx.fillRect(point[0], point[1], 5, 5);
    }
}