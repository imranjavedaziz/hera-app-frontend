import {Alignment, Colors} from '../../constants';
import {Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
import {dynamicSize, px, statusHide} from '../../utils/responsive';
import {Platform} from 'react-native';
export default {
  firstMainContainer: {
    marginTop: px(70),
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  textContainer: {
    marginTop: px(10),
    flexDirection: 'row',
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  smallHeart: {
    width: 54,
    height: 54,
  },
  select: {
    textAlign: Alignment.CENTER,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 16,
    color: Colors.BLACK,
  },
  textOne: {
    textAlign: Alignment.CENTER,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 16,
    color: Colors.BLACK,
  },
  textTwo: {
    textAlign: Alignment.CENTER,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 16,
    color: Colors.BLACK,
  },
  buttoncontainer: {
    marginTop: Value.CONSTANT_VALUE_46,
    alignItems: Alignment.CENTER,
    paddingBottom: Value.CONSTANT_VALUE_52,
  },
  button: {
    justifyContent: Alignment.CENTER,
    width: dynamicSize(Value.CONSTANT_VALUE_140),
    height: dynamicSize(Value.CONSTANT_VALUE_58),
    borderRadius: Value.CONSTANT_VALUE_40,
    backgroundColor: Colors.WHITE,
    alignItems: Alignment.CENTER,
  },
  buttonText: {
    fontSize: Value.CONSTANT_VALUE_13,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 1.67,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  matchContainer: {
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    marginTop: 23,
  },
  match: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 23,
    color: Colors.BLACK,
  },
  preference: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 23,
    color: Colors.BLACK,
    marginTop: px(53),
  },
  contentContainer: {
    marginTop: 10,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    marginHorizontal: 57,
  },
  matchContent: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 13,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginTop: 10,
  },
  preferenceContent: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 13,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    paddingHorizontal: 50,
    marginTop: 10,
  },
  headerIcon: {
    marginLeft: 30,
    marginTop: Platform.OS === 'android' ? 100 : 10,
    // bottom: 40,
  },
  headerIcon2: {
    marginLeft: 30,
    marginTop: Platform.OS === 'android' ? 100 : 10,
    // bottom: 40,
  },
  secondContainer: {
    marginTop: px(39),
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  lookindSmContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 55,
    // marginTop: Platform.OS === 'ios' ? statusHide(104) : 104,
  },
  lookingSm: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.BLACK,
  },
  preferenceContainer: {
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    marginTop: 40,
  },
  subscriptionContainer: {
    marginTop: Platform.OS === 'ios' ? statusHide(20) : 150,
    paddingHorizontal: 60,
  },
  thirdContainer: {
    marginTop: 27,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  connectContainer: {
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    marginTop: px(40),
  },
  connectContent: {
    marginTop: 10,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    marginHorizontal: 60,
  },
  walkThrough: {
    marginTop: px(39),
  },
};
