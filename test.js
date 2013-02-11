var fs = require('fs'),
	path = require('path'),
	csv = require('ya-csv'),
	NDDB = require('NDDB').NDDB,
	J = require('./../node_modules/NDDB/node_modules/JSUS/jsus.js').JSUS,
	d3 = require('d3'),
	pra = require('./index');

var feats = require('./lib/features');

var featnames = feats.featnames.all;



var PL = pra.pl('./data/com_rand_25_jan_2013/');

var db = pra.db('./data/com_rand_25_jan_2013/', 'all_cf_sub_eva_copy.nddb');




var db_reviews = new NDDB();
db_reviews.load('./data/com_rand_25_jan_2013/all_reviews.nddb');

db_reviews.h('player', function(e){
	return e.player;
});
db_reviews.rebuildIndexes();
//console.log(db_reviews.first());


var fileout = './data/com_rand_25_jan_2013/pr_new.csv';
var writer = csv.createCsvStreamWriter(fs.createWriteStream(fileout));

var sessions = {
             // 25 JAN 2013
             'com_rand_25_jan_2013': {
            	 date: '25-01-2013',
            	 after: 0,
            	 morn: 1,
            	 id: 1
             },
             'com_choice_25_jan_2013': {
        	 	date: '25-01-2013',
        	 	after: 1,
        	 	morn: 0,
        	 	id: 2
        	 },
             // 30 JAN 2013
             'coo_rand_30_jan_2013': {
            	 date: '30-01-2013',
            	 after: 0,
            	 morn: 1,
         	 	 id: 3
             },
             'coo_choice_30_jan_2013': {
            	 date: '30-01-2013',
            	 after: 1,
            	 morn: 0,
         	 	 id: 4
             },
             // 31 JAN 2013
             'com_choice_31_jan_2013': {
            	 date: '31-01-2013',
            	 after: 0,
            	 morn: 1,
         	 	 id: 5
             },
             'coo_rand_31_jan_2013': {
            	 date: '31-01-2013',
            	 after: 1,
            	 morn: 0,
         	 	 id: 6
             },
             // 1 FEB 2013
             'com_rand_1_feb_2013': {
            	 date: '01-02-2013',
            	 after: 1,
            	 morn: 0,
         	 	 id: 7
             },
             'coo_choice_1_feb_2013': {
            	 date: '01-02-2013',
            	 after: 0,
            	 morn: 1,
         	 	 id: 8
             },
             // 4 FEB 2013
             'com_rand_4_feb_2013': {
            	 date: '04-02-2013',
            	 after: 1,
            	 morn: 0,
         	 	 id: 9
             },
             'coo_rand_4_feb_2013': {
            	 date: '04-02-2013',
            	 after: 0,
            	 morn: 1,
         	 	 id: 10
             },
             // 6 FEB 2013
             'coo_choice_6_feb_2013': {
            	 date: '06-02-2013',
            	 after: 0,
            	 morn: 1,
         	 	 id: 11
             },
             'com_choice_6_feb_2013': {
            	 date: '06-02-2013',
            	 after: 1,
            	 morn: 0,
         	 	 id: 12
             },
             // 7 FEB 2013
             'com_rand_7_feb_2013': {
            	 date: '07-02-2013',
            	 after: 0,
            	 morn: 1,
         	 	 id: 13
             },
             'coo_rand_7_feb_2013': {
            	 date: '07-02-2013',
            	 after: 1,
            	 morn: 0,
         	 	 id: 14
            	 
             },
             // 8 FEB 2013
             'com_choice_8_feb_2013': {
            	 date: '08-02-2013',
            	 after: 0,
            	 morn: 1,
         	 	 id: 15
             },
             'coo_choice_feb_2013': {
            	 date: '08-02-2013',
            	 after: 1,
            	 morn: 0,
         	 	 id: 16
             }
};




var headings = [
                // session
                'session',
                'date',
                'morning',
                'afternoon',
                
                // treatments
                'com',
                'coo',
                'choice',
                'rand',
                
                // player
                'p.id',
                'p.number',
                'p.color',
                
                // round
                'round',
                
                // features
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
                
                // ex
                'ex',
                'published',
                
                // reviews (received)
                'r1',
                'r1.id',
                'r1.color',
                'r1.ex',
                'r1.same.color',
                'r1.same.ex',
                'r1.changed',
                'r2',
                'r2.id',
                'r2.color',
                'r2.ex',
                'r2.same.color',
                'r2.same.ex',
                'r2.changed',
                'r3',
                'r3.id',
                'r3.color',
                'r3.ex',
                'r3.same.color',
                'r3.same.ex',
                'r3.changed',
                'r.mean',
                'r.std',
                
                // evaluations (done)
                'e1',
                'e1.id',
                'e1.color',
                'e1.ex',
                'e1.same.color',
                'e1.same.ex',
                'e2',
                'e2.id',
                'e2.color',
                'e2.ex',
                'e2.same.color',
                'e2.same.ex',
                'e3',
                'e3.id',
                'e3.color',
                'e3.ex',
                'e3.same.color',
                'e3.same.ex',
                'e.changed',
                'e.mean',
                'e.std',
                
                // time for
                //'time.creation',
                //'time.review',
                //'time.dissemination'
                
                // distance 
                // ...
                
];

