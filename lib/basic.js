var fs = require('fs'),
path = require('path'),
csv = require('ya-csv'),
NDDB = require('NDDB').NDDB,
J = require('JSUS').JSUS,
PlayerList = require('nodegame-client').PlayerList,
GameDB = require('nodegame-client').GameDB;

var feats = require('./features');

var pr = {};

module.exports = pr;


pr.gamedb = function() {
    var db = new NDDB();
    
    db.hash('player', function(gb) {
	return gb.player.id;
    });
    db.hash('stage', function(gb) {
	return gb.stage.stage + '.' + gb.stage.step +  '.' + gb.stage.round;
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
    var pl = new PlayerList();	
    //	pl.hash('id', function(gb) { return gb.id;});
    pl.load(DIR + 'PL.nddb');
    pl.sort('pc');
    pl.rebuildIndexes();
    return pl;
};


pr.db = function (DIR, file) {
    file = file || 'all_cf_sub_eva_copy.nddb';
    
    
    var db = pr.gamedb();
    
    db.load(DIR + file);
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



// plnunmbers
/////////

var plnumbers = J.seq(2,10,1);

pr.plnumbers = plnumbers;



pr.writeRoundStatsByEx = function(DIR, outfile, func) {
    
    var exs = ['A','B','C'];
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


pr.repair = function(DIR, nddbfile, nRounds) {
    
    console.log(DIR);
    console.log(nddbfile);
    
    var db = new GameDB();
    
    db.load(DIR + nddbfile);
    db.sort(['player.pc', 'state.round']);
    db.rebuildIndexes();
    
    var pl = new PlayerList();
    pl.load(DIR + 'PL.nddb');
    pl.rebuildIndexes();
    
    nRounds = nRounds || 30;
    
    var rounds = db.max('state.round');
    
    var roundsToDo = nRounds - rounds;
    
    var steps = [0,1];
    
    var ids = pl.getAllIDs();

    
    var round = rounds,
    state = undefined,
    player = undefined,
    value = undefined;
    
    for (var r = 0; r < roundsToDo; r++) {
	
	round++;
	step = steps[0];
	
	for (var s = 0; s < steps.length; s++) {
	    
	    step++;
	    
	    state = {
		state: 4,
		step: step,
		round: round,
		is: 50,
		paused: false
	    };
	    
	    for (var p = 0; p < ids.length; p++) {
		
		player = pl.get(ids[p]);
		console.log(player.id);
		if (step === 1) {	
		    db.add('CF', feats.featuresNA, player.id, state);
		    db.add('SUB', 'NA', player, state);
		}
		else {
		    value = {
			"for": 'NA',
			eva: 'NA'
		    };
		    db.add('EVA', value, player, state);
		    db.add('EVA', value, player, state);
		    db.add('EVA', value, player, state);
		    
		    db.save(DIR + 'pr_4.3.' + round + '.nddb');
		}
	    }
	    
	}
    }
    
    
    db.rebuildIndexes();
    
    dumpAllIndexes(db, DIR);
    
    
    function dumpAllIndexes (db, dir, options) {
        if (J.isEmpty(db.__H)) return;
        if ('undefined' === typeof dir) {
            node.log('Missing dir parameter', 'ERR', 'node.memory.dumpAllIndexes: ');
            return;
        }

        if (dir[dir.length-1] !== '/') dir = dir + '/';
        var hash, index, ipath;
        for (hash in db.__H) {
            if (db.__H.hasOwnProperty(hash)){
                if ('undefined' !== typeof db[hash]) {
                    for (index in db[hash]) {
                        if (db[hash].hasOwnProperty(index)) {
                            ipath = dir + hash + '_' + index + '.csv';
                            //node.log('Writing ' + ipath, 'DEBUG', 'node.memory.dumpAllIndexes: ');
                            writeCsv(ipath, db[hash][index].split().fetchValues(), options);
                        }
                    }

                }
            }
        }

    }

    
    function writeCsv (path, obj, options) {
        if (!path || !obj) {
            console.log('Empty path or object. Aborting.', 'ERR', 'node.fs.writeCsv: ');
            return false;
        }

        options = options || {};
        options.flags = options.flags || 'a';

        var writer = csv.createCsvStreamWriter(fs.createWriteStream(path, options));

        // <!-- Add headers, if not otherwise requested, and if found -->
        if ('undefined' === typeof options.writeHeaders) {
            options.writeHeaders = true;
        }

        if (options.writeHeaders) {
            var headers = [];
            if (J.isArray(options.headers)) {
                headers = options.headers;
            }
            else {
                headers = J.keys(obj[0]);
            }

            if (headers && headers.length) {
                writer.writeRecord(headers);
            }
            else {
                console.log('Could not find headers', 'WARN');
            }
        }

        var i;
        for (i = 0; i < obj.length; i++) {
            writer.writeRecord(obj[i]);
        }
    }


    
};
