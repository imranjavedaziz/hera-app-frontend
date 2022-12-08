import {Fonts} from '../../../constants/Constants';
import Colors from '../../../constants/Colors';
import {Value} from '../../../constants/FixedValues';
import Alignment from '../../../constants/Alignment';

import {
  dynamicSize,
  scaleWidth,
  height,
  width,
  px,
  statusHide,
} from '../../../utils/responsive';

export default {
  profileLogo: {
    width: Value.CONSTANT_VALUE_80,
    height: Value.CONSTANT_VALUE_80,
    borderRadius: Value.CONSTANT_VALUE_40,
  },
  mainContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
    marginHorizontal: dynamicSize(Value.CONSTANT_VALUE_30),
    marginTop: dynamicSize(Value.CONSTANT_VALUE_118),
  },
  mainAndroidContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
    marginHorizontal: dynamicSize(Value.CONSTANT_VALUE_30),
    marginTop: statusHide(105),
  },
  flex: {flex: 1, backgroundColor: Colors.BACKGROUND},
  colorText: {color: Colors.BLACK},
  location: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
  },
  androidHeaderIcons: {
    marginLeft: Value.CONSTANT_VALUE_30,
  },
  locationText: {
    fontSize: Value.CONSTANT_VALUE_16,
    lineHeight: 21,
    letterSpacing: 0,
    fontFamily: Fonts.OpenSansRegular,
    marginLeft: Value.CONSTANT_VALUE_5,
    color: Colors.BLACK,
  },
  profileName: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_32,
    fontWeight: Alignment.BOLD,
    color: Colors.BLACK,
  },
  profileImg: {
    flexDirection: Alignment.ROW_REVERSE,
    position: Alignment.ABSOLUTE,
    right: Value.CONSTANT_VALUE_3,
  },
  profileType: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_20,
    color: Colors.BLACK,
  },
  ageContainer: {
    flexDirection: Alignment.ROW,
    marginVertical: Value.CONSTANT_VALUE_15,
    marginBottom: Value.CONSTANT_VALUE_52,
    marginTop: Value.CONSTANT_VALUE_25,
  },
  ageYrs: {
    fontFamily: Fonts.OpenSansRegular,
    fontWeight: Alignment.BOLD,
    color: Colors.BLACK,
  },
  bioBackground: {
    height: Value.CONSTANT_VALUE_70,
    width: Value.CONSTANT_VALUE_70,
    position: Alignment.ABSOLUTE,
    top: -35,
  },
  bioText: {
    fontFamily: Fonts.OpenSansLight,
    fontSize: Value.CONSTANT_VALUE_22,
  },
  highlits: {
    backgroundColor: Colors.TAGCOLOR,
    marginRight: Value.CONSTANT_VALUE_8,
    height: Value.CONSTANT_VALUE_31,
    alignContent: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    paddingHorizontal: Value.CONSTANT_VALUE_5,
    marginVertical: Value.CONSTANT_VALUE_15,
  },
  videoText: {
    fontFamily: Fonts.OpenSansRegular,
    marginVertical: Value.CONSTANT_VALUE_15,
    fontWeight: Alignment.BOLD,
    color: Colors.BLACK_KEY,
  },
  videoContainer: {
    height: Value.CONSTANT_VALUE_200,
    backgroundColor: Colors.BLACK,
  },
  reqSentBtn: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    marginHorizontal: Value.CONSTANT_VALUE_80,
    marginVertical: Value.CONSTANT_VALUE_50,
    height: Value.CONSTANT_VALUE_80,
  },
  reqsentText: {
    letterSpacing: Value.CONSTANT_VALUE_FRAC36,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
    marginHorizontal: Value.CONSTANT_VALUE_10,
  },
  declineReq: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    marginHorizontal: Value.CONSTANT_VALUE_30,
    marginVertical: Value.CONSTANT_VALUE_50,
    height: Value.CONSTANT_VALUE_80,
    width: Value.CONSTANT_VALUE_297,
  },
  declineText: {
    letterSpacing: Value.CONSTANT_VALUE_FRAC36,
    color: Colors.RED,
    fontFamily: Fonts.OpenSansBold,
    margin: Value.CONSTANT_VALUE_10,
  },
  sendMsgBtn: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    borderWidth: Value.CONSTANT_VALUE_1,
    borderColor: Colors.COLOR_A3C6C4,
    borderRadius: Value.CONSTANT_VALUE_40,
    justifyContent: Alignment.CENTER,
    marginHorizontal: Value.CONSTANT_VALUE_20,
    marginVertical: Value.CONSTANT_VALUE_50,
    height: Value.CONSTANT_VALUE_80,
  },
  sendMsgBtnDis: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    borderWidth: Value.CONSTANT_VALUE_1,
    borderColor: Colors.COLOR_A3C6C4,
    borderRadius: Value.CONSTANT_VALUE_40,
    justifyContent: Alignment.CENTER,
    marginHorizontal: Value.CONSTANT_VALUE_20,
    height: Value.CONSTANT_VALUE_80,
  },
  sendMsgText: {
    letterSpacing: Value.CONSTANT_VALUE_FRAC36,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
    marginHorizontal: px(5),
    left: px(5),
  },
  highlitsText: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_14,
    color: Colors.BLACK_KEY,
    opacity: 1,
  },
  crossIconContainer: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_15),
    marginBottom: dynamicSize(Value.CONSTANT_VALUE_70),
  },
  crossIcon: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    width: scaleWidth(Value.CONSTANT_VALUE_211),
  },
  btn: color => ({
    borderRadius: dynamicSize(Value.CONSTANT_VALUE_40),
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    borderColor: color,
    borderWidth: dynamicSize(Value.CONSTANT_VALUE_1),
    backgroundColor: Colors.BACKGROUND,
    height: Value.CONSTANT_VALUE_80,
    width: Value.CONSTANT_VALUE_296,
    alignSelf: Alignment.CENTER,
  }),
  iconContainer: {
    flex: Value.CONSTANT_VALUE_FRAC88,
    alignItems: Alignment.CENTER,
  },
  textInnerContainer: {
    justifyContent: Alignment.FLEXEND,
    alignItems: Alignment.CENTER,
  },
  loaderContainer: {
    position: Alignment.ABSOLUTE,
    width: Value.CONSTANT_VALUE_50,
    height: Value.CONSTANT_VALUE_50,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    borderRadius: Value.CONSTANT_VALUE_35,
    backgroundColor: Colors.WHITE,
    zIndex: Value.CONSTANT_VALUE_999999,
  },
  dateText: {
    fontFamily: Fonts.OpenSansLightItalic,
    color: Colors.BLACK,
  },
  dateTextView: {flexDirection: Alignment.ROW, marginTop: 51},
  imgCondi: {
    flex: 1,
    position: 'absolute',
    left: 80,
    top: 0,
    bottom: 0,
    width: width,
  },
  indicator: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    marginTop: height / 2.5,
  },
};
