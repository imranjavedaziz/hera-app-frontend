import Colors from '../../../constants/Colors';
import {Value} from '../../../constants/FixedValues';
import Alignment from '../../../constants/Alignment';
import {dynamicSize, normalizeFont} from '../../../utils/responsive';
import {Fonts} from '../../../constants/Constants';

export default {
  mainContainer: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    bottom: dynamicSize(Value.CONSTANT_VALUE_30),
    right: dynamicSize(Value.CONSTANT_VALUE_15),
    shadowColor: 'rgba(0, 0, 0, 0.09)',
    shadowOffset: {
      width: Value.CONSTANT_VALUE_0,
      height: Value.CONSTANT_VALUE_10,
    },
    shadowRadius: Value.CONSTANT_VALUE_18,
    shadowOpacity: 0.5,
    elevation: Value.CONSTANT_VALUE_5,
  },
  bgImage: {
    height: Value.CONSTANT_VALUE_395,
    width: dynamicSize(Value.CONSTANT_VALUE_250),
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  iconContainer: {
    flex: Value.CONSTANT_VALUE_FRAC88,
    justifyContent: Alignment.FLEXEND,
    alignItems: Alignment.CENTER,
  },
  iconImage: {
    marginBottom: dynamicSize(Value.CONSTANT_VALUE_50),
    justifyContent: Alignment.CENTER,
  },
  imageStyle: {
    borderRadius: dynamicSize(Value.CONSTANT_VALUE_20),
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
    paddingBottom: dynamicSize(Value.CONSTANT_VALUE_2),
    letterSpacing: Value.CONSTANT_VALUE_2_84,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.WHITE,
  },
  codeText: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_32),
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
    width: dynamicSize(Value.CONSTANT_VALUE_250),
    height: dynamicSize(Value.CONSTANT_VALUE_395),
    borderRadius: dynamicSize(Value.CONSTANT_VALUE_20),
    justifyContent: Alignment.CENTER,
  },
};
