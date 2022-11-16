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
    flex:1,
    justifyContent:'space-between'
  },
  description: {
   marginLeft: px(Value.CONSTANT_VALUE_12),
    justifyContent: Alignment.CENTER,
    flex:1
  },
  userName: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: px(Value.CONSTANT_VALUE_16),
    color: Colors.BLACK,
  fontWeight: Alignment.BOLD,

  },
  msg: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: px(Value.CONSTANT_VALUE_14),
    color: Colors.BLACK_0,
    fontWeight: Alignment.BOLD,
  },
  msgRead:{
    fontFamily: Fonts.OpenSansRegular,
    fontSize: px(Value.CONSTANT_VALUE_14),
    color: Colors.BLACK_01
  },
  time: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: px(Value.CONSTANT_VALUE_13),
    lineHeight: px(Value.CONSTANT_VALUE_21),
    color: Colors.TIME_COLOR,
    textAlign: "right",
   
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
  timeView:{flex:.2,alignItems: Alignment.FLEXEND},
  heartIcon:{
    height: Value.CONSTANT_VALUE_23,
    width: Value.CONSTANT_VALUE_25,
    position: Alignment.ABSOLUTE,
    bottom: -2,
    right: -5,
  },
  contain:{flex: 0.8, flexDirection: 'row'},
  seemsLikeYouHave:{
    width: 290,
    height: 64,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 23,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#353a3a",
    marginTop:20
  },
  heartImage:{
    width: 183.4,
    height: 169,
  }
};
