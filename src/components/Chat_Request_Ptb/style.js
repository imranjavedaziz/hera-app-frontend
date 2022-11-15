import {Alignment, Colors} from '../../constants';
import {Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
import {px} from '../../utils/responsive';

export default {
  ImageView: {
    borderWidth: px(Value.CONSTANT_VALUE_2),
    borderRadius: px(Value.CONSTANT_VALUE_90),
    height: px(Value.CONSTANT_VALUE_167),
    width: px(Value.CONSTANT_VALUE_167),
  },
  ImageStyle: {
    height: px(Value.CONSTANT_VALUE_161),
    width: px(Value.CONSTANT_VALUE_161),
    borderRadius: px(Value.CONSTANT_VALUE_90),
    marginTop: px(Value.CONSTANT_VALUE_1),
    marginLeft: px(Value.CONSTANT_VALUE_1),
  },
  innerContainer: {marginTop: px(Value.CONSTANT_VALUE_20)},
  Name: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_32,
    color: Colors.BLACK,
  },
  Type: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_20,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginTop: px(Value.CONSTANT_VALUE_4),
  },
  innerView: {marginTop: px(Value.CONSTANT_VALUE_30)},
  LikeProfile: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: px(Value.CONSTANT_VALUE_16),
    textAlign: 'center',
    color: Colors.BLACK,
  },
  StartConversation: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: px(Value.CONSTANT_VALUE_14),
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginTop: px(Value.CONSTANT_VALUE_6),
  },
};
