Hooks.once("socketlib.ready", () => {
	game.worldsocket = socketlib.registerSystem("wfrp4e");
	game.worldsocket.register("showHelloMessage", showHelloMessage);
	game.worldsocket.register("animatePan", animatePan);
});

Hooks.once("ready", async () => {
	game.worldsocket.executeForEveryone(showHelloMessage, game.user.name);
});

function showHelloMessage(userName) {
	console.log(`User ${userName} says hello!`);
}

async function animatePan(position) {
	for (const w of Object.values(ui.windows)) {
      const ctr = w.constructor.name;
      if ( // Do not minimize Dialogs
        !(ctr.includes('Config') ||
          ctr === 'RollTableConfig' ||
          ctr.includes('Dialog') ||
          ctr === 'FilePicker')
      ) await w.close();
    }
	await canvas.animatePan(position);
}