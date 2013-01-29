var fs = require('fs'),
	path = require('path'),
	csv = require('ya-csv'),
	NDDB = require('NDDB').NDDB,
	J = require('JSUS').JSUS,
	d3 = require('d3');


var pr = {};

module.exports = pr;


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
};

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
};


pr.pl = function (DIR) {
	var pl = new NDDB();	
	pl.h('id', function(gb) { return gb.id;});
	pl.load(DIR + 'PL.nddb');
	pl.sort('pc');
	pl.rebuildIndexes();
	return pl;
};


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
};

// rnames
/////////

var rnames = J.seq(1,30,1,function(e){
	if (e < 10) {
		e = '0' + e;
	}
	return 'R_' + e;
});

pr.rnames = rnames;



pr.writeRoundStatsByEx = function(outfile, func) {
	
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

};

pr.writePreviousRoundStats = function() {
	
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

};

pr.writeCumulativeRoundStats = function() {
	
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

};