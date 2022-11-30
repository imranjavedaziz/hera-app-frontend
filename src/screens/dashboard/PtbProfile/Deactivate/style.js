import {Alignment, Colors} from '../../../../constants';
import {Prencentage, Value} from '../../../../constants/FixedValues';
import {
  dynamicSize,
  normalizeFont,
  scaleWidth,
} from '../../../../utils/responsive';
import {Fonts} from '../../../../constants/Constants';
export default {
  upperContainer: {
    flex: Value.CONSTANT_VALUE_1,
    backgroundColor: Colors.BACKGROUND,
  },
  mainContainer: {
    backgroundColor: Colors.BACKGROUND_WHOLE,
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingTop: dynamicSize(Value.CONSTANT_VALUE_40),
  },
  headerText: {
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    marginRight: Value.CONSTANT_VALUE_30,
    letterSpacing: 0,
    color: 'rgb(255,69,68)',
  },
  headingContainer: {
    alignItems: Alignment.CENTER,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_95),
  },
  AccountVerify: {
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
  },
  psswrdInput: {
    alignSelf: Alignment.CENTER,
    paddingTop: Value.CONSTANT_VALUE_5,
    paddingBottom: Value.CONSTANT_VALUE_1,
  },
  buttonContainer: {
    alignItems: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_72,
  },
  dashboardBtn: {
    width: Value.CONSTANT_VALUE_295,
    height: Value.CONSTANT_VALUE_80,
    borderRadius: Value.CONSTANT_VALUE_40,
    backgroundColor: '#f1a6a9',
    justifyContent: Alignment.CENTER,
    marginBottom: Value.CONSTANT_VALUE_67,
  },
  buttonText: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_14,
    letterSpacing: Value.CONSTANT_VALUE_FRAC180,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  passwordCheck: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
  },
  fullWidth: {
    paddingHorizontal: Value.CONSTANT_VALUE_40,
  },
  radioContainer: {
    justifyContent: Alignment.SPACE_BETWEEN,
    width: Prencentage.PRECENTAGE_100,
    marginTop: Value.CONSTANT_VALUE_31,
  },
  radioBtn: {
    flex: Value.CONSTANT_VALUE_0,
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.FLEX_START,
    marginRight: scaleWidth(Value.CONSTANT_VALUE_12),
    marginTop: 30,
  },
  radioImg: {
    width: scaleWidth(Value.CONSTANT_VALUE_25),
    resizeMode: 'cover',
    height: scaleWidth(Value.CONSTANT_VALUE_25),
  },
  radioLabel: {
    marginLeft: Value.CONSTANT_VALUE_10,
    fontSize: normalizeFont(Value.CONSTANT_VALUE_16),
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    lineHeight: Value.CONSTANT_VALUE_21,
    justifyContent: Alignment.CENTER,
  },
};
