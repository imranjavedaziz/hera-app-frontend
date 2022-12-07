import Alignment from '../../../constants/Alignment';
import Colors from '../../../constants/Colors';
import {Fonts} from '../../../constants/Constants';
import {Value} from '../../../constants/FixedValues';
import {
  dynamicSize,
  height,
  normalizeFont,
  scaleHeight,
  scaleWidth,
  width,
} from '../../../utils/responsive';
export default {
  mainContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
    marginHorizontal: dynamicSize(Value.CONSTANT_VALUE_30),
    marginTop: dynamicSize(Value.CONSTANT_VALUE_118),
  },
  flex: {flex: 1, backgroundColor: Colors.BACKGROUND},
  bioContainer: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_17),
  },
  video: {
    overflow: Alignment.HIDDEN,
    width: scaleWidth(Value.CONSTANT_VALUE_318),
    height: Value.CONSTANT_VALUE_199,
    marginTop: Value.CONSTANT_VALUE_3,
  },
  innerContainer: {},
  headerIcon: {
    paddingTop: dynamicSize(Value.CONSTANT_VALUE_45),
    marginLeft: Value.CONSTANT_VALUE_30,
  },
  nativeMainContainer: {
    flexDirection: Alignment.ROW,
  },
  nativeLong: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.FLEX_START,
  },
  playIcon: {
    position: Alignment.ABSOLUTE,
    alignSelf: Alignment.CENTER,
    top: 180 / 2,
  },
  nativePlace: {
    backgroundColor: Colors.RGBA_229_172_177,
    justifyContent: Alignment.CENTER,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_15),
  },
  fatherPlace: {
    backgroundColor: Colors.RGBA_229_172_177,
    justifyContent: Alignment.CENTER,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_15),
    marginLeft: dynamicSize(Value.CONSTANT_VALUE_8),
  },
  hairContainer: {
    flexDirection: Alignment.ROW,
  },
  motherPlace: {
    backgroundColor: Colors.RGBA_229_172_177,
    justifyContent: Alignment.CENTER,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_8),
  },
  hairColor: {
    backgroundColor: Colors.RGBA_229_172_177,
    justifyContent: Alignment.CENTER,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_8),
    marginLeft: dynamicSize(Value.CONSTANT_VALUE_8),
  },
  eyeColorContainer: {
    backgroundColor: Colors.RGBA_229_172_177,
    justifyContent: Alignment.CENTER,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_8),
    width: Value.CONSTANT_VALUE_120,
  },
  eyeColorText: {
    paddingVertical: Value.CONSTANT_VALUE_5,
    paddingHorizontal: Value.CONSTANT_VALUE_5,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  imageDemo1: {
    marginLeft: dynamicSize(Value.CONSTANT_VALUE_30),
    marginTop: dynamicSize(Value.CONSTANT_VALUE_45),
  },
  imageDemo2: {
    justifyContent: Alignment.CENTER,
    backgroundColor: Colors.VDOCONTAINER,
    marginTop: Value.CONSTANT_VALUE_15,
  },
  Description: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_53),
    fontSize: normalizeFont(Value.CONSTANT_VALUE_20),
    fontFamily: Fonts.OpenSansLight,
    color: Colors.BLACK,
  },
  backgroundImage: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_16),
    height: scaleHeight(Value.CONSTANT_VALUE_70),
    width: scaleWidth(Value.CONSTANT_VALUE_70),
  },
  middleText: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_38),
    fontSize: normalizeFont(Value.CONSTANT_VALUE_14),
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
  btn: color => ({
    borderRadius: dynamicSize(Value.CONSTANT_VALUE_40),
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    borderColor: color,
    borderWidth: dynamicSize(Value.CONSTANT_VALUE_1),
    backgroundColor: Colors.BACKGROUND,
    height: Value.CONSTANT_VALUE_80,
    width: Value.CONSTANT_VALUE_296,
    alignSelf: Alignment.CENTER,
  }),
  textbtn1: {
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: Value.CONSTANT_VALUE_FRAC3_62,
    color: Colors.BLACK,
  },
  textbtn2: {
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: Value.CONSTANT_VALUE_FRAC3_62,
    color: Colors.BLACK,
    marginLeft: 12,
    alignItems: Alignment.CENTER,
  },
  heartIconContainer: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_50),
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  imageMainContainer: {
    flexDirection: Alignment.ROW,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_45),
  },
  imageInnerContainer: {
    flexDirection: Alignment.ROW,
  },
  imageBox: {
    borderWidth: Value.CONSTANT_VALUE_1,
    borderColor: Colors.BACKGROUND,
    height: Value.CONSTANT_VALUE_110,
    width: Value.CONSTANT_VALUE_110,
  },
  heartIcon: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    width: scaleWidth(Value.CONSTANT_VALUE_211),
    justifyContent: Alignment.SPACE_BETWEEN,
  },
  crossIconContainer: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_15),
    marginBottom: dynamicSize(Value.CONSTANT_VALUE_70),
  },
  crossIcon: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    width: scaleWidth(Value.CONSTANT_VALUE_211),
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
  imagePlaceholder: {
    backgroundColor: '#E2E1D8',
  },
  dateText: {
    fontFamily: Fonts.OpenSansLightItalic,
    fontSize: Value.CONSTANT_VALUE_15,
    color: Colors.BLACK,
    marginLeft: 7,
  },
  dateTextView: {flexDirection: Alignment.ROW, marginTop: 51},
};
