import Alignment from '../../../constants/Alignment';
import Colors from '../../../constants/Colors';
import {Fonts} from '../../../constants/Constants';
import {Value} from '../../../constants/FixedValues';
import {
  normalizeFont,
  scaleHeight,
  scaleWidth,
  dynamicSize,
} from '../../../utils/responsive';

export default {
  mainContainer: {
    height: 118,
    paddingTop: 15,
  },
  screenTitle: {
    textTransform: 'uppercase',
    letterSpacing: Value.CONSTANT_VALUE_2,
    fontWeight: '600',
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    textAlign: 'center',
    fontSize:Value.CONSTANT_VALUE_11,
  },
  screenSubTitle: {
    fontSize: Value.CONSTANT_VALUE_23,
    lineHeight: Value.CONSTANT_VALUE_30,
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
  },
  Icon: {
    left:dynamicSize(287),
    bottom:dynamicSize(Value.CONSTANT_VALUE_25),
  },
};
