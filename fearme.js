if (canvas.tokens.controlled.length !== 1) {
	ui.notifications.error("Please select single token");
}

let controlledActor = canvas.tokens.controlled[0].actor;
let oldTargets = game.user.targets;
game.user.targets = new Set();
let fear = controlledActor.getItemTypes("trait").find(x => x.data.name == game.i18n.localize("NAME.Fear") || x.data.name == game.i18n.localize("NAME.Terror"));
let value = 0;
if (fear) {
	value = parseInt(fear.specification.value);
}
oldTargets.forEach(async token => {
	let targetActor = game.actors.get(token.data.actorId);
	let sizeDiff = controlledActor.sizeNum - targetActor.sizeNum
	if(sizeDiff > 0 || value > 0) {
		let skill = targetActor.getItemTypes("skill").find(x => x.data.name == game.i18n.localize("NAME.Cool"));
		let title = "Test - " + game.i18n.localize("NAME.Cool") + " - " + controlledActor.data.name;
		let cardOptions = targetActor._setupCardOptions("systems/wfrp4e/templates/chat/roll/skill-card.html", title);
		cardOptions.user = game.userId;
		let testData = {
			title,
			rollClass: game.wfrp4e.rolls.SkillTest,
			characteristicToUse: skill.characteristic.key,
			hitLocation: false,
			item: skill.id,
			options: {},
			postFunction: "basicTest",
			targets: [],
			cardOptions: cardOptions
		  };
		testData.speaker = targetActor.speakerData(token);
		let roll = new testData.rollClass(testData);
		await roll.roll();
		
		let fearValue = Math.max(value, sizeDiff);
		if (roll.result.outcome != "success") {
			targetActor.applyFear(fearValue, controlledActor.data.name);
		} else if(parseInt(roll.result.SL) < fearValue) {
			targetActor.applyFear(fearValue - parseInt(roll.result.SL), controlledActor.data.name);
		}
	}
});
game.user.targets = oldTargets;