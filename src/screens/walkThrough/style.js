import {Alignment, Colors} from '../../constants';
import {Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
import {dynamicSize, px, statusHide} from '../../utils/responsive';
import {Platform} from 'react-native';
export default {
  mainContainer: {
    flex: 1,
  },
  firstMainContainer: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_70),
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
    marginTop: dynamicSize(Value.CONSTANT_VALUE_46),
    alignItems: Alignment.CENTER,
    paddingBottom: dynamicSize(Value.CONSTANT_VALUE_52),
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
  },
  match: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 23,
    color: Colors.BLACK,
    textAlign: 'center',
    paddingTop: 20,
  },
  preference: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 23,
    color: Colors.BLACK,
    marginTop: px(53),
  },
  contentContainer: {
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    marginHorizontal: dynamicSize(57),
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
    marginTop: 10,
    marginHorizontal: dynamicSize(27),
  },
  headerIcon: {
    marginLeft: 30,
    marginTop: Platform.OS === 'android' ? 100 : 10,
  },

  headerIcon2: {
    marginLeft: 30,
    marginTop: Platform.OS === 'android' ? 100 : statusHide(54),
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
  },
  lookingSm: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.BLACK,
  },
  lookingSmNew: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.BLACK,
    marginTop: 20,
    width: px(246),
  },
  preferenceContainer: {
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    marginTop: 40,
  },
  subscriptionContainer: {
    marginTop: Platform.OS === 'ios' ? statusHide(20) : 150,
    paddingHorizontal: 60,
    alignItems: 'center',
  },
  subscriptionContainerNew: {
    marginTop: Platform.OS === 'ios' ? statusHide(0) : 150,
    paddingHorizontal: dynamicSize(36),
    alignItems: 'center',
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
    textAlign: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    marginHorizontal: 50,
  },
  walkThrough: {
    marginTop: px(37),
  },
};
