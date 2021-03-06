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
    'f.mouth_bottom_y',
];

feats.featuresR0 = {
    'f.head_radius': 0,
    'f.head_scale_x': 0,
    'f.head_scale_y': 0,
    'f.eye_height': 0, 
    'f.eye_spacing': 0,
    'f.eye_scale_x': 0,
    'f.eye_scale_y': 0,
    'f.eyebrow_length': 0,
    'f.eyebrow_eyedistance': 0,
    'f.eyebrow_angle': 0,
    'f.eyebrow_spacing': 0,
    'f.mouth_top_y': 0,
    'f.mouth_bottom_y': 0
}

feats.featuresR = {
    // Head

    'f.head_scale_x': {
	min: 0.001,
	max: 2,
	step: 0.001,
	value: 0.5,
	label: 'Scale head horizontally'
    },
    'f.head_scale_y': {
	min: 0.01,
	max: 2,
	step: 0.001,
	value: 1,
	label: 'Scale head vertically'
    },
    
    // Eye
    
    'f.eye_height': {
	min: 0,
	max: 2,
	step: 0.01,
	value: 0.4,
	label: 'Eye and Eyebrow height'
    },	
    
    'f.eye_spacing': {
	min: 0,
	max: 40,
	step: 0.01,
	value: 10,
	label: 'Eye spacing'
    },
    'f.eye_scale_x': {
	min: 0.01,
	max: 4,
	step: 0.01,
	value: 1,
	label: 'Scale eyes horizontally'
    },
    'f.eye_scale_y': {
	min: 0.01,
	max: 4,
	step: 0.01,
	value: 1,
	label: 'Scale eyes vertically'
    },
    
    // Eyebrow
    'f.eyebrow_length': {
	min: 0,
	max: 50,
	step: 0.01,
	value: 10,
	label: 'Eyebrow length'
    },
    
    'f.eyebrow_angle': {
	min: -3.14,
	max: 3.14,
	step: 0.01,
	value: -0.5,
	label: 'Eyebrow angle'
    },
    
    'f.eyebrow_eyedistance': {
	min: 0,
	max: 50,
	step: 0.01,
	value: 3, // From the top of the eye
	label: 'Eyebrow from eye'
    },
    
    'f.eyebrow_spacing': {
	min: 0,
	max: 50,
	step: 0.01,
	value: 5,
	label: 'Eyebrow spacing'
    },

    // Mouth 

    'f.mouth_top_y': {
	min: -60,
	max: 60,
	step: 0.01,
	value: -2,
	label: 'Upper lip'
    },
    'f.mouth_bottom_y': {
	min: -60,
	max: 60,
	step: 0.01,
	value: 20,
	label: 'Lower lip'
    },
    
    // Head

    'f.head_radius': {
	min: 10,
	max: 100,
	step: 0.01,
	value: 30,
	label: 'Zooom in'
    }
};