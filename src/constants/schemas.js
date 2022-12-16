import * as yup from 'yup';
import {ValidationMessages} from './Strings';
export const otpSchema = yup.object().shape({
  otp: yup.string().required(ValidationMessages.OTP_REQUIRED),
});
export const loginSchema = yup.object().shape({
  phone: yup.string().required(ValidationMessages.MOBILE_REQUIRED),
  password: yup.string().required(ValidationMessages.PASSWORD_REQUIRED),
});
<<<<<<< HEAD
export const parentRegisterSchema = yup.object().shape({
  first_name: yup
    .string()
    .required(ValidationMessages.FIRST_NAME)
    .max(30, ValidationMessages.MAX_FIRST_NAME)
    .matches(Regx.FIRST_NAME, {
      excludeEmptyString: true,
      message: ValidationMessages.INVALID_FIRST_NAME,
    }),
  middle_name: yup.string().max(30, ValidationMessages.MAX_MIDDLE_NAME),
  last_name: yup
    .string()
    .required(ValidationMessages.LAST_NAME)
    .max(30, ValidationMessages.MAX_LAST_NAME)
    .matches(Regx.FIRST_NAME, {
      excludeEmptyString: true,
      message: ValidationMessages.INVALID_LAST_NAME,
    }),
  date_of_birth: yup
    .string()
    .required(ValidationMessages.ENTER_DOB)
    .test('DOB', 'Invalid Date', value => {
      return moment().diff(moment(value), 'years') >= 18;
    }),
  email: yup
    .string()
    .required(ValidationMessages.EMPTY_EMAIL)
    .matches(Regx.EMAIL, {
      excludeEmptyString: true,
      message: ValidationMessages.INVALID_EMAIL,
    }),
  set_password: yup
    .string()
    .required(ValidationMessages.PASSWORD)
    .min(Value.CONSTANT_VALUE_8, ValidationMessages.PASSWORD_MIN)
    .matches(Regx.SPECIAL_CHAR, {
      excludeEmptyString: true,
      message: ' ',
    })
    .matches(Regx.ALPHA_LOWER, {
      excludeEmptyString: true,
      message: ' ',
    })
    .matches(Regx.ALPHA_START, {
      excludeEmptyString: true,
      message: ' ',
    })
    .matches(Regx.ALPHA_CAP, {
      excludeEmptyString: true,
      message: '',
    })
    .matches(Regx.NUM, {
      excludeEmptyString: true,
      message: ' ',
    }),
  confirm_password: yup
    .string()
    .required(ValidationMessages.PASSWORD_REQUIRED)
    .oneOf([yup.ref('set_password')], 'Your passwords do not match.'),
});
export const smRegisterSchema = yup.object().shape({
  role: yup.string().required(ValidationMessages.USER_TYPE),
  first_name: yup
    .string()
    .required(ValidationMessages.FIRST_NAME)
    .max(30, ValidationMessages.MAX_FIRST_NAME)
    .matches(Regx.FIRST_NAME, {
      excludeEmptyString: true,
      message: ValidationMessages.INVALID_FIRST_NAME,
    }),
  middle_name: yup.string().max(30, ValidationMessages.MAX_MIDDLE_NAME),
  last_name: yup
    .string()
    .required(ValidationMessages.LAST_NAME)
    .max(30, ValidationMessages.MAX_LAST_NAME)
    .matches(Regx.FIRST_NAME, {
      excludeEmptyString: true,
      message: ValidationMessages.INVALID_LAST_NAME,
    }),
  dob: yup
    .string()
    .required(ValidationMessages.DOB)
    .test('DOB', Strings.sm_register.Surrogate_Mother_error, (value, ctx) => {
      const {parent} = ctx;
      const formatedDate = moment(value).format('YYYY/MM/DD');
      const selectedAge = calculateBirthYear(formatedDate);
      if (parent?.role === '3') {
        if (selectedAge >= 21 && selectedAge <= 45) {
          return true;
        }
      } else if (parent?.role === '4' || parent?.role === '5') {
        if (selectedAge >= 18 && selectedAge <= 40) {
          return true;
        }
      }
      let message = '';
      if (parent?.role === '3') {
        message = Strings.sm_register.Surrogate_Mother_error;
      } else if (parent?.role === '4') {
        message = Strings.sm_register.Egg_Donar_error;
      } else {
        message = Strings.sm_register.Sperm_Donar_error;
      }
      return ctx.createError({message});
    }),
  email: yup
    .string()
    .required(ValidationMessages.EMPTY_EMAIL)
    .matches(Regx.EMAIL, {
      excludeEmptyString: true,
      message: ValidationMessages.INVALID_EMAIL,
    }),
  password: yup
    .string()
    .required(ValidationMessages.PASSWORD)
    .min(Value.CONSTANT_VALUE_8, '')
    .matches(Regx.SPECIAL_CHAR, {
      excludeEmptyString: true,
      message: ' ',
    })
    .matches(Regx.ALPHA_LOWER, {
      excludeEmptyString: true,
      message: ' ',
    })
    .matches(Regx.ALPHA_START, {
      excludeEmptyString: true,
      message: ' ',
    })
    .matches(Regx.ALPHA_CAP, {
      excludeEmptyString: true,
      message: ' ',
    })
    .matches(Regx.NUM, {
      excludeEmptyString: true,
      message: ' ',
    }),
  confirm_password: yup
    .string()
    .required(ValidationMessages.CONFIRM_PASSWORD)
    .oneOf(
      [yup.ref('password'), null],
      'Set Password and Confirm Password should be same.',
    ),
});
=======
>>>>>>> e02f312e7c306daffa02950553263ffd05048da6

