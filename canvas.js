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

function findNextDot (temp, coordinates) {

    let deltaCoord = []; // delta X ET Y (en int **)
    let deltaTemp = []; // delta X ET Y (en int *) parce que je sais pas .concat sans faire une variable temporaire
    let deltaFinal = []; // delta X + Y (en int *)
    let index = 0; // index pour relier le delta le plus petit avec la coordonée corespondante + permet de .slice l'array
    let result = []; // variable temporaire pour return apres avoir .slice

    for (let i = 0; i != coordinates.length; i++) {
        deltaTemp = [Math.abs(temp[0] - coordinates[i][0]), Math.abs(temp[1] - coordinates[i][1])] // delta distance entre un point et les autres coordonées, valeur absolue pour facilité
        deltaCoord = deltaCoord.concat([deltaTemp]);
    }
    for (let i = 0; i != deltaCoord.length; i++) {
        deltaFinal = deltaFinal.concat(deltaCoord[i][0] + deltaCoord[i][1]); // on additione le delta x et le delta y ce qui donne une distance (fausse, il faudrait faire pythagore pour avoir la vrai distance mais c'est pas utile)
        if (i > 0 && deltaFinal[i] < deltaFinal[index])
            index = i;
    }
    result = coordinates[index];
    coordinates.splice(index, 1);
    return result;
}

function drawShape() {

    const anchor = coordinates[0];
    let temp = coordinates.shift();
    let result = [];

    ctx.beginPath();
    ctx.moveTo(anchor[0], anchor[1]);
    clearCanvas(0);
    for (; coordinates.length != 0;) {
        result = findNextDot(temp, coordinates);
        temp = result;
        ctx.lineTo(result[0], result[1]);
        ctx.stroke();
    }
    ctx.lineTo(anchor[0], anchor[1]);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

/* EXPLICATION ALGO

On commence au premier point mis,
On le passe dans une fonction qui trouve le points le plus proche en le comparant a un array contenant toute les autres coordonnées
Le point trouvée devient le prochain poin qu'on va comparer a l'array contenant le reste des coordonnées
On repete ca jusqu'a ce que le tableau soit vide
et on relie le dernier points obtenu avec le tout premier

*/
