import {Alignment, Colors} from '../../constants';
import {Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';

export default {
  screenTitle: {
    textTransform: Alignment.UPPERCASE,
    letterSpacing: Value.CONSTANT_VALUE_2_84,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_11,
  },
  mainTitle: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_23,
    letterSpacing: 0,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginTop: Value.CONSTANT_VALUE_8,
  },
  inputRow: {
    flexDirection: Alignment.ROW,
    marginTop: Value.CONSTANT_VALUE_55,
    paddingHorizontal: Value.CONSTANT_VALUE_40,
    justifyContent: 'flex-start',
  },
  contryCodeContainer: {
    width: Value.CONSTANT_VALUE_50,
    marginRight: Value.CONSTANT_VALUE_20,
  },
  countryCodeInput: {
    color: Colors.BORDER_LINE,
  },
  Btn: {
    height: Value.CONSTANT_VALUE_80,
    width: Value.CONSTANT_VALUE_197,
  },
};
