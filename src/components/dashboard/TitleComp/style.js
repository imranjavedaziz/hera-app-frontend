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
    height: 119,
  },
  screenTitle: {
    textTransform: 'uppercase',
    letterSpacing: Value.CONSTANT_VALUE_2,
    fontWeight: '600',
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    textAlign: 'center',
  },
  screenSubTitle: {
    fontSize: Value.CONSTANT_VALUE_22,
    lineHeight: Value.CONSTANT_VALUE_30,
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
  },
  Icon: {
    left:300,
    bottom: 26,
  },
};
