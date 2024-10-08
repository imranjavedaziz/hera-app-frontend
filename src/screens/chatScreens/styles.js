import {Alignment, Colors} from '../../constants';
import {Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
import {px} from '../../utils/responsive';

export default {
  fixedheaderStyle: {marginRight: px(Value.CONSTANT_VALUE_20)},
  mainContainer: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    marginBottom: 34,
  },
  header: {marginTop: px(10), marginLeft: px(30)},
  Inbox: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: px(Value.CONSTANT_VALUE_11),
    letterSpacing: px(Value.CONSTANT_VALUE_2_84),
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  Match: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: px(Value.CONSTANT_VALUE_23),
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginTop: px(Value.CONSTANT_VALUE_8),
  },

  chatText: {
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK,
    fontSize: px(Value.CONSTANT_VALUE_13),
    fontWeight: Alignment.BOLD,
  },
  chatTime: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: px(Value.CONSTANT_VALUE_13),
    color: '#ada99f',
  },
  chatContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    maxWidth: 302,
  },
  senderID: {
    alignSelf: Alignment.FLEXEND,
    flexDirection: Alignment.ROW,
    backgroundColor: Colors.WHITE,
    alignItems: Alignment.CENTER,
    marginRight: 20,
    justifyContent: Alignment.CENTER,
  },
  receiverID: {
    alignSelf: Alignment.FLEX_START,
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    marginLeft: 10,
    backgroundColor: Colors.GREEN,
  },
  mainContainerDetail: {
    backgroundColor: 'white',
    borderTopColor: '#E8E8E8',
    borderRadius: 24,
    marginHorizontal: 15,
    paddingRight: 40,
    paddingLeft: 10,
    justifyContent: Alignment.CENTER,
    textAlign: Alignment.CENTER,
  },
  textInput: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_14,
    color: Colors.BLACK,
  },
  border: {
    borderBottomWidth: Value.CONSTANT_VALUE_1,
    borderBottomColor: Colors.COLOR_228226216,
  },
  titleText: {
    fontFamily: Fonts.OpenSansBold,
    color: Colors.COLOR_535858,
    fontSize: Value.CONSTANT_VALUE_16,
  },
  descText: {
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.COLOR_535858,
    fontSize: Value.CONSTANT_VALUE_14,
  },
  topContainer: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    flex: 0.8,
    justifyContent: Alignment.CENTER,
  },
  avatar: {
    width: Value.CONSTANT_VALUE_40,
    height: Value.CONSTANT_VALUE_40,

    borderRadius: Value.CONSTANT_VALUE_40 / 2,
  },
  outerContainer: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.SPACE_BETWEEN,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  thumbContain: color => ({
    height: 41,
    width: 132,
    borderWidth: 1,
    borderColor: color,
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    borderRadius: 6,
  }),
  thumbImg: {height: 15, width: 14},
  thumbInnerContain: {
    flexDirection: Alignment.ROW,
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
  matchTxt: {
    textAlign: Alignment.CENTER,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: Fonts.OpenSansBold,
  },
  thumbTxt: {
    paddingLeft: 12,
    fontSize: 15,
    fontFamily: Fonts.OpenSansRegular,
    lineHeight: 21,
    color: Colors.COLOR_535858,
  },
  smDonorEmptyView: {
    position: Alignment.ABSOLUTE,
    justifyContent: Alignment.FLEX_START,
    bottom: 0,
    right: 0,
    left: 0,
    height: '80%',
  },
  crossImage: {width: 30, height: 30},
  searchBar: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: 'white',
    width: 303,
  },
  messageSendTextInput: {
    flexDirection: 'row',
    marginBottom: 50,
    marginHorizontal: 20,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
  },
  messageSend: {
    alignSelf: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    position: Alignment.ABSOLUTE,
    right: 12,
  },
  SeeProfile: {
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
    textAlign: Alignment.CENTER,
  },
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
    borderColor: Colors.WHITE,
    marginTop: 54,
    borderRadius: px(Value.CONSTANT_VALUE_60),
  },
  headersm: {
    marginTop: 45,
    marginRight: 20,
    alignSelf: Alignment.FLEXEND,
  },
  warningImage: {
    position: Alignment.ABSOLUTE,
    alignSelf: Alignment.FLEXEND,
    marginLeft: -30,
    left: 0,
  },
  profileLikeScree: {
    width: px(Value.CONSTANT_VALUE_190),
    height: px(Value.CONSTANT_VALUE_190),
    borderStyle: 'solid',
    borderWidth: px(Value.CONSTANT_VALUE_2),
    borderColor: Colors.WHITE,
    backgroundColor: Colors.WHITE,
    marginVertical: px(Value.CONSTANT_VALUE_54),
    borderRadius: px(Value.CONSTANT_VALUE_90),
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  matchFoundText: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: px(Value.CONSTANT_VALUE_35),
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  profileScreen: {
    width: px(Value.CONSTANT_VALUE_180),
    height: px(Value.CONSTANT_VALUE_180),
    borderRadius: px(Value.CONSTANT_VALUE_90),
  },
  heartIcon: {
    width: px(Value.CONSTANT_VALUE_100),
    height: px(Value.CONSTANT_VALUE_100),
    position: Alignment.ABSOLUTE,
    right: -30,
    top: -15,
  },
};
