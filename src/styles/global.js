import {Colors, Alignment} from '../constants';
import {Value} from '../constants/FixedValues';
import {
  normalizeFont,
  dynamicSize,
  scaleWidth,
  scaleHeight,
} from '../utils/responsive';
import {Fonts} from '../constants/Constants';

export default {
  screenTitle: {
    textTransform: 'uppercase',
    letterSpacing: Value.CONSTANT_VALUE_2_84,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    textAlign: 'center',
    fontSize: Value.CONSTANT_VALUE_11,
    marginBottom: Value.CONSTANT_VALUE_8,
  },
  screenSubTitle: {
    fontSize: Value.CONSTANT_VALUE_23,
    lineHeight: Value.CONSTANT_VALUE_32,
    textAlign: 'center',
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
  },
  mainContainer: {
    flex: Value.CONSTANT_VALUE_1,
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
    paddingVertical: Value.CONSTANT_VALUE_5,
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansRegular,
    paddingHorizontal: Value.CONSTANT_VALUE_5,
    color: Colors.BLACK_0,
    lineHeight: 21,
  },
  modal: {
    flex: Value.CONSTANT_VALUE_1,
  },
  bottomSheet: {
    borderRadius: Value.CONSTANT_VALUE_0,
  },
  outerContentStyle: {
    borderRadius: Value.CONSTANT_VALUE_0,
    borderTopLeftRadius: Value.CONSTANT_VALUE_0,
    borderTopRightRadius: Value.CONSTANT_VALUE_0,
  },
  innerContentStyle: {
    borderRadius: Value.CONSTANT_VALUE_0,
    borderTopLeftRadius: Value.CONSTANT_VALUE_0,
    borderTopRightRadius: Value.CONSTANT_VALUE_0,
  },

  //EDIT ATTRIBUTE
  modalView: {
    height: Value.CONSTANT_VALUE_230,
    width: Value.CONSTANT_VALUE_283,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Value.CONSTANT_VALUE_23,
    paddingVertical: Value.CONSTANT_VALUE_20,
    alignItems: Alignment.CENTER,
  },
  modalHeader: {
    lineHeight: Value.CONSTANT_VALUE_21,
    fontWeight: Alignment.BOLD,
    fontFamily: Fonts.OpenSansRegular,
    paddingBottom: Value.CONSTANT_VALUE_5,
    fontSize: Value.CONSTANT_VALUE_16,
    color: Colors.BLACK,
  },
  modalSubHeader: {
    textAlign: Alignment.CENTER,
    lineHeight: Value.CONSTANT_VALUE_18,
    marginTop: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_13,
    color: Colors.BLACK,
  },
  modalOption1: {
    color: Colors.RED,
    fontSize: Value.CONSTANT_VALUE_16,
    paddingBottom: Value.CONSTANT_VALUE_10,
    marginVertical: Value.CONSTANT_VALUE_27,
    letterSpacing: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansBold,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    width: Value.CONSTANT_VALUE_234,
    textAlign: Alignment.CENTER,
  },
  modalOption2: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontWeight: Alignment.BOLD,
    letterSpacing: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansBold,
  },
  centeredView: {
    flex: Value.CONSTANT_VALUE_1,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cancelbtn: {
    justifyContent: Alignment.FLEXEND,
    alignItems: Alignment.FLEXEND,
    marginRight: Value.CONSTANT_VALUE_30,
  },
  cancelAndroidbtn: {
    justifyContent: Alignment.FLEXEND,
    alignItems: Alignment.FLEXEND,
    marginRight: Value.CONSTANT_VALUE_30,
  },
  clearView: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  clearText: {
    fontFamily: Fonts.OpenSansBold,
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: 16,
    letterSpacing: 0,
    color: 'rgb(255,69,68)',
    height: 22,
  },
};
