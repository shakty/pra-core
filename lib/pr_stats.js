var fs = require('fs'),
	path = require('path'),
	csv = require('ya-csv'),
	NDDB = require('NDDB').NDDB,
	J = require('JSUS').JSUS,
	d3 = require('d3');

var pr = {};

module.exports = pr;

// CF FEATURES

pr.features = {
	// Head

	head_scale_x: {
		min: 0.001,
		max: 2,
		step: 0.001,
		value: 0.5,
		label: 'Scale head horizontally'
	},
	head_scale_y: {
		min: 0.01,
		max: 2,
		step: 0.001,
		value: 1,
		label: 'Scale head vertically'
	},
	
	// Eye
	
	eye_height: {
		min: 0,
		max: 2,
		step: 0.01,
		value: 0.4,
		label: 'Eye and Eyebrow height'
	},	
	
	eye_spacing: {
		min: 0,
		max: 40,
		step: 0.01,
		value: 10,
		label: 'Eye spacing'
	},
	eye_scale_x: {
		min: 0.01,
		max: 4,
		step: 0.01,
		value: 1,
		label: 'Scale eyes horizontally'
	},
	eye_scale_y: {
		min: 0.01,
		max: 4,
		step: 0.01,
		value: 1,
		label: 'Scale eyes vertically'
	},
	
	// Eyebrow
	eyebrow_length: {
		min: 0,
		max: 50,
		step: 0.01,
		value: 10,
		label: 'Eyebrow length'
	},
	
	eyebrow_angle: {
		min: -3.14,
		max: 3.14,
		step: 0.01,
		value: -0.5,
		label: 'Eyebrow angle'
	},
	
	eyebrow_eyedistance: {
		min: 0,
		max: 50,
		step: 0.01,
		value: 3, // From the top of the eye
		label: 'Eyebrow from eye'
	},
	
	eyebrow_spacing: {
		min: 0,
		max: 50,
		step: 0.01,
		value: 5,
		label: 'Eyebrow spacing'
	},

	// Mouth 

	mouth_top_y: {
		min: -60,
		max: 60,
		step: 0.01,
		value: -2,
		label: 'Upper lip'
	},
	mouth_bottom_y: {
		min: -60,
		max: 60,
		step: 0.01,
		value: 20,
		label: 'Lower lip'
	},
	
	// Head

	head_radius: {
		min: 10,
		max: 100,
		step: 0.01,
		value: 30,
		label: 'Zooom in'
	},
};

pr.gamedb = function() {
	var db = new NDDB();
	
	db.h('player', function(gb) {
		return gb.player.id;
	});
	db.h('state', function(gb) {
		return gb.state.state + '.' + gb.state.step +  '.' + gb.state.round;
	});
	db.h('key', function(gb) {
		return gb.key;
	});
	
	return db;
}

///

pr.combine = function (dirs, outdir, dbfile) {
	if (!dirs || !dirs.length) {
		console.log('cannot combine ' + dirs);
	}
	dbfile = dbfile || 'pr_full.nddb';
	
	var db = pr.gamedb();
	J.each(dirs, function(d) {
		console.log(d + dbfile);
		db.load(d + dbfile);
		
	});
	
	console.log('combined ' + db.length + ' entries');
	console.log('saving to ' + outdir + dbfile);
	db.save(outdir + dbfile);
}


pr.pl = function (DIR) {
	var pl = new NDDB();	
	pl.h('id', function(gb) { return gb.id;});
	pl.load(DIR + 'PL.nddb');
	pl.sort('pc');
	pl.rebuildIndexes();
	return pl;
}


pr.db = function (DIR, file) {
	file = file || 'all_cf_sub_eva_copy.nddb';
	
	
	var db = pr.gamedb();
	
	db.load(DIR + file);
	// Cast to number
	db.each(function(e){
		e.state.round = Number(e.state.round);
	});
	db.sort(['player.pc', 'state.round']);
	db.rebuildIndexes();
	//console.log(db.first());
	
	return db;
}

// rnames
/////////

var rnames = J.seq(1,30,1,function(e){
	if (e < 10) {
		e = '0' + e;
	}
	return 'R_' + e;
});

