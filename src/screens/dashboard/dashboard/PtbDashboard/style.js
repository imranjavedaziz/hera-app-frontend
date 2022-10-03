import Alignment from '../../../../constants/Alignment';
import {
  dynamicSize,
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../../../../utils/responsive';
import {Value} from '../../../../constants/FixedValues';
import {Fonts} from '../../../../constants/Constants';

export default {
  mainContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
    paddingTop:dynamicSize(Value.CONSTANT_VALUE_20),
  },
  innerContainer: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.SPACE_BETWEEN,
    alignItems: Alignment.CENTER,
    paddingHorizontal: dynamicSize(Value.CONSTANT_VALUE_50),
    paddingVertical:20,

  },
  iconContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_FRAC88),
    justifyContent: Alignment.FLEXEND,
    alignItems: Alignment.CENTER,
  },
  iconImage: {
    justifyContent: Alignment.CENTER,
  },
  mainImageContainer: {alignItems: Alignment.CENTER, flex:1, right:180},
  ImageSize: {
    height: scaleHeight(467),
    width: scaleWidth(Value.CONSTANT_VALUE_348),

  },
  emptyCardContainer: {
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    marginTop: 263,
  },
  sryText: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_23),
    textAlign: Alignment.CENTER,
    fontWeight: 'bold',
    fontFamily: Fonts.OpenSansBold,
  },
  innerText: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_23),
    textAlign: Alignment.CENTER,
    fontWeight: 'bold',
    fontFamily: Fonts.OpenSansBold,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_5),
  },
  innerText2: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_16),
    textAlign: Alignment.CENTER,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_12),
    fontFamily: Fonts.OpenSansRegular,
  },
  headerIcon: {
    paddingTop: Value.CONSTANT_VALUE_5,
  },
  likeButton: {
    height: scaleWidth(Value.CONSTANT_VALUE_98),
    width: scaleWidth(Value.CONSTANT_VALUE_98),
  },
  dislikeButton: {
    height: scaleWidth(Value.CONSTANT_VALUE_98),
    width: scaleWidth(Value.CONSTANT_VALUE_98),
  },
};
