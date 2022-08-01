const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const gen = document.querySelector("#gen");
const eff = document.querySelector("#eff");
var isHit = false
var shapeToggle = false;
let coordinates = [];
var imgData = [];

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

    if (shapeToggle == true) {
        imgData = ctx.getImageData(e.x - canvas.getBoundingClientRect().left - 7, e.y - canvas.getBoundingClientRect().top - 7, 1, 1);
        if (imgData.data[0] == 0 && imgData.data[1] == 0 && imgData.data[2] == 0) {
            canvas.style.border = "5px solid #de6c5d";
            isHit = true;
        }
    } else if (shapeToggle == false) {
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
    ctx.fill();
}
