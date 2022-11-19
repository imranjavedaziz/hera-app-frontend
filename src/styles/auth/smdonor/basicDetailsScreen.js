import {Colors, Alignment} from '../../../constants';
import {Value, Prencentage} from '../../../constants/FixedValues';
import {Fonts} from '../../../constants/Constants';
import {scaleWidth, normalizeFont} from '../../../utils/responsive';

export default {
  flex: {flex: Value.CONSTANT_VALUE_1},
  radioBtn: {
    flex: Value.CONSTANT_VALUE_0,
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    paddingVertical: Value.CONSTANT_VALUE_10,
    justifyContent: Alignment.FLEX_START,
    marginRight: scaleWidth(Value.CONSTANT_VALUE_12),
  },
  mainComp: {marginHorizontal: 40, marginTop: 108},
  radioImg: {
    width: scaleWidth(Value.CONSTANT_VALUE_25),
    resizeMode: 'cover',
    height: scaleWidth(Value.CONSTANT_VALUE_25),
  },
  radioLabel: {
    marginLeft: scaleWidth(Value.CONSTANT_VALUE_5),
    fontSize: normalizeFont(Value.CONSTANT_VALUE_18),
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
  },
  radioContainer: {
    flexDirection: Alignment.ROW,
    width: Prencentage.PRECENTAGE_100,
    justifyContent: Alignment.SPACE_BETWEEN,
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
    marginBottom: 10,
  },
  Btn: {
    height: Value.CONSTANT_VALUE_80,
    width: Value.CONSTANT_VALUE_197,
    paddingVertical: Value.CONSTANT_VALUE_0,
    paddingHorizontal: Value.CONSTANT_VALUE_0,
  },
  fixedheaderStyle: {
    marginRight: Value.CONSTANT_VALUE_20,
    marginTop: Value.CONSTANT_VALUE_54,
  },
  paddingTop: {paddingTop: Value.CONSTANT_VALUE_57},
  centeredView: {
    flex: Value.CONSTANT_VALUE_1,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_52,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    height: Value.CONSTANT_VALUE_230,
    width: Value.CONSTANT_VALUE_283,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Value.CONSTANT_VALUE_23,
    paddingVertical: Value.CONSTANT_VALUE_20,
    alignItems: Alignment.CENTER,
    borderWidth: Value.CONSTANT_VALUE_1,
    borderColor: Colors.SEARCH_BOX,
  },
  modalHeader: {
    lineHeight: Value.CONSTANT_VALUE_21,
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
    paddingBottom: Value.CONSTANT_VALUE_5,
    color: Colors.COLOR_535858,
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
