import Colors from '../constants/Colors';
import {Value} from '../constants/FixedValues';
import Alignment from '../constants/Alignment';
import {
  normalizeFont,
  dynamicSize,
  scaleWidth,
  scaleHeight,
  width,
} from '../utils/responsive';
import {Fonts} from '../constants/Constants';

export default {
  screenTitle: {
    textTransform: 'uppercase',
    letterSpacing: Value.CONSTANT_VALUE_2_84,
    fontWeight: '600',
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    textAlign: 'center',
    fontSize: Value.CONSTANT_VALUE_11,
    marginBottom: Value.CONSTANT_VALUE_8,
  },
  screenSubTitle: {
    fontSize: Value.CONSTANT_VALUE_23,
    lineHeight: Value.CONSTANT_VALUE_32,
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
  },
  mainContainer: {
    flex: 1,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.FLEX_START,
  },
  underlineText: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_18),
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  modalColor: {backgroundColor: Colors.LIGHT_BLACK47},
  lineStyle: {width: scaleWidth(20), backgroundColor: Colors.LIGHT_BLACK47},
  safeViewStyle: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
    backgroundColor: Colors.BACKGROUND,
  },
  wrapperStyle: {
    borderTopLeftRadius: dynamicSize(Value.CONSTANT_VALUE_0),
    borderTopRightRadius: dynamicSize(Value.CONSTANT_VALUE_0),
  },
  basicSheetContainer: {
    paddingHorizontal: scaleWidth(20),
    height: scaleHeight(274),
  },
  formBtn: {
    paddingVertical: dynamicSize(Value.CONSTANT_VALUE_22),
    borderBottomWidth: dynamicSize(Value.CONSTANT_VALUE_2),
    borderBottomColor: Colors.BORDER_LINE,
    width: scaleWidth(300),
  },
  formText: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_16),
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
    marginBottom: dynamicSize(Value.CONSTANT_VALUE_10),
  },
  heraBtn: {
    paddingVertical: dynamicSize(Value.CONSTANT_VALUE_22),
    borderBottomWidth: dynamicSize(Value.CONSTANT_VALUE_2),
    borderBottomColor: Colors.BORDER_LINE,
    width: scaleWidth(300),
  },
  heraText: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_16),
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
    marginBottom: dynamicSize(Value.CONSTANT_VALUE_5),
    paddingTop: dynamicSize(Value.CONSTANT_VALUE_5),
  },
  logoutBtn: {
    paddingVertical: dynamicSize(Value.CONSTANT_VALUE_22),
    borderBottomColor: Colors.BORDER_LINE,
  },
  logoutText: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_16),
    fontFamily: Fonts.OpenSansBold,
    color: Colors.RED,
    marginBottom: dynamicSize(Value.CONSTANT_VALUE_5),
    paddingTop: dynamicSize(Value.CONSTANT_VALUE_5),
  },
  headerIcon: {
    paddingTop: Value.CONSTANT_VALUE_5,
    paddingHorizontal: Value.CONSTANT_VALUE_30,
  },
  profileImgContainner: {
    borderWidth: Value.CONSTANT_VALUE_3,
    borderColor: Colors.GREEN,
    borderRadius: Value.CONSTANT_VALUE_40,
    marginBottom: Value.CONSTANT_VALUE_15,
  },
  profileImg: {
    width: Value.CONSTANT_VALUE_40,
    height: Value.CONSTANT_VALUE_40,
    borderRadius: Value.CONSTANT_VALUE_20,
    borderWidth: Value.CONSTANT_VALUE_2,
    borderColor: Colors.WHITE,
  },
  dynamicMarginTop: value => ({
    marginTop: scaleHeight(value),
  }),
  dynamicMarginBottom: value => ({
    marginBottom: scaleHeight(value),
  }),
  dynamicMarginHorizontal: value => ({
    marginHorizontal: scaleWidth(value),
  }),
  dynamicMarginRight: value => ({
    marginRight: scaleWidth(value),
  }),
  dynamicMarginLeft: value => ({
    marginLeft: scaleWidth(value),
  }),
  tagText: {
    padding: Value.CONSTANT_VALUE_5,
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansRegular,
    // width: width / 2,
  },
};
