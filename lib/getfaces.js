var J = require('JSUS').JSUS;

module.exports = {
    getPublishedFaces: getPublishedFaces,
    getSubmittedFacesByEx: getSubmittedFacesByEx,
    getPublishedFacesByEx: getPublishedFacesByEx,
    getFaceFromRow: getFaceValuesFromRow
};

function getPublishedFaces(db, round, cumulative) {
	if (!round) return false;
	cumulative = cumulative || false;
	
	var s = (cumulative) ? db.selexec('state.round', '<=', round)
						 : db.selexec('state.round', '=', round);
	
//		console.log('CUMULATIVE ' + cumulative);
//		console.log(s.length)
	
	return s.selexec('published', '=', true);
}

function getSubmittedFacesByEx(db, ex, round, cumulative) {
	if (!round) return false;
	cumulative = cumulative || false;
	
	var exdb = db.selexec('ex','=', ex);
	
	return (cumulative) ? exdb.selexec('state.round', '<=', round)
						 : exdb.selexec('state.round', '=', round);
	
//		console.log('CUMULATIVE ' + cumulative);
//		console.log(s.length)
	
}

function getPublishedFacesByEx(db, ex, round, cumulative) {
	if (!round) return false;
	cumulative = cumulative || false;
	
	var exdb = db.selexec('ex','=', ex);
	
	var s = (cumulative) ? exdb.selexec('state.round', '<=', round)
						 : exdb.selexec('state.round', '=', round);
	
//		console.log('CUMULATIVE ' + cumulative);
//		console.log(s.length)
	
	return s.selexec('published', '=', true);
	
}

function getFaceValuesFromRow(row) {
    return J.subobj(row,[
        'f.head_radius',
        'f.head_scale_x',
        'f.head_scale_y',
        'f.eye_height',
        'f.eye_spacing',
        'f.eye_scale_x',
        'f.eye_scale_y',
        'f.eyebrow_length',
        'f.eyebrow_eyedistance',
        'f.eyebrow_angle',
        'f.eyebrow_spacing',
        'f.mouth_top_y',
        'f.mouth_bottom_y'
    ]);
}