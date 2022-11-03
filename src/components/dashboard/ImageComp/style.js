import Colors from '../../../constants/Colors';
import {Value} from '../../../constants/FixedValues';
import Alignment from '../../../constants/Alignment';
import {dynamicSize} from '../../../utils/responsive';
import {Fonts} from '../../../constants/Constants';

export default {
  upperContainer: {
    alignItems: Alignment.CENTER,
    bottom: Value.CONSTANT_VALUE_20,
    right: Value.CONSTANT_VALUE_15,
  },
  mainContainer: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  bgImage: {
    height: dynamicSize(Value.CONSTANT_VALUE_400),
    width: dynamicSize(Value.CONSTANT_VALUE_248),
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    // backgroundColor: 'red',
    shadowOffset: {width: -2, height: 9},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  iconContainer: {
    flex: 0.88,
    justifyContent: Alignment.FLEXEND,
    alignItems: Alignment.CENTER,
  },
  iconImage: {
    marginBottom: dynamicSize(Value.CONSTANT_VALUE_50),
    justifyContent: Alignment.CENTER,
  },
  imageStyle: {
    borderRadius: Value.CONSTANT_VALUE_20,
  },
  innerContainer: {
    flexDirection: Alignment.ROW,
  },
  mapIcon: {
    left: Value.CONSTANT_VALUE_3,
  },
  locationText: {
    fontSize: Value.CONSTANT_VALUE_11,
    paddingLeft: dynamicSize(Value.CONSTANT_VALUE_10),
    paddingBottom: dynamicSize(Value.CONSTANT_VALUE_5),
    letterSpacing: 2.84,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.WHITE,
  },
  codeText: {
    fontSize: Value.CONSTANT_VALUE_32,
    color: Colors.WHITE,
    Fonts: Fonts.OpenSansRegular,
  },
  donerAge: {
    fontSize: Value.CONSTANT_VALUE_11,
    color: Colors.WHITE,
    fontFamily: Fonts.OpenSansBold,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_12),
  },
  textInnerContainer: {
    justifyContent: Alignment.FLEXEND,
    alignItems: Alignment.CENTER,
  },
  linearGradient: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
    width: dynamicSize(Value.CONSTANT_VALUE_248),
    height: dynamicSize(Value.CONSTANT_VALUE_400),
    borderRadius: Value.CONSTANT_VALUE_20,
    justifyContent: Alignment.CENTER,
  },
};
