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
};
