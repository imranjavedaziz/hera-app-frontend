const environment = {
  dev: {
    bucket: 'geldating-dev-frontend',
    api_url: 'https://mbc-dev-backend-new.kiwi-internal.com/api/v1/',
  },
  qa: {
    bucket: 'geldating-qa-frontend',
    api_url: 'https://mbc-qa-backend-new.kiwi-internal.com/api/v1',
  },
  stage: {
    bucket: 'geldating-stage-frontend',
    api_url: '',
  },
};
export const {bucket, api_url} = environment.dev;

export const awsOptions = {
  keyPrefix: 'user/',
  bucket,
  region: 'us-east-1',
  accessKey: 'AKIA6AQM5CRWVFVXK67D',
  secretKey: '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',
  successActionStatus: 201,
};

export const HttpStatus = {
  UNAUTHORISED: 401,
  SUCCESS_REQUEST: 200,
  SUCCESS_CODE_202: 202,
  SUCCESS_CODE_201: 201,
  SUCCESS_CODE_204: 204,
  UNAUTHORISED_400: 400,
  SUCCESS_CODE_205: 205,
};

export const Fonts = {
  OoohBabyRegular: 'OoohBaby-Regular',
  OpenSansBold: 'OpenSans-Bold',
  OpenSansItalic: 'OpenSans-Italic',
  OpenSansLight: 'OpenSans-Light',
  OpenSansRegular: 'OpenSans',
  OpenSansSemibold: 'OpenSans-Semibold',
};

export const smRoles = [
  {
    id: 3,
    name: 'Surrogate Mother',
  },
  {
    id: 4,
    name: 'Egg Donor',
  },
  {
    id: 5,
    name: 'Sperm Donor',
  },
];

