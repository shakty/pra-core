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


feats.featuresNA = { 
    scaleX: 'NA',
    scaleY: 'NA',
    color: 'NA',
    lineWidth: 'NA',
    head_radius: 'NA',
    head_scale_x: 'NA',
    head_scale_y: 'NA',
    eye_height: 'NA',
    eye_radius: 'NA',
    eye_spacing: 'NA',
    eye_scale_x: 'NA',
    eye_scale_y: 'NA',
    pupil_radius: 'NA',
    pupil_scale_x: 'NA',
    pupil_scale_y: 'NA',
    eyebrow_length: 'NA',
    eyebrow_eyedistance: 'NA',
    eyebrow_angle: 'NA',
    eyebrow_spacing: 'NA',
    nose_height: 'NA',
    nose_length: 'NA',
    nose_width: 'NA',
    mouth_height: 'NA',
    mouth_width: 'NA',
    mouth_top_y: 'NA',
    mouth_bottom_y: 'NA' 
};

feats.features0 = { 
    scaleX: 0,
    scaleY: 0,
    color: 0,
    lineWidth: 0,
    head_radius: 0,
    head_scale_x: 0,
    head_scale_y: 0,
    eye_height: 0,
    eye_radius: 0,
    eye_spacing: 0,
    eye_scale_x: 0,
    eye_scale_y: 0,
    pupil_radius: 0,
    pupil_scale_x: 0,
    pupil_scale_y: 0,
    eyebrow_length: 0,
    eyebrow_eyedistance: 0,
    eyebrow_angle: 0,
    eyebrow_spacing: 0,
    nose_height: 0,
    nose_length: 0,
    nose_width: 0,
    mouth_height: 0,
    mouth_width: 0,
    mouth_top_y: 0,
    mouth_bottom_y: 0 
};

feats.featnamesR = {};

feats.featnamesR.all = [
    'cf.head_radius',
    'cf.head_scale_x',
    'cf.head_scale_y',
    'cf.eye_height',
    'cf.eye_spacing',
    'cf.eye_scale_x',
    'cf.eye_scale_y',
    'cf.eyebrow_length',
    'cf.eyebrow_eyedistance',
    'cf.eyebrow_angle',
    'cf.eyebrow_spacing',
    'cf.mouth_top_y',
    'cf.mouth_bottom_y',
];

feats.featuresR0 = {
    'cf.head_radius': 0,
    'cf.head_scale_x': 0,
    'cf.head_scale_y': 0,
    'cf.eye_height': 0, 
    'cf.eye_spacing': 0,
    'cf.eye_scale_x': 0,
    'cf.eye_scale_y': 0,
    'cf.eyebrow_length': 0,
    'cf.eyebrow_eyedistance': 0,
    'cf.eyebrow_angle': 0,
    'cf.eyebrow_spacing': 0,
    'cf.mouth_top_y': 0,
    'cf.mouth_bottom_y': 0
}

feats.featuresR = {
    // Head

    'cf.head_scale_x': {
	min: 0.001,
	max: 2,
	step: 0.001,
	value: 0.5,
	label: 'Scale head horizontally'
    },
    'cf.head_scale_y': {
	min: 0.01,
	max: 2,
	step: 0.001,
	value: 1,
	label: 'Scale head vertically'
    },
    
    // Eye
    
    'cf.eye_height': {
	min: 0,
	max: 2,
	step: 0.01,
	value: 0.4,
	label: 'Eye and Eyebrow height'
    },	
    
    'cf.eye_spacing': {
	min: 0,
	max: 40,
	step: 0.01,
	value: 10,
	label: 'Eye spacing'
    },
    'cf.eye_scale_x': {
	min: 0.01,
	max: 4,
	step: 0.01,
	value: 1,
	label: 'Scale eyes horizontally'
    },
    'cf.eye_scale_y': {
	min: 0.01,
	max: 4,
	step: 0.01,
	value: 1,
	label: 'Scale eyes vertically'
    },
    
    // Eyebrow
    'cf.eyebrow_length': {
	min: 0,
	max: 50,
	step: 0.01,
	value: 10,
	label: 'Eyebrow length'
    },
    
    'cf.eyebrow_angle': {
	min: -3.14,
	max: 3.14,
	step: 0.01,
	value: -0.5,
	label: 'Eyebrow angle'
    },
    
    'cf.eyebrow_eyedistance': {
	min: 0,
	max: 50,
	step: 0.01,
	value: 3, // From the top of the eye
	label: 'Eyebrow from eye'
    },
    
    'cf.eyebrow_spacing': {
	min: 0,
	max: 50,
	step: 0.01,
	value: 5,
	label: 'Eyebrow spacing'
    },

    // Mouth 

    'cf.mouth_top_y': {
	min: -60,
	max: 60,
	step: 0.01,
	value: -2,
	label: 'Upper lip'
    },
    'cf.mouth_bottom_y': {
	min: -60,
	max: 60,
	step: 0.01,
	value: 20,
	label: 'Lower lip'
    },
    
    // Head

    'cf.head_radius': {
	min: 10,
	max: 100,
	step: 0.01,
	value: 30,
	label: 'Zooom in'
    }
};
