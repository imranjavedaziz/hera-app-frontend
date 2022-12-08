import {Alignment, Colors} from '../../../../constants';
import {Value} from '../../../../constants/FixedValues';
import {normalizeFont, statusHide} from '../../../../utils/responsive';
import {Fonts} from '../../../../constants/Constants';

export default {
  upperContainer: {
    flex: Value.CONSTANT_VALUE_1,
    backgroundColor: Colors.BACKGROUND,
  },
  flex: {
    flex: 1,
    // backgroundColor: 'pink',
  },
  mainContainer: {
    backgroundColor: Colors.BACKGROUND_WHOLE,
  },

  headerText: {
    marginRight: Value.CONSTANT_VALUE_30,
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 0,
    color: 'rgb(255,69,68)',
  },
  AccountVerify: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: normalizeFont(Value.CONSTANT_VALUE_11),
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    letterSpacing: Value.CONSTANT_VALUE_2_84,
  },
  headingContainer: {
    alignItems: Alignment.CENTER,
    marginTop: statusHide(Value.CONSTANT_VALUE_105),
  },
  innerHeading: {
    marginTop: Value.CONSTANT_VALUE_8,
    alignItems: Alignment.CENTER,
  },
  innerContainer: {
    marginTop: Value.CONSTANT_VALUE_35,
    paddingHorizontal: Value.CONSTANT_VALUE_40,
  },
  setANew: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: normalizeFont(Value.CONSTANT_VALUE_23),
    letterSpacing: Value.CONSTANT_VALUE_0,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  psswrdInput: {
    alignSelf: Alignment.CENTER,
    paddingBottom: Value.CONSTANT_VALUE_1,
    paddingTop: Value.CONSTANT_VALUE_5,
  },
  buttonContainer: {
    alignItems: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_46,
  },
  dashboardBtn: {
    width: Value.CONSTANT_VALUE_255,
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
};
