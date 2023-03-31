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
    marginBottom: scaleHeight(40),
  },
  text: {
    padding: Value.CONSTANT_VALUE_5,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.COLOR_535858,
    width: px(156),
    paddingLeft: scaleWidth(10),
    marginLeft: scaleWidth(15),
  },
  title: {
    color: Colors.COLOR_535858,
    fontSize: Value.CONSTANT_VALUE_23,
    fontFamily: Fonts.OpenSansBold,
    textAlign: Alignment.CENTER,
    alignSelf: Alignment.CENTER,
    paddingTop: px(32),
    paddingBottom: px(32),
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
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: scaleHeight(25),
    marginTop: scaleHeight(54),
  },
  btnText: {
    textAlign: 'center',
    color: Colors.COLOR_535858,
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 1.8,
  },

  logo: {
    width: scaleWidth(Value.CONSTANT_VALUE_120),
    height: scaleHeight(Value.CONSTANT_VALUE_95),
    resizeMode: Alignment.CONTAIN,
    flex: Value.CONSTANT_VALUE_0,
    marginTop: Value.CONSTANT_VALUE_20,
    marginLeft: dynamicSize(100)
  },
};
