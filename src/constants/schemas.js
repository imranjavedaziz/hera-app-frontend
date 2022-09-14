import * as yup from 'yup';
import { ValidationMessages } from './Strings';
import { Value } from './FixedValues';

const Regx = {
    MOBILE_REGEX: /^[0]?[1-9]\d{9,10}$/,
}

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
});
