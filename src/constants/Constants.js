const environment = {
  dev: {
    bucket: 'geldating-dev-frontend',
    api_url: '',
  },
  qa: {
    bucket: 'geldating-qa-frontend',
    api_url: '',
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
}

export const smRoles = [
  {
    id: 1,
    name: 'Surrogate Mother'
  },
  {
    id: 2,
    name: 'Egg Donor'
  },
  {
    id: 3,
    name: 'Sperm Donor'
  },
]
export const genders = ['Male', 'Female', 'Other']
export const Static = {
  countries: ["USA", "Canada", "Australia", "Ireland"],
  sexualOrient: ['Heterosexual', 'Homosexual', 'Bisexual', 'Other'],
  height: ["5 ft 6 in", "5 ft 7 in", "5 ft 8 in", "5 ft 9 in"],
  race: ['Native American','American Indian','African American','Hispanic','Asian'],
  weight: ['50 ponds','60 ponds','70 ponds','80 ponds','90 ponds','100 ponds','110 ponds',],
  eyeColors: ["Black","Brown","Blue","Hazel","Green"],
  ethnicity: ['Hispanic and Latino Americans','African Americans','White people','Mexicans','Asian Americans','Alaska Natives','Non-Hispanic whites','American Indian group','Hispanic','Black people','Asian people'],
  location:['India', "America","Alaska Native",'USA' ],
  race:['White', 'Black or African American','American Indian or Alaska Native','Asian','Native Hawaiian or Other Pacific Islander','Mixed Or Other Race'],
  ethnicity:['Ethnicity','Ethnicity','Ethnicity','Ethnicity']

}
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
}
