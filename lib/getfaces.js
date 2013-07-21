module.exports = {
		getPublishedFaces: getPublishedFaces,
		getSubmittedFacesByEx: getSubmittedFacesByEx,
		getPublishedFacesByEx: getPublishedFacesByEx
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