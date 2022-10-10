import Alignment from '../../../constants/Alignment';
import Colors from '../../../constants/Colors';
import {Fonts} from '../../../constants/Constants';
import {Value} from '../../../constants/FixedValues';
import {normalizeFont, dynamicSize} from '../../../utils/responsive';
export default {
  mainContainer: {
    height: 118,
    paddingTop: 15,
  },
  screenTitle: {
    textTransform: 'uppercase',
    letterSpacing: Value.CONSTANT_VALUE_2,
    fontWeight: '700',
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    textAlign: Alignment.CENTER,
    fontSize: normalizeFont(Value.CONSTANT_VALUE_11),
  },
  screenSubTitle: {
    fontSize: Value.CONSTANT_VALUE_21,
    lineHeight: Value.CONSTANT_VALUE_30,
    fontWeight: '700',
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    marginVertical: Value.CONSTANT_VALUE_10,
  },
  Icon: {
    left: dynamicSize(Value.CONSTANT_VALUE_263),
    bottom: dynamicSize(Value.CONSTANT_VALUE_25),
  },
};
