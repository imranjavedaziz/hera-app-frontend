import Alignment from '../../../../constants/Alignment';
import {
  dynamicSize,
  height,
  normalizeFont,
  px,
  scaleHeight,
  scaleWidth,
} from '../../../../utils/responsive';
import {Value} from '../../../../constants/FixedValues';
import {Fonts} from '../../../../constants/Constants';
import {Colors} from '../../../../constants';
export default {
  mainContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
    paddingTop: dynamicSize(Value.CONSTANT_VALUE_40),
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
  androidInnerContainer: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    paddingHorizontal: dynamicSize(10),
    marginTop: px(Value.CONSTANT_VALUE_10),
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
    bottom: Value.CONSTANT_VALUE_2_34,
  },
  ImageSize: {
    height: scaleHeight(445),
    width: scaleWidth(340),
  },
  emptyCardContainer: {
    marginTop: Value.CONSTANT_VALUE_263,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  sryText: {
    textAlign: Alignment.CENTER,
    fontSize: normalizeFont(Value.CONSTANT_VALUE_23),
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
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
  },
  headerIcon: {
    marginTop: 13,
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
  loaderContainer: {
    position: Alignment.ABSOLUTE,
    top: height / 2.5,
    alignSelf: Alignment.CENTER,
    width: Value.CONSTANT_VALUE_50,
    height: Value.CONSTANT_VALUE_50,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    borderRadius: Value.CONSTANT_VALUE_35,
    backgroundColor: Colors.WHITE,
    zIndex: Value.CONSTANT_VALUE_999999,
  },
};
