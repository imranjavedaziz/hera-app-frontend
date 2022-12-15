import Alignment from '../../../../../constants/Alignment';
import {
  dynamicSize,
  px,
  scaleHeight,
  scaleWidth,
} from '../../../../../utils/responsive';
import {Fonts} from '../../../../../constants/Constants';
import Colors from '../../../../../constants/Colors';
import {FontSize, Value} from '../../../../../constants/FixedValues';

export default {
  mainContainer: {
    justifyContent: Alignment.SPACE_BETWEEN,
    alignItems: Alignment.CENTER,
    flexDirection: Alignment.ROW,
  },
  Image: {
    height: dynamicSize(86.8),
    width: dynamicSize(86.8),
    borderRadius: dynamicSize(90),
    backgroundColor: '#E2E1D8',
  },
  row: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    marginTop: px(Value.CONSTANT_VALUE_13),
  },
  locationText: {
    fontSize: FontSize?.FONT_16,
    marginLeft: scaleWidth(5),
    fontFamily: Fonts.OpenSansRegular,
    lineHeight: scaleHeight(21),
    color: Colors.COLOR_535858,
  },
  codeText: {
    fontSize: Value.CONSTANT_VALUE_31,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.COLOR_535858,
    letterSpacing: 0,
  },
  typeText: {
    color: Colors.COLOR_535858,
    fontSize: Value.CONSTANT_VALUE_20,
    fontFamily: Fonts.OpenSansRegular,
  },
};
