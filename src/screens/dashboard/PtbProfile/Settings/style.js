import {Alignment, Colors} from '../../../../constants';
import {Value} from '../../../../constants/FixedValues';
import {
  dynamicSize,
  normalizeFont,
  statusHide,
} from '../../../../utils/responsive';
import {Fonts} from '../../../../constants/Constants';
export default {
  mainContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
    backgroundColor: Colors.BACKGROUND_WHOLE,
  },
  headerIconAndroid: {
    marginLeft: Value.CONSTANT_VALUE_30,
  },
  headingContainer: {
    alignItems: Alignment.CENTER,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_95),
  },
  headingAndroidContainer: {
    alignItems: Alignment.CENTER,
    marginTop: statusHide(Value.CONSTANT_VALUE_105),
  },
  Settings: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: normalizeFont(Value.CONSTANT_VALUE_11),
    letterSpacing: Value.CONSTANT_VALUE_2_84,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  innerHeading: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_8),
    alignItems: Alignment.CENTER,
  },
  account: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: normalizeFont(Value.CONSTANT_VALUE_23),
    letterSpacing: Value.CONSTANT_VALUE_0,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  line: {
    width: dynamicSize(Value.CONSTANT_VALUE_344),
    borderWidth: dynamicSize(Value.CONSTANT_VALUE_2),
    borderColor: Colors.INPUT_BORDER,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_24),
  },
  changePsswrd: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_45),
  },
  deactivate: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_25),
  },
  delete: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_25),
  },
  centeredView: {
    flex: Value.CONSTANT_VALUE_1,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    height: dynamicSize(Value.CONSTANT_VALUE_230),
    width: dynamicSize(Value.CONSTANT_VALUE_283),
    backgroundColor: Colors.WHITE,
    paddingHorizontal: dynamicSize(Value.CONSTANT_VALUE_23),
    paddingVertical: dynamicSize(Value.CONSTANT_VALUE_20),
    alignItems: Alignment.CENTER,
    borderWidth: dynamicSize(Value.CONSTANT_VALUE_1),
    borderColor: Colors.SEARCH_BOX,
  },
  modalHeader: {
    lineHeight: Value.CONSTANT_VALUE_21,
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
    paddingBottom: dynamicSize(Value.CONSTANT_VALUE_5),
    color: Colors.COLOR_535858,
  },
  modalSubHeader: {
    textAlign: Alignment.CENTER,
    lineHeight: Value.CONSTANT_VALUE_18,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_1),
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_13,
  },
  modalOption1: {
    color: Colors.RED,
    fontSize: Value.CONSTANT_VALUE_16,
    paddingBottom: dynamicSize(Value.CONSTANT_VALUE_10),
    marginVertical: dynamicSize(Value.CONSTANT_VALUE_27),
    letterSpacing: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansBold,
  },
  modalOption2: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontWeight: Alignment.BOLD,
    letterSpacing: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
};
