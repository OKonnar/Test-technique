window.addEventListener("load", () => {

    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext('2d');

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    drawDot(ctx);
})

function drawDot(ctx) {

    canvas.addEventListener('mousedown', (e) => {
        ctx.fillStyle = 'black';
        ctx.fillRect(e.x, e.y, 5, 5);
    })
}

window.addEventListener("resize", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})
