var config = {
	channels: ["##weakpots"],
	server: "chat.freenode.net",
	botName: "weakerbot",
	password: "weakness420"
};

var pongs = ["ya bitch", "ya dingus", "ya weakling", "ya ugly ass"];
var greetings = ["Hi", "Hey", "Sup", "What's shaking", "Whaddup", "You actually look OK today", "Hello", "What dat mouf do"];
var affection = ["I <3 u bb", "never change", "did you do something with your hair? It looks nice", "you smell nice"];
var bulk = ["ear ur cheese", "doot doot", "what's for lunch"];
var songs = [
	"You spin me right round bb",
	"This is the story of a girl",
	"I ain't the sharpest tool in the shed",
	"My neck my back, my floppy drive and stack",
	"You my brown eye girl",
	"bubble butt, bubble bubble bubble butt",
	"Saaaaaaaailing, takes me awayyyyyyy",
	"every night in my dreams, I see you, I feeeeeeel you",
	"my blood is boiling, my brain IBM",
	"Domo arigato, Mr. Roboto Mata au hi made Domo arigato, Mr. Roboto Himitsu wo shiri tai",
	"Get your tongue out of my mouth, cuz I'm kissing you goodbye",
	"my anaconda don't want none unless you got buns hun",
	"you can do sidebends or situps, but pls don't lose that butt",
	"never gonna give you up, never gonna let you down, never gonna run around and hurt you",
	"when you get caught between the moon and NYC, the best that you can do is fall in love",
	"I'm a barbie girl, in a barbie wooooorld"];
var insults = ["you're just a cuckboi in a cuck world",
	"fuck Lemony Snicket, what a serious of unfortunate events you fuckin been through you ugly fuck",
	"give yer balls a tug ya titfucker",
	"your aesthetician coif that for ya?",
	"you're made of spare parts aren't you, bud?",
	"is your ass jealous of the amount of shit that just came out of your mouth?",
	"two wrongs don't make a right, take your parents as an example",
	"your family tree must be a cactus because everybody on it is a prick",
	"it's better to let someone think you are an Idiot than to open your mouth and prove it",
	"you're so ugly, when your mom dropped you off at school she got a fine for littering",
	"you're a disappointed narcissist",
	"you'll never open your mouth without subtracting from the sum of human knowledge",
	"why don't you come over tonight... our dog is in heat",
	"if you spent as much time squatting as you do negging you'd squat more than Ray Williams",
	"if I had a dog as ugly as you, I'd shave its butt and make it walk backwards",
	"you're a parasite for sore eyes",
	"cunt",
	"lardass",
	"I fart in your general direction, you prancing pervert!",
	"lifting can't fix your face",
	"I burst my pimples at you, you tripe tasting trollop!",
	"what fucking satanic clown orgy did you just crawl out of?",
	"what's up with your fucking body hair, big shoots? You look like a 12-year-old Dutch girl",
	"have you shit yourself? You look like you've got an awkward boner",
	"that's some drunk evolution right there, bud",
	"dick"];

var irc = require("irc");

// var bot = new irc.Client("chat.freenode.net", "weakerbot", {
// 	channels: ["#weakpots"],
// 	realName: 'rowbutt',
// 	debug: true,
// 	showErrors: true,
// 	sasl: true,
// 	password: 'weakness420',
// 	username: 'weakerbot',
// 	nick: 'weakerbot'
// });

var bot = new irc.Client("chat.freenode.net", "weakerbot", {
	realName: 'rowbutt',
	debug: true,
	showErrors: true,
	autoConnect: false
});
bot.connect(function() {
    console.log("Connected!");
    bot.say("nickserv", "identify "+config.password);
    bot.join(config.channels[0], function(){
    	console.log("joined?");
    });
});

var lastPerson;
var counter = {
	robo:0,
	lari:0
};

// console.log(bot);

//help

//nomski

bot.addListener("join", function(channel, who) {
	// Welcome them in!
	console.log("who: ", who);
	if(who.indexOf("panny")>-1) bot.say(channel, who + " did you curl today?");
});

bot.addListener("message", function(from, to, text, message) {
	if(message.nick.indexOf("robo") > -1) counter.robo++;
	if(message.nick.indexOf("lari") > -1) counter.lari++;
	if(counter.robo > 20){
		bot.say(config.channels[0], message.nick+" "+affection[Math.floor(Math.random() * affection.length)])
		counter.robo = 0;
	}
	if(counter.lari > 20){
		bot.say(config.channels[0], message.nick+" "+bulk[Math.floor(Math.random() * bulk.length)])
		counter.lari = 0;
	}
	// console.log("message: ", message);
	var splitup = message.args[1].split(" ");
	if(splitup[0].toLowerCase() == "..ping"){
		bot.say(config.channels[0], message.nick+" pong, "+pongs[Math.floor(Math.random() * pongs.length)]);
		lastPerson = message.nick;
	}

	if(splitup[0].toLowerCase() == "..sing"){
		bot.say(config.channels[0], "🎵"+songs[Math.floor(Math.random() * songs.length)]+"🎵");
	}
	if(splitup[0].toLowerCase() == "..insult"){
		if(splitup[1]){
			bot.say(config.channels[0], splitup[1]+", "+insults[Math.floor(Math.random() * insults.length)]);
		}
		else bot.say(config.channels[0], from+", "+insults[Math.floor(Math.random() * insults.length)]);
	}
	if(splitup[0].toLowerCase() == "..help"){
		bot.say(config.channels[0], "..ping, ..sing, ..insult [name]");
	}

	for (var i = 0; i < greetings.length; i++) {
		if(config.botName == splitup[1] && greetings[i].toLowerCase() == splitup[0].toLowerCase()){
			bot.say(config.channels[0], greetings[Math.floor(Math.random() * greetings.length)]+" "+from);
			lastPerson = from;
		}
	};

	if(message.args[1].toLowerCase().indexOf("cuck") > -1){
		bot.say(config.channels[0], from+" fuckin cuck");
	}
	if(message.args[1].toLowerCase().indexOf("hello pls") > -1){
		for (var i = 0; i < 9; i++) {
			bot.say(config.channels[0], from+" HELLO PLS");
		};
	}
});

bot.addListener('error', function(message) {
    console.log('error: ', message);
});