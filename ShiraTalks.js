//Logic
async function relayMessage(html) {
    const input = html.find("#message")[0].value
    darken()
    displayFloatingText(input,{ x: 0.45, y: 0.5, fitX:true,ratioX:true })
  }
  
async function relayThought(html){

    let regions = Sequencer.Helpers.shuffle_array([
        { x: 0.2, y: 0.2, fitX:true,ratioX:true },

        { x: 0.3, y: 0.3, fitX:true,ratioX:true },

        { x: 0.5, y: 0.2, fitX:true,ratioX:true },
        { x: 0.2, y: 0.5, fitX:true,ratioX:true },

        { x: 0.4, y: 0.3, fitX:true,ratioX:true },
        { x: 0.3, y: 0.4, fitX:true,ratioX:true },

        { x: 0.75, y: 0.3, fitX:true,ratioX:true },
        { x: 0.3, y: 0.75, fitX:true,ratioX:true },

        { x: 0.5, y: 0.75, fitX:true,ratioX:true },
        { x: 0.75, y: 0.5, fitX:true,ratioX:true },

        { x: 0.25, y: 0.6, fitX:true,ratioX:true },
        { x: 0.6, y: 0.25, fitX:true,ratioX:true },

        { x: 0.75, y: 0.6, fitX:true,ratioX:true },
        { x: 0.6, y: 0.75, fitX:true,ratioX:true }
    ]);

    console.log("Thought")
    const thoughts = html.find("#message")[0].value
    let thoughtArray=thoughts.split(" ")
    darken()
    let i=0;
    for (let thought of thoughtArray){
        if (i>=regions.length) i=0;
        displayFloatingText(thought,regions[i])
        i++
    }
    console.log(content)
    darken()
}

// Dialogue
  let message = false;
  const dialog = new Dialog({
    title: `Relay Message`,
    content: `
    <div>Input message.<div>
    <hr/>
    <form>
      <div class="form-text">
    <textarea id="message" name="message" rows="10" cols="50">
</textarea>
    </form>
    `,
    buttons: {
      message:{
          label:"Message",
          callback: relayMessage
      },
      thought:{
          label:"Think",
          callback: relayThought
      },
      no: {
        icon: "<i class='fas fa-times'></i>",
        label: `Cancel`
      },
    },
  },{
      height: '100%',
      
  });

//Custom render
await dialog._render(true);
    dialog.element.find('.dialog-buttons').css({
    'flex-direction': "column"
    });


// Sequnecer functions below
function darken(){
    new Sequence()
    .effect()
        .file("jb2a.screen_overlay.01.bad_omen")
        .screenSpace()
        .screenSpaceScale({ fitX: true, fitY: true })
        .fadeIn(2500, { ease: "easeInOutQuad" })
        .duration(15000)
        .fadeOut(5000, { ease: "easeInOutQuad" })
        .filter("Blur")
    .play()
}

function displayFloatingText(text,region){

let textStyle = {
    "align": "center",
    "dropShadow": true,
    "dropShadowAlpha": 0.5,
    "dropShadowBlur": 5,
    "dropShadowColor": "#800080",
    "dropShadowDistance": 0,
    "fill": "#9a009a",
    "fontSize": 39,
    "lineJoin": "round",
    "strokeThickness": 4,
    "fontFamily": "Old Evils",
	"wordWrap": true,
	"wordWrapWidth": 1200,
    "breakWords":"true"

};

new Sequence()
        .effect()
            .text(text, textStyle)
            .screenSpace()
            .screenSpaceAnchor(region)
            .delay(500, 3000)
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