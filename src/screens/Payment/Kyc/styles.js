import {Value} from '../../../constants/FixedValues';
import {px, statusHide} from '../../../utils/responsive';
import {Alignment, Colors} from '../../../constants';
import {Fonts} from '../../../constants/Constants';

export default {
  flex: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  androidHeaderIcons: {
    marginRight: Value.CONSTANT_VALUE_30,
  },
  mainContainer: {
    flex: Value.CONSTANT_VALUE_1,
    marginTop: statusHide(104),
  },
  mainText: {
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 2.84,
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_11,
  },
  mainTextADD: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_23,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginTop: Value.CONSTANT_VALUE_8,
  },
  saveBtn: {
    height: px(Value.CONSTANT_VALUE_80),
    marginTop: Value.CONSTANT_VALUE_45,
    marginBottom: Value.CONSTANT_VALUE_45,
    width: px(Value.CONSTANT_VALUE_236),
  },
};
