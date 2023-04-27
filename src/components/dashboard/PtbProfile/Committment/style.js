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
    // width: dynamicSize(Value.CONSTANT_VALUE_320),
    // height: dynamicSize(Value.CONSTANT_VALUE_104),
    // paddingHorizontal: Value.CONSTANT_VALUE_20,
    padding: Value.CONSTANT_VALUE_20,
    backgroundColor: Colors.SEARCH_BOX,
    // marginBottom: dynamicSize(Value.CONSTANT_VALUE_10),
    alignItems: Alignment.CENTER,
    flex: 1,
  },
  mainText: {
    fontSize: Value.CONSTANT_VALUE_18,
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
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    width: Value.CONSTANT_VALUE_34,
    height: Value.CONSTANT_VALUE_34,
  },
  iconContainer: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    width: Value.CONSTANT_VALUE_50,
    resizeMode: 'contain',
    // height: Value.CONSTANT_VALUE_50,
  },
};
