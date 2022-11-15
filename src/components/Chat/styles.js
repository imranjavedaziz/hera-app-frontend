import {Alignment, Colors} from '../../constants';
import {Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
import {px} from '../../utils/responsive';

export default {
  userImg: {
    width: px(Value.CONSTANT_VALUE_60),
    height: px(Value.CONSTANT_VALUE_60),
    marginTop: px(Value.CONSTANT_VALUE_1),
    marginLeft: px(Value.CONSTANT_VALUE_1),
    borderRadius: px(Value.CONSTANT_VALUE_60),
  },
  ImgView: {
    width: px(Value.CONSTANT_VALUE_66),
    height: px(Value.CONSTANT_VALUE_66),
    borderStyle: 'solid',
    borderWidth: px(Value.CONSTANT_VALUE_2),
    borderColor: Colors.GREEN,
    borderRadius: px(Value.CONSTANT_VALUE_60),
  },
  innerContainer: {
    flexDirection: Alignment.ROW,
    marginTop: px(Value.CONSTANT_VALUE_36),
  },
  description: {
    marginLeft: px(Value.CONSTANT_VALUE_12),
    justifyContent: Alignment.CENTER,
  },
  userName: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: px(Value.CONSTANT_VALUE_16),
    lineHeight: px(Value.CONSTANT_VALUE_21),
    letterSpacing: 0,
    color: Colors.BLACK,
  },
  msg: {
    fontFamily: Fonts.OpenSansRegular,
    width: px(Value.CONSTANT_VALUE_217),
    fontSize: px(Value.CONSTANT_VALUE_14),
    color: Colors.BLACK_0,
  },
  time: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: px(Value.CONSTANT_VALUE_13),
    lineHeight: px(Value.CONSTANT_VALUE_21),
    letterSpacing: 0,
    color: Colors.TIME_COLOR,
  },
  recentmsg: {
    backgroundColor: Colors.GREEN,
    width: px(Value.CONSTANT_VALUE_10),
    height: px(Value.CONSTANT_VALUE_10),
    borderStyle: Alignment.SOLID,
    borderWidth: px(Value.CONSTANT_VALUE_1),
    borderColor: Colors.WHITE,
    borderRadius: px(Value.CONSTANT_VALUE_30),
    justifyContent: Alignment.FLEXEND,
    marginTop: px(Value.CONSTANT_VALUE_8),
    marginLeft: 40,
  },
};
