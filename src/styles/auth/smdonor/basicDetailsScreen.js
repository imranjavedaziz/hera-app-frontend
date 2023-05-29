import {Colors, Alignment} from '../../../constants';
import {Value, Prencentage} from '../../../constants/FixedValues';
import {Fonts} from '../../../constants/Constants';
import {scaleWidth, normalizeFont, statusHide} from '../../../utils/responsive';

export default {
  flex_1: {flex: Value.CONSTANT_VALUE_1, backgroundColor: Colors.BACKGROUND},
  mobileView: {
    flexDirection: 'row',
    alignItems: 'space-between',
  },
  radioBtn: {
    flex: Value.CONSTANT_VALUE_0,
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.FLEX_START,
    marginRight: scaleWidth(Value.CONSTANT_VALUE_12),
  },
  mobileBox: {marginRight: 10},
  blurBorder: {
    borderColor: Colors.INPUT_BORDER,
  },
  mainComp_1: {marginTop: statusHide(105), marginHorizontal: 40},
  radioImg: {
    width: scaleWidth(Value.CONSTANT_VALUE_25),
    resizeMode: 'cover',
    height: scaleWidth(Value.CONSTANT_VALUE_25),
  },
  bottom: {bottom: 26},
  inputRow: {
    flexDirection: Alignment.ROW,
    marginTop: Value.CONSTANT_VALUE_58,
    justifyContent: 'flex-start',
  },
  radioLabel: {
    marginLeft: Value.CONSTANT_VALUE_10,
    fontSize: normalizeFont(Value.CONSTANT_VALUE_16),
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 0,
  },
  radioContainer: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.SPACE_BETWEEN,
    width: Prencentage.PRECENTAGE_100,
  },
  codeText: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    top: 6,
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: '#000000',
  },
  codeInputText: {
    borderBottomWidth: Value.CONSTANT_VALUE_2,
    minHeight: Value.CONSTANT_VALUE_40,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.textPLace,
  },
  textArea: {
    borderWidth: Value.CONSTANT_VALUE_1,
    marginTop: Value.CONSTANT_VALUE_10,
    borderRadius: Value.CONSTANT_VALUE_10,
    padding: Value.CONSTANT_VALUE_10,
    minHeight: Value.CONSTANT_VALUE_80,
    textAlignVertical: 'top',
  },
  label: {
    color: Colors.LABEL_BLACK,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_14,
    width: Prencentage.PRECENTAGE_100,
    textAlign: Alignment.LEFT,
    marginBottom: Value.CONSTANT_VALUE_15,
  },
  Btn: {
    height: Value.CONSTANT_VALUE_80,
    width: Value.CONSTANT_VALUE_197,
    paddingVertical: Value.CONSTANT_VALUE_0,
    paddingHorizontal: Value.CONSTANT_VALUE_0,
    marginBottom: 30,
  },
  fixedheaderStyle: {
    marginRight: Value.CONSTANT_VALUE_20,
    marginTop: Value.CONSTANT_VALUE_45,
  },
  andoridFixedheaderStyle: {
    marginRight: Value.CONSTANT_VALUE_20,
  },
  paddingTop: {paddingTop: Value.CONSTANT_VALUE_57},
  disableing: {
    backgroundColor: Colors.CLEAR,
    width: '100%',
    height: '100%',
    position: Alignment.ABSOLUTE,
  },
};
