import {Alignment, Colors} from '../../../constants';
import {Fonts} from '../../../constants/Constants';
import {Value} from '../../../constants/FixedValues';
import {normalizeFont, px} from '../../../utils/responsive';

export default {
  header: {
    justifyContent: Alignment.FLEXEND,
    marginTop: px(Value.CONSTANT_VALUE_54),
  },
  headerText: {
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: normalizeFont(Value.CONSTANT_VALUE_16),
    fontFamily: Fonts.OpenSansBold,
    color: Colors.RED,
    marginRight: px(Value.CONSTANT_VALUE_30),
  },
  flex: {flex: 1, backgroundColor: Colors.BACKGROUND},
  mainContainer: {
    marginTop: px(Value.CONSTANT_VALUE_105),
    paddingHorizontal: px(Value.CONSTANT_VALUE_40),
  },
  headingStyle: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
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
    fontSize: normalizeFont(Value.CONSTANT_VALUE_23),
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
    marginLeft: px(Value.CONSTANT_VALUE_5),
    fontSize: normalizeFont(Value.CONSTANT_VALUE_18),
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
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
  },
  modalSubHeader: {
    textAlign: Alignment.CENTER,
    lineHeight: Value.CONSTANT_VALUE_18,
    marginTop: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansRegular,
  },
  modalOption1: {
    color: Colors.RED,
    fontSize: Value.CONSTANT_VALUE_16,
    paddingBottom: Value.CONSTANT_VALUE_10,
    marginVertical: Value.CONSTANT_VALUE_27,
    letterSpacing: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansBold,
  },
  modalOption2: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontWeight: Alignment.BOLD,
    letterSpacing: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansBold,
  },
};
