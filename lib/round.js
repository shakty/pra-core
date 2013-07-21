var dist = require('./dist'),
	getfaces = require('./getfaces');

var weightedFaceDistance = dist.weightedFaceDistance;
	

module.exports = {
		writePreviousRoundStats: writePreviousRoundStats,
		writeCumulativeRoundStats: writeCumulativeRoundStats
};


function writePreviousRoundStats(db, DIR) {
	
	var round = 2; // IMPORTANT 2
	var old_faces, faces, round_stuff;
	
	var file = DIR + 'csv/diff/previouspub/diff_pubs_players_previous.csv';
	
	var writer = csv.createCsvStreamWriter(fs.createWriteStream(file));
	writer.writeRecord(pnames);	
	
	while (round < 31) {


		
		// Divided by player
		round_stuff = db.selexec('state.round', '=', round).sort('player');

		//for (var R = 1; R < round; R++) {
			faces = round_stuff.map(function(p) {
				return getAvgDistanceFromPubFaces(p.value, (round-1));		
			});
			
			
			writer.writeRecord(faces);
			console.log(faces);
		//}
		

		round++;
	}
	console.log("wrote " + file);

}

function writeCumulativeRoundStats(db, DIR) {
	
	var round = 2; // IMPORTANT 2
	var old_faces, faces, round_stuff;
	
	var file = DIR + 'csv/diff/previouspub/diff_pubs_players_cumulative.csv';
	
	var writer = csv.createCsvStreamWriter(fs.createWriteStream(file));
	writer.writeRecord(pnames);	
	
	while (round < 31) {

		// Divided by player
		round_stuff = db.selexec('state.round', '=', round).sort('player');

		faces = round_stuff.map(function(p) {
			faceDiff = getAvgDistanceFromPubFaces(p.value, (round-1), true);
			if (!p.diff) p.diff = {};
			p.diff.pubsCum = faceDiff;	
			return faceDiff;
		});
		
		
		writer.writeRecord(faces);
		//console.log(faces);
		

		round++;
	}
	console.log("wrote " + file);

}