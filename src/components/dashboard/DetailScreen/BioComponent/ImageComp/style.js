import Alignment from '../../../../../constants/Alignment';
import Colors from '../../../../../constants/Colors';
import {Fonts} from '../../../../../constants/Constants';
import {FontSize, Value} from '../../../../../constants/FixedValues';
import {normalizeFont, scaleHeight} from '../../../../../utils/responsive';

export default {
  row: {
    alignItems: Alignment.CENTER,
    flexDirection: Alignment.ROW,
  },
  text: {
    fontSize: normalizeFont(FontSize.FONT_16),
    fontFamily: Fonts.OpenSansRegular,
    lineHeight: scaleHeight(Value.CONSTANT_VALUE_21),
    letterSpacing: Value.CONSTANT_VALUE_0,
    color:Colors.COLOR_535858,
    paddingBottom:scaleHeight(Value.CONSTANT_VALUE_8)
  },
  textBold: {
    lineHeight: scaleHeight(Value.CONSTANT_VALUE_21),
    letterSpacing: Value.CONSTANT_VALUE_0,
    color:Colors.COLOR_535858,
    fontSize: normalizeFont(FontSize.FONT_16),
    fontFamily: Fonts.OpenSansBold,
    paddingBottom:scaleHeight(Value.CONSTANT_VALUE_8)

  },
};
