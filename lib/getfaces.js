module.exports = {
		getPublishedFaces: getPublishedFaces,
		getSubmittedFacesByEx: getSubmittedFacesByEx,
		getPublishedFacesByEx: getPublishedFacesByEx
};

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