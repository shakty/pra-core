var feats = require('./features');
var J = require('JSUS').JSUS;
var dist = {};	
	
module.exports = dist;

dist.weightedFaceDistance = weightedFaceDistance;
dist.weightedDistance = weightedDistance;
dist.distance = distance;
dist.generalFaceDistance = generalFaceDistance;
dist.distinctPartsFaceDistance = distinctPartsFaceDistance;
dist.zoomDistance = zoomDistance;
dist.eyeDistance = eyeDistance;
dist.mouthDistance = mouthDistance;
dist.eyebrowDistance = eyebrowDistance;
dist.headDistance = headDistance;

function weightedFaceDistance (f1, f2) {
	return weightedDistance(feats.featnames.all, f1, f2);
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
		range = feats.features[features[i]].max - feats.features[features[i]].min;
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
	return distance(feats.featnames.all, f1, f2);
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
	return weightedDistance(feats.featnames.zoom, f1, f2);
}

function headDistance(f1, f2) {
	return weightedDistance(feats.featnames.head, f1, f2);
}

function eyebrowDistance(f1, f2) {	
	return weightedDistance(feats.featnames.eyebrows, f1, f2);
}

function mouthDistance(f1, f2) {	
	return weightedDistance(feats.featnames.mouth, f1, f2);
}

function eyeDistance(f1, f2) {
	return weightedDistance(feats.featnames.eyedistance, f1, f2);
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
