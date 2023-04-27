import {Alignment, Colors} from '../../../../constants';
import {Fonts} from '../../../../constants/Constants';
import {Value} from '../../../../constants/FixedValues';
import {
  dynamicSize,
  px,
  scaleHeight,
  scaleWidth,
  statusHide,
} from '../../../../utils/responsive';

export default {
  flex: {flex: Value.CONSTANT_VALUE_1, backgroundColor: Colors.BACKGROUND},
  headerIcon: {
    paddingHorizontal: Value.CONSTANT_VALUE_5,
  },
  container: {
    flex: 1,
    marginTop: statusHide(Value.CONSTANT_VALUE_105),
  },
  heraPay: {
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 2.84,
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_11,
  },
  sendPay: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_23,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_8),
  },
  btnContainer: {
    width: px(Value.CONSTANT_VALUE_306),
    backgroundColor: Colors.GREEN,
    borderRadius: scaleWidth(Value.CONSTANT_VALUE_40),
    height: scaleHeight(Value.CONSTANT_VALUE_80),
    justifyContent: Alignment.CENTER,
    alignSelf: Alignment.CENTER,
    marginBottom: scaleHeight(Value.CONSTANT_VALUE_25),
    marginTop: scaleHeight(Value.CONSTANT_VALUE_34),
  },
  btnText: {
    textAlign: Alignment.CENTER,
    color: Colors.COLOR_535858,
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 1.8,
  },
  paymentReqContainer: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_20),
  },
  historyContainer: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_25),
  },
  cerditCardContainer: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_30),
  },
  cardsContainer: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.SPACE_BETWEEN,
  },
  cardsInner: {
    marginRight: dynamicSize(Value.CONSTANT_VALUE_89),
  },
  cardNo: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
    lineHeight: Value.CONSTANT_VALUE_21,
    color: Colors.BLACK,
  },
  cardTime: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_13,
    lineHeight: Value.CONSTANT_VALUE_21,
    color: Colors.BLACK,
  },
  cardsTwoContainer: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.SPACE_BETWEEN,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_40),
  },
  addCardContainer: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_25),
    marginBottom: dynamicSize(Value.CONSTANT_VALUE_95),
    flexDirection: Alignment.ROW,
  },
  addBankContainer: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_6),
    marginLeft: dynamicSize(Value.CONSTANT_VALUE_6),
    flexDirection: Alignment.ROW,
  },
  plus:{
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_14,
    lineHeight: Value.CONSTANT_VALUE_21,
    color: Colors.BLACK,
  },
  addCardTxt: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_14,
    lineHeight: Value.CONSTANT_VALUE_21,
    color: Colors.BLACK,
    textDecorationLine: Alignment.UNDERLINE,
    marginLeft:dynamicSize(Value.CONSTANT_VALUE_5),
  },
};
