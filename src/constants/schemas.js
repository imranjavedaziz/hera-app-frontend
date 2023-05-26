import * as yup from 'yup';
import {ValidationMessages} from './Strings';
export const otpSchema = yup.object().shape({
  otp: yup.string().required(ValidationMessages.OTP_REQUIRED),
});
export const loginSchema = yup.object().shape({
  phone: yup.string().required(ValidationMessages.MOBILE_REQUIRED),
  password: yup.string().required(ValidationMessages.PASSWORD_REQUIRED),
});

export const setPreferenceSchema = yup.object().shape({
  looking: yup.number().required(ValidationMessages.SELECT_LOOKING),
  location: yup.lazy(value => {
    switch (typeof value) {
      case 'object':
        return yup.object().required(ValidationMessages.LOCATION);
      case 'string':
        return yup.string().required(ValidationMessages.LOCATION);
      default:
        return yup.mixed().required(ValidationMessages.LOCATION);
    }
  }),
  education: yup.lazy(value => {
    switch (typeof value) {
      case 'object':
        return yup.object().required(ValidationMessages.Education); // schema for object
      case 'string':
        return yup.string().required(ValidationMessages.Education); // schema for string
      default:
        return yup.mixed().required(ValidationMessages.Education); // here you can decide what is the default
    }
  }),
  race: yup.lazy(value => {
    switch (typeof value) {
      case 'object':
        return yup.object().required(ValidationMessages.RACE); // schema for object
      case 'string':
        return yup.string().required(ValidationMessages.RACE); // schema for string
      default:
        return yup.mixed().required(ValidationMessages.RACE); // here you can decide what is the default
    }
  }),
  hair: yup.string().required(ValidationMessages.SELECT_HAIR),
  eye: yup.string().required(ValidationMessages.SELECT_EYE),
  height: yup.array(),
  age_range: yup.string().required(ValidationMessages.SELECT_AGE),
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
