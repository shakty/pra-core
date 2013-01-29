var J = require('JSUS').JSUS;

var core = require('./lib/basic'),
	feats = require('./lib/features'),
	dist = require('./lib/dist'),
	getfaces = require('./lib/getfaces'),
	cordis = require('./lib/correlate_distance'),
	dist2 = require('./lib/dist_advanced');
	

J.mixin(core, feats);
J.mixin(core, dist);
J.mixin(core, getfaces);
J.mixin(core, cordis);
J.mixin(core, dist2);

module.exports = core;