import Alignment from '../../../constants/Alignment';
import {Value} from '../../../constants/FixedValues';
import {dynamicSize} from '../../../utils/responsive';
import {Fonts} from '../../../constants/Constants';
import Colors from '../../../constants/Colors';
export default {
  mainContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
    marginTop: Value.CONSTANT_VALUE_50,
  },
  headerIcon: {
    paddingTop: Value.CONSTANT_VALUE_10,
    paddingHorizontal: dynamicSize(Value.CONSTANT_VALUE_30),
  },
  buttoncontainer: {
    alignItems: Alignment.CENTER,
    paddingTop: dynamicSize(Value.CONSTANT_VALUE_25),
    marginBottom: dynamicSize(Value.CONSTANT_VALUE_45),
  },
  button: {
    width: dynamicSize(Value.CONSTANT_VALUE_144),
    height: dynamicSize(Value.CONSTANT_VALUE_59),
    borderRadius: Value.CONSTANT_VALUE_40,
    backgroundColor: Colors.PINK,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  buttonText: {
    fontSize: Value.CONSTANT_VALUE_13,
    fontFamily: Fonts.OpenSansBold,
    textAlign: Alignment.CENTER,
    letterSpacing: 1.67,
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
    textAlign: 'center',
    fontSize: 14,
    marginTop: 25,
    color: '#999999',
  },
};
