import {Colors, Alignment} from '../../constants';
import global from '../global';
import {Value} from '../../constants/FixedValues';
import {Fonts} from '../../constants/Constants';

export default {
  logo: {
    width: Value.CONSTANT_VALUE_200,
    height: Value.CONSTANT_VALUE_120,
    resizeMode: Alignment.CONTAIN,
    flex: Value.CONSTANT_VALUE_0,
    marginBottom: Value.CONSTANT_VALUE_30,
    alignSelf: Alignment.CENTER,
  },
  margin: {marginHorizontal: Value.CONSTANT_VALUE_35},
  underlineBtn: {
    ...global.underlineText,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
  },
  loginBtn: {
    height: Value.CONSTANT_VALUE_80,
    width: Value.CONSTANT_VALUE_195,
    marginTop: Value.CONSTANT_VALUE_50,
    marginBottom: Value.CONSTANT_VALUE_20,
  },
  btnMargin: {marginVertical: Value.CONSTANT_VALUE_20},
  psswrdInput: {
    paddingHorizontal: Value.CONSTANT_VALUE_10,
    paddingTop: Value.CONSTANT_VALUE_5,
    paddingBottom: Value.CONSTANT_VALUE_1,
  },
};
