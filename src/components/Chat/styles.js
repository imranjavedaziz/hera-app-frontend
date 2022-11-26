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
  unReadImgView: {
    width: px(Value.CONSTANT_VALUE_66),
    height: px(Value.CONSTANT_VALUE_66),
  },
  innerContainer: {
    flexDirection: Alignment.ROW,
    marginBottom: px(Value.CONSTANT_VALUE_18),
    flex: 1,
    justifyContent: 'space-between',
  },
  description: {
    marginLeft: px(Value.CONSTANT_VALUE_12),
    maxWidth: px(Value.CONSTANT_VALUE_190),
    alignItems: 'flex-start',
  },
  userName: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: px(Value.CONSTANT_VALUE_14),
    color: Colors.BLACK,
    fontWeight: Alignment.BOLD,

    lineHeight: 21,
    letterSpacing: 0,
    color: '#353a3a',
  },
  msg: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: px(Value.CONSTANT_VALUE_12),
    color: Colors.BLACK_0,
    fontWeight: Alignment.BOLD,
  },
  msgRead: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: px(Value.CONSTANT_VALUE_12),
    color: Colors.BLACK_01,
  },
  time: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: px(Value.CONSTANT_VALUE_13),
    lineHeight: px(Value.CONSTANT_VALUE_21),
    color: Colors.TIME_COLOR,
    textAlign: 'right',
  },
  recentmsg: {
    backgroundColor: Colors.GREEN,
    width: px(Value.CONSTANT_VALUE_10),
    height: px(Value.CONSTANT_VALUE_10),
    borderStyle: Alignment.SOLID,
    borderWidth: px(Value.CONSTANT_VALUE_1),
    borderColor: Colors.WHITE,
    borderRadius: px(Value.CONSTANT_VALUE_30),
    marginTop: px(Value.CONSTANT_VALUE_8),
  },
  timeView: {
    alignItems: Alignment.FLEXEND,
  },
  heartIcon: {
    height: Value.CONSTANT_VALUE_40,
    width: Value.CONSTANT_VALUE_40,
    position: Alignment.ABSOLUTE,
    right: -13,
    bottom: -12,
  },
  contain: {flexDirection: 'row'},
  seemsLikeYouHave: {
    width: 290,
    height: 64,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 23,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#353a3a',
    marginTop: 20,
  },
  heartImage: {
    width: 183.4,
    height: 169,
  },
  chatText: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: px(Value.CONSTANT_VALUE_18),
    textAlign: 'center',
    color: '#747474',
    width: 282,
  },
  chatImage: {width: 160, height: 160, marginBottom: 27},
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
};
