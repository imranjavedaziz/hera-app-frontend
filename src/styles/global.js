import Colors from '../constants/Colors';
import {Value} from '../constants/FixedValues';
import Alignment from '../constants/Alignment';
import {normalizeFont, dynamicSize, scaleWidth,scaleHeight} from '../utils/responsive';
import { Fonts } from '../constants/Constants';

export default {
  screenTitle: {
    textTransform: 'uppercase',
    letterSpacing: Value.CONSTANT_VALUE_2,
    fontWeight: '600',
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    textAlign: 'center'
  },
  screenSubTitle: {
    fontSize: Value.CONSTANT_VALUE_22,
    lineHeight: Value.CONSTANT_VALUE_30,
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
  safeViewStyle: {flex: dynamicSize(Value.CONSTANT_VALUE_1), backgroundColor: Colors.BACKGROUND},
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
    paddingTop: dynamicSize(Value.CONSTANT_VALUE_5),},
  modalColor: {backgroundColor: '#494947'},
  safeViewStyle: {flex: 1, backgroundColor: Colors.BACKGROUND},
  wrapperStyle: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  basicSheetContainer: {
    width: '100%',
    paddingHorizontal: 20,
    height:274,

  },
  formBtn: {
    paddingVertical: 22,
    borderBottomWidth: 2,
    borderBottomColor: Colors.BORDER_LINE,
    width:300, 
    
  },
  formText: {
    fontSize: 16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
    marginBottom:10
  },
  heraBtn: {
    paddingVertical: 22,
    borderBottomWidth: 2,
    borderBottomColor: Colors.BORDER_LINE,
    width:300, 
  },
  heraText: {
    fontSize: 16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
    marginBottom:5,
    paddingTop:5
  },
  logoutBtn: {
    paddingVertical: 22,
    borderBottomColor: Colors.BORDER_LINE,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.RED,
    marginBottom:5,
    paddingTop:5
  },
};