export const setPreferenceSchema = yup.object().shape({
  looking: yup.number().required(ValidationMessages.SELECT_LOOKING),
  location: yup.lazy(value => {
    switch (typeof value) {
      case 'object':
<<<<<<< HEAD
        return yup.object().required(ValidationMessages.LOCATION_PREF); // schema for object
      case 'string':
        return yup.string().required(ValidationMessages.LOCATION_PREF); // schema for string
      default:
        return yup.mixed().required(ValidationMessages.LOCATION_PREF); // here you can decide what is the default
=======
        return yup.object().required(ValidationMessages.LOCATION);
      case 'string':
        return yup.string().required(ValidationMessages.LOCATION);
      default:
        return yup.mixed().required(ValidationMessages.LOCATION);
>>>>>>> e02f312e7c306daffa02950553263ffd05048da6
    }
  }),
  education: yup.lazy(value => {
    switch (typeof value) {
      case 'object':
        return yup.object().required(ValidationMessages.EducationPRE); // schema for object
      case 'string':
        return yup.string().required(ValidationMessages.EducationPRE); // schema for string
      default:
        return yup.mixed().required(ValidationMessages.EducationPRE); // here you can decide what is the default
    }
  }),
  race: yup.lazy(value => {
    switch (typeof value) {
      case 'object':
        return yup.object().required(ValidationMessages.RACE_PRE); // schema for object
      case 'string':
        return yup.string().required(ValidationMessages.RACE_PRE); // schema for string
      default:
        return yup.mixed().required(ValidationMessages.RACE_PRE); // here you can decide what is the default
    }
  }),
  hair: yup.string().required(ValidationMessages.SELECT_HAIR_PRE),
  eye: yup.string().required(ValidationMessages.SELECT_EYE_PRE),
  height: yup.array(),
  age_range: yup.string().required(ValidationMessages.SELECT_AGE_PRE),
});
export const smBasicSchema = yup.object().shape({
  gender_id: yup.string().required(ValidationMessages.ENTER_GENDER),
  state_id: yup.string().required(ValidationMessages.ENTER_STATE),
  zipcode: yup
    .string()
    .max(5, ValidationMessages.MAX_ZIP)
    .required(ValidationMessages.ENTER_ZIP)
    .min(5, ValidationMessages.MIN_ZIP),
  occupation: yup.string(),
  sexual_orientations_id: yup
    .string()
    .required(ValidationMessages.ENTER_SEXUAL_ORIENTATION),
  relationship_status_id: yup
    .string()
    .required(ValidationMessages.ENTER_RELATIONSHIP),
  bio: yup.string().required(ValidationMessages.ENTER_BIO).max(250),
});
export const inqueryFormSchema = yup.object().shape({
  name: yup.string().required(ValidationMessages.Name),
  user_type: yup.object().required(ValidationMessages.USER_TYPE),
  email: yup.string().required(ValidationMessages.EMPTY_EMAIL),
  phone_no: yup.string().required(ValidationMessages.MOBILE_REQUIRED),
  message: yup.string().required(ValidationMessages.ENTER_Message),
});

