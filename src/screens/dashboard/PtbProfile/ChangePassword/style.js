import {Alignment, Colors} from '../../../../constants';
import {Value} from '../../../../constants/FixedValues';
import {dynamicSize, normalizeFont} from '../../../../utils/responsive';
import {Fonts} from '../../../../constants/Constants';
export default {
  mainContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
    backgroundColor: Colors.BACKGROUND_WHOLE,
    // backgroundColor: 'red',
  },
  header: {
    paddingTop: dynamicSize(Value.CONSTANT_VALUE_54),
  },
  headerText: {
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.RED,
    marginRight: Value.CONSTANT_VALUE_30,
  },
  headingContainer: {
    alignItems: Alignment.CENTER,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_105),
  },
  changePassword: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: normalizeFont(Value.CONSTANT_VALUE_11),
    letterSpacing: Value.CONSTANT_VALUE_2_84,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  innerHeading: {
    marginTop: Value.CONSTANT_VALUE_8,
    alignItems: Alignment.CENTER,
  },
  setANew: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: normalizeFont(Value.CONSTANT_VALUE_23),
    letterSpacing: Value.CONSTANT_VALUE_0,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  innerContainer: {
    marginTop: Value.CONSTANT_VALUE_35,
    paddingHorizontal: Value.CONSTANT_VALUE_40,
    // backgroundColor: 'yellow',
  },
  psswrdInput: {
    alignSelf: Alignment.CENTER,
    paddingTop: Value.CONSTANT_VALUE_5,
    paddingBottom: Value.CONSTANT_VALUE_1,
  },
  Btn: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    height: Value.CONSTANT_VALUE_80,
    width: Value.CONSTANT_VALUE_195,
    // marginTop: 26,
    // marginBottom: 78,
  },
};
