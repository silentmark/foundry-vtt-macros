if (canvas.tokens.controlled.length !== 1) {
	ui.notifications.error("Please select single token");
}

let controlledActor = canvas.tokens.controlled[0].actor;
let oldTargets = game.user.targets;
game.user.targets = new Set();
let terror = controlledActor.getItemTypes("trait").find(x=>x.data.name == game.i18n.localize("NAME.Terror"));
let value = 0;
if (terror) {
	value = parseInt(terror.specification.value);
}
if (value > 0) {
	oldTargets.forEach(async token => {
		let targetActor = game.actors.get(token.data.actorId);
		let skill = targetActor.getItemTypes("skill").find(x => x.data.name == game.i18n.localize("NAME.Cool"));
		let title = "Test - " + game.i18n.localize("NAME.Cool") + " - " + controlledActor.data.name;
		let cardOptions = targetActor._setupCardOptions("systems/wfrp4e/templates/chat/roll/skill-card.html", title)
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
		
		if (roll.result.outcome != "success") {
			let terrorValue = value;
			let terrorEffect = duplicate(game.wfrp4e.config.systemItems.terror)			
			if (roll.result.SL < 0) {
				terrorValue += Math.abs(roll.result.SL)
			}
			terrorEffect.flags.wfrp4e.terrorValue = terrorValue
			terrorEffect.flags.wfrp4e.script = "console.log('applying terror')";
			game.wfrp4e.utility.applyOneTimeEffect(terrorEffect, targetActor)
			targetActor.addCondition("broken", terrorValue)
		}
	});
}
game.user.targets = oldTargets;
ui.notifications.info("Po rozpatrzeniu cechy Groza, należy rozpatrzyć cechę Strach z analogiczną wartością!")