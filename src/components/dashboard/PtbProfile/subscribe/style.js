import Alignment from '../../../../constants/Alignment';
import Colors from '../../../../constants/Colors';
import {Fonts} from '../../../../constants/Constants';
import {Value} from '../../../../constants/FixedValues';

export default {
  container: {
    height: Value.CONSTANT_VALUE_115,
    borderWidth: Value.CONSTANT_VALUE_2,
    borderRadius: Value.CONSTANT_VALUE_11,
    borderColor: Colors.PINK,
    marginLeft: Value.CONSTANT_VALUE_20,
    marginTop: Value.CONSTANT_VALUE_30,
    marginRight: Value.CONSTANT_VALUE_20,
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
    textAlign: Alignment.JUSTIFY,
    paddingHorizontal: Value.CONSTANT_VALUE_25,
    fontSize: Value.CONSTANT_VALUE_15,
    fontFamily: Fonts.OpenSansLight,
    marginTop: Value.CONSTANT_VALUE_5,
    color: Colors.BLACK,
  },
};
