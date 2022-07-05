const targets = Array.from(game.user.targets);
// if no source and no target then don't try to play anything
if (!token || !targets.length) return;

if (targets.length === 1) {
    new Sequence()
        .effect()
            .file("jb2a.electric_arc")
            .atLocation(token)
            .stretchTo(targets[0])
            .randomOffset(0.5)
        .play();
}
else {
    const seq = new Sequence()
        .effect()
            .file("jb2a.electric_arc")
            .atLocation(token)
            .stretchTo(targets[0])
    for (let i = 1; i < targets.length; i++) {
        const from = targets[i-1];
        const to = targets[i];
        seq.effect()
            .file("jb2a.electric_arc")
            .atLocation(from)
            .stretchTo(to)
            .randomOffset(0.5)
    }
    seq.play()
}
