import Strings, {ValidationMessages} from './Strings';
import {Regx} from './schemas';
import Images from './Images';
import {Platform} from 'react-native';

const environment = {
  dev: {
    bucket: '',
    api_url: 'https://mbc-dev-backend-new.kiwi-internal.com/api/v1/',
    chat: 'dev',
  },
  qa: {
    bucket: '',
    api_url: 'https://mbc-qa-backend-new.kiwi-internal.com/api/v1/',
    chat: 'qa',
  },
  stage: {
    bucket: '',
    api_url: 'https://mbc-stage-backend-new.kiwi-internal.com/api/v1/',
    chat: 'stage',
  },
};

export const {bucket, api_url, chat} = environment.qa;

const WEB_BASE_URL = 'https://makingbabyconnection.com/';
export const ABOUT_URL = `${WEB_BASE_URL}about`;
export const PRIVACY_URL = `${WEB_BASE_URL}privacy-policy`;
export const TERMS_OF_USE_URL = `${WEB_BASE_URL}terms-of-service`;

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
export const validationBank = {
  accountNumberLimit: 19,
  MIN_ACCOUNT_NUM: 12,
  routingLimit: 9,
  CardNumberLimit: 19,
  CardNumberMinLimit: 12,
  Cvv: 5,
  minCvv: 2,
  ExpiryDate: 5,
  PhoneNumber: 10,
  emailTextLimit: 60,
  userNameEmailMinLimit: 3,
  userNameMaxLimit: 30,
  LastNameLimit: 30,
  FirstNameLimit: 30,
  passwordLimit: 30,
  UserNameMaxLimit: 30,
  fullNameLimit: 60,
  longTextLimit: 400,
  linkTextLimit: 60,
  INVALID: 'Invalid!',
  REQUIRED: 'Required!',
  DOB_MIN_YEAR: 100,
  DOB_MAX_YEAR: 18,
  BIO_MAX_CHAR: 500,
  CAMPAIGN_CAPTION_MAX_CHAR: 250,
  CAMPAIGN_CAPTION_MIN_CHAR: 1,
  CAMPAIGN_TITLE: 50,
  CAMPAIGN_TITLE_MIN_CHAR: 2,
  ZIP_CODE_MIN: 3,
  ZIP_CODE_MAX: 10,
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  DATE_ERROR: 'Please set an end Date.',
  ENTER_AMOUNT_ERROR: 'Please enter a valid amount',
  NOT_ENOUGH_FUNDS: 'Not enough funds!',
  AMOUNT_MAX_DIGIT: 10, //GOAL AMOUNT
  AMOUNT_DIGIT: 8,
  MIN_GOAL_AMOUNT: 500,
  SSN: 4,
  TAX_ID: 10,
};
export const Input_Type = {
  accountholder: 'accountholder',
  accountnumber: 'accountnumber',
  routingnumber: 'routingnumber',
  cardNumber: 'cardNumber',
  expiryDate: 'expiryDate',
  cvv: 'cvv',
  fullName: 'fullName',
  firstName: 'firstName',
  tax_ID: 'tax_ID',
  ssn: 'ssn',
  zipCode: 'zipCode',
  address: 'address',
  city: 'city',
  state: 'state',
  country: 'country',
  phoneNumber: 'phoneNumber',
  dob: 'dob',
  lastName: 'lastName',
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
  OpenSansBold: 'OpenSans-Bold',
  OpenSansBoldItalic: 'OpenSans-BoldItalic',
  OpenSansExtraBold: 'OpenSans-ExtraBold',
  OpenSansExtraBoldItalic: 'OpenSans-ExtraBoldItalic',
  OpenSansItalic: 'OpenSans-Italic',
  OpenSansLight: 'OpenSans-Light',
  OpenSansLightItalic: 'OpenSans-LightItalic',
  OpenSansRegular: 'OpenSans',
  OpenSansSemibold: 'OpenSans-Semibold',
  OpenSansSemiboldItalic: 'OpenSans-SemiboldItalic',
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
  user_type: 'user_type',
  emailAddress: 'emailAddress',
  mobileNumber: 'mobileNumber',
  message: 'message',
  parent_to_be_role_id: 2,
  country: 'country',
  state_id: 'state_id',
  zipcode: 'zipcode',
  occupation: 'occupation',
  sexual_orientations_id: 'sexual_orientations_id',
  bio: 'bio',
  gender_id: 'gender_id',
};
export const ConstantsCode = {
  Country_CODE: '+1',
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
const pwdLength = value => {
  return value.length >= 8;
};
const pwdAlphaNum = value => {
  return (
    Regx.ALPHA_LOWER.test(value) &&
    Regx.NUM.test(value) &&
    Regx.ALPHA_START.test(value)
  );
};
const pwdSpecialChar = value => {
  return Regx.SPECIAL_CHAR.test(value);
};
const pwdCapAlpha = value => {
  return Regx.ALPHA_CAP.test(value);
};
export const validatePassword = (value = '', type, isPressed = true) => {
  const pwdLen = pwdLength(value);
  const alphaNum = pwdAlphaNum(value);
  const specialChar = pwdSpecialChar(value);
  const capAlpha = pwdCapAlpha(value);
  if (value) {
    switch (type) {
      case validationType.LEN:
        if (isPressed) {
          return pwdLen;
        }
        return pwdLen ? pwdLen : null;
      case validationType.ALPHA_NUM:
        if (isPressed) {
          return alphaNum;
        }
        return alphaNum ? alphaNum : null;
      case validationType.SPECIAL:
        if (isPressed) {
          return specialChar;
        }
        return specialChar ? specialChar : null;
      case validationType.CAPSLOCK:
        if (isPressed) {
          return capAlpha;
        }
        return capAlpha ? capAlpha : null;
      default:
        break;
    }
  }
  return null;
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
  Support: 'Support',
  Subscription: 'Subscription',
  PushNotificationExample: 'PushNotificationExample',
  Chat_Request: 'Chat_Request',
  Chat_Listing: 'Chat_Listing',
  ChatList: 'ChatList',
  ChatDetail: 'ChatDetail',
  ChatEmpty: 'ChatEmpty',
  Settings: 'Settings',
  ChangePassword: 'ChangePassword',
  EditProfile: 'EditProfile',
  DeleteAccount: 'DeleteAccount',
  ProfileLikedSm: 'ProfileLikedSm',
  DeactivateAccount: 'DeactivateAccount',
  WalkThrough: 'WalkThrough',
  UrlWebViewScreen: 'UrlWebViewScreen',
  WalkThroughVedio: 'WalkThroughVedio',
  HeraPay: 'HeraPay',
  WebViewUrl: 'WebViewUrl',
  AllMedia: 'AllMedia',
  PdfView: 'PdfView',
  PaymentRequest: 'PaymentRequest',
  MatchScreen: 'MatchScreen',
  Transaction: 'Transaction',
  ManageCard: 'ManageCard',
  ManageBank: 'ManageBank',
  KycScreen: 'KycScreen',
  SendRequest: 'SendRequest',
  TransactionDetails: 'TransactionDetails',
  PaymentSent: 'PaymentSent',
  ConfirmPayment: 'ConfirmPayment',
};
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
      name: '29 - 35',
    },
    {
      id: 3,
      name: '36 - 40',
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
      id: 1,
      name: 'Highschool',
    },
    {
      id: 2,
      name: 'Some College',
    },
    {
      id: 3,
      name: 'Associate’s Degree',
    },
    {
      id: 4,
      name: 'Bachelor’s Degree',
    },
    {
      id: 5,
      name: 'Master’s Degree',
    },
    {
      id: 6,
      name: 'Ph.D.',
    },
  ],
};

