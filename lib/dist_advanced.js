var dist = require('./dist'),
	getfaces = require('./getfaces');

var J = require('JSUS').JSUS;

var weightedFaceDistance = dist.weightedFaceDistance;
	

module.exports = {
		getAvgDistanceFromPubFaces: getAvgDistanceFromPubFaces,
		getAvgFaceDistance: getAvgFaceDistance,
		getAvgFaceDistanceFromGroup: getAvgFaceDistanceFromGroup,
		getAvgFaceDistanceGroupFromGroup: getAvgFaceDistanceGroupFromGroup
};



function getAvgDistanceFromPubFaces(db, face, round, cumulative) {
	if (!face || !round) return false;
	var pubs = getfaces.getPublishedFaces(db, round, cumulative);
	
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