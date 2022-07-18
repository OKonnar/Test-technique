window.addEventListener("load", () => {

    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext('2d');

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.left = 10;

    drawDot(ctx);
})

function drawDot(ctx)
{
    let coordinates = [];
    let temp = [];

    canvas.addEventListener('mousedown', (e) => {
        ctx.fillStyle = 'black';
        ctx.fillRect(e.x, e.y, 5, 5);
        temp = [e.x, e.y];
        coordinates = coordinates.concat([temp]);
        console.log(coordinates);
    })
}

window.addEventListener("resize", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})
