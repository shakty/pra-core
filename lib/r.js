var feats = require('./features')
var r = require('./r');
var J = require('JSUS').JSUS;
var R = {};	

var fnames = feats.featnamesR.all;
	
module.exports = R;

R.weightedFaceDistance = weightedFaceDistance;
R.weightedFaceDistance = weightedDistance;
R.averageFace = computeAvgFace;
R.distanceFromAvgFace = computeDistFromAvgFace;
R.getFaceFromRow = getFaceValuesFromRow;
R.getFacesAtRound = getFacesAtRound;
R.getDBFacesAtRound = getDBFacesAtRound;
R.getPublishedFaces = getPublishedFaces;

function weightedFaceDistance(f1, f2) {
	return weightedDistance(feats.featnamesR.all, f1, f2);
} 
	
function weightedDistance(featuresnames, f1, f2) {
    if (!featuresnames || !f1 || !f2) {
	console.log("Empty data!");
	return false;
    }
    
    var distance = 0;
    var range, tmp;
    for (var i = 0; i < featuresnames.length; i++) {
        //		console.log(features[i]);
	range = feats.featuresR[featuresnames[i]].max - feats.featuresR[featuresnames[i]].min;
        //		console.log(range);
	tmp = Math.abs(f1[featuresnames[i]] - f2[featuresnames[i]]) / range;
        //		console.log(tmp)
	distance += tmp;
    }
    return distance / featuresnames.length;
}



var cleanInput = function(a,b) {
    if ('number' === typeof a) {
        return a;
    }
    if ('string' !== typeof a || a === 'NA') {
        return 'NA';
    }
    
    a = parseFloat(a);
    if (isNaN(a)) {
        return 'NA';
    }
    
    return a;
}




var sum = function(a,b) {
    a = cleanInput(a);
    b = cleanInput(b);
    if ('number' === typeof a) {
        if ('number' === typeof b) {
            return a + b;  
        }
        else {
            return a;
        }
    }
    else if ('number' === typeof b) {
        return b;
    }
    else {
        return 'NA';
    }
}

function computeAvgFace(group) {
    var i, f, fsum, avg;
    fsum = feats.featuresR0;
    for (i=0; i<group.length; i++) {
        f = group[i];
        fsum =  J.pairwiseWalk(fsum, f, sum);
    }

    avg = function(a,b) {
        return a / group.length;
    }
       debugger;
    var avgvalue = J.pairwiseWalk(fsum,fsum, avg);
    return avgvalue;
};

function computeDistFromAvgFace(face, group) {
    return weightedFaceDistance(face, computeAvgFace(group));
};


function getPublishedFaces(db, round, cumulative) {
    var op, s;
    if (!round) return false;
    cumulative = cumulative || false;
    
    op = (cumulative) ? '<=' : '=';
    s = db.selexec('round', op, round);

    //		console.log('CUMULATIVE ' + cumulative);
    //		console.log(s.length)
    
    return s.selexec('published', '=', true).fetchSubObj(fnames);
}

function getFaceValuesFromRow(row) {
    return J.subobj(row,fnames);
}

function getDBFacesAtRound(db, round, cumulative) {
    var op, s;
    if (!round) return false;
    cumulative = cumulative || false;
    
    op = cumulative ? '<=' : '=';
    return db.selexec('round', op, round);
}

function getFacesAtRound(db, round, cumulative) {
    return getDBFacesAtRound(db,round,cumulative).fetchSubObj(fnames);
}