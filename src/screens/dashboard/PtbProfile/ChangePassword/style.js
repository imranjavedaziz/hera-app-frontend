import {Alignment, Colors} from '../../../../constants';
import {Value} from '../../../../constants/FixedValues';
import {dynamicSize, normalizeFont} from '../../../../utils/responsive';
import {Fonts} from '../../../../constants/Constants';
export default {
  mainContainer: {
    flex: Value.CONSTANT_VALUE_1,
    backgroundColor: Colors.BACKGROUND_WHOLE,
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingTop: dynamicSize(Value.CONSTANT_VALUE_45),
  },
  headerText: {
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: '#ff4544',
    marginRight: Value.CONSTANT_VALUE_30,
  },
  headingContainer: {
    alignItems: Alignment.CENTER,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_95),
  },
  changePassword: {
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    fontSize: normalizeFont(Value.CONSTANT_VALUE_11),
    letterSpacing: Value.CONSTANT_VALUE_2_84,
    textAlign: Alignment.CENTER,
  },
  innerHeading: {
    alignItems: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_8,
  },
  setANew: {
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    fontSize: normalizeFont(Value.CONSTANT_VALUE_23),
    letterSpacing: Value.CONSTANT_VALUE_0,
    textAlign: Alignment.CENTER,
  },
  innerContainer: {
    paddingHorizontal: Value.CONSTANT_VALUE_40,
    marginTop: Value.CONSTANT_VALUE_35,
  },
  psswrdInput: {
    paddingBottom: Value.CONSTANT_VALUE_1,
    alignSelf: Alignment.CENTER,
    paddingTop: Value.CONSTANT_VALUE_5,
  },
  buttonContainer: {
    alignItems: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_46,
  },
  Btn: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    height: Value.CONSTANT_VALUE_80,
  },
  passwordCheck: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
  },
  fullWidth: {
    paddingHorizontal: Value.CONSTANT_VALUE_40,
  },
  ValidPwd: {
    marginLeft: Value.CONSTANT_VALUE_5,
    maxWidth: Value.CONSTANT_VALUE_13,
    resizeMode: Alignment.CONTAIN,
  },
  dashboardBtn: {
    width: Value.CONSTANT_VALUE_255,
    height: Value.CONSTANT_VALUE_80,
    borderRadius: Value.CONSTANT_VALUE_40,
    backgroundColor: '#a3c6c4',
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
};
