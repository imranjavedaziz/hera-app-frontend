import Alignment from '../../../../constants/Alignment';
import {
  dynamicSize,
  normalizeFont,
  scaleHeight,
  scaleWidth,
  statusHide,
} from '../../../../utils/responsive';
import {Value} from '../../../../constants/FixedValues';
import {Fonts} from '../../../../constants/Constants';
import {Colors} from '../../../../constants';

export default {
  mainContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
    marginTop: statusHide(105),
  },
  innerContainer: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.SPACE_BETWEEN,
    alignItems: Alignment.CENTER,
  },
  iconContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_FRAC88),
    justifyContent: Alignment.FLEXEND,
    alignItems: Alignment.CENTER,
  },
  iconImage: {
    justifyContent: Alignment.CENTER,
  },
  mainImageContainer: {
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    bottom: Value.CONSTANT_VALUE_40,
  },
  ImageSize: {
    height: scaleHeight(450),
    width: scaleWidth(310),
  },
  emptyCardContainer: {
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  sryText: {
    textAlign: Alignment.CENTER,
  },
  innerText: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_23),
    textAlign: Alignment.CENTER,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_5),
  },
  innerText2: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_16),
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_5),
    fontFamily: Fonts.OpenSansRegular,
    marginHorizontal: Value.CONSTANT_VALUE_40,
  },
  likeButton: {
    height: scaleWidth(Value.CONSTANT_VALUE_130),
    width: scaleWidth(Value.CONSTANT_VALUE_125),
    right: Value.CONSTANT_VALUE_5,
  },
  dislikeButton: {
    height: scaleWidth(Value.CONSTANT_VALUE_130),
    width: scaleWidth(Value.CONSTANT_VALUE_125),
    left: Value.CONSTANT_VALUE_5,
  },
};
