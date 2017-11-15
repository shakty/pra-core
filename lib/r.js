var feats = require('./features')
var r = require('./r');
var J = require('JSUS').JSUS;
var R = {};     

var fnames = feats.featnamesR.all;

module.exports = R;

R.weightedFaceDistance = weightedFaceDistance;
R.weightedDistance = weightedDistance;
R.computeDistEuclideanAbs = computeDistEuclideanAbs;
R.averageFace = computeAvgFace;
R.distanceFromAvgFace = computeDistFromAvgFace;
R.getFaceFromRow = getFaceValuesFromRow;
R.getFacesAtRound = getFacesAtRound;
R.getDBFacesAtRound = getDBFacesAtRound;
R.getPublishedFaces = getPublishedFaces;
R.getPublishedFacesByEx = getPublishedFacesByEx;
R.computeGeomMeanFaces = R.computeGeomMeanFaces;

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
};


function computeGeomMeanFaces(face, group) {
    var i, len, prod;
    prod = 1;
    i = -1, len = group.length;
    for ( ; ++i < len ; ) {
        prod *= weightedFaceDistance(face, group[i]);
    }    
    return Math.pow(prod, 1/len);
}

function weightedFaceDistance(f1, f2) {
    return weightedDistance(fnames, f1, f2);
}

function computeDistEuclideanAbs(face, group) {
    var i, len, diffsum;
    diffsum = 0;
    i = -1, len = group.length;
    for ( ; ++i < len ; ) {
        diffsum += weightedFaceDistance(face, group[i]);
    }    
    return diffsum / len;
}

function weightedDistance(featuresnames, f1, f2) {
    var distance, range, tmp, i;
    if (!featuresnames || !f1 || !f2) {
        console.log("Empty data!");
        return false;
    }
    
    distance = 0;
    for (i = 0; i < featuresnames.length; i++) {
        // console.log(features[i]);
        range = feats.featuresR[featuresnames[i]].max - feats.featuresR[featuresnames[i]].min;
        // console.log(range);
        tmp = Math.abs(f1[featuresnames[i]] - f2[featuresnames[i]]) / range;
        // console.log(tmp)
        distance += tmp;
    }
    return distance / featuresnames.length;
}


function computeAvgFace(group) {
    var i, f, fsum, avg;
    fsum = feats.featuresR0;
    for (i = 0; i < group.length; i++) {
        f = group[i];
        fsum =  J.pairwiseWalk(fsum, f, sum);
    }

    avg = function(a,b) {
        return a / group.length;
    }
    
    var avgvalue = J.pairwiseWalk(fsum,fsum, avg);
    return avgvalue;
};

function computeDistFromAvgFace(face, group) {
    return weightedFaceDistance(face, computeAvgFace(group));
};


function getPublishedFacesByEx(db, round, cumulative) {
    var op, s, out;
    if (!round) return false;
    cumulative = cumulative || false;
    
    op = (cumulative) ? '<=' : '=';
    db.select('round', op, round);
    db.and('published', '=', 1);
    db.or('published', '=', true);
    s = db.execute();
    out = { A: [], B: [], C:[] };
    s.each(function(item) {
        var ex;
        ex = item.ex;
        if (!out[ex]) debugger;
        out[ex].push(J.subobj(item, fnames));
    });
       
    return out;
}

function getPublishedFaces(db, round, cumulative) {
    var op, s;
    if (!round) return false;
    cumulative = cumulative || false;
    
    op = (cumulative) ? '<=' : '=';
    db.select('round', op, round);
    db.and('published', '=', 1);
    db.or('published', '=', true);
    s = db.execute();

    //          console.log('CUMULATIVE ' + cumulative);
    //          console.log(s.length)
    
    return s.fetchSubObj(fnames);
}

function getFaceValuesFromRow(row) {
    return J.subobj(row, fnames);
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
