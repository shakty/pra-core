var fs = require('fs'),
	path = require('path'),
	csv = require('ya-csv'),
	NDDB = require('NDDB').NDDB,
	J = require('JSUS').JSUS;

var features = require('./features').features,
	featnames = require('./features').featnames;

var getAvgDistanceFromPubFaces = require('./dist_advanced').getAvgDistanceFromPubFaces;

module.exports = {
		correlateDistanceFromOriginalAndScore: correlateDistanceFromOriginalAndScore,
		correlateDistanceAndScore: correlateDistanceAndScore,
		correlateDistanceAndScoreCopy: correlateDistanceAndScoreCopy
};


function correlateDistanceFromOriginalAndScore(db, DIR) {
	
	var round = 2; // IMPORTANT 2
	var old_faces, faces, round_stuff;
	
	var file = DIR + 'csv/diff/diffandscore/diffandscore.csv';
	
	var writer = csv.createCsvStreamWriter(fs.createWriteStream(file));
	writer.writeRecord(['D','S']);	
	
	while (round < 31) {

		// Divided by player
		round_stuff = db.select('state.round', '=', round).sort('player');

		var score, distance;
		faces = round_stuff.each(function(p) {
			distance = getAvgDistanceFromPubFaces(p.value, (round-1));
			score = p.avg;
			writer.writeRecord([distance, score]);
		});
		round++;
	}
	console.log("wrote " + file);

}

function correlateDistanceAndScore(db, DIR) {
	
	var round = 2; // IMPORTANT 2
	var old_faces, faces, round_stuff;
	
	var file = DIR + 'csv/diff/diffandscore/diffandscore.csv';
	
	var writer = csv.createCsvStreamWriter(fs.createWriteStream(file));
	writer.writeRecord(['D','S']);	
	
	while (round < 31) {

		// Divided by player
		round_stuff = db.select('state.round', '=', round).sort('player');

		var score, distance;
		faces = round_stuff.each(function(p) {
			distance = getAvgDistanceFromPubFaces(p.value, (round-1));
			score = p.avg;
			writer.writeRecord([distance, score]);
		});
		round++;
	}
	console.log("wrote " + file);

}

function correlateDistanceAndScoreCopy(db, DIR) {
	
	var round = 2; // IMPORTANT 2
	var old_faces, faces, round_stuff;
	
	var file = DIR + 'csv/diff/diffandscore/diffandscore_copy.csv';
	
	var writer = csv.createCsvStreamWriter(fs.createWriteStream(file));
	writer.writeRecord(['D','S']);	
	
	while (round < 31) {

		// Divided by player
		round_stuff = db.select('state.round', '=', round).sort('player');

		var score, distance;
		faces = round_stuff.each(function(p) {
			if (!p.copy) return;
			distance = getAvgDistanceFromPubFaces(p.value, (round-1));
			score = p.avg;
			writer.writeRecord([distance, score]);
		});
		round++;
	}
	console.log("wrote " + file);

}