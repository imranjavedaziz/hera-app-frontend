import {Fonts} from '../../constants/Constants';
import Colors from '../../constants/Colors';
import {Value} from '../../constants/FixedValues';
import Alignment from '../../constants/Alignment';
import {dynamicSize} from '../../utils/responsive';
export default {
  chatText: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_11,
    fontWeight: Alignment.BOLD,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  ChatConversation: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_23,
    fontWeight: Alignment.BOLD,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  profileImage: {
    width: dynamicSize(Value.CONSTANT_VALUE_60),
    height: dynamicSize(Value.CONSTANT_VALUE_60),
  },
  profileImageOverlay: {
    width: dynamicSize(Value.CONSTANT_VALUE_66),
    height: dynamicSize(Value.CONSTANT_VALUE_66),
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: Colors.BORDER_PROFILE,
  },
};
