import {ValidationMessages} from './Strings';
import {Regx} from './schemas';

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
    api_url: 'https://mbc-stage-backend-new.kiwi-internal.com/api/v1',
  },
};
export const {bucket, api_url} = environment.qa;

export const awsOptions = {
  keyPrefix: 'user/',
  bucket,
  region: 'us-east-1',
  accessKey: 'AKIA6AQM5CRWVFVXK67D',
  secretKey: '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',
  successActionStatus: 201,
};
export const validationType = {
  LEN: 'LEN',
  ALPHA_NUM: 'ALPHA_NUM',
  SPECIAL: 'SPECIAL',
  CAPSLOCK: 'CAPSLOCK',
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
export const FormKey = {
  role_id: 'role_id',
  first_name: 'first_name',
  middle_name: 'middle_name',
  last_name: 'last_name',
  dob: 'dob',
  email: 'email',
  password: 'password',
  country_code: 'country_code',
  phone_no: 'phone_no',
  file: 'file',
  name: 'name',
  confirm_password: 'confirm_password',
  set_password: 'set_password',
  date_of_birth: 'date_of_birth',
  looking: 'looking',
  location: 'location',
  education: 'education',
  age_range: 'age_range',
  height: 'height',
  race: 'race',
  ethnicity: 'ethnicity',
  hair: 'hair',
  eye: 'eye',
  user_type:"user_type",
  emailAddress:"emailAddress",
  mobileNumber:"mobileNumber",
  message:"message"
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
// password error message
export const pwdErrMsg = [
  {
    type: validationType.LEN,
    msg: ValidationMessages.PASSWORD_MIN,
  },
  {
    type: validationType.ALPHA_NUM,
    msg: ValidationMessages.ALPHA_NUM,
  },
  {
    type: validationType.SPECIAL,
    msg: ValidationMessages.SPECIAL_CHAR,
  },
  {type: validationType.CAPSLOCK, msg: ValidationMessages.CAPSLOCK},
];
//validate password
export const validatePassword = (value, type) => {
  if (value) {
    switch (type) {
      case validationType.LEN:
        return value.length >= 8;
      case validationType.ALPHA_NUM:
        return Regx.ALPHA_LOWER.test(value) && Regx.NUM.test(value);
      case validationType.SPECIAL:
        return Regx.SPECIAL_CHAR.test(value);
      case validationType.CAPSLOCK:
        return Regx.ALPHA_CAP.test(value);
      default:
        break;
    }
  }
  return null;
};
export const Static = {
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
  PtbProfile: 'PtbProfile',
  MyVideo: 'MyVideo',
  SmSetting: 'SmDonorSettings',
  donorGallery: 'DonorGallery',
  stateList: 'StateList',
  inqueryForm:'InqueryForm'
};
