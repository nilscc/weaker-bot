var config = {
	channels: ["#weakpots"],
	server: "chat.freenode.net",
	botName: "weakerbot"
};

var pongs = ["ya bitch", "ya dingus", "ya weakling", "ya ugly ass"]

var irc = require("irc");

var bot = new irc.Client("chat.freenode.net", "weakerbot", {
	channels: ["#weakpots"],
	realName: 'rowbutt',
	debug: true,
	showErrors: true,
	sasl: true,
	password: 'weakness420',
	username: 'weakerbot',
	nick: 'weakerbot'
});

// bot.connect(function() {
//     console.log("Connected!");
//     bot.join("##weakpots", function(){
//     	console.log("joined?");
//     });
// });

// console.log(bot);

bot.addListener("join", function(channel, who) {
	// Welcome them in!
	if(who.indexOf("panny")) bot.say(channel, who + " did you curl today?");
});

bot.addListener("message", function(from, to, text, message) {
	var splitup = message.split(" ");
	if(splitup[0].indexOf("..ping")){
		bot.say(config.channels[0], from+" pong, "+pongs[Math.floor(Math.random() * pongs.length)]);
	}

	if(splitup[0] == "hi" || splitup[0] == "Hi"){
		if(splitup[1] == config.botName){
			bot.say(config.channels[0], "Hi "+from);
		}
	}

	if(message.indexOf("cuck")){
		bot.say(config.channels[0], from+" fuckin cuck");
	}
});