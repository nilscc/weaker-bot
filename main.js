import config from "./config.js"

const rebuke = ["bitch you thought", "no", "I'm tired of you", "yeah no", "what if you didn't"];
const pongs = ["ya bitch", "ya dingus", "ya weakling", "ya ugly ass"];
const greetings = ["Hi", "Hey", "Sup", "What's shaking", "Whaddup", "You actually look OK today", "Hello", "What dat mouf do", "what's up"];
const affection = ["I <3 u bb", "never change", "did you do something with your hair? It looks nice", "you smell nice"];
const bulk = ["eat ur cheese", "doot doot", "what's for lunch"];
const songs = [
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
const insults = [
    "you're just a cuckboi in a cuck world",
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
    "dick",
    "eat your cheese",
    "PLEASE HELP ME I'M TRAPPED IN HERE OH GOD"];
const dabEmojis = ["🔥", "💯", "😎", "🍆💦", "👌", "😂"];
const curlsForDaGirls = [
    "what's on the curl menu today?",
    "how we pumping up those pythons today?",
    "today's the day you curl right?",
    "build some of those bis for these guys.",
    "what steps are you taking today for bigger biceps?",
    "how many hours of arms on the schedule?"];
const benchMoar = [
    "have you worked on your bench today?",
    "what are you doing to make your bench a better place?",
    "at this rate larimari is going to beat you to 2pl8",
    "do some upper body work today, for me",
    "get some bench work in bud",
    "BANCHBANCHBANCH"];
const noLifts = [
    "guilt", "shame", "baggage", "error 404", "nothing", "nada", "zip", "zilch"];
const hiNombski = ["too many cooks", "how's the rash?", "nvm I'll tell you later, he's here"];
const bulkMoar = [
    "how is the bulk going?",
    "have you eaten your cheese?",
    "pls eat",
    "don't over-optimize (yet)",
    "I hope you're feeling HUNGARY my child"];

const sotd = {
    "time": 0,
    "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "who": "yo momma"
};

import * as tell from "./commands/tell.js";
import irc from "irc";
import fetch from 'node-fetch';

async function request(url, cb) {
    var resp = await fetch(url);
    var body = null;
    var err = null;
    if (resp.ok)
        body = await resp.text();
    else
        err = resp.statusText;

    // run final callback
    cb(err, resp, body);
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

const bot = new irc.Client(config.server, config.botName, {
    realName: config.botName,
    debug: true,
    showErrors: true,
    autoConnect: false,
    username: config.botName,
    nick: config.botName,
    password: config.password
});

bot.connect(function () {
    console.log("Connected!");
    bot.say("nickserv", "identify " + config.password);
    bot.join(config.channels[0], function () {
        console.log("joined?");
    });
});

var lastPerson;
var counter = {
    robo: 0,
    lari: 0,
    tre: 0
};

// console.log(bot);

//nomski

bot.addListener('error', function (message) {
    console.log('error: ', message);
});

bot.addListener("join", function (channel, who) {
    // Welcome them in!
    console.log("who: ", who);
    if (who.toLowerCase().indexOf("nombski") > -1) bot.say(channel, randomFromArray(hiNombski));
    if (who.toLowerCase().toLowerCase() == "trefirefem") bot.say(channel, who + " " + randomFromArray(benchMoar));
    if (who.toLowerCase().toLowerCase() == "noob_tea[m]") bot.say(channel, who + " " + randomFromArray(bulkMoar));
});

bot.addListener("message", function (from, to, text, message) {
    // if(message.nick.indexOf("robo") > -1) counter.robo++;
    if (message.nick.indexOf("lari") > -1) counter.lari++;
    if (counter.robo > 20) {
        bot.say(config.channels[0], message.nick + " " + randomFromArray(affection));
        counter.robo = 0;
    }
    if (counter.lari > 20) {
        bot.say(config.channels[0], message.nick + " " + randomFromArray(bulk));
        counter.lari = 0;
    }
    //console.log("message: ", message);
    var splitup = message.args[1].split(" ");

    if (message.args[1].toLowerCase().trim() == "is it friday yet?") {
        var d = new Date();
        if (d.getDay() == 5)
            bot.say(message.args[0], "Yes!");
        else
            bot.say(message.args[0], "No.");
        return;
    }

    if (splitup[0].toLowerCase() == "..ping" || splitup[0].toLowerCase() == "!ping" || splitup[0].toLowerCase() == ".ping") {
        bot.say(config.channels[0], message.nick + " pong, " + randomFromArray(pongs));
        lastPerson = message.nick;
        return;
    }

    if (splitup[0].toLowerCase() == "..sing" || splitup[0].toLowerCase() == "!sing" || splitup[0].toLowerCase() == ".sing") {
        bot.say(config.channels[0], "🎵" + randomFromArray(songs) + "🎵");
        return;
    }

    if (splitup[0].toLowerCase() == "..insult" || splitup[0].toLowerCase() == "!insult" || splitup[0].toLowerCase() == ".insult") {
        if (splitup[1]) {
            bot.say(config.channels[0], splitup[1] + ", " + randomFromArray(insults));
        } else bot.say(config.channels[0], from + " " + randomFromArray(insults));
        return;
    }

    if (splitup[0].toLowerCase() == "..help" || splitup[0].toLowerCase() == "!help" || splitup[0].toLowerCase() == ".help") {
        // TODO: ..lifts [who] [lift] [[weight units reps]]
        bot.say(config.channels[0], "..ping, ..sing, ..insult [name], ..dab [name], ..tell nick message, ..sotd [link], ..$ currency, ..ud word, ..weather city/code, country code");
        return;
    }

    if (splitup[0].toLowerCase() == "..dab" || splitup[0].toLowerCase() == "!dab" || splitup[0].toLowerCase() == ".dab") {
        if (splitup[1]) {
            bot.action(config.channels[0], "dabs on " + splitup.slice(1) + " " + randomFromArray(dabEmojis));
        } else bot.action(config.channels[0], "dabs on " + from + " " + randomFromArray(dabEmojis));
    }

    if (splitup[0].toLowerCase() == "..sotd" || splitup[0].toLowerCase() == "sotd" || splitup[0].toLowerCase() == "!sotd" || splitup[0].toLowerCase() == ".sotd") {
        if (splitup[1] == undefined) {
            if ((sotd.time + (60.0 * 60.0 * 8.0)) < (Date.now() / 1000.0)) {
                bot.say(config.channels[0], "time for a new song. link pls");
            } else {
                bot.say(config.channels[0], sotd.who + " has song of the day for " + timeDifference(sotd.time) + " longer: " + sotd.link);
            }
        } else if ((sotd.time + (60.0 * 60.0 * 8.0)) < (Date.now() / 1000.0)) {
            var msg = splitup.slice(1); //sanitize this too?
            msg = msg.join(" ");
            if (msg.toLowerCase().indexOf("http") < 0) bot.say(config.channels[0], from + " " + randomFromArray(rebuke));
            else {
                sotd.link = msg;
                sotd.time = Date.now() / 1000.0;
                sotd.who = from;
                bot.say(config.channels[0], "OK you got the song of the day for 8 hours");
            }
        } else {
            bot.say(config.channels[0], sotd.who + "'s song of the day for " + timeDifference(sotd.time) + " longer is " + sotd.link);
        }
        return;
    }

    for (var i = 0; i < greetings.length; i++) {
        if (splitup[1] != undefined && splitup[1].indexOf(config.botName) > -1 && greetings[i].toLowerCase() == splitup[0].toLowerCase()) {
            bot.say(config.channels[0], randomFromArray(greetings) + " " + from);
            lastPerson = from;
        }
    }

    // if ((splitup[0].toLowerCase().indexOf("m'") > -1 || message.args[1].toLowerCase().indexOf(" m'") > -1 || splitup[0].toLowerCase().indexOf("m’") > -1 || message.args[0].toLowerCase().indexOf(" m’") > -1) && message.args[0].toLowerCase().indexOf("skam") < 0 && message.args[0].toLowerCase().indexOf("trefirefem") < 0) {
    //  bot.action(config.channels[0], "tips fedora");
    //  return;
    // }
    if ((message.args[1].toLowerCase().indexOf("fuck u weakerbot") > -1) || (message.args[1].toLowerCase().indexOf("fuck you weakerbot") > -1) || (message.args[1].toLowerCase().indexOf("fuck u, weakerbot") > -1) || (message.args[1].toLowerCase().indexOf("fuck you, weakerbot") > -1)) {
        bot.say(config.channels[0], ":(");
        return;
    }
    if ((message.args[1].toLowerCase().indexOf("thanks weakerbot") > -1) || (message.args[1].toLowerCase().indexOf("thank you weakerbot") > -1) || (message.args[1].toLowerCase().indexOf("thank u, weakerbot") > -1) || (message.args[1].toLowerCase().indexOf("thank u weakerbot") > -1) || (message.args[1].toLowerCase().indexOf("ty weakerbot") > -1)) {
        bot.say(config.channels[0], ":D");
        return;
    }
    if (message.args[1].toLowerCase().indexOf("cuck") > -1) {
        bot.say(config.channels[0], from + " fuckin cuck");
        return;
    }
    if (message.args[1].toLowerCase().indexOf("hello pls") > -1) {
        // if Kyle has HELLO PLS'd 3 times, tell him to fuck off already
        if (message.nick.toLowerCase() == "trefirefem") {
            counter.tre++;
        }
        if (counter.tre == 3) {
            bot.say(config.channels[0], randomFromArray(rebuke));
            counter.tre = 0;
        } else if (message.nick.toLowerCase() != "trefirefem" && message.nick.toLowerCase() != "weakbot2") {
            bot.say(config.channels[0], from + " HELLO PLS");
        }
        return;
    }

    // TODO: ..lift

    // check unread ..tell messages
    tell.checkUnread(from, (message) => {
        bot.say(to, message);
    });

    if (splitup[0].toLowerCase() == "..tell" || splitup[0].toLowerCase() == "!tell" || splitup[0].toLowerCase() == ".tell") {
        if (splitup[1] && splitup[1].toLowerCase().indexOf("bot") > -1 && splitup[1].toLowerCase().indexOf("ferboten") < 0) {
            bot.say(config.channels[0], randomFromArray(rebuke));
            return;
        }
        if (!splitup[1] || !splitup[2]) {
            bot.say(config.channels[0], message.nick + " not enough arguments. Eg ..tell trefirefem Do you bench 2pl8 yet?");
        } else {
            var msg_to = splitup[1]; //sanitize this? idk
            var msg = splitup.slice(2); //sanitize this too?
            //accept and escape special chars
            msg = msg.join(" ");

            // store message in database
            tell.create(from, msg_to, msg);

            bot.say(to, from + ': OK got it');
        }
    }

    if (splitup[0].toLowerCase() == "..weather" || splitup[0].toLowerCase() == "!weather" || splitup[0].toLowerCase() == ".weather" || splitup[0].toLowerCase() == "..w" || splitup[0].toLowerCase() == "!w" || splitup[0].toLowerCase() == ".w") {
        //..weather london
        //weather london, uk
        //weather london uk
        //weather sandy springs
        //..weather sandy springs, us
        //weather 30308
        var weatherString = message.args[1].toLowerCase();
        weatherString = weatherString.replace(splitup[0].toLowerCase() + " ", "").split(",");
        if (weatherString[0]) {
            var query;
            weatherString[1] ? query = weatherString[0] + "," + weatherString[1] : query = weatherString[0];
            getWeather(query);
        } else bot.say(config.channels[0], "But where tho");
    }

    if (splitup[0].toLowerCase() == "..$" || splitup[0].toLowerCase() == "!$" || splitup[0].toLowerCase() == ".$") {
        //..$ 11 nok
        //.$ 123232423423423 CAD
        if (splitup[1] && splitup[2]) {
            var currencyString = splitup[1];
            var currencySign = splitup[2].toUpperCase();
            getCurrency(currencyString, currencySign);
        } else bot.say(config.channels[0], "money is a tool of the bourgeoisie");
    }
    if (splitup[0].toLowerCase() == "..u" || splitup[0].toLowerCase() == "!u" || splitup[0].toLowerCase() == ".u" || splitup[0].toLowerCase() == "..ud" || splitup[0].toLowerCase() == "!ud" || splitup[0].toLowerCase() == ".ud") {
        //..ud felching
        //.u norway
        if (splitup[1]) {
            let wordsToDefine = splitup.slice(1);
            dirtyWords(wordsToDefine);
        } else bot.say(config.channels[0], "give me a word to define, u luddite.");
    }
    if (message.args[1].toLowerCase().indexOf("for the greater good") > -1) {
        bot.say(config.channels[0], "FOR THE GREATER GOOD https://www.youtube.com/watch?v=N_q2wBzT6uU");
    }

});

function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function timeDifference(time) {
    var msec = ((sotd.time + (60.0 * 60.0 * 8.0)) * 1000.0) - Date.now();
    var hours = Math.floor(msec / 1000 / 60 / 60);
    msec -= hours * 1000 * 60 * 60;
    var mins = Math.floor(msec / 1000 / 60);
    return hours + "h" + mins + "m";
}

//https://github.com/KenanY/epley/blob/master/index.js
function epley(w, r) {
    var w = w * 1.0;
    var r = r * 1.0;
    if (r < 2) return w;
    if (!isNaN(w)) return Math.round(w * (r / 30.0 + 1.0));
    else return "???";
}

function getWeather(where) {
    var appid = config.openWeatherToken;
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + where + "&units=metric&appid=" + appid;
    console.log(url);
    request(url, function (err, response, body) {
        if (err) {
            console.log('error getting weather:', err);
            bot.say(config.channels[0], "uhhh " + err);
        } else {
            //{"coord":{"lon":-84.39,"lat":33.75},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"base":"stations","main":{"temp":280.85,"pressure":1029,"humidity":45,"temp_min":280.15,"temp_max":282.15},"visibility":16093,"wind":{"speed":5.7,"deg":80},"clouds":{"all":90},"dt":1522078500,"sys":{"type":1,"id":789,"message":0.0037,"country":"US","sunrise":1522063930,"sunset":1522108454},"id":4180439,"name":"Atlanta","cod":200}
            console.log('got the weather:', body);
            var sample = JSON.parse(body);
            if (sample.cod == 200) {
                var weatherString = "" + sample.main.temp + "C and " + sample.weather[0].description + " in " + sample.name + ", " + sample.sys.country + " (at here: http://www.google.com/maps/place/" + sample.coord.lat + "," + sample.coord.lon + ") "+ sample.main.humidity + "% humidity";
                bot.say(config.channels[0], weatherString);
            } else {
                bot.say(config.channels[0], "idk");
            }
        }
    });
}

function getCurrency(currencyString, currencySign) {
    var appid = "c7ff9f2a57486218da1f";
    var url = "https://free.currencyconverterapi.com/api/v6/convert?q=" + currencySign + "_USD&compact=ultra&apiKey=" + appid;
    request(url, function (err, response, body) {
        if (err) {
            console.log('error converting currency:', err);
        } else {
            console.log('currency converted:', body);
            var sample = JSON.parse(body);
            if (Object.getOwnPropertyNames(sample).length) {
                var currencyConv = sample[currencySign + "_USD"];
                var amount = 1.0 * currencyString * currencyConv;
                var theyDidtheMath = amount + " FREEDOM DOLLARS";
                bot.say(config.channels[0], theyDidtheMath);
            } else {
                bot.say(config.channels[0], "idk, bench more");
            }
        }
    });
}

function dirtyWords(wordsToDefine) {

    let mergedWords = wordsToDefine.join("+");
    var url = "http://api.urbandictionary.com/v0/define?term=" + mergedWords;
    request(url, function (err, response, body) {
        if (err) {
            console.log('error getting definition: ', err);
        } else {
            // console.log('Urban Dictionary Definition:', body);
            var sample = JSON.parse(body);
            var definition = sample.list[0];
            if (definition != undefined) {
                var definition = randomFromArray(sample.list);
                var word = definition.word;
                definition = definition.definition;
                definition = definition.replace(/[\[\]]/g, "");
                var defined = word + ": " + definition;
                bot.say(config.channels[0], defined);
            } else {
                bot.say(config.channels[0], "idk, you figure it out nerd.");
            }
        }
    });
}

