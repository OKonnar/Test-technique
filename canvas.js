const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
const gen = document.querySelector('#gen');
const eff = document.querySelector('#eff');
let coordinates = [];

eff.addEventListener('click', () => {
    console.log("No !");
})

gen.addEventListener('click', () => {
    console.log("Yes !");
})

window.addEventListener("load", () => {

    canvas.height = window.innerHeight / 1.2;
    canvas.width = window.innerWidth / 1.1;
    ctx.fillStyle = 'grey'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
})

canvas.addEventListener('mousedown', (e) => {

    ctx.fillRect(e.x - canvas.getBoundingClientRect().left - 7, e.y - canvas.getBoundingClientRect().top - 7, 5, 5); // position absolue - offset canvas - offset arbitraire
    temp = [e.x, e.y];
    coordinates = coordinates.concat([temp]);
    console.log(coordinates);
})

window.addEventListener("resize", () => {
    canvas.height = window.innerHeight / 1.2;
    canvas.width = window.innerWidth / 1.1;
})
