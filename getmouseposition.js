let mouse = canvas.app.renderer.plugins.interaction.mouse;
let local = mouse.getLocalPosition(canvas.app.stage);

console.log(local);
ChatMessage.create({ content: `Mouse map position - x: ${Math.round(local.x)}, y: ${Math.round(local.y)}` });


const boundsContains = (bounds, point) =>
    bounds.left <= point.x
        && point.x <= bounds.right
        && bounds.top <= point.y
        && point.y <= bounds.bottom;

const found = !!canvas.tokens.placeables.map(x => x.bounds).find(b => boundsContains(b, local));
console.log(`token contains mouse: ${found}`);