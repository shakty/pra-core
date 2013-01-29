var feats = {};

module.exports = feats;

// CF FEATURES

feats.features = {
	// Head

	head_scale_x: {
		min: 0.001,
		max: 2,
		step: 0.001,
		value: 0.5,
		label: 'Scale head horizontally'
	},
	head_scale_y: {
		min: 0.01,
		max: 2,
		step: 0.001,
		value: 1,
		label: 'Scale head vertically'
	},
	
	// Eye
	
	eye_height: {
		min: 0,
		max: 2,
		step: 0.01,
		value: 0.4,
		label: 'Eye and Eyebrow height'
	},	
	
	eye_spacing: {
		min: 0,
		max: 40,
		step: 0.01,
		value: 10,
		label: 'Eye spacing'
	},
	eye_scale_x: {
		min: 0.01,
		max: 4,
		step: 0.01,
		value: 1,
		label: 'Scale eyes horizontally'
	},
	eye_scale_y: {
		min: 0.01,
		max: 4,
		step: 0.01,
		value: 1,
		label: 'Scale eyes vertically'
	},
	
	// Eyebrow
	eyebrow_length: {
		min: 0,
		max: 50,
		step: 0.01,
		value: 10,
		label: 'Eyebrow length'
	},
	
	eyebrow_angle: {
		min: -3.14,
		max: 3.14,
		step: 0.01,
		value: -0.5,
		label: 'Eyebrow angle'
	},
	
	eyebrow_eyedistance: {
		min: 0,
		max: 50,
		step: 0.01,
		value: 3, // From the top of the eye
		label: 'Eyebrow from eye'
	},
	
	eyebrow_spacing: {
		min: 0,
		max: 50,
		step: 0.01,
		value: 5,
		label: 'Eyebrow spacing'
	},

	// Mouth 

	mouth_top_y: {
		min: -60,
		max: 60,
		step: 0.01,
		value: -2,
		label: 'Upper lip'
	},
	mouth_bottom_y: {
		min: -60,
		max: 60,
		step: 0.01,
		value: 20,
		label: 'Lower lip'
	},
	
	// Head

	head_radius: {
		min: 10,
		max: 100,
		step: 0.01,
		value: 30,
		label: 'Zooom in'
	}
};



//featnames
////////////

feats.featnames = {};

feats.featnames.all = [
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
];
			
feats.featnames.zoom = [
	'head_radius',
];
	
feats.featnames.head = [
	'head_scale_x',
	'head_scale_y',
];          
	
feats.featnames.eyes = [
 'eyebrow_length',
 'eyebrow_eyedistance',
 'eyebrow_angle',
 'eyebrow_spacing',
];
		
feats.featnames.mouth = [
 'mouth_top_y',
 'mouth_bottom_y',
];
		
feats.featnames.eyedistance = [
 'eye_height',
 'eye_spacing',
 'eye_scale_x',
 'eye_scale_y',
];

feats.featnames.eyebrows = [
 'eyebrow_length',
 'eyebrow_eyedistance',
 'eyebrow_angle',
 'eyebrow_spacing',
];