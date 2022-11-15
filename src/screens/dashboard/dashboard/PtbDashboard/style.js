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
    paddingTop: Value.CONSTANT_VALUE_40,
  },
  innerContainer: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.SPACE_BETWEEN,
    alignItems: Alignment.CENTER,
    paddingHorizontal: dynamicSize(50),
    paddingVertical: Value.CONSTANT_VALUE_12,
    marginTop: Value.CONSTANT_VALUE_10,
  },
  iosInnerContainer: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    paddingHorizontal: dynamicSize(10),
  },
  iconContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_FRAC88),
    justifyContent: Alignment.FLEXEND,
    alignItems: Alignment.CENTER,
  },
  iconImage: {
    justifyContent: Alignment.CENTER,
  },
  mainImageContainer: {alignItems: Alignment.CENTER, justifyContent: 'center'},
  ImageSize: {
    height: scaleHeight(445),
    width: scaleWidth(340),
  },
  emptyCardContainer: {
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_263,
  },
  sryText: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_23),
    textAlign: Alignment.CENTER,
    fontFamily: Fonts.OpenSansBold,
  },
  innerText: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_23),
    textAlign: Alignment.CENTER,
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
    height: scaleWidth(Value.CONSTANT_VALUE_130),
    width: scaleWidth(Value.CONSTANT_VALUE_125),
    right: 5,
  },
  dislikeButton: {
    height: scaleWidth(Value.CONSTANT_VALUE_130),
    width: scaleWidth(Value.CONSTANT_VALUE_125),
    left: 5,
  },
};
