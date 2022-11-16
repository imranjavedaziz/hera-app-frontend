import {Colors, Alignment} from '../../constants';
import global from '../global';
import {Value} from '../../constants/FixedValues';
import {Fonts} from '../../constants/Constants';
import {dynamicSize, px} from '../../utils/responsive';

export default {
  mainContainer: {
    flex: Value.CONSTANT_VALUE_1,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.FLEX_START,
    marginTop: 110,
  },
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
    fontSize: Value.CONSTANT_VALUE_16,
  },
  loginBtn: {
    height: 80,
    marginTop: Value.CONSTANT_VALUE_50,
    marginBottom: Value.CONSTANT_VALUE_20,
  },
  btnMargin: {marginVertical: Value.CONSTANT_VALUE_20},
  psswrdInput: {
    left: Value.CONSTANT_VALUE_8,
    paddingTop: Value.CONSTANT_VALUE_5,
    paddingBottom: Value.CONSTANT_VALUE_1,
  },
  headerIcon: {
    paddingTop: dynamicSize(Value.CONSTANT_VALUE_45),
    paddingHorizontal: Value.CONSTANT_VALUE_25,
  },
};