pr.rnames = rnames;


// featnames
////////////

pr.featnames = {};

pr.featnames.all = [
    'head_radius',
    'head_scale_x',
    'head_scale_y',
    'eye_height',
    'eye_spacing',
    'eye_scale_x',
    'eye_scale_y',
    'eyebrow_length',
    'eyebrow_eyedistance',
    'eyebrow_angle',
    'eyebrow_spacing',
    'mouth_top_y',
    'mouth_bottom_y',
];
			
pr.featnames.zoom = [
	'head_radius',
];
	
pr.featnames.head = [
	'head_scale_x',
	'head_scale_y',
];          
	
pr.featnames.eyes = [
    'eyebrow_length',
    'eyebrow_eyedistance',
    'eyebrow_angle',
    'eyebrow_spacing',
];
		
pr.featnames.mouth = [
    'mouth_top_y',
    'mouth_bottom_y',
];
		
pr.featnames.eyedistance = [
    'eye_height',
    'eye_spacing',
    'eye_scale_x',
    'eye_scale_y',
];

pr.featnames.eyebrows = [
    'eyebrow_length',
    'eyebrow_eyedistance',
    'eyebrow_angle',
    'eyebrow_spacing',
];

pr.dist = {};

pr.dist.weightedFaceDistance = weightedFaceDistance;
pr.dist.weightedDistance = weightedDistance;
pr.dist.distance = distance;
pr.dist.generalFaceDistance = generalFaceDistance;
pr.dist.distinctPartsFaceDistance = distinctPartsFaceDistance;
pr.dist.zoomDistance = zoomDistance;
pr.dist.eyeDistance = eyeDistance;
pr.dist.mouthDistance = mouthDistance;
pr.dist.eyebrowDistance = eyebrowDistance;
pr.dist.headDistance = headDistance;

	
function weightedFaceDistance (f1, f2) {
	return weightedDistance(pr.featnames.all, f1, f2);
} 
	
function weightedDistance (features, f1, f2) {
	if (!features || !f1 || !f2) {
		console.log("Empty data!");
		return false;
	}
	
	
	var distance = 0;
	var range, tmp;
	for (var i = 0; i < features.length; i++) {
//		console.log(features[i]);
		range = pr.features[features[i]].max - pr.features[features[i]].min;
//		console.log(range);
		tmp = Math.abs(f1[features[i]] - f2[features[i]]) / range;
//		console.log(tmp)
		distance += tmp;
	}
	return distance / features.length;
}

function distance(features, f1, f2) {
	if (!features || !f1 || !f2) return false;
	
	var distance = 0;
	for (var i = 0; i < features.length; i++) {
		distance+= Math.pow((f1[features[i]] - f2[features[i]]), 2);
	}
	return Math.sqrt(distance);
}


function generalFaceDistance(f1, f2) {	
	return distance(pr.featnames.all, f1, f2);
}

function distinctPartsFaceDistance(f1, f2) {
	var distance = 0;
	distance += zoomDistance(f1, f2);
	distance += headDistance(f1, f2);
	distance += eyebrowDistance(f1, f2);
	distance += mouthDistance(f1, f2);
	distance += eyeDistance(f1, f2);
	
	return distance;
}

function zoomDistance(f1, f2) {
	return weightedDistance(pr.featnames.zoom, f1, f2);
}

function headDistance(f1, f2) {
	return weightedDistance(pr.featnames.head, f1, f2);
}

function eyebrowDistance(f1, f2) {	
	return weightedDistance(pr.featnames.eyebrows, f1, f2);
}

function mouthDistance(f1, f2) {	
	return weightedDistance(pr.featnames.mouth, f1, f2);
}

function eyeDistance(f1, f2) {
	return weightedDistance(pr.featnames.eyedistance, f1, f2);
}
	

// NEW



function getPublishedFaces(db, round, cumulative) {
	if (!round) return false;
	cumulative = cumulative || false;
	
	var s = (cumulative) ? db.select('state.round', '<=', round)
						 : db.select('state.round', '=', round);
	
//		console.log('CUMULATIVE ' + cumulative);
//		console.log(s.length)
	
	return s.select('published', '=', true);
}

