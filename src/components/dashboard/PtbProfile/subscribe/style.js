import Alignment from '../../../../constants/Alignment';
import Colors from '../../../../constants/Colors';
import {Fonts} from '../../../../constants/Constants';
import {Value} from '../../../../constants/FixedValues';
import {px} from '../../../../utils/responsive';

export default {
  container: {
    height: px(Value.CONSTANT_VALUE_115),
    borderWidth: Value.CONSTANT_VALUE_2,
    borderRadius: Value.CONSTANT_VALUE_11,
    borderColor: Colors.PINK,
    marginTop: Value.CONSTANT_VALUE_30,
    backgroundColor: Colors.SEARCH_BOX,
  },
  row: {
    flexDirection: Alignment.ROW,
    paddingHorizontal: Value.CONSTANT_VALUE_25,
    marginTop: Value.CONSTANT_VALUE_22,
    alignItems: Alignment.CENTER,
  },
  mainText: {
    marginLeft: Value.CONSTANT_VALUE_7,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
  innerText: {
    paddingHorizontal: Value.CONSTANT_VALUE_25,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansLight,
    marginTop: Value.CONSTANT_VALUE_5,
    color: Colors.BLACK,
  },
};
