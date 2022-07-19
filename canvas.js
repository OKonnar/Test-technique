const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
const gen = document.querySelector('#gen');
const eff = document.querySelector('#eff');
let coordinates = [];

eff.addEventListener('click', () => {

    ctx.clearRect(0, 0, 1920, 1080);
    ctx.fillStyle = 'grey'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    coordinates = [];
})

gen.addEventListener('click', () => {

    if (coordinates.length > 2)
        drawShape();
    else
        alert("nope");
})

window.addEventListener("load", () => {

    canvas.height = window.innerHeight / 1.2;
    canvas.width = window.innerWidth / 1.1;
    ctx.fillStyle = 'grey'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
})

canvas.addEventListener('mousedown', (e) => {

    temp = [e.x - canvas.getBoundingClientRect().left - 7, e.y - canvas.getBoundingClientRect().top - 7]; // position absolue - offset canvas - offset arbitraire
    ctx.fillRect(temp[0], temp[1], 5, 5);
    coordinates = coordinates.concat([temp]);
})

window.addEventListener("resize", () => {

    canvas.height = window.innerHeight / 1.2;
    canvas.width = window.innerWidth / 1.1;
})

function findNextDot (temp, coordinates) {

    let deltaCoord = [];
    let deltaTemp = [];
    let deltaFinal = [];
    let index = 0;

    for (let i = 0; i != coordinates.length; i++) {
        deltaTemp = [Math.abs(temp[0] - coordinates[i][0]), Math.abs(temp[1] - coordinates[i][1])] // delta distance entre un point et les autres coordonées, valeur absolue pour facilité
        deltaCoord = deltaCoord.concat([deltaTemp]);
    }
    for (let i = 0; i != deltaCoord.length; i++) {
        deltaFinal = deltaFinal.concat(deltaCoord[i][0] + deltaCoord[i][1]);
        if (delta)
    }
    console.log(deltaFinal);
    console.log(Math.min(...deltaFinal));
    ctx.beginPath();
    ctx.moveTo(temp[0], temp[1]);
    ctx.lineTo();
    ctx.stroke();
}

function drawShape() {

    const anchor = coordinates.shift();
    let temp = anchor;

    findNextDot(temp, coordinates);
    /*
    for (let i = 0; i != 3; i++) {
    }
    ctx.beginPath();
    console.log(anchor[0], anchor[1]);
    ctx.moveTo(anchor[0], anchor[1]);
    ctx.lineTo(500, 500);
    ctx.stroke();
    */
}