var config = {
	channels: ["##weakpots"],
	server: "chat.freenode.net",
	botName: "weakerbot",
	password: "weakness420"
};

var pongs = ["ya bitch", "ya dingus", "ya weakling", "ya ugly ass"];
var greetings = ["Hi", "Hey", "Sup", "What's shaking", "Whaddup", "You actually look OK today", "Hello"];
var affection = ["I <3 u bb", "never change", "did you do something with your hair? It looks nice", "you smell nice"];
var bulk = ["ear ur cheese", "doot doot", "what's for lunch"];
var songs = ["You spin me right round bb", "This is the story of a girl", "I aint the sharpest tool in the shed", "My neck my back, my floppy drive and stack", "You my brown eye girl", "I hate everything, I even hate you too, so fuck you"];

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

//hello pls

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
	if(splitup[0] == "..ping"){
		bot.say(config.channels[0], message.nick+" pong, "+pongs[Math.floor(Math.random() * pongs.length)]);
		lastPerson = message.nick;
	}

	if(splitup[0] == "..sing"){
		bot.say(config.channels[0], "🎵"+songs[Math.floor(Math.random() * songs.length)]+"🎵");
	}

	for (var i = 0; i < greetings.length; i++) {
		if(config.botName == splitup[1] && greetings[i].toLowerCase() == splitup[0].toLowerCase()){
			bot.say(config.channels[0], greetings[Math.floor(Math.random() * greetings.length)]+" "+from);
			lastPerson = from;
		}
	};

	if(message.args[1].indexOf("cuck") > -1){
		bot.say(config.channels[0], from+" fuckin cuck");
	}
});

bot.addListener('error', function(message) {
    console.log('error: ', message);
});