///////////////////////////////////////////////
// START


var sessionData = getSessionData('com_rand_25_jan_2013');

writer.writeRecord(headings);	

var fullRow;
db.each(function(e) {
//	console.log(getCFValues(e))
	fullRow = sessionData.concat(buildRoundRow(e));
	writer.writeRecord(fullRow);
});

//console.log(db_reviews.player);

//console.log(retrieveEvas('960748814137269343', 6));


function getRound(e) {
	return e.state.round;
}

function getTreatments(dir) {
	var coo, com, rand, choice;
	
	if (dir.indexOf("coo") !== -1) {
		coo = 1;
		com = 0;
	}
	else {
		com = 1;
		coo = 0;
	}
	
	if (dir.indexOf("choice") !== -1) {
		choice = 1;
		rand = 0;
	}
	else {
		rand = 1;
		choice = 0;
	}
	
	return [com, coo, choice, rand];
	
}

function getSessionData(dir) {
	var s = sessions[dir];
	var treats = getTreatments(dir);
	return [
        	s.id,
        	s.date,
        	s.morn,
        	s.after
	].concat(treats);
}

function getPlayerData(e) {
	return [e.player.id, e.player.pc, e.player.color];
}

function getCFValues(e) {
	return J.obj2Array(J.subobj(e.value, featnames));
}

function getPublished(e) {
	if (e.published) return 1;
	return 0;
}

function getReviews(e) {
	
	var p = e.player;
	var reviewers = [];
//	console.log(e)
	var V = 0; // variance
	for (var i = 0 ; i < e.reviewers.length ; i ++) {
		var rid = e.reviewers[i];
		var r = PL.get(rid);
		
		var score = e.scores[i];
		var ex = retrieveEx(p.id, e.state.round);
		var samecolor = (r.color === p.color) ? 1 : 0;
		var sameex = (r.ex === ex) ? 1 : 0;
	
		var hasChanged = retrieveChangedReview(r.id, e.state.round);
		
		V += Math.pow(score - e.avg, 2);
		
		reviewers.push(score);
		reviewers.push(r.id);
		reviewers.push(r.color);
		reviewers.push(ex);
		reviewers.push(samecolor);
		reviewers.push(sameex);
		reviewers.push(hasChanged);
		
	}
	
	reviewers.push(e.avg);
	reviewers.push(Math.sqrt(V));

	
	return reviewers;
	
}

function getEvaluations(e) {
	
	var p = e.player;
	var evas = [];
	
	var roundEvas = retrieveEvas(p.id, e.state.round);
	
	var totScore = 0; // variance
	var myEvas = [];
	var hasChanged;
	for (var i = 0 ; i < roundEvas.length ; i ++) {
		var eva = roundEvas[i];
		
		totScore += eva.score;
		myEvas.push(eva.score);
		hasChanged = eva.hasChanged;
		
		evas.push(eva.score);
		evas.push(eva.who);
		evas.push(eva.outcolor);
		evas.push(eva.outex);
		evas.push(eva.samecolor);
		evas.push(eva.sameex);
	}

	var avgEva = totScore / roundEvas.length;
	
	var V = 0;
	for (var i = 0; i < myEvas.length; i++) {
		V += Math.pow(myEvas[i] - avgEva, 2);
	}
	
	evas.push(hasChanged);
	evas.push(avgEva);
	evas.push(Math.sqrt(V));

	
	return evas;
	
}


function retrieveEx(player, round) {
	return db.player[player].select('state.round', '=', round).first().ex;
}

function retrieveChangedReview(player, round) {
	return db_reviews.player[player].select('round', '=', round).first().hasChanged;
}

function retrieveEvas(player, round) {
	return db_reviews.player[player].select('round', '=', round).fetch();
}


function buildRoundRow(e) {
	var player = getPlayerData(e);
	var round = getRound(e);
	var cf = getCFValues(e);
	var published = getPublished(e);
	var ex_and_pub = [e.ex, published];
	var reviews = getReviews(e);
	var evas = getEvaluations(e);
	
	var row = player.concat([round]).concat(cf).concat(ex_and_pub).concat(reviews).concat(evas);
	
	return row;
}
