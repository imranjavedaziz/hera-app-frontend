import Alignment from '../../../constants/Alignment';
import Colors from '../../../constants/Colors';
import {Fonts} from '../../../constants/Constants';
import {Value} from '../../../constants/FixedValues';
import {dynamicSize} from '../../../utils/responsive';

export default {
  mainContainer: {
    height: 118,
    paddingTop: 15,
  },
  screenTitle: {
    textTransform: 'uppercase',
    letterSpacing: Value.CONSTANT_VALUE_2_84,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansRegular,
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_11,
    fontWeight: Alignment.BOLD,
  },
  screenSubTitle: {
    fontSize: Value.CONSTANT_VALUE_23,
    lineHeight: Value.CONSTANT_VALUE_30,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginVertical: Value.CONSTANT_VALUE_8,
    fontFamily: Fonts.OpenSansRegular,
    fontWeight: Alignment.BOLD,
  },
  Icon: {
    left: dynamicSize(Value.CONSTANT_VALUE_263),
    bottom: dynamicSize(Value.CONSTANT_VALUE_25),
  },
};
