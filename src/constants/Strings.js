export const ValidationMessages = {
  MOBILE_REQUIRED: 'Mobile number is a required field.',
  PASSWORD_REQUIRED: 'Password is a required field.',
  COMMON_REQUIRED: 'This field is required!',
  INVALID_MOBILE: 'Mobile number is not valid.',
  PICTURE_REQUIRE: 'Please upload a display picture',
  TERMS_OF_USE: 'Please accept the Terms of Use',
  FIRST_NAME: 'Please enter your First Name',
  LAST_NAME: 'Please enter your Last Name',
  EMPTY_EMAIL: 'Please enter your Email ID',
  INVALID_EMAIL: 'Please enter a valid Email ID',
  INVALID_FIRST_NAME: 'Please enter a valid First Name',
  INVALID_LAST_NAME: 'Please enter a valid Last Name',
  PASSWORD: 'Please Set the Password',
  CONFIRM_PASSWORD: 'Please enter Confirm Password',
  ADD_PROFILE_PHOTO: 'Please upload a display picture',
  DOB: 'Please enter your Date of Birth',
  ENTER_DOB: 'Please enter your DOB',
  ENTER_GENDER: 'Please select your Gender',
  ENTER_SEXUAL_ORIENTATION: 'Please select your Sexual Orientation',
  ENTER_COUNTRY: 'Please select your Country',
  ENTER_RELATIONSHIP: 'Please select your Relationship Status',
  ENTER_STATE: 'Please select your State',
  ENTER_ZIP: 'Please enter your Zip Code',
  ENTER_BIO: 'Please enter your Bio',
  UNMATCHED_PASS: 'Password Does not matched',
  RACE: 'Please select your race preference',
  SELECT_LOOKING: 'Please select whom you are looking for',
  SELECT_HAIR: 'Please select your hair color preference',
  SELECT_EYE: 'Please select your eye color preference',
  SELECT_HEIGHT: 'Please select your height',
  SELECT_AGE: 'Please select your age',
  SELECT_ETHNICITY: 'Please select your ethnicity preference',
  PASSWORD_MIN: 'Must have minimum 8 characters',
  // PASSWORD_MIN: 'Minimum 8 characters',
  SPECIAL_CHAR: 'Must have atleast 1 special character',
  // SPECIAL_CHAR: 'Atleast 1 special character',
  ALPHA_NUM: 'Must be Alphanumeric',
  INVALID_OTP: 'OTP is not valid',
  LOCATION: 'Please select your Location preference',
  MAX_FIRST_NAME: 'First name must be at most 30 characters',
  MAX_MIDDLE_NAME: 'Middle name must be at most 30 characters',
  MAX_LAST_NAME: 'Last name must be at most 30 characters',
  Education: 'Please select your Education preference',
  MAX_ZIP: 'Zip code can be of 5 digits only',
  MIN_ZIP: 'Zip code should be of 5 digits',
  SELECT_RACE: 'Please enter Race',
  SELECT_MOT_ETHNICITY: "Please enter Mother's Ethnicity",
  SELECT_FAT_ETHNICITY: "Please provide Father's Ethnicity",
  SELECT_HEIGHT_1: 'Please enter Height',
  SELECT_EDUCATION: 'Please select your maximum Education Qualification',
  SELECT_HAIR_1: 'Please enter Hair color',
  SELECT_EYE_1: 'Please enter Eye color',
  SELECT_WEIGHT: 'Please enter Weight',
  CAPSLOCK: 'Atleast 1 upper case letter',
  OTP_REQUIRED: 'Required!',
  USER_TYPE: 'Please select a user type',
  Name: 'Please enter your Name',
  ENTER_Message: 'Please enter your Message',
  MOBILE_NUMBER: 'Please enter your Mobile Number',
  ALERT: 'Are you sure you want to abort?',
  HOLD_ON: 'Hold on!',
  CANCEL: 'Cancel',
  YES: 'YES',
  DISCARD_INQUIRY: 'Discard Inquiry',
  DELETE_ACCOUNT: 'Delete Account?',
  Deactivate_Account: 'Deactivate Account?',
  DEACTIVATE_TEXT:
    'Once you deactivate, users will not be able to see your profile. You can always come back later to activate.',
  DELETE_TEXT:
    'Once you delete, your data will be removed and cannot be retrieved later.',
  REJECT_DISCARD: 'You don not wish to send any inquiry to Hera?',
};
const LIKE_CONST = 'Like, Match & Connect!';
const MOBILE_CONST = 'Mobile Number';
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
    mainTitle: 'Before we proceed,\n please verify your number',
  },
  forgotPassword: {
    forgot: 'Forgot Password?',
    title: 'Enter your mobile number to\nreceive a verification code',
  },
  profile: {
    makeAccountFor: 'Make Account For',
    parentToBe: 'Parent To Be',
    uploadImage: '  Upload Display Picture',
    FirstName: 'First Name',
    MiddleName: 'Middle Name (Optional)',
    LastName: 'Last Name',
    EmailAddress: 'Email Address',
    DateOfBirth: 'Date Of Birth',
    setPassword: 'Set Password',
    confirmPassword: 'Confirm Password',
    RegisterAs: 'Register as Surrogate Mother or a Donor',
    Register: 'REGISTER',
    ModalHeader: 'Cancel Registration?',
    ModalSubheader: 'If you cancel now, your progress will be lost.',
    ModalOption1: 'Yes, Discard',
    ModalOption2: 'Stay on Page',
    tmc1: " By continuing, you agree to HERA's ",
    tmc2: 'Terms of use',
    tmc3: 'Privacy Policy',
    desc: 'We Value your privacy so we will not disclose your name to the parents. An ID will be displayed on your profile (eg. SM1234)',
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
  },
  otp: {
    title: 'Verify your mobile',
    subtitle1: 'Enter the 6-digit verification',
    subtitle2: 'code sent to your number',
    Btn: 'Submit',
    Trouble: 'Trouble receiving code?',
    SendAgain: 'Send Again',
  },
  sm_register: {
    uploadImage: 'Upload Display Picture',
    FirstName: 'First Name',
    MiddleName: 'Middle Name (Optional)',
    LastName: 'Last Name',
    DOB: 'Date Of Birth',
    Password: 'Set Password',
    Confirm: 'Confirm Password',
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
    Bio: 'Add a Short Bio (Max 250 Char)',
    Btn: 'Save Profile',
    Save: 'SAVE',
    SAVE_PROFILE: 'SAVE PROFILE',
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
  },
  sm_create_gallery: {
    Title: 'Create your gallery',
    Subtitle1: 'To match with a parent,',
    Subtitle2: 'upload photos that speak',
    Subtitle3: 'about you!',
    maxUpload: 'This step is optional.',
    imagetype: 'Maximum 6 photos ',
    Btn: 'GO TO DASHBOARD',
    modalTitle: 'Remove from gallery?',
    modalsubTitle: "If you remove, it won't be visible on your profile.",
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
    videoDuration: 'Add a short 60 sec video',
    videoFormat: '(AVI, MOV, MP4 format)',
  },
  bottomSheet: {
    Inquiry_Form: 'Inquiry Form',
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
    Para1:
      'We tried to find the best matches for you but seems like no one is around.',
    Para2: 'May be try again later or change your\n settings.',
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
    type: 'Parent to be',
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
    donerDescription: `I give priority to health and play a wide range of sports. I have a good exposure to different cultures of the world. I value the donation programmes & every parent who needs support.`,
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
  },
  search_Bar: {
    search: 'Search',
    write_message: 'Write a message',
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
    Btn: 'LOG OUT',
    AppVersion: 'App Version 0.5',
    RemoveVideo: 'REMOVE VIDEO',
    Remove_Video: 'Remove Video?',
  },
  subscribe: {
    Subscribe_Now: 'Subscribe Now',
    Plans: 'You can select any one of our plans & explore 5 profiles per day!',
  },
  inqueryForm: {
    Subtitle: 'Have a question? \n Write to us and we’ll get \nback to you',
    Name: 'Name',
    // EmailAddress: 'Email Address',
    USER_TYPE: 'User Type',
    MobileNumber: MOBILE_CONST,
    Message: 'Message',
    SendInquiry: 'SEND INQUIRY',
    Title: 'SUPPORT',
    LEFT_ARROW_BUTTON: 'Left arrow Button, Press to go back',
  },
  SmDashboard: {
    search: 'Search',
  },
  stateList: {
    Subtitle: 'Search in any state',
    iconText: 'Done',
  },
  Subscription: {
    SubHeader: 'See 5 profiles per day',
    MidHeader: '(Use-it-or-lose it)',
    SubscribeButton: 'SUBSCRIBE & PAY',
    BySubs: 'By subscribing, you agree to HERA’s ',
    TermsServices: 'Terms of Service',
    PrivacyPolicy: 'Privacy Policy. ',
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
    SubscriptionExpired:
      'Your subscription has expired. Please renew your subscription now to find new match.',
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
    YOU_MATCHED: 'You Matched!',
    PARENT_TO_BE_CONVERSATION: ' Parent To Be will start the conversation.',
    START_CONVERSATION: 'Start a conversation!',
    INACTIVE_USER: 'Inactive User',
    HEY_ITS_MATCH: 'Hey, It’s a match!',
    PARENT_TO_BE_SEND_REQUEST: 'A Parent To Be sent you a request',
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
      'HERA has 2 subscription models for you. You can select any plan to be able to see a full profile of the Surrogate/Donor or send a like to your preferred profile. Please note: Subscribed users have a daily limit of 5 swipes.',
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
    Current_Password: 'Current Password',
    Set_New_Password: 'Set New Password',
    Confirm_Password: 'Confirm Password',
    PASSWORD_UPDATED: 'Your Password has been changed successfully.',
  },
  //Edit Profile
  EDITPROFILE: {
    EDIT_PROFILE: 'EDIT PROFILE',
    Profile_Title: 'Change your profile details',
    DiscardEdit: 'Discard Edits',
    DiscardEditDisc: 'If you cancel now, your edits will not be saved.',
  },
};
