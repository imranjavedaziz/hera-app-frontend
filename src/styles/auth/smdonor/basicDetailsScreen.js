import {Colors, Alignment} from '../../../constants';
import {Value, Prencentage} from '../../../constants/FixedValues';
import {Fonts} from '../../../constants/Constants';
import {scaleWidth, normalizeFont, statusHide} from '../../../utils/responsive';

export default {
  flex_1: {flex: Value.CONSTANT_VALUE_1, backgroundColor: Colors.BACKGROUND},
  radioBtn: {
    flex: Value.CONSTANT_VALUE_0,
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.FLEX_START,
    marginRight: scaleWidth(Value.CONSTANT_VALUE_12),
  },
  mainComp_1: {marginTop: statusHide(105), marginHorizontal: 40},
  radioImg: {
    width: scaleWidth(Value.CONSTANT_VALUE_25),
    resizeMode: 'cover',
    height: scaleWidth(Value.CONSTANT_VALUE_25),
  },
  inputRow: {
    flexDirection: Alignment.ROW,
    marginTop: Value.CONSTANT_VALUE_40,
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
};
