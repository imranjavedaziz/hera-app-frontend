import {scaleHeight, scaleWidth, px, dynamicSize} from '../../utils/responsive';
import {Value} from '../../constants/FixedValues';
import Alignment from '../../constants/Alignment';
import {Fonts} from '../../constants/Constants';
import Colors from '../../constants/Colors';

export default {
  container: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    paddingHorizontal: px(25),
  },
  text: {
    padding: Value.CONSTANT_VALUE_5,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.COLOR_535858,
    width: px(156),
    paddingLeft: scaleWidth(20),
    marginLeft: scaleWidth(20),
  },
  title: {
    color: Colors.COLOR_535858,
    fontSize: Value.CONSTANT_VALUE_23,
    fontFamily: Fonts.OpenSansBold,
    textAlign: Alignment.CENTER,
    paddingTop: px(20),
    paddingBottom: px(30),
  },
  h2: {
    color: Colors.COLOR_535858,
    fontSize: Value.CONSTANT_VALUE_15,
    fontFamily: Fonts.OpenSansBold,
    textAlign: Alignment.LEFT,
    paddingTop: px(12),
    paddingBottom: px(5),
    flex: 1,
    width: '100%',
    paddingHorizontal: px(50),
  },
  hasTwo: {
    color: Colors.COLOR_535858,
    fontSize: Value.CONSTANT_VALUE_23,
    alignSelf: Alignment.CENTER,
    fontFamily: Fonts.OpenSansRegular,
    textAlign: Alignment.CENTER,
    paddingTop: px(13),
    paddingHorizontal: px(35),
  },
  hasTwoText: {
    color: Colors.COLOR_535858,
    fontSize: Value.CONSTANT_VALUE_20,
    alignSelf: Alignment.CENTER,
    fontFamily: Fonts.OpenSansRegular,
    textAlign: Alignment.CENTER,
    paddingTop: px(13),
    paddingHorizontal: px(50),
    lineHeight: Value.CONSTANT_VALUE_28,
  },
  paragraph: {
    fontSize: Value.CONSTANT_VALUE_15,
    color: Colors.COLOR_535858,
    fontFamily: Fonts.OpenSansRegular,
    textAlign: Alignment.LEFT,
    paddingHorizontal: px(50),
  },
  hasThree: {
    color: Colors.COLOR_535858,
    fontSize: Value.CONSTANT_VALUE_23,
    alignSelf: Alignment.CENTER,
    fontFamily: Fonts.OpenSansRegular,
    textAlign: Alignment.CENTER,
    paddingBottom: px(32),
    paddingHorizontal: px(30),
  },
  btnContainer: {
    width: px(236),
    backgroundColor: Colors.GREEN,
    borderRadius: scaleWidth(40),
    height: scaleHeight(80),
    justifyContent: Alignment.CENTER,
    alignSelf: Alignment.CENTER,
    marginBottom: scaleHeight(50),
    marginTop: scaleHeight(30),
  },
  btnText: {
    textAlign: Alignment.CENTER,
    color: Colors.COLOR_535858,
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 1.8,
  },
  scrollContainer: {flex: 1, alignItems: Alignment.CENTER},
  logo: {
    width: scaleWidth(Value.CONSTANT_VALUE_120),
    height: scaleHeight(Value.CONSTANT_VALUE_95),
    resizeMode: Alignment.CONTAIN,
    flex: Value.CONSTANT_VALUE_0,
    marginTop: Value.CONSTANT_VALUE_20,
    marginLeft: dynamicSize(101),
  },
};
