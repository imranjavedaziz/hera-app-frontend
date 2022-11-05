import Alignment from '../../../../constants/Alignment';
import Colors from '../../../../constants/Colors';
import {Fonts} from '../../../../constants/Constants';
import {Value} from '../../../../constants/FixedValues';
export default {
  mainContainer: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.SPACE_BETWEEN,
    borderRadius: Value.CONSTANT_VALUE_9,
    width: Value.CONSTANT_VALUE_354,
    height: Value.CONSTANT_VALUE_104,
    paddingHorizontal: Value.CONSTANT_VALUE_20,
    backgroundColor: Colors.SEARCH_BOX,
    marginBottom: Value.CONSTANT_VALUE_15,
  },
  innerView: {
    paddingVertical: Value.CONSTANT_VALUE_22,
  },
  mainText: {
    fontSize: Value.CONSTANT_VALUE_23,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK,
  },
  innerText: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK,
    fontWeight: Alignment.BOLD,
  },
  Icon: {
    top: Value.CONSTANT_VALUE_36,
    width: Value.CONSTANT_VALUE_33,
    height: Value.CONSTANT_VALUE_33
  },
};