export const genders = [
  {
    id: 1,
    name: 'Male',
  },
  {
    id: 2,
    name: 'Female',
  },
  {
    id: 3,
    name: 'Other',
  },
];
export const lookingFor = [
  {
    id: 1,
    name: 'Surrogate Mother',
  },
  {
    id: 2,
    name: 'Egg Donor',
  },
  {
    id: 3,
    name: 'Sperm Donor',
  },
];
export const Static = {
  countries: [
    {
      id: 1,
      code: 'AL',
      name: 'Alabama',
    },
    {
      id: 2,
      code: 'AK',
      name: 'Alaska',
    },
    {
      id: 3,
      code: 'AZ',
      name: 'Arizona',
    },
    {
      id: 4,
      code: 'AR',
      name: 'Arkansas',
    },
    {
      id: 5,
      code: 'CA',
      name: 'California',
    },
    {
      id: 6,
      code: 'CO',
      name: 'Colorado',
    },
    {
      id: 7,
      code: 'CT',
      name: 'Connecticut',
    },
    {
      id: 8,
      code: 'DE',
      name: 'Delaware',
    },
    {
      id: 9,
      code: 'DC',
      name: 'District of Columbia',
    },
    {
      id: 10,
      code: 'FL',
      name: 'Florida',
    },
    {
      id: 11,
      code: 'GA',
      name: 'Georgia',
    },
    {
      id: 12,
      code: 'HI',
      name: 'Hawaii',
    },
    {
      id: 13,
      code: 'ID',
      name: 'Idaho',
    },
    {
      id: 14,
      code: 'IL',
      name: 'Illinois',
    },
    {
      id: 15,
      code: 'IN',
      name: 'Indiana',
    },
    {
      id: 16,
      code: 'IA',
      name: 'Iowa',
    },
    {
      id: 17,
      code: 'KS',
      name: 'Kansas',
    },
    {
      id: 18,
      code: 'KY',
      name: 'Kentucky',
    },
    {
      id: 19,
      code: 'LA',
      name: 'Louisiana',
    },
    {
      id: 20,
      code: 'ME',
      name: 'Maine',
    },
    {
      id: 21,
      code: 'MD',
      name: 'Maryland',
    },
    {
      id: 22,
      code: 'MA',
      name: 'Massachusetts',
    },
    {
      id: 23,
      code: 'MI',
      name: 'Michigan',
    },
    {
      id: 24,
      code: 'MN',
      name: 'Minnesota',
    },
    {
      id: 25,
      code: 'MS',
      name: 'Mississippi',
    },
    {
      id: 26,
      code: 'MO',
      name: 'Missouri',
    },
    {
      id: 27,
      code: 'MT',
      name: 'Montana',
    },
    {
      id: 28,
      code: 'NE',
      name: 'Nebraska',
    },
    {
      id: 29,
      code: 'NV',
      name: 'Nevada',
    },
    {
      id: 30,
      code: 'NH',
      name: 'New Hampshire',
    },
    {
      id: 31,
      code: 'NJ',
      name: 'New Jersey',
    },
    {
      id: 32,
      code: 'NM',
      name: 'New Mexico',
    },
    {
      id: 33,
      code: 'NY',
      name: 'New York',
    },
    {
      id: 34,
      code: 'NC',
      name: 'North Carolina',
    },
    {
      id: 35,
      code: 'ND',
      name: 'North Dakota',
    },
    {
      id: 36,
      code: 'OH',
      name: 'Ohio',
    },
    {
      id: 37,
      code: 'OK',
      name: 'Oklahoma',
    },
    {
      id: 38,
      code: 'OR',
      name: 'Oregon',
    },
    {
      id: 39,
      code: 'PA',
      name: 'Pennsylvania',
    },
    {
      id: 40,
      code: 'PR',
      name: 'Puerto Rico',
    },
    {
      id: 41,
      code: 'RI',
      name: 'Rhode Island',
    },
    {
      id: 42,
      code: 'SC',
      name: 'South Carolina',
    },
    {
      id: 43,
      code: 'SD',
      name: 'South Dakota',
    },
    {
      id: 44,
      code: 'TN',
      name: 'Tennessee',
    },
    {
      id: 45,
      code: 'TX',
      name: 'Texas',
    },
    {
      id: 46,
      code: 'UT',
      name: 'Utah',
    },
    {
      id: 47,
      code: 'VT',
      name: 'Vermont',
    },
    {
      id: 48,
      code: 'VA',
      name: 'Virginia',
    },
    {
      id: 49,
      code: 'WA',
      name: 'Washington',
    },
    {
      id: 50,
      code: 'WV',
      name: 'West Virginia',
    },
    {
      id: 51,
      code: 'WI',
      name: 'Wisconsin',
    },
    {
      id: 52,
      code: 'WY',
      name: 'Wyoming',
    },
  ],
  state: [
    {
      id:1,
      name:'Alabama',
    },
    {
      id:2,
      name:'Alaska',
    },
    {
      id:3,
      name:'Florida',
    },
    {
      id:4,
      name:'Georgia',
    },
    {
      id:5,
      name:'Hawaii',
    },
    {
      id:6,
      name:'New Jersey',
    },
    {
      id:7,
      name:'New Mexico',
    },
    {
      id:8,
      name:'New York',
    },
  ],
  sexualOrient: [
    {
      id: 1,
      name: 'Heterosexual',
    },
    {
      id: 2,
      name: 'Homosexual',
    },
    {
      id: 3,
      name: 'Bisexual',
    },
    {
      id: 4,
      name: 'Other',
    },
  ],
  height: [
    {
      id: 1,
      name: '58',
    },
    {
      id: 2,
      name: '59',
    },
    {
      id: 3,
      name: '60',
    },
    {
      id: 4,
      name: '61',
    },
    {
      id: 5,
      name: '62',
    },
    {
      id: 6,
      name: '63',
    },
    {
      id: 7,
      name: '64',
    },
    {
      id: 8,
      name: '65',
    },
    {
      id: 9,
      name: '66',
    },
    {
      id: 10,
      name: '67',
    },
    {
      id: 11,
      name: '68',
    },
    {
      id: 12,
      name: '69',
    },
    {
      id: 13,
      name: '70',
    },
    {
      id: 14,
      name: '71',
    },
    {
      id: 15,
      name: '72',
    },
    {
      id: 16,
      name: '73',
    },
    {
      id: 17,
      name: '74',
    },
    {
      id: 18,
      name: '75',
    },
    {
      id: 19,
      name: '76',
    },
    {
      id: 20,
      name: '77',
    },
    {
      id: 21,
      name: '78',
    },
    {
      id: 22,
      name: '79',
    },
    {
      id: 23,
      name: '80',
    },
    {
      id: 24,
      name: '81',
    },
    {
      id: 25,
      name: '82',
    },
    {
      id: 26,
      name: '83',
    },
    {
      id: 27,
      name: '84',
    },
  ],
  race: [
    {
      id: 1,
      name: 'White',
    },
    {
      id: 2,
      name: 'Black or African American',
    },
    {
      id: 3,
      name: 'American Indian or Alaska Native',
    },
    {
      id: 4,
      name: 'Asian',
    },
    {
      id: 5,
      name: 'Native Hawaiian or Other Pacific Islander',
    },
    {
      id: 6,
      name: 'Mixed Or Other Race',
    },
  ],
  weight: [
    {
      id: 1,
      name: '100',
    },
    {
      id: 2,
      name: '101',
    },
    {
      id: 3,
      name: '102',
    },
    {
      id: 4,
      name: '103',
    },
    {
      id: 5,
      name: '104',
    },
  ],
  eyeColors: [
    {
      id: 1,
      name: 'Brown',
    },
    {
      id: 2,
      name: 'Blue',
    },
    {
      id: 3,
      name: 'Hazel',
    },
    {
      id: 4,
      name: 'Amber',
    },
    {
      id: 5,
      name: 'Green',
    },
  ],
  hairColors: [
    {
      id: 1,
      name: 'Brown',
    },
    {
      id: 2,
      name: 'Black',
    },
    {
      id: 3,
      name: 'Blonde',
    },
    {
      id: 4,
      name: 'Red',
    },
  ],
  ageRange: [
    {
      id: 1,
      name: '21 - 28',
    },
    {
      id: 2,
      name: '28 - 35',
    },
    {
      id: 3,
      name: '35 - 40',
    },
  ],
  ethnicity: [
    {
      id: 1,
      name: 'Hispanic and/or Latino/a/x',
    },
    {
      id: 2,
      name: 'Not Hispanic and/or Latino/a/x',
    },
    {
      id: 3,
      name: 'Prefer not to disclose',
    },
    {
      id: 4,
      name: 'Other',
    },
  ],
  location: [
    {
      id: 1,
      name: 'India',
    },
    {
      id: 2,
      name: 'America',
    },
    {
      id: 3,
      name: 'Alaska Native',
    },
    {
      id: 4,
      name: 'India',
    },
  ],
  relationship_status: [
    {
      id: 1,
      name: 'Single',
    },
    {
      id: 2,
      name: 'Married',
    },
    {
      id: 3,
      name: 'Widowed',
    },
    {
      id: 4,
      name: 'Divorced',
    },
    {
      id: 5,
      name: 'Married but separated',
    },
  ],
  education: [
    {
      id:1,
      name:'High School',
    },
    {
      id: 2,
      name: 'Trade School',
    },
    {
      id: 3,
      name: 'Some College',
    },
    {
      id: 4,
      name: 'Associate’s Degree',
    },
    {
      id: 5,
      name: 'Bachelor’s Degree',
    },
    {
      id: 6,
      name: 'Master’s Degree',
    },
    {
      id: 7,
      name: 'Ph.D.',
    },
  ],
  Profile: [
    {
      name: 'Marley',
      image:
        'https://dindin-preprod-backend.s3.amazonaws.com/chefs/kelsey-kane/profile-screen_2x.jpg',
      location: 'USA',
    },
    {
      name: 'Steve',
      image:
        'https://dindin-preprod-backend.s3.amazonaws.com/chefs/joan-bonilla/profile-logo.png',
      location: 'USA',
    },
    {
      name: 'Emilio',
      image:
        'https://dindin-preprod-backend.s3.amazonaws.com/chefs/kelsey-kane/profile-screen_2x.jpg',
      location: 'USA',
    },
    {
      name: 'AYUSH',
      image:
        'https://dindin-preprod-backend.s3.amazonaws.com/chefs/joan-bonilla/profile-logo.png',
      location: 'USA',
    },
    {
      name: 'AYUSH',
      image:
        'https://dindin-preprod-backend.s3.amazonaws.com/chefs/joan-bonilla/profile-logo.png',
      location: 'USA',
    },
    {
      name: 'AYUSH',
      image:
        'https://dindin-preprod-backend.s3.amazonaws.com/chefs/joan-bonilla/profile-logo.png',
      location: 'USA',
    },
    {
      name: 'AYUSH',
      image:
        'https://dindin-preprod-backend.s3.amazonaws.com/chefs/joan-bonilla/profile-logo.png',
      location: 'USA',
    },
  ],
};
export const Routes = {
  Landing: 'Landing',
  Login: 'Login',
  MobileNumber: 'MobileNumber',
  OTP: 'OTP',
  SmRegister: 'SmRegister',
  SmBasicDetails: 'SmBasicDetails',
  SetAttributes: 'SetAttributes',
  CreateGallery: 'CreateGallery',
  Profile: 'Profile',
  SetPreference: 'SetPreference',
  PtbDashboard: 'PtbDashboard',
  PtbBasicDetails: 'PtbBasicDetails',
  ProfileDetails: 'ProfileDetails',
  SmDashboard: 'SmDashboard',
  DashboardDetailScreen: 'DashboardDetailScreen',
  SmSetting: 'SmDonorSettings',
};