export const deleteAccountPassword = yup.object().shape({
  current_password: yup.string().required(ValidationMessages.PASSWORD_REQUIRED),
});
export const smSetAttributesSchema = yup.object().shape({
  height_id: yup.lazy(value => {
    switch (typeof value) {
      case 'object':
        return yup.object().required(ValidationMessages.SELECT_HEIGHT);
      case 'string':
        return yup.string().required(ValidationMessages.SELECT_HEIGHT);
      default:
        return yup.mixed().required(ValidationMessages.SELECT_HEIGHT);
    }
  }),
  race_id: yup.lazy(value => {
    switch (typeof value) {
      case 'object':
        return yup.object().required(ValidationMessages.SELECT_RACE);
      case 'string':
        return yup.string().required(ValidationMessages.SELECT_RACE);
      default:
        return yup.mixed().required(ValidationMessages.SELECT_RACE);
    }
  }),
  mother_ethnicity_id: yup.lazy(value => {
    switch (typeof value) {
      case 'object':
        return yup.object().required(ValidationMessages.SELECT_MOT_ETHNICITY);
      case 'string':
        return yup.string().required(ValidationMessages.SELECT_MOT_ETHNICITY);
      default:
        return yup.mixed().required(ValidationMessages.SELECT_MOT_ETHNICITY);
    }
  }),
  father_ethnicity_id: yup.lazy(value => {
    switch (typeof value) {
      case 'object':
        return yup.object().required(ValidationMessages.SELECT_FAT_ETHNICITY);
      case 'string':
        return yup.string().required(ValidationMessages.SELECT_FAT_ETHNICITY);
      default:
        return yup.mixed().required(ValidationMessages.SELECT_FAT_ETHNICITY);
    }
  }),
  weight_id: yup.lazy(value => {
    switch (typeof value) {
      case 'object':
        return yup.object().required(ValidationMessages.SELECT_WEIGHT);
      case 'string':
        return yup.string().required(ValidationMessages.SELECT_WEIGHT);
      default:
        return yup.mixed().required(ValidationMessages.SELECT_WEIGHT);
    }
  }),
  eye_colour_id: yup.lazy(value => {
    switch (typeof value) {
      case 'object':
        return yup.object().required(ValidationMessages.SELECT_EYE);
      case 'string':
        return yup.string().required(ValidationMessages.SELECT_EYE);
      default:
        return yup.mixed().required(ValidationMessages.SELECT_EYE);
    }
  }),
  hair_colour_id: yup.lazy(value => {
    switch (typeof value) {
      case 'object':
        return yup.object().required(ValidationMessages.SELECT_HAIR);
      case 'string':
        return yup.string().required(ValidationMessages.SELECT_HAIR);
      default:
        return yup.mixed().required(ValidationMessages.SELECT_HAIR);
    }
  }),
  education_id: yup.lazy(value => {
    switch (typeof value) {
      case 'object':
        return yup.object().required(ValidationMessages.SELECT_EDUCATION);
      case 'string':
        return yup.string().required(ValidationMessages.SELECT_EDUCATION);
      default:
        return yup.mixed().required(ValidationMessages.SELECT_EDUCATION);
    }
  }),
});
