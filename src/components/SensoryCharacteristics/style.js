import {scaleHeight, scaleWidth} from '../../utils/responsive';
import {Value} from '../../constants/FixedValues';
import Alignment from '../../constants/Alignment';
import {Fonts} from '../../constants/Constants';
import Colors from '../../constants/Colors';

export default {
  container: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    paddingHorizontal: 20,
    marginBottom: scaleHeight(40),
  },
  text: {
    padding: Value.CONSTANT_VALUE_5,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.COLOR_535858,
    width: scaleWidth(156),
    paddingLeft: scaleWidth(20),
  },
};
