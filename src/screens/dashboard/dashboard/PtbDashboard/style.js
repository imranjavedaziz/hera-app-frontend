import Alignment from '../../../../constants/Alignment';
import {
  dynamicSize,
  height,
  normalizeFont,
  px,
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
  buttoncontainer: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_35),
    alignItems: Alignment.CENTER,
    paddingBottom: Value.CONSTANT_VALUE_89,
  },
  button: {
    justifyContent: Alignment.CENTER,
    width: dynamicSize(Value.CONSTANT_VALUE_144),
    height: dynamicSize(Value.CONSTANT_VALUE_59),
    borderRadius: Value.CONSTANT_VALUE_40,
    backgroundColor: Colors.GREEN,
    alignItems: Alignment.CENTER,
  },
  buttonText: {
    fontSize: Value.CONSTANT_VALUE_13,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 1.67,
    textAlign: Alignment.CENTER,
  },
  innerContainer: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.SPACE_BETWEEN,
    alignItems: Alignment.CENTER,
    paddingVertical: Value.CONSTANT_VALUE_12,
    marginTop: Value.CONSTANT_VALUE_10,
  },
  iosInnerContainer: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    bottom: px(25),
  },
  androidInnerContainer: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    paddingHorizontal: dynamicSize(10),
    bottom: px(48),
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
  disableing: {
    backgroundColor: Colors.CLEAR,
    width: '100%',
    height: '100%',
    position: Alignment.ABSOLUTE,
  },
};
