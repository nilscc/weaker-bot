import {} from "sqlite";

function deleteTell() {
    console.log('deleteTell');

    // TODO:
	// MongoClient.connect(config.url, function (err, db) {
	// 	if (err) throw err;
	// 	db.collection("tells").deleteOne({"_id": tell._id}, function (err, res) {
	// 		if (err) throw err;
	// 		console.log("deleted tell");
	// 		console.log(tell);
	// 		db.close();
	// 	});
	// });
}

export function create(from, to, message) {
    console.log("delete message " + from + " -> " + to + ": " + message);

    // TODO:
	// var tell = {
	// 	"from": from,
	// 	"to": to,
	// 	"time": Date.now() / 1000.0,
	// 	"msg": msg
	// };
	// //store it
	// // if(tells[to]){
	// // 	tells[to].push(tell);
	// // }
	// // else{
	// // 	tells[to] = [tell];
	// // }
	// // bot.say(config.channels[0], tell.from+", OK I'll try, but don't count on it. This is beta af");
	// MongoClient.connect(config.url, function (err, db) {
	// 	if (err) throw err;
	// 	db.collection("tells").insertOne(tell, function (err, res) {
	// 		if (err) throw err;
	// 		console.log("stored tell");
	// 		console.log(tell);
	// 		db.close();
	// 		bot.say(config.channels[0], tell.from + ", OK got it");
	// 	});
	// });
}

export function checkUnread(from) {
	console.log("check msg for "+from);

    // TODO:
	// var oldFrom = from;
	// from = from.toLowerCase();
	// MongoClient.connect(config.url, function (err, db) {
	// 	if (err) throw err;
	// 	db.collection("tells").findOne({"to": from}, function (err, res) {
	// 		if (err) throw err;
	// 		db.close();
	// 		if (res !== null && res !== undefined) {
	// 			console.log("unread tell");
	// 			console.log(res);
	// 			bot.say(config.channels[0], from + " message from " + res.from + "" + localTime(res.to, res.time) + ": " + res.msg);
	// 			deleteTell(res);
	// 		}
	// 	});
	// });
}
