import Alignment from '../../../../constants/Alignment';
import Colors from '../../../../constants/Colors';
import { Fonts } from '../../../../constants/Constants';
import { Value } from '../../../../constants/FixedValues';
import { px } from '../../../../utils/responsive';

export default {
  container: (is_trial) => ({
    height: px(Value.CONSTANT_VALUE_110),
    borderWidth: Value.CONSTANT_VALUE_2,
    borderRadius: Value.CONSTANT_VALUE_11,
    borderColor: is_trial ? Colors.GREEN : Colors.COLOR_F18D93,
    marginTop: Value.CONSTANT_VALUE_30,
    backgroundColor: Colors.SEARCH_BOX,
    justifyContent: Alignment.CENTER,
  }),
  row: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    marginHorizontal: Value.CONSTANT_VALUE_25,
  },
  mainText: {
    marginLeft: Value.CONSTANT_VALUE_7,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
  innerText: {
    marginLeft: Value.CONSTANT_VALUE_25,
    marginRight: Value.CONSTANT_VALUE_25,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansRegular,
    marginTop: Value.CONSTANT_VALUE_5,
    color: Colors.BLACK,
    textAlign: Alignment.LEFT,
  },
  headerText: {
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.COLOR_RED,
  },
  price: {
    fontSize: Value.CONSTANT_VALUE_15,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK,
    marginLeft: Value.CONSTANT_VALUE_25,
    marginRight: Value.CONSTANT_VALUE_25,
    textAlign: Alignment.LEFT,
  },
};
