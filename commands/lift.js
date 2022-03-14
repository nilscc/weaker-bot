	if (splitup[0].toLowerCase().indexOf("..lifts") > -1 || splitup[0].toLowerCase().indexOf("..lift") > -1 || splitup[0].toLowerCase().indexOf("!lifts") > -1 || splitup[0].toLowerCase().indexOf(".lifts") > -1) {
		//..lifts
		//..lifts bench
		//..lifts trefirefem
		//..lifts trefirefem bench
		//..lifts bench 100 kg 2

		if (!splitup[1]) {
			//get all the lifts for who sent the message
			//..lifts
			console.log("..lifts");
			var weight = {"squat": "guilt", "bench": "shame", "deadlift": "emotional baggage", "ohp": "depression"};
			var units = {"squat": "", "bench": "", "deadlift": "", "ohp": ""};
			var reps = {"squat": 0, "bench": 0, "deadlift": 0, "ohp": 0};
			MongoClient.connect(config.url, function (err, db) {
				if (err) throw err;
				db.collection("lifts").find({"who": from.toLowerCase()}).toArray(function (err, res) {
					if (err) throw err;
					// console.log(res);
					for (var i = res.length - 1; i >= 0; i--) {
						weight[res[i].lift] = res[i].weight;
						units[res[i].lift] = res[i].unit;
						reps[res[i].lift] = res[i].reps;
					}
					db.close();
					if (!res.length) bot.say(config.channels[0], from + " add some lifts first");
					var squatstring = reps.squat > 1 ? "x" + reps.squat : "";
					squatstring = weight.squat + units.squat + squatstring;
					var benchstring = reps.bench > 1 ? "x" + reps.bench : "";
					benchstring = weight.bench + units.bench + benchstring;
					var deadstring = reps.deadlift > 1 ? "x" + reps.deadlift : "";
					deadstring = weight.deadlift + units.deadlift + deadstring;
					var ohpstring = reps.ohp > 1 ? "x" + reps.ohp : "";
					ohpstring = weight.ohp + units.ohp + ohpstring;
					var string = from + " " + squatstring + "/" + benchstring + "/" + deadstring + "/" + ohpstring;
					var e1rmstring = " (e1RMs: " + epley(weight.squat, reps.squat) + units.squat + "/" + epley(weight.bench, reps.bench) + units.bench + "/" + epley(weight.deadlift, reps.deadlift) + units.deadlift + "/" + epley(weight.ohp, reps.ohp) + units.ohp + ")";
					if (res.length) bot.say(config.channels[0], string + "" + e1rmstring);
				});
			});
		} else if (!splitup[2] && (splitup[1].toLowerCase() != "squat" && splitup[1].toLowerCase() != "bench" && splitup[1].toLowerCase() != "deadlift" && splitup[1].toLowerCase() != "ohp")) {
			//get the lift for splitup[1]
			//..lifts trefirefem
			console.log("..lifts trefirefem");
			var weight = {"squat": "guilt", "bench": "shame", "deadlift": "emotional baggage", "ohp": "depression"};
			var units = {"squat": "", "bench": "", "deadlift": "", "ohp": ""};
			var reps = {"squat": 0, "bench": 0, "deadlift": 0, "ohp": 0};
			MongoClient.connect(config.url, function (err, db) {
				if (err) throw err;
				db.collection("lifts").find({"who": splitup[1].toLowerCase()}).toArray(function (err, res) {
					if (err) throw err;
					// console.log(res);
					for (var i = res.length - 1; i >= 0; i--) {
						weight[res[i].lift] = res[i].weight;
						units[res[i].lift] = res[i].unit;
						reps[res[i].lift] = res[i].reps;
					}
					db.close();
					if (!res.length) bot.say(config.channels[0], from + " couldn't find lifts for " + splitup[1] + ". Is that supposed to be a person or a lift? E.g. ..lifts trefirefem for all of trefirefem's lifts, or ..lift bench for your bench numbers");
					// var string = from+" "+splitup[1]+" squat: "+weight.squat+""+units.squat+" for "+reps.squat+" (e1rm "+epley(weight.squat, reps.squat)+""+units.squat+")";
					// string += " bench: "+weight.bench+""+units.bench+" for "+reps.bench+" (e1rm "+epley(weight.bench, reps.bench)+""+units.bench+")";
					// string += " deadlift: "+weight.deadlift+""+units.deadlift+" for "+reps.deadlift+" (e1rm "+epley(weight.deadlift, reps.deadlift)+""+units.deadlift+")";
					// string += " ohp: "+weight.ohp+""+units.ohp+" for "+reps.ohp+" (e1rm "+epley(weight.ohp, reps.ohp)+""+units.ohp+")";
					var squatstring = reps.squat > 1 ? "x" + reps.squat : "";
					squatstring = weight.squat + units.squat + squatstring;
					var benchstring = reps.bench > 1 ? "x" + reps.bench : "";
					benchstring = weight.bench + units.bench + benchstring;
					var deadstring = reps.deadlift > 1 ? "x" + reps.deadlift : "";
					deadstring = weight.deadlift + units.deadlift + deadstring;
					var ohpstring = reps.ohp > 1 ? "x" + reps.ohp : "";
					ohpstring = weight.ohp + units.ohp + ohpstring;
					var string = from + " " + squatstring + "/" + benchstring + "/" + deadstring + "/" + ohpstring;
					var e1rmstring = " (e1RMs: " + epley(weight.squat, reps.squat) + units.squat + "/" + epley(weight.bench, reps.bench) + units.bench + "/" + epley(weight.deadlift, reps.deadlift) + units.deadlift + "/" + epley(weight.ohp, reps.ohp) + units.ohp + ")";
					if (res.length) bot.say(config.channels[0], string + "" + e1rmstring);
				});
			});
		} else if (!splitup[2] && (splitup[1].toLowerCase() == "squat" || splitup[1].toLowerCase() == "bench" || splitup[1].toLowerCase() == "deadlift" || splitup[1].toLowerCase() == "ohp")) {
			//get the lift for the person who sent the message
			//..lifts bench
			console.log("..lifts bench");
			MongoClient.connect(config.url, function (err, db) {
				if (err) throw err;
				db.collection("lifts").findOne({
					"who": from.toLowerCase(),
					"lift": splitup[1].toLowerCase()
				}, function (err, res) {
					if (err) throw err;
					// console.log(res[0]);
					db.close();
					if (res == null) bot.say(config.channels[0], from + " uh hmm didn't find that... Is that lift added? E.g. ..lifts bench");
					if (res != null) bot.say(config.channels[0], from + " you " + splitup[1] + " " + res.weight + "" + res.unit + " for " + res.reps + " (e1rm " + epley(res.weight, res.reps) + "" + res.unit + ")");
				});
			});
		} else if (splitup[2].toLowerCase() == "squat" || splitup[2].toLowerCase() == "bench" || splitup[2].toLowerCase() == "deadlift" || splitup[2].toLowerCase() == "ohp") {
			//get the lifts for splitup[1]
			//..lifts trefirefem bench
			console.log("..lifts trefirefem bench");
			MongoClient.connect(config.url, function (err, db) {
				if (err) throw err;
				db.collection("lifts").findOne({
					"who": splitup[1].toLowerCase(),
					"lift": splitup[2].toLowerCase()
				}, function (err, res) {
					if (err) throw err;
					// console.log(res[0]);
					db.close();
					if (res == null) bot.say(config.channels[0], from + " uh hmm didn't find that lift for person. E.g. ..lifts trefirefem bench");
					if (res != null) bot.say(config.channels[0], from + " " + splitup[1] + " " + splitup[2] + " " + res.weight + "" + res.unit + " for " + res.reps + " (e1rm " + epley(res.weight, res.reps) + "" + res.unit + ")");
				});
			});
		} else if (splitup[2].toLowerCase() != "squat" && splitup[2].toLowerCase() != "bench" && splitup[2].toLowerCase() != "deadlift" && splitup[2].toLowerCase() != "ohp") {
			//update the lift for the person who sent the message
			//..lifts bench 100 kg 2
			console.log("..lifts bench 100 kg 2");
			if (isNaN(splitup[2] || isNaN(splitup[4]))) {
				bot.say(config.channels[0], from + " ..lifts [squat/bench/deadlift/ohp] [weight] [units] [reps] (e.g. ..lifts bench 100 lbs 2)");
				return;
			}
			MongoClient.connect(config.url, function (err, db) {
				if (err) throw err;
				db.collection("lifts").update({
					"who": from.toLowerCase(),
					"lift": splitup[1].toLowerCase()
				}, {
					"who": from.toLowerCase(),
					"lift": splitup[1].toLowerCase(),
					"weight": splitup[2],
					"unit": splitup[3].toLowerCase(),
					"reps": splitup[4]
				}, {upsert: true}, function (err, res) {
					if (err) throw err;
					// console.log("did find");
					// console.log(res);
					db.close();
					if (res == null) bot.say(config.channels[0], from + " oh, uh hmm didn't find that...?");
					if (res != null) bot.say(config.channels[0], from + " gj bb! That's an e1rm of " + epley(splitup[2], splitup[4]) + "" + splitup[3]);
				});
			});
		} else bot.say(config.channels[0], from + " ..lifts [who] [squat/bench/deadlift/ohp] ([weight] [units] [reps]) (e.g. ..lift trefirefem or ..lifts bench 100 lbs 2)");
	}

