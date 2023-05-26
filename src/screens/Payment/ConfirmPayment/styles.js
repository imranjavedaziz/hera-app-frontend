import {Value} from '../../../constants/FixedValues';
import {
  dynamicSize,
  px,
  scaleHeight,
  scaleWidth,
  statusHide,
} from '../../../utils/responsive';
import {Alignment, Colors} from '../../../constants';
import {Fonts} from '../../../constants/Constants';

export default {
  flex: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    paddingHorizontal: Value.CONSTANT_VALUE_30,
  },
  androidHeaderIcons: {
    marginLeft: Value.CONSTANT_VALUE_30,
  },
  mainContainer: {
    flex: Value.CONSTANT_VALUE_1,
    marginTop: statusHide(105),
  },
  mainText: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_11,
    letterSpacing: Value.CONSTANT_VALUE_2_84,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginBottom: Value.CONSTANT_VALUE_8,
  },
  ammount: {
    textAlign: Alignment.CENTER,
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_23,
    color: Colors.BLACK,
  },
  borderBlue: {
    // width: width - 88,
    marginTop: Value.CONSTANT_VALUE_19,
    height: scaleHeight(Value.CONSTANT_VALUE_45),
    borderRadius: Value.CONSTANT_VALUE_11,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: Value.CONSTANT_VALUE_2,
    borderColor: Colors.COLOR_5ABCEC,
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    paddingLeft: Value.CONSTANT_VALUE_17,
  },
  warningImg: {
    width: Value.CONSTANT_VALUE_14,
    height: Value.CONSTANT_VALUE_14,
  },
  warningText: {
    marginLeft: Value.CONSTANT_VALUE_8,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_14,
    color: Colors.BLUE,
  },
  emptyText: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_23,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginBottom: Value.CONSTANT_VALUE_5,
  },
  secondEmptyText: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_16,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  emptyCardView: {
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    marginTop: dynamicSize(195),
  },
  btnContainer: {
    width: px(Value.CONSTANT_VALUE_213),
    backgroundColor: Colors.GREEN,
    borderRadius: scaleWidth(Value.CONSTANT_VALUE_40),
    height: scaleHeight(Value.CONSTANT_VALUE_80),
    justifyContent: Alignment.CENTER,
    alignSelf: Alignment.CENTER,
    marginBottom: scaleHeight(Value.CONSTANT_VALUE_50),
    marginTop: scaleHeight(Value.CONSTANT_VALUE_35),
    marginHorizontal: Value.CONSTANT_VALUE_15,
  },
  btnContainerPay: {
    width: px(305),
    backgroundColor: Colors.GREEN,
    borderRadius: scaleWidth(Value.CONSTANT_VALUE_40),
    height: scaleHeight(Value.CONSTANT_VALUE_80),
    justifyContent: Alignment.CENTER,
    alignSelf: Alignment.CENTER,
  },
  btnText: {
    textAlign: Alignment.CENTER,
    color: Colors.COLOR_535858,
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 1.8,
  },
  cardPayText: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_14,
    marginTop: Value.CONSTANT_VALUE_30,
    marginBottom: Value.CONSTANT_VALUE_2,
    color: Colors.BLACK,
  },
  moreCard: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_14,
    marginTop: Value.CONSTANT_VALUE_10,
    color: Colors.BLACK,
    textDecorationLine: 'underline',
  },
  bottonFloat: {
    alignItems: 'center',
    top: '85%',
    position: 'absolute',
    alignSelf: 'center',
  },
  bottomPara: {
    fontSize: Value.CONSTANT_VALUE_13,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.COLOR_535858,
    marginTop: Value.CONSTANT_VALUE_26,
  },
};
