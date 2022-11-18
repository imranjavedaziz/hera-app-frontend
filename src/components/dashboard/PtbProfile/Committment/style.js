import Alignment from '../../../../constants/Alignment';
import Colors from '../../../../constants/Colors';
import {Fonts} from '../../../../constants/Constants';
import {Value} from '../../../../constants/FixedValues';
import {dynamicSize} from '../../../../utils/responsive';
export default {
  mainContainer: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.SPACE_BETWEEN,
    borderRadius: Value.CONSTANT_VALUE_9,
    width: dynamicSize(Value.CONSTANT_VALUE_322),
    height: dynamicSize(Value.CONSTANT_VALUE_104),
    paddingHorizontal: Value.CONSTANT_VALUE_20,
    backgroundColor: Colors.SEARCH_BOX,
    marginBottom: dynamicSize(Value.CONSTANT_VALUE_15),
    marginTop: Value.CONSTANT_VALUE_30,
  },
  // Value.CONSTANT_VALUE_325
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
    height: Value.CONSTANT_VALUE_33,
  },
};
