const texts = {
    "lies": [
        "LIES",
        "HALFTRUTHS",
        "UNTRUSTWORTHY",
        "VENOMOUS WORDS",
        "DISHONESTY",
        "DECEIT",
        "DECEPTION",
        "FALSEHOODS"
    ],
    "truth": [
        "CANDID",
        "LEGITIMATE",
        "SINCERE",
        "ACCURATE",
        "FORTHRIGHT",
        "GENUINE",
        "TRUSTWORTHY",
        "TRUTHS"
    ],
    "danger": [
        "DANGER",
        "UNSAFE",
        "THREAT",
        "RISK",
        "PERILS",
        "HAZARD",
        "PRECARIOUS",
        "UNCERTAINTY"
    ]
}

const select = `<select style='width:100%; margin-bottom: 0.5rem;'>
<option value="lies">They warn of lies</option>
<option value="truth">They think this is truth</option>
<option value="danger">They warn of danger!</option>
</select>`;

const choice = await new Promise(resolve => {
    new Dialog({
        title: "Dark Powers",
        content: "<p>How does the Dark Powers respond to Talos?</p>" + select,
        buttons: {
            one: {
                icon: `<i class="fas fa-check"></i>`,
                label: "Done",
                callback: (html) => {
                    const text = html.find("select").find(':selected').val();
                    resolve(text);
                }
            }
        },
        default: "Cancel",
        close: (html) => {
            resolve(false);
        }
    }).render(true);
});
if(!choice) return;

let text = Sequencer.Helpers.shuffle_array(texts[choice]);

let regions = Sequencer.Helpers.shuffle_array([
    { x: 0.2, y: 0.2 },
    { x: 0.75, y: 0.3 },
    { x: 0.5, y: 0.75 },
    { x: 0.25, y: 0.6 },
    { x: 0.75, y: 0.6 }
]);

let textStyle = {
    "align": "center",
    "dropShadow": true,
    "dropShadowAlpha": 0.5,
    "dropShadowBlur": 5,
    "dropShadowColor": "#cb1515",
    "dropShadowDistance": 0,
    "fill": "#c44040",
    "fontSize": 39,
    "lineJoin": "round",
    "strokeThickness": 4,
    "fontFamily": "Old Evils"
};

new Sequence()
    .effect()
        .file("jb2a.screen_overlay.01.bad_omen")
        .screenSpace()
        .screenSpaceScale({ fitX: true, fitY: true })
        .fadeIn(2500, { ease: "easeInOutQuad" })
        .duration(15000)
        .fadeOut(5000, { ease: "easeInOutQuad" })
        .forUsers("Zoidy")
        .filter("Blur")
    .play()

for(let i = 0; i < regions.length; i++){

    new Sequence()
        .effect()
            .text(text[i], textStyle)
            .screenSpace()
            .forUsers("Zoidy")
            .screenSpaceAnchor(regions[i])
            .delay(1000, 3000)
            .duration(7500)
            .fadeIn(1750)
            .fadeOut(1500)
            .loopProperty("sprite", "scale.x", {
                from: 0.99,
                to: 1.01,
                duration: Sequencer.Helpers.random_int_between(500, 2000),
                pingPong: true,
                ease: "easeInOutQuad"
            })
            .loopProperty("sprite", "scale.Y", {
                from: 0.99,
                to: 1.01,
                duration: Sequencer.Helpers.random_int_between(500, 2000),
                pingPong: true,
                ease: "easeInOutQuad"
            })
            .loopProperty("sprite", "rotation", {
                from: -0.4,
                to: 0.4,
                duration: Sequencer.Helpers.random_int_between(1200, 2000),
                pingPong: true
            })
            .loopProperty("sprite", "position.x", {
                from: Sequencer.Helpers.random_int_between(-10, 10),
                to: Sequencer.Helpers.random_int_between(-10, 10),
                duration: Sequencer.Helpers.random_int_between(1500, 3000),
                pingPong: true,
                ease: "easeInOutQuad"
            })
            .loopProperty("sprite", "position.y", {
                from: Sequencer.Helpers.random_int_between(-10, 10),
                to: Sequencer.Helpers.random_int_between(-10, 10),
                duration: Sequencer.Helpers.random_int_between(1500, 3000),
                pingPong: true,
                ease: "easeInOutQuad"
            })
            .loopProperty("sprite", "position.x", {
                from: Sequencer.Helpers.random_int_between(-10, 10),
                to: Sequencer.Helpers.random_int_between(-10, 10),
                duration: Sequencer.Helpers.random_int_between(1500, 3000),
                pingPong: true,
                ease: "easeInOutQuad"
            })
            .loopProperty("sprite", "position.y", {
                from: Sequencer.Helpers.random_int_between(-10, 10),
                to: Sequencer.Helpers.random_int_between(-10, 10),
                duration: Sequencer.Helpers.random_int_between(1500, 3000),
                pingPong: true,
                ease: "easeInOutQuad"
            })
        .play()

}