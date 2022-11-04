import Alignment from '../../../constants/Alignment';
import Colors from '../../../constants/Colors';
import {Fonts} from '../../../constants/Constants';
import {Value} from '../../../constants/FixedValues';
import {
  dynamicSize,
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../../../utils/responsive';

export default {
  mainContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
    paddingHorizontal: dynamicSize(Value.CONSTANT_VALUE_30),
    marginTop: dynamicSize(Value.CONSTANT_VALUE_29),
  },
  bioContainer: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_25),
  },
  headerIcon: {
    paddingTop: Value.CONSTANT_VALUE_5,
    paddingHorizontal: Value.CONSTANT_VALUE_25,
  },
  nativeMainContainer: {
    flexDirection: Alignment.ROW,
  },
  nativePlace: {
    backgroundColor: Colors.RGBA_229_172_177,
    width: scaleWidth(Value.CONSTANT_VALUE_120),
    justifyContent: Alignment.CENTER,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_15),
  },
  nativeText: {
    paddingVertical: Value.CONSTANT_VALUE_5,
    paddingHorizontal: Value.CONSTANT_VALUE_5,
    textAlign: Alignment.CENTER,
  },
  fatherPlace: {
    backgroundColor: Colors.RGBA_229_172_177,
    width: scaleWidth(Value.CONSTANT_VALUE_180),
    justifyContent: Alignment.CENTER,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_15),
    marginLeft: dynamicSize(Value.CONSTANT_VALUE_8),
  },
  fatherPlaceText: {
    paddingVertical: Value.CONSTANT_VALUE_5,
    paddingHorizontal: Value.CONSTANT_VALUE_5,
    textAlign: Alignment.CENTER,
  },
  hairContainer: {
    flexDirection: Alignment.ROW,
  },
  motherPlace: {
    backgroundColor: Colors.RGBA_229_172_177,
    width: scaleWidth(Value.CONSTANT_VALUE_185),
    justifyContent: Alignment.CENTER,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_15),
  },
  motherPlaceText: {
    paddingVertical: Value.CONSTANT_VALUE_5,
    paddingHorizontal: Value.CONSTANT_VALUE_5,
    textAlign: Alignment.CENTER,
  },
  hairColor: {
    backgroundColor: Colors.RGBA_229_172_177,
    width: scaleWidth(Value.CONSTANT_VALUE_117),
    justifyContent: Alignment.CENTER,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_15),
    marginLeft: dynamicSize(Value.CONSTANT_VALUE_8),
  },
  hairColorText: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    textAlign: Alignment.CENTER,
  },
  eyeColorContainer: {
    backgroundColor: Colors.RGBA_229_172_177,
    width: scaleWidth(Value.CONSTANT_VALUE_117),
    justifyContent: Alignment.CENTER,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_15),
  },
  eyeColorText: {
    paddingVertical: Value.CONSTANT_VALUE_5,
    paddingHorizontal: Value.CONSTANT_VALUE_5,
    textAlign: Alignment.CENTER,
  },
  imageDemo1: {
    marginLeft: dynamicSize(Value.CONSTANT_VALUE_30),
    marginTop: dynamicSize(Value.CONSTANT_VALUE_45),
  },
  imageDemo2: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_15),
    width: scaleWidth(Value.CONSTANT_VALUE_318),
    height: 199,
  },
  Description: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_53),
    fontSize: normalizeFont(Value.CONSTANT_VALUE_20),
    fontFamily: Fonts.OpenSansLight,
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
  },
  btn: {
    paddingHorizontal: dynamicSize(Value.CONSTANT_VALUE_60),
    paddingVertical: dynamicSize(Value.CONSTANT_VALUE_30),
    borderRadius: dynamicSize(Value.CONSTANT_VALUE_40),
    minWidth: Value.CONSTANT_VALUE_100,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    flex: dynamicSize(Value.CONSTANT_VALUE_0),
    borderColor: Colors.GREEN,
    borderWidth: dynamicSize(Value.CONSTANT_VALUE_1),
    backgroundColor: Colors.BACKGROUND,
  },
  btn2: {
    paddingHorizontal: dynamicSize(Value.CONSTANT_VALUE_60),
    paddingVertical: dynamicSize(Value.CONSTANT_VALUE_30),
    borderRadius: dynamicSize(Value.CONSTANT_VALUE_40),
    minWidth: Value.CONSTANT_VALUE_100,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    flex: dynamicSize(Value.CONSTANT_VALUE_0),
    borderColor: Colors.RED,
    borderWidth: dynamicSize(Value.CONSTANT_VALUE_1),
    backgroundColor: Colors.BACKGROUND,
  },
  textbtn1: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_14),
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 3.62,
  },
  heartIconContainer: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_50),
  },
  imageMainContainer: {
    flexDirection: Alignment.ROW,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_50),
  },
  imageInnerContainer: {
    flexDirection: Alignment.ROW,
  },
  imageBox: {
    height: scaleHeight(Value.CONSTANT_VALUE_117),
    width: scaleWidth(Value.CONSTANT_VALUE_105),
  },
  heartIcon: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    width: scaleWidth(Value.CONSTANT_VALUE_211),
    justifyContent: Alignment.SPACE_BETWEEN,
  },
  crossIconContainer: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_15),
    marginBottom: dynamicSize(Value.CONSTANT_VALUE_15),
  },
  crossIcon: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    width: scaleWidth(Value.CONSTANT_VALUE_211),
    justifyContent: Alignment.SPACE_BETWEEN,
  },
};
