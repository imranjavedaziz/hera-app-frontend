import {Alignment, Colors} from '../../../constants';
import {Fonts} from '../../../constants/Constants';
import {Value} from '../../../constants/FixedValues';
import {normalizeFont, px, scaleHeight} from '../../../utils/responsive';

export default {
  cancelbtn: {
    justifyContent: Alignment.FLEXEND,
    alignItems: Alignment.FLEXEND,
    marginTop: scaleHeight(Value.CONSTANT_VALUE_40),
    marginRight: Value.CONSTANT_VALUE_30,
  },
  clearView: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  clearText: {
    fontFamily: Fonts.OpenSansBold,
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: 16,
    letterSpacing: 0,
    color: 'rgb(255,69,68)',
    height: 22,
  },
  headerText: {
    fontFamily: Fonts.OpenSansBold,
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_16,
    letterSpacing: 0,
    color: Colors.COLOR_RED,
    marginRight: px(Value.CONSTANT_VALUE_30),
  },
  flex: {flex: 1, backgroundColor: Colors.BACKGROUND},
  mainContainer: {
    marginTop: scaleHeight(Value.CONSTANT_VALUE_95),
    paddingHorizontal: px(Value.CONSTANT_VALUE_40),
  },
  headingStyle: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    width: Value.CONSTANT_VALUE_310,
  },
  inputRow: {
    flexDirection: Alignment.ROW,
    marginTop: Value.CONSTANT_VALUE_55,
    paddingHorizontal: Value.CONSTANT_VALUE_40,
    justifyContent: 'flex-start',
  },
  MainheadingStyle: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: normalizeFont(Value.CONSTANT_VALUE_11),
    letterSpacing: px(Value.CONSTANT_VALUE_2_84),
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  InnerheadingStyle: {
    marginTop: px(Value.CONSTANT_VALUE_8),
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_23,
    letterSpacing: px(Value.CONSTANT_VALUE_0),
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  label: {
    color: Colors.LABEL_BLACK,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: normalizeFont(Value.CONSTANT_VALUE_14),
    textAlign: Alignment.LEFT,
    marginTop: px(Value.CONSTANT_VALUE_30),
    marginBottom: px(Value.CONSTANT_VALUE_15),
  },
  radioContainer: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.SPACE_BETWEEN,
  },
  radioBtn: {
    flex: Value.CONSTANT_VALUE_0,
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    paddingVertical: Value.CONSTANT_VALUE_10,
    justifyContent: Alignment.FLEX_START,
    marginRight: px(Value.CONSTANT_VALUE_12),
  },
  radioImg: {
    width: px(Value.CONSTANT_VALUE_25),
    resizeMode: 'cover',
    height: px(Value.CONSTANT_VALUE_25),
  },
  radioLabel: {
    marginLeft: px(Value.CONSTANT_VALUE_10),
    fontSize: normalizeFont(Value.CONSTANT_VALUE_16),
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    lineHeight: 21,
  },
  Btn: {
    height: Value.CONSTANT_VALUE_80,
    width: Value.CONSTANT_VALUE_197,
    paddingVertical: Value.CONSTANT_VALUE_0,
    paddingHorizontal: Value.CONSTANT_VALUE_0,
  },
  btnView: {
    alignItems: Alignment.CENTER,
    marginBottom: Value.CONSTANT_VALUE_185,
  },
  centeredView: {
    flex: Value.CONSTANT_VALUE_1,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    height: Value.CONSTANT_VALUE_230,
    width: Value.CONSTANT_VALUE_283,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Value.CONSTANT_VALUE_23,
    paddingVertical: Value.CONSTANT_VALUE_20,
    alignItems: Alignment.CENTER,
  },
  modalHeader: {
    lineHeight: Value.CONSTANT_VALUE_21,
    fontWeight: Alignment.BOLD,
    fontFamily: Fonts.OpenSansRegular,
    paddingBottom: Value.CONSTANT_VALUE_5,
    fontSize: Value.CONSTANT_VALUE_16,
    color: Colors.BLACK,
  },
  modalSubHeader: {
    textAlign: Alignment.CENTER,
    lineHeight: Value.CONSTANT_VALUE_18,
    marginTop: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_13,
    color: Colors.BLACK,
  },
  modalOption1: {
    color: Colors.RED,
    fontSize: Value.CONSTANT_VALUE_16,
    paddingBottom: Value.CONSTANT_VALUE_10,
    marginVertical: Value.CONSTANT_VALUE_27,
    letterSpacing: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansBold,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    width: Value.CONSTANT_VALUE_234,
    textAlign: Alignment.CENTER,
  },
  modalOption2: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontWeight: Alignment.BOLD,
    letterSpacing: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansBold,
  },
};