const HeraDevMonthly = 'com.HeraDev.Monthly';
const HeraDevYearly = 'com.HeraDev.Yearly';
const HeraDevWeekly = 'com.HeraDev.Weekly';
const SurrogateMonthly = 'com.HeraDev.SurrogateMonthly';
const SurrogateQuarterly = 'com.HeraDev.SurrogateQuarterly';
const EggDonorMonthly = 'com.HeraDev.EggDonorMonthly';
const SpermDonorMonthly = 'com.HeraDev.SpermDonorMonthly';
const surrogate_monthly = 'com.hera_dev.surrogate_monthly';
const egg_donor_monthly = 'com.hera_dev.egg_donor_monthly';
const sperm_donor_monthly = 'com.hera_dev.sperm_donor_monthly';
const EggDonorQuarterly = 'com.HeraDev.EggDonorQuarterly';
const SpermDonorQuarterly = 'com.HeraDev.SpermDonorQuarterly';

export const creditProductsIds = Platform.select({
  ios: [HeraDevMonthly, HeraDevYearly, HeraDevWeekly],
  android: [HeraDevYearly, HeraDevMonthly, HeraDevWeekly],
});

export const productsIds = Platform.select({
  ios: [
    SurrogateMonthly,
    EggDonorMonthly,
    SpermDonorMonthly,
    SurrogateQuarterly,
    EggDonorQuarterly,
    SpermDonorQuarterly,
  ],
  android: [
    // HeraDevYearly, HeraDevWeekly
    surrogate_monthly,
    egg_donor_monthly,
    sperm_donor_monthly,
  ],
});

export const SUBSCRIPTION_PLAN = [
  {
    id: 1,
    MainText: Strings.Subscription.Price,
    Months: Strings.Subscription.Commitment,
  },
  {
    id: 2,
    MainText: Strings.Subscription.yearPrice,
    Months: Strings.Subscription.YearCommitment,
  },
];

export const SENSORY_ARR = [
  {id: 1, img: Images.BABY_MOTHER, caption: Strings.Sensory.AS_PER_SEARCH},
  {id: 2, img: Images.HEART, caption: Strings.Sensory.SELECT_HEART_TO},
  {id: 2, img: Images.CROSS, caption: Strings.Sensory.SELECT_CROSS},
];
