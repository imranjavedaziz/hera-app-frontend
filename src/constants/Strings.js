export const ValidationMessages = {
  MOBILE_REQUIRED: 'Mobile number is a required field.',
  PASSWORD_REQUIRED: 'Password is a required field.',
  COMMON_REQUIRED: 'This field is required!',
  PLEASE_ENTER_CURR_PASS: 'Please enter current password',
  PLEASE_ENTER_NEW_PASS: 'Please enter new password',
  PLEASE_ENTER_CONFIRM_PASS: 'Please enter Confirm Password',
  ALL_MANDATORY: 'Please provide all the mandatory details.',
  INVALID_MOBILE: 'Mobile number is not valid.',
  PICTURE_REQUIRE: 'Please upload a display picture',
  TERMS_CONDITIONS: 'Please accept the Terms & Conditions and Privacy Policy',
  FIRST_NAME: 'Please enter first name',
  LAST_NAME: 'Please enter your last name',
  EMPTY_EMAIL: 'Please enter your email address',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_FIRST_NAME: 'Please enter a valid first Name',
  INVALID_LAST_NAME: 'Please enter a valid last Name',
  PASSWORD: 'Please set the password',
  CONFIRM_PASSWORD: 'Please re-enter your password to confirm',
  ADD_PROFILE_PHOTO: 'Please upload a display picture',
  DOB: 'Please select your date of birth',
  ENTER_DOB: 'Please select your date of birth',
  ENTER_GENDER: 'Please select your gender',
  ENTER_SEXUAL_ORIENTATION: 'Please select your sexual orientation',
  ENTER_COUNTRY: 'Please select your country',
  ENTER_RELATIONSHIP: 'Please select your relationship status',
  ENTER_STATE: 'Please select your state',
  ENTER_ZIP: 'Please enter your zip code',
  ENTER_BIO: 'Please enter your bio',
  UNMATCHED_PASS: 'Password Does not matched',
  RACE: 'Please select your race preference',
  RACE_PRE: 'Please select the race',
  SELECT_LOOKING: 'Please select whom you are looking for',
  SELECT_HAIR: 'Please select your hair color',
  SELECT_HAIR_PRE: 'Please select the hair color',
  SELECT_EYE: 'Please select your eye color',
  SELECT_EYE_PRE: 'Please select the eye color',
  SELECT_HEIGHT: 'Please select your height',
  SELECT_AGE_PRE: 'Please select the age range',
  SELECT_MIN_QUAL: 'Please select the minimum educational qualification',
  SELECT_AGE: 'Please select your age',
  SELECT_ETHNICITY: 'Please select your ethnicity',
  PASSWORD_MIN: 'Must have minimum 8 characters',
  // PASSWORD_MIN: 'Minimum 8 characters',
  SPECIAL_CHAR: 'Must have at least 1 special character',
  // SPECIAL_CHAR: 'Atleast 1 special character',
  ALPHA_NUM: 'Must be alphanumeric and 1st letter as alphabet',
  INVALID_OTP: 'OTP is not valid',
  LOCATION_PREF: 'Please select the location',
  LOCATION: 'Please select your location preference',
  MAX_FIRST_NAME: 'First name must be at most 30 characters',
  MAX_MIDDLE_NAME: 'Middle name must be at most 30 characters',
  MAX_LAST_NAME: 'Last name must be at most 30 characters',
  Education: 'Please select your education preference',
  EducationPRE: 'Please select the minimum educational qualification',
  MAX_ZIP: 'Zip code can be of 5 digits only',
  MIN_ZIP: 'Zip code should be of 5 digits',
  SELECT_RACE: 'Please select race',
  SELECT_MOT_ETHNICITY: "Please select mother's ethnicity",
  SELECT_FAT_ETHNICITY: "Please select father's ethnicity",
  SELECT_HEIGHT_1: 'Please select height',
  SELECT_EDUCATION: 'Please select your highest education qualification',
  SELECT_HAIR_1: 'Please select hair color',
  SELECT_EYE_1: 'Please select eye color',
  SELECT_WEIGHT: 'Please select weight',
  CAPSLOCK: 'Must have at least 1 uppercase character',
  OTP_REQUIRED: 'Required!',
  USER_TYPE: 'Please select user type',
  Name: 'Please enter your name',
  ENTER_Message: 'Please enter your message',
  MOBILE_NUMBER: 'Please enter your mobile number',
  ALERT: 'Are you sure you want to abort?',
  HOLD_ON: 'Hold on!',
  CANCEL: 'Cancel',
  YES: 'YES',
  DISCARD_INQUIRY: 'Discard Support',
  DELETE_ACCOUNT: 'Delete Account?',
  Deactivate_Account: 'Deactivate Account?',
  DEACTIVATE_TEXT:
    'Once you deactivate, users will not be able to see your profile. You can always come back later to activate.',
  DELETE_TEXT:
    'Once you delete, your data will be removed and cannot be retrieved later.',
  REJECT_DISCARD: 'You do not wish to send any query to Hera?',
  LOG_OUT: 'Log Out?',
  LOGOUT_TEXT: 'Do you wish to log out of the application?',
  //Error
  NO_INTERNET_CONNECTION: 'Seems like there is no internet connection.',
};
const LIKE_CONST = 'Like, Match & Connect!';
const MOBILE_CONST = 'Mobile Number';
const CONFIRM_CONST = 'Confirm Password';
export default {
  landing: {
    LOG_IN: ' LOG IN  ',
    REGISTER: 'REGISTER',
    Like_Match_Connect: LIKE_CONST,
    AboutUs: 'About Us',
    InquiryForm: 'Support',
  },
  login: {
    MobileNumber: MOBILE_CONST,
    Password: 'Password',
    LOG_IN: 'LOG IN',
    ForgotPassword: 'Forgot Your Password?',
    NewUser: 'New User? Register Now',
  },
  mobile: {
    AccountVerification: 'Account Verification',
    BeforProceed: 'Before we proceed,',
    VerifyNumber: 'please verify your number',
    Code: 'Code',
    MobileNumber: MOBILE_CONST,
    VERIFY: 'VERIFY',
    SEND_VERIFY: 'SEND VERIFICATION CODE',
    mainTitle: 'Before we proceed,\n please verify your number',
  },
  forgotPassword: {
    forgot: 'FORGOT PASSWORD?',
    title: 'Enter your mobile number to\nreceive a verification code',
  },
  profile: {
    makeAccountFor: 'Make Account For',
    parentToBe: 'Intended Parent',
    uploadImage: '  Upload Display Picture',
    FirstName: 'First Name',
    MiddleName: 'Middle Name (Optional)',
    LastName: 'Last Name',
    EmailAddress: 'Email Address',
    DateOfBirth: 'Date of Birth',
    setPassword: 'Set Password',
    confirmPassword: CONFIRM_CONST,
    RegisterAs: 'Register as Surrogate Mother or a Donor',
    Register: 'REGISTER',
    ModalHeader: 'Cancel Registration?',
    ModalSubheader: 'If you cancel now, your progress will be lost.',
    ModalOption1: 'Yes, Discard',
    ModalOption2: 'Stay on Page',
    tmc1: "By continuing, you agree to HERA's ",
    tmc3: 'Privacy Policy',
    desc: 'We Value your privacy so we will not disclose your name to the intended parents. An ID will be displayed on your profile (eg. SM1234)',
    phone_no: 'Phone Number',
  },
  preference: {
    setPreference: 'Set Preference',
    filter: 'Filter your search criteria',
    SearchPrioritize: 'Prioritize your search',
    surrogateMother: 'Surrogate Mother',
    EggDonor: 'Egg Donor',
    SpermDonor: 'Sperm Donor',
    lookingFor: 'Who are you looking for?',
    Save: 'SAVE',
    SaveNewPassword: 'SAVE NEW PASSWORD',
    Ethnicity: 'Ethnicity',
    Race: 'Race',
    Location: 'Location',
    AgeRange: 'Age Range',
    Height: 'Height',
    HairColor: 'Hair Color',
    EyeColor: 'Eye Color',
    InquiryForm: 'Inquiry Form',
    About: 'About HERA',
    Logout: 'Log Out',
    yrs: 'yrs',
    Education: 'Education',
    editPreference: 'Edit Preference',
    SAVE_PREFERENCES: 'SAVE PREFERENCES',
  },
  otp: {
    title: 'Verify your mobile',
    titleEmail: 'Verify your email',
    subtitle1: 'Enter the 6-digit verification',
    subtitle2: 'code sent to your number',
    subtitle3: 'code sent to your email',
    Btn: 'VERIFY MOBILE NUMBER',
    Btn3: 'Verify Email Address',
    Trouble: 'Trouble receiving code?',
    SendAgain: 'Send Again',
  },
  sm_register: {
    uploadImage: 'Upload Display Picture',
    FirstName: 'First Name',
    MiddleName: 'Middle Name (Optional)',
    LastName: 'Last Name',
    DOB: 'Date of Birth',
    Password: 'Set Password',
    Confirm: CONFIRM_CONST,
    Title: 'Make account for',
    Btn: 'Register',
    Surrogate_Mother_error:
      "You are not eligible to register as a Surrogate Mother because you don't fall in the age bracket of 21-45 years.",
    Egg_Donar_error:
      "You are not eligible to register as a Egg Donor because you don't fall in the age bracket of 18-40 years.",
    Sperm_Donar_error:
      "You are not eligible to register as a Sperm Donor because you don't fall in the age bracket of 18-40 years.",
  },
  sm_basic: {
    Title: 'Basic Details',
    Subtitle: 'Complete Your Profile',
    Gender: 'Gender',
    Male: 'Male',
    Female: 'Female',
    Other: 'Other',
    Country: 'Country',
    State: 'State',
    Zip: 'Zip Code',
    Occupation: 'Occupation (Optional)',
    SexualOrientation: 'Sexual Orientation',
    RelationshipStatus: 'Relationship Status',
    Bio: 'Add a Short Bio (Max 250 Characters)',
    Btn: 'Save Profile',
    Save: 'SAVE',
    SAVE_PROFILE: 'SAVE PROFILE',
    Apply: 'APPLY',
  },
  sm_set_attributes: {
    Title: 'SET ATTRIBUTES',
    Subtitle: 'Tell us about you',
    Height: 'Height',
    Race: 'Race',
    MotherEthnicity: 'Mother’s Ethnicity',
    FatheEthnicity: 'Father’s Ethnicity',
    Weight: 'Weight',
    EyeColor: 'Eye Color',
    Education: 'Education',
    Btn: 'Save',
    EditAttribute: 'SAVE ATTRIBUTES',
    EditTitle: 'Edit ATTRIBUTES',
  },
  sm_create_gallery: {
    Title: 'Create your gallery',
    Subtitle1:
      'To match with an intended parent, upload photos that speak about you!',
    maxUpload: 'Maximum 6 photos and 1 video.',
    Btn: 'GO TO DASHBOARD',
    modalTitle: 'Remove from gallery?',
    modalsubTitle: "If you remove, it won't be visible on your profile.",
    modalsubTitleTwo:
      "If you remove the video, it won't be visible on your profile.",
    modalText: 'Yes, Remove',
    deleteModal: 'Yes, Delete',
    deactivateModal: 'Yes, Deactivate',
    StayHera: 'Stay on HERA',
    modalText_2: 'Stay on Page',
    myGallery: 'My Gallery',
    bottomSheetCamera: 'Open Camera',
    bottomSheetGallery: 'Open Gallery',
    removeImg: 'Remove From Gallery',
    uploadVideo: 'Upload Video',
    videoDuration: 'Maximum duration of video should be 60 seconds',
    videoFormat: '(AVI, MOV, MP4 format)',
    Item: 'Item Selected',
    Items: 'Items Selected',
  },
  bottomSheet: {
    Inquiry_Form: 'Support',
    About_HERA: 'About HERA',
    Log_Out: 'Log Out',
  },
  dashboard: {
    Title: LIKE_CONST,
    Subtitle: 'Your match might just\n be a click away!',
    locationText: 'U S A',
    code: '#SD5882',
    donerAge: 'Sperm Donor, 27 yrs',
    Btn: 'Save',
    Sorry: 'Sorry!',
    Para1: "You have exhausted\n today's limit.",
    Para2: 'Please come back tomorrow!',
    SecondPara1:
      'We tried to find the best matches for you but it seems like no one is around.',
    secondPara2: 'Maybe try again later or change your settings.',
    noResult: 'No Results Found!',
    emptyDashboard: 'Try using a different name or keyword',
  },
  sm_dashboard: {
    Title: LIKE_CONST,
    Subtitle1: 'Your match might just',
    Subtitle2: 'be a click away!',
  },
  PTB_Profile: {
    State: 'USA',
    first_name: 'Meryl',
    second_name: 'Anderson',
    type: 'Intended Parent',
    age: '29',
    yrs: ' yrs',
    bio: 'I give priority to health and play wide range of sports. I have a good exposure to different cultures of the world. I value the donations programmes & every parent who need support ',
    profileHighlits: ['Female', 'Hetrosexual', 'Married'],
    send_request: 'LIKE THIS PROFILE',
    request_sent: 'REQUEST SENT',
    request_decline: 'REQUEST DECLINED',
    send_msg: 'SEND MESSAGE',
    video_text: 'Parent has uploaded a short clip',
    Cross_Button: 'Cross Button, Go back',
    ReceiveNoti: 'Receive Notifications',
    YouMatched: 'You had matched on',
    ReceiveNotiDesc:
      'You can choose to turn off notifications. However, you will still receive subscription notifications.',
    ReceiveNotiDescSM: 'You can choose to turn off notifications.',
  },
  donorPofile: {
    Age: 'Age: ',
    ageDetail: '29 yrs',
    Height: 'Height: ',
    heightDetail: '5 ft 9 in',
    Weight: 'Weight: ',
    weightDetail: '140 pounds',
    Education: 'Education: ',
    educationDetail: 'MFA',
    Occupation: 'Occupation: ',
    ocupationDetail: 'Data Analyst',
    donerDescription:
      'I give priority to health and play a wide range of sports. I have a good exposure to different cultures of the world. I value the donation programmes & every parent who needs support.',
    nativePlace: 'Native American',
    fatherPlace: 'Father is',
    motherPlace: 'Mother is',
    // hairColor: 'Hair Color',
    eyeColor: 'Eye Color',
    shortClip: 'Donor has uploaded a short clip',
    place: 'Kentucky',
    code: '#SD5882',
    donerType: 'Sperm Donor',
    like_this_profile: ' LIKE THIS PROFILE',
    Not_interested: 'NOT INTERESTED',
    Race: 'Race is',
  },
  search_Bar: {
    search: 'Search',
    write_message: 'Write a message',
    Inactive: 'User is Inactive',
    smSearch: 'Search by name',
  },
  smSetting: {
    profile: 'Profile',
    ptbProfile: 'PROFILE',
    ProfileName: 'Erica Smith',
    EditAttribute: 'Edit Attributes',
    EditPreferences: 'Edit Preference',
    AddVideo: 'Add a Short Video',
    MyVideo: 'MY VIDEO',
    UploadVideo: 'Upload Video',
    ShortVideo: 'Add a short 60 sec video',
    VideoContent: 'A short video might just \nhelp you find a better match',
    Gallery: 'My Gallery',
    EditProfile: 'Edit Profile',
    Settings: 'Settings',
    Inquiry: 'Support',
    AboutUs: 'About Us',
    Privacy: 'Privacy Policy',
    Btn: 'LOG OUT',
    AppVersion: 'App Version 0.5',
    RemoveVideo: 'REMOVE VIDEO',
    Remove_Video: 'Remove Video?',
    Log_Out: 'Log Out?',
    LogoutContent: 'Do you wish to log out of the application?',
    Yes_Logout: 'Yes, Log Out',
  },
  subscribe: {
    Subscribe_Now: 'Subscribe Now',
    Plans: 'You can select any one of our plans & explore 5 profiles per day!',
    Free: 'Free Trial for 30 days',
    Subscribe_Trial:
      ' onwards, subscription will be mandatory to use the services.',
  },
  inqueryForm: {
    Subtitle: 'Have a question? \n Write to us and we’ll get \nback to you',
    Name: 'Name',
    // EmailAddress: 'Email Address',
    USER_TYPE: 'User Type',
    MobileNumber: MOBILE_CONST,
    Message: 'Message',
    SendInquiry: 'SEND QUERY',
    Title: 'SUPPORT',
    LEFT_ARROW_BUTTON: 'Left arrow Button, Press to go back',
  },
  SmDashboard: {
    search: 'Search',
  },
  stateList: {
    Subtitle: 'Search in any state',
    iconText: 'Clear',
  },

  Subscription: {
    SubHeader: 'See 5 profiles per day',
    MidHeader: '(Use-it-or-lose it)',
    SubscribeButton: 'SUBSCRIBE & PAY',
    BySubs:
      'HERA subscriptions period begin once your purchase has been confirmed with your',
    AndroidStoreName: 'Play Store Account',
    IOSStoreName: 'iTunes Account',
    RenewText: '. Your subscription will renew automatically.',
    TimePeriodText:
      ' Time period for HERA subscription is 1 month and allow you to access 5 cards on the dashboard & chat feature. ',
    PaymentCharge: 'Payments will be charged to your ',
    CONFIRMTEXT: 'at confirmation of purchase.',
    YOUR: 'Your',
    LastmainText: ` will be charged for the upcoming period unless you disable auto-renew or cancel subscription in your account settings at least 24-hours prior to the end of the current period. Any unused portion of a free trial period, if offered, will be forfeited when the user purchases a subscription to that publication, where applicable. By subscribing you agree to HERA's`,
    TermsServices: 'Terms & Conditions',
    PrivacyPolicy: 'Privacy Policy.',
    And: ' and ',
    SubscribePolicy:
      'Your subscription will be billed monthly and can be canceled anytime.',
    Commitment: '6 Month Commitment',
    YearCommitment: '12 Month Commitment',
    Price: '$299.00/mo',
    Later: 'Later',
    yearPrice: '$199.00/mo',
    Cancel: 'Cancel',
    TrailOver:
      'Your trial period is over. Please subscribe now to find new match.',
    ChatTrailOver:
      'Your trial period is over. Please subscribe now to continue your conversation.',
    SubscriptionExpired:
      'Your subscription has expired. Please renew your subscription now to find new match.',
    ChatSubscriptionExpired:
      'Your subscription has expired. Please renew your subscription now to continue your conversation.',
  },
  Chat: {
    Chat: 'CHAT',
    All_Conversations: 'All Conversations',
    WHAT_DO_YO: 'What do you think of this match?',
    NOT_GOOD: 'Not good',
    GOING_WELL: 'Going well',
    NOT_FOUND_MATCH_YET: 'Seems like you have not found any match yet.',
    YOUR_SUBSCRIPTION_EXPIRED:
      'Your subscription has expired. Please subscribe now.',
    SENDER_SUBSCRIPTION_EXPIRED: 'subscription has expired.',
    YOU_MATCHED: 'You Matched!',
    PARENT_TO_BE_CONVERSATION: ' Intended Parent will start the conversation.',
    START_CONVERSATION: 'Start a conversation!',
    INACTIVE_USER: 'Inactive User',
    HEY_ITS_MATCH: 'Hey, It’s a match!',
    PARENT_TO_BE_SEND_REQUEST: 'Intended Parent sent you a request',
    INACTIVE_ACCOUNT: 'This account is inactive',
    NICE_WATCH_FOUND: 'Nice, Your match found!',
    PLEASE_ENTER_MESSAGE: 'Please enter your message',
    PLEASE_SEND_MESSAGE_INITIATE:
      'Please send a message to initiate the conversation.',
    MATCH_SEND_SUCCESSFULLY: 'Match request sent successfully.',
  },
  Sensory: {
    AS_PER_SEARCH:
      'As per the search criteria you have set, a series of surrogate mother, sperm donor or egg donor will be shown',
    SELECT_HEART_TO:
      'Select heart to send a like to the profile & if they like you back, it will be a match! You will be able to chat only with your matches.',
    SELECT_CROSS:
      'Select cross to reject the profile & go to the next profile.',
    ABOUT: 'About this Page',
    OKAY_GOT_IT: 'OKAY, GOT IT!',
    WHY_SUBSCRIBE: 'Why Subscribe?',
    HERA_HASTWO:
      'Subscribe to be able to see a full profile of the Surrogate/Donor or send a like to your preferred profile. Please note: Subscribed users have a daily limit of 5 profile views. Subscribed users will be able to chat with their matches.',
    FIND_THE_PERFECT: 'Find the Perfect Match',
    FIND_YOUR_MATCH:
      'Find your match as per your choice of Location, Race, Education, Age or Physical attributes like Height, Hair and Eyes. These attributes will help you narrow down your search results and the best profiles will be shown to you.',
  },

  //Static
  Meryl_Anderson: 'Meryl Anderson',

  //Chat
  Type: 'Parent-To-Be',
  Liked_your_profile: 'Liked your profile',
  Start_Converstation:
    'Seems like a good match?\nLike and start a conversation!',
  All_Matches: 'All Matches',
  INBOX: 'INBOX',
  // Settings
  Settings: {
    SETTINGS: 'SETTINGS',
    Account_Settings: 'Account Settings',
    Change_Password: 'Change Password',
    DEACTIVATE_ACCOUNT: 'Deactivate Account',
    Deactivate_Content:
      'Temporarily deactivate your account, you can log in using the same credentials to activate your account again.',
    Delete_Content:
      'This will permanently delete your account, to use the application, you will need to sign up again.',
    Delete_Account: 'Delete Account',
    DELETE_MY_ACCOUNT: 'DELETE MY ACCOUNT',
    DEACTIVATE_MY_ACCOUNT: 'DEACTIVATE MY ACCOUNT',
    Account_Verify: 'ACCOUNT VERIFICATION',
    Deactivate_Account: 'DEACTIVATE ACCOUNT',
    Enter_delete: 'Enter password to delete',
    Select_Reason: 'Select a Reason',
  },
  ChangePassword: {
    CHANGE_PASSWORD: 'CHANGE PASSWORD',
    SET_A: 'Set a new password',
    SET_B: 'Set your new password',
    Current_Password: 'Current Password',
    Set_New_Password: 'Set New Password',
    Confirm_Password: CONFIRM_CONST,
    PASSWORD_UPDATED: 'Password Changed Successfully!',
  },
  //Edit Profile
  EDITPROFILE: {
    EDIT_PROFILE: 'EDIT PROFILE',
    Profile_Title: 'Change your profile details',
    DiscardEdit: 'Discard Edits',
    DiscardEditDisc: 'If you cancel now, your edits will not\n be saved.',
  },

  //Report User
  ReportUser: {
    Report_this_User: 'Report this User?',
    ReportConfirm: 'Are you sure you want to report this user?',
    Yes_Report: 'Yes, Report',
    Not_Now: 'Not Now',
  },

  STATIC_GENDER: [
    {id: 1, name: 'Male'},
    {id: 2, name: 'Female'},
    {id: 3, name: 'Other'},
  ],
  STATIC_ROLE: [
    {id: 3, name: 'Surrogate Mother'},
    {id: 4, name: 'Egg Donor'},
    {id: 5, name: 'Sperm Donor'},
  ],
  NO_INTERNET_CONNECTION: 'No Internet Connection',
  UNABLE_TO_SHOW_DATA:
    'Unable to show data as your internet might be turned off.',
  RETRY: 'Retry',
};
