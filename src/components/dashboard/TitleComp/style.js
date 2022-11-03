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
    fontFamily: Fonts.OpenSansBold,
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_11,
  },
  screenSubTitle: {
    fontSize: Value.CONSTANT_VALUE_23,
    lineHeight: Value.CONSTANT_VALUE_30,
    alignItems: Alignment.CENTER,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    marginVertical: Value.CONSTANT_VALUE_8,
  },
  Icon: {
    left: dynamicSize(Value.CONSTANT_VALUE_263),
    bottom: dynamicSize(Value.CONSTANT_VALUE_25),
  },
};
