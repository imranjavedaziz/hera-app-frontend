import Alignment from '../../../../constants/Alignment';
import Colors from '../../../../constants/Colors';
import {Fonts} from '../../../../constants/Constants';
import {Value} from '../../../../constants/FixedValues';
import {px} from '../../../../utils/responsive';

export default {
  container: {
    height: px(Value.CONSTANT_VALUE_110),
    borderWidth: Value.CONSTANT_VALUE_2,
    borderRadius: Value.CONSTANT_VALUE_11,
    borderColor: Colors.PINK,
    marginTop: Value.CONSTANT_VALUE_30,
    backgroundColor: Colors.SEARCH_BOX,
    justifyContent: Alignment.CENTER,
  },
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
    fontFamily: Fonts.OpenSansLight,
    marginTop: Value.CONSTANT_VALUE_5,
    color: Colors.BLACK,
    textAlign: Alignment.LEFT,
  },
  headerText: {
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.RED,
  },
  price: {
    fontSize: Value.CONSTANT_VALUE_20,
    fontFamily: Fonts.OpenSansLight,
    color: Colors.BLACK,
    marginLeft: Value.CONSTANT_VALUE_25,
    marginRight: Value.CONSTANT_VALUE_25,
    textAlign: Alignment.LEFT,
  },
};
