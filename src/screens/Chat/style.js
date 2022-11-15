import {Alignment, Colors} from '../../constants';
import {Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
import {px} from '../../utils/responsive';

export default {
  fixedheaderStyle: {marginRight: px(Value.CONSTANT_VALUE_20)},
  mainContainer: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  header: {marginTop: px(10), marginLeft: px(30)},
  Inbox: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: px(Value.CONSTANT_VALUE_11),
    letterSpacing: px(Value.CONSTANT_VALUE_2_84),
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  Match: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: px(Value.CONSTANT_VALUE_23),
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginTop: px(Value.CONSTANT_VALUE_8),
  },
};
