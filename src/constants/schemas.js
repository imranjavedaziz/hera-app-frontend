import * as yup from 'yup';
import { ValidationMessages } from './Strings';
import { Value } from './FixedValues';

export const Regx = {
    MOBILE_REGEX: /^[0]?[1-9]\d{9,10}$/,
    SPECIAL_CHAR: /[|#\\/~^:,;?!&%$@*+]/,
    ALPHA: /[a-zA-Z]/,
    NUM: /[0-9]/,
    OTP: /[0-9]{6,}$/
}

export const mobileSchema = yup.object().shape({
    phone: yup
      .string()
      .required(ValidationMessages.MOBILE_REQUIRED)
      .matches(Regx.MOBILE_REGEX, {
        excludeEmptyString: true,
        message: ValidationMessages.INVALID_MOBILE,
    }),
});
export const otpSchema = yup.object().shape({
    otp: yup
      .string()
      .required(ValidationMessages.COMMON_REQUIRED)
      .length(6,ValidationMessages.INVALID_OTP)
      .matches(Regx.OTP, {
        excludeEmptyString: true,
        message: ValidationMessages.INVALID_OTP,
    }),
});
export const loginSchema = yup.object().shape({
    phone: yup
      .string()
      .required(ValidationMessages.MOBILE_REQUIRED)
      .matches(Regx.MOBILE_REGEX, {
        excludeEmptyString: true,
        message: ValidationMessages.INVALID_MOBILE,
      }),
    password: yup
    .string()
    .required(ValidationMessages.PASSWORD_REQUIRED)
    .min(Value.CONSTANT_VALUE_8,ValidationMessages.PASSWORD_MIN)
    .matches(Regx.SPECIAL_CHAR, {
        excludeEmptyString: true,
        message: ValidationMessages.SPECIAL_CHAR,
    })
    .matches(Regx.ALPHA, {
        excludeEmptyString: true,
        message: ValidationMessages.ALPHA_NUM,
    })
    .matches(Regx.NUM, {
        excludeEmptyString: true,
        message: ValidationMessages.ALPHA_NUM,
    })
});
export const smRegisterSchema = yup.object().shape({
    role: yup
    .string()
    .required(ValidationMessages.COMMON_REQUIRED),
    first_name: yup
      .string()
      .required(ValidationMessages.COMMON_REQUIRED),
    middle_name: yup
        .string(),
    last_name: yup
        .string()
        .required(ValidationMessages.COMMON_REQUIRED),
    dob: yup
        .string()
        .required(ValidationMessages.COMMON_REQUIRED),
    email: yup
        .string()
        .required(ValidationMessages.COMMON_REQUIRED),
    password: yup
        .string()
        .required(ValidationMessages.COMMON_REQUIRED)
        .min(Value.CONSTANT_VALUE_8,ValidationMessages.PASSWORD_MIN)
        .matches(Regx.SPECIAL_CHAR, {
            excludeEmptyString: true,
            message: ValidationMessages.SPECIAL_CHAR,
        })
        .matches(Regx.ALPHA, {
            excludeEmptyString: true,
            message: ValidationMessages.ALPHA_NUM,
        })
        .matches(Regx.NUM, {
            excludeEmptyString: true,
            message: ValidationMessages.ALPHA_NUM,
        }),
    confirm_password: yup
        .string()
        .required(ValidationMessages.COMMON_REQUIRED)
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    
});
export const smBasicSchema = yup.object().shape({
    gender: yup
      .string()
      .required(ValidationMessages.COMMON_REQUIRED),
    country: yup
        .string()
        .required(ValidationMessages.COMMON_REQUIRED),
    state: yup
        .string()
        .required(ValidationMessages.COMMON_REQUIRED),
    zip: yup
        .string()
        .required(ValidationMessages.COMMON_REQUIRED),
    occupation: yup
        .string(),
    sexual: yup
        .string()
        .required(ValidationMessages.COMMON_REQUIRED),
    bio: yup
        .string()
        .required(ValidationMessages.COMMON_REQUIRED),
});
export const smSetAttributesSchema = yup.object().shape({
    height: yup
      .string()
      .required(ValidationMessages.COMMON_REQUIRED),
    race: yup
        .string()
        .required(ValidationMessages.COMMON_REQUIRED),
    motherEthnicity: yup
        .string()
        .required(ValidationMessages.COMMON_REQUIRED),
    fatheEthnicity: yup
        .string()
        .required(ValidationMessages.COMMON_REQUIRED),
    weight: yup
        .string(),
    eye: yup
        .string()
        .required(ValidationMessages.COMMON_REQUIRED),
    hair: yup
        .string()
        .required(ValidationMessages.COMMON_REQUIRED),
});
