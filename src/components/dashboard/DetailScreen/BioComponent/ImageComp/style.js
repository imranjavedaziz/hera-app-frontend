import Alignment from '../../../../../constants/Alignment';
import Colors from '../../../../../constants/Colors';
import {Fonts} from '../../../../../constants/Constants';
import {FontSize, Value} from '../../../../../constants/FixedValues';

export default {
  row: {
    alignItems: Alignment.CENTER,
    flexDirection: Alignment.ROW,
    marginTop: Value.CONSTANT_VALUE_8,
  },
  text: {
    fontSize: FontSize.FONT_16,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK,
  },
  textBold: {
    fontSize: FontSize.FONT_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
};
