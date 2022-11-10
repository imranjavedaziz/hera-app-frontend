import {scaleHeight, scaleWidth,px} from '../../utils/responsive';
import {Value} from '../../constants/FixedValues';
import Alignment from '../../constants/Alignment';
import {Fonts} from '../../constants/Constants';
import Colors from '../../constants/Colors';

export default {
  container: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    paddingHorizontal: px(25),
    marginBottom: scaleHeight(40),
  },
  text: {
    padding: Value.CONSTANT_VALUE_5,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.COLOR_535858,
    width: px(156),
  },
  title: {
    color: Colors.COLOR_535858,
    fontSize: Value.CONSTANT_VALUE_23,
    fontFamily: Fonts.OpenSansBold,
    textAlign:Alignment.CENTER,
    alignSelf:Alignment.CENTER,
    paddingTop:px(32),
    paddingBottom:px(32)
  },
};
