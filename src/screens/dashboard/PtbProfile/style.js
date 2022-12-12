import Alignment from '../../../constants/Alignment';
import {Value} from '../../../constants/FixedValues';
import {dynamicSize, statusHide} from '../../../utils/responsive';
import {Fonts} from '../../../constants/Constants';
import Colors from '../../../constants/Colors';
export default {
  mainContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
    marginTop: Value.CONSTANT_VALUE_95,
    paddingHorizontal: 30,
  },
  andMainContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
    marginTop: statusHide(89.5),
    paddingHorizontal: 30,
  },
  headerIcon: {
    paddingTop: dynamicSize(Value.CONSTANT_VALUE_45),
    marginLeft: Value.CONSTANT_VALUE_30,
  },
  andHeaderIcon: {
    marginLeft: Value.CONSTANT_VALUE_30,
  },
  flex: {flex: Value.CONSTANT_VALUE_1, backgroundColor: Colors.BACKGROUND},
  buttoncontainer: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_35),
    alignItems: Alignment.CENTER,
    paddingBottom: Value.CONSTANT_VALUE_89,
  },
  imgView: {
    alignItems: Alignment.CENTER,
  },
  button: {
    justifyContent: Alignment.CENTER,
    width: dynamicSize(Value.CONSTANT_VALUE_144),
    height: dynamicSize(Value.CONSTANT_VALUE_59),
    borderRadius: Value.CONSTANT_VALUE_40,
    backgroundColor: Colors.PINK,
    alignItems: Alignment.CENTER,
  },
  buttonText: {
    fontSize: Value.CONSTANT_VALUE_13,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 1.67,
    textAlign: Alignment.CENTER,
  },
  imgPickerContainer: {
    width: '100%',
    paddingHorizontal: Value.CONSTANT_VALUE_20,
    paddingVertical: Value.CONSTANT_VALUE_10,
  },
  pickerBtn: {
    paddingVertical: Value.CONSTANT_VALUE_20,
  },
  pickerBtnBorder: {
    borderBottomWidth: Value.CONSTANT_VALUE_1,
    borderBottomColor: Colors.BORDER_LINE,
  },
  pickerBtnLabel: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
  fullWidth: {
    width: '100%',
  },
  AppVersion: {
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansRegular,
    marginTop: Value.CONSTANT_VALUE_25,
    color: Colors.GRAY,
  },
  containerStyle: {
    paddingHorizontal: Value.CONSTANT_VALUE_10,
    backgroundColor: Colors.BACKGROUND,
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
