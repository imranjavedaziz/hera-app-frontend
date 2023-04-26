import {dynamicSize, px, scaleHeight, scaleWidth} from '../../utils/responsive';
import {Value} from '../../constants/FixedValues';
import {Alignment, Colors} from '../../constants';
import {Fonts} from '../../constants/Constants';

export default {
  mainContainer: {
    paddingHorizontal: dynamicSize(Value.CONSTANT_VALUE_45),
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
  paraOne: {
    color: Colors.BLACK,
    fontSize: Value.CONSTANT_VALUE_16,
    // alignSelf: Alignment.CENTER,
    fontFamily: Fonts.OpenSansRegular,
    // textAlign: Alignment.CENTER,
    // paddingTop: px(13),
    // paddingHorizontal: px(35),
  },
  history: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
    color: Colors.BLACK,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_20),
  },
  paraTwo: {
    color: Colors.BLACK,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansRegular,
  },
  innerContainer: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_16,),
  },
  rowContainer: {
    flexDirection: Alignment.ROW,
  },
  star: {
    color: Colors.RED,
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
    width: scaleWidth(Value.CONSTANT_VALUE_146),
    height: scaleHeight(Value.CONSTANT_VALUE_113),
    resizeMode: Alignment.CENTER,
    flex: Value.CONSTANT_VALUE_0,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_50),
    marginLeft: dynamicSize(50),
  },
};