function getSubmittedFacesByEx(db, ex, round, cumulative) {
	if (!round) return false;
	cumulative = cumulative || false;
	
	var exdb = db.select('ex','=', ex);
	
	return (cumulative) ? exdb.select('state.round', '<=', round)
						 : exdb.select('state.round', '=', round);
	
//		console.log('CUMULATIVE ' + cumulative);
//		console.log(s.length)
	
}

function getPublishedFacesByEx(db, ex, round, cumulative) {
	if (!round) return false;
	cumulative = cumulative || false;
	
	var exdb = db.select('ex','=', ex);
	
	var s = (cumulative) ? exdb.select('state.round', '<=', round)
						 : exdb.select('state.round', '=', round);
	
//		console.log('CUMULATIVE ' + cumulative);
//		console.log(s.length)
	
	return s.select('published', '=', true);
	
}

function getAvgDistanceFromPubFaces(db, face, round, cumulative) {
	if (!face || !round) return false;
	var pubs = getPublishedFaces(db, round, cumulative);
	
	// TODO: check this
	// If there are no pubs in the previous round diff = 1
	if (!pubs || !pubs.length) return 'NA';

	var diffs = 0; 
	
	pubs.each(function(e){
		diffs += weightedFaceDistance(face, e.value);
	});
	
	return diffs / pubs.length;
}

function getAvgFaceDistance(faces) {
	if (!faces || !faces.length || faces.length === 1) return 'NA';
	var copy, face, faceDiff = 0;
	for (var i = 0 ; i < faces.length ; i++) {
		copy = faces.slice(0);
		copy.splice(i,1);
		face = faces[i];
		
		faceDiff+= getAvgFaceDistanceFromGroup(face, copy);	
		
	}
	return faceDiff / faces.length;
}

// must take care of not including the face in the group
function getAvgFaceDistanceFromGroup(face, group) {
	var diffs = 0;
//		console.log(face);
//		console.log(group.length)
	J.each(group, function(e){
		diffs += weightedFaceDistance(face.value, e.value);
	});
	return diffs / group.length;
}

function getAvgFaceDistanceGroupFromGroup(group1, group2) {
	var diffs = 0;
	
	J.each(group1, function(face){
		diffs += getAvgFaceDistanceFromGroup(face, group2);
	});
	
	return diffs / group1.length;
}


function writeRoundStatsByEx(outfile, func) {
	
	var file = DIR + outfile + '.csv';
	var pWriter = csv.createCsvStreamWriter(fs.createWriteStream(file));
	pWriter.writeRecord(exs);	

	var faces, faceDiff, round = 1;
	while (round < 31) {
		faceDiff = J.map(exs, function(ex) {
			return func(round, ex);
		});
		pWriter.writeRecord(faceDiff);	
		round++;
	}
	
	console.log("wrote " + file);

}

function writePreviousRoundStats() {
	
	var round = 2; // IMPORTANT 2
	var old_faces, faces, round_stuff;
	
	var file = DIR + 'csv/diff/previouspub/diff_pubs_players_previous.csv';
	
	var writer = csv.createCsvStreamWriter(fs.createWriteStream(file));
	writer.writeRecord(pnames);	
	
	while (round < 31) {


		
		// Divided by player
		round_stuff = db.select('state.round', '=', round).sort('player');

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

function writeCumulativeRoundStats() {
	
	var round = 2; // IMPORTANT 2
	var old_faces, faces, round_stuff;
	
	var file = DIR + 'csv/diff/previouspub/diff_pubs_players_cumulative.csv';
	
	var writer = csv.createCsvStreamWriter(fs.createWriteStream(file));
	writer.writeRecord(pnames);	
	
	while (round < 31) {

		// Divided by player
		round_stuff = db.select('state.round', '=', round).sort('player');

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

function correlateDistanceFromOriginalAndScore() {
	
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

function correlateDistanceAndScore() {
	
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

function correlateDistanceAndScoreCopy() {
	
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



