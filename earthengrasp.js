async function myEffectFunction(template, update) {
    //prep summoning area
    const seq = new Sequence()
        .effect()
        .file("jb2a.impact.ground_crack.03.orange")
        .atLocation(template)
        .center()
        .scale(1)
        .belowTokens()
        .duration(500);
    await seq.play();
}

async function postEffects(template, token) {
    //bring in our minion
    new Sequence()
        .animation()
        .on(token)
        .fadeIn(500)
        .duration(500);
    await seq.play();
}

const callbacks = {
    pre: async (template, update) => {
        await myEffectFunction(template, update);
    },
    post: async (template, token) => {
        await postEffects(template, token);
    },
};