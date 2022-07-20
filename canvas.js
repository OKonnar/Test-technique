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

    if (coordinates.length > 0) { // le canva fait un truc bizarre quand je resize et il y a encore des points dessus, alors je le reset
        ctx.fillStyle = 'grey'
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        coordinates = [];
        ctx.clearRect(0, 0, 1920, 1080);
    }
})

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
        deltaFinal = deltaFinal.concat(deltaCoord[i][0] + deltaCoord[i][1]); // on additione le delta x et le delta y ce qui donne une distance (fausse, il faudrait faire thales pour avoir la vrai distance mais c'est pas utile)
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
    for (; coordinates.length != 0;) {
        result = findNextDot(temp, coordinates);
        temp = result;
        ctx.lineTo(result[0], result[1]);
        ctx.stroke();
    }
    ctx.lineTo(anchor[0], anchor[1]);
    ctx.stroke();
}

/* EXPLICATION ALGO

On commence au premier point mis,
On le passe dans une fonction qui trouve le points le plus proche en le comparant a un array contenant toute les autres coordonnées
Le point trouvée devient le prochain poin qu'on va comparer a l'array contenant le reste des coordonnées
On repete ca jusqu'a ce que le tableau soit vide
et on relie le dernier points obtenu avec le tout premier

*/
