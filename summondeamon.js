const spawnedCreature = await warpgate.spawn("Demon Gemäldebildmalden", { token: { alpha: 0 }}); // This will spawn a token from the "Goblin" actor with an opacity of 0.
    
const seq = new Sequence();
seq.effect()
        .file("jb2a.template_circle.vortex.intro.purple")
        .atLocation(spawnedCreature[0])
        .opacity(0)
        .duration(250)
        .waitUntilFinished();
seq.effect()
        .file("jb2a.template_circle.vortex.intro.purple")
        .atLocation(spawnedCreature[0])
        .scaleToObject(2.5)
        .fadeIn(500)
        .waitUntilFinished(-500);
seq.effect()
        .file("jb2a.template_circle.vortex.outro.purple")
        .atLocation(spawnedCreature[0])
        .scaleToObject(2.5)
        .fadeIn(500)
        .waitUntilFinished(-500);
seq.effect()
        .file("jb2a.token_border.circle.spinning.purple.004")
        .atLocation(spawnedCreature[0])
        .scaleToObject(2.5)
        .fadeIn(500)
        .waitUntilFinished(-500);    
seq.effect()
        .file("jb2a.magic_signs.circle.01.divination")
        .atLocation(spawnedCreature[0])
        .scaleToObject(2.5)
        .fadeIn(1000)
        .duration(3000)
        .fadeOut(1000)
        .animation()
        .on(spawnedCreature[0])
seq.effect()
        .file("jb2a.misty_step.02.blue") 
        .atLocation(spawnedCreature[0])
        .scaleToObject(2.5)
        .randomRotation()
        .wait(1500)
        .animation()
        .on(spawnedCreature[0])
        .fadeIn(1000)

const position = canvas.tokens.get(spawnedCreature[0]).position
await game.worldsocket.executeForOthers("animatePan", {x: position.x, y: position.y, scale: 1, duration: 250});

seq.play();

