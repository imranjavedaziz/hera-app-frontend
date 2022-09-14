import Colors from '../constants/Colors';
import {Value} from '../constants/FixedValues';
import Alignment from '../constants/Alignment';

export default {
  screenTitle: {
    textTransform: 'uppercase',
    letterSpacing: Value.CONSTANT_VALUE_2,
    fontWeight: '600',
    color: Colors.BLACK,
  },
  screenSubTitle: {
    fontSize: Value.CONSTANT_VALUE_22,
    lineHeight: Value.CONSTANT_VALUE_30,
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.BLACK,
  },
  mainContainer: {
    flex: 1,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.FLEX_START,
  },
  underlineText: {
    fontSize: Value.CONSTANT_VALUE_18,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
};
