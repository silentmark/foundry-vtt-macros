let journals = game.journal.filter(function(e) { return e.name == args[0] });
let gms = game.users.filter(u => u.isGM).map(u => u.id);
for(let i = 0; i < journals.length; i++) {
    let journal = journals[i]; 
    let content = "<h2>" + journal.data.name + "</h2><p>" + journal.data.content + "</p>";
    if(journal.folder.name == "GM") {
        content = "<h2>" + journal.data.name + " (Tylko dla GMa)</h2><p>" + journal.data.content + "</p>";
        let actor = game.actors.getName("Demon Gemäldebildmalden")
        ChatMessage.create({
             blind: true,
             speaker: ChatMessage.getSpeaker({actor: actor}),
             whisper: gms,
             content: content
        });
    }  else {
        ChatMessage.create({
             user: game.user.id,
             speaker: ChatMessage.getSpeaker({alias: game.users.get(gms[0]).data.name}),
             content: content
        });
    }
}