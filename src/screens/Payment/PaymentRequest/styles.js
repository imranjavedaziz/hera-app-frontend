import {Value} from '../../../constants/FixedValues';
import {
  dynamicSize,
  height,
  px,
  statusHide,
  width,
} from '../../../utils/responsive';
import {Alignment, Colors} from '../../../constants';
import {Fonts} from '../../../constants/Constants';
console.log(width - 158, ' console.log(width-158)');
export default {
  flex: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  androidHeaderIcons: {
    marginLeft: Value.CONSTANT_VALUE_30,
  },
  containerLoader: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
  },
  mainContainer: {
    flex: Value.CONSTANT_VALUE_1,
    marginTop: statusHide(height / 2),
  },
  emptyText: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_23,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginBottom: Value.CONSTANT_VALUE_5,
  },
  secondEmptyText: {
    paddingHorizontal: Value.CONSTANT_VALUE_35,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_16,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  container: {
    flex: 1,
    marginTop: statusHide(Value.CONSTANT_VALUE_105),
    paddingHorizontal: dynamicSize(Value.CONSTANT_VALUE_30),
  },
  heraPay: {
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 2.84,
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_11,
  },
  sendPayment: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_23,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginBottom: dynamicSize(Value.CONSTANT_VALUE_15),
    marginTop: dynamicSize(Value.CONSTANT_VALUE_8),
  },
  btnContainer: {
    width: dynamicSize(Value.CONSTANT_VALUE_81),
    height: dynamicSize(Value.CONSTANT_VALUE_35),
    borderRadius: dynamicSize(Value.CONSTANT_VALUE_18),
    backgroundColor: Colors.GREEN,
    justifyContent: Alignment.CENTER,
  },
  pay: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_14,
    textAlign: Alignment.CENTER,
    color: '#000000',
  },
  Decline: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_14,
    textAlign: Alignment.CENTER,
    color: '#ff4544',
  },
  DeclinebtnContainer: {marginRight: Value.CONSTANT_VALUE_18},
  comContainer: {
    marginVertical: Value.CONSTANT_VALUE_FRAC705,
    backgroundColor: Colors.WHITE,
    borderRadius: Value.CONSTANT_VALUE_11,
    paddingTop: Value.CONSTANT_VALUE_20,
    paddingBottom: Value.CONSTANT_VALUE_24,
    paddingRight: Value.CONSTANT_VALUE_20,
    paddingLeft: Value.CONSTANT_VALUE_16,
  },
  innerViewComp: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.SPACE_BETWEEN,
    width: width - 99,
  },
  profileViewComp: {
    justifyContent: Alignment.FLEX_START,
    flexDirection: Alignment.ROW,
  },
  profileImg: {
    height: Value.CONSTANT_VALUE_40,
    width: Value.CONSTANT_VALUE_40,
    borderRadius: Value.CONSTANT_VALUE_100,
    borderWidth: Value.CONSTANT_VALUE_1,
    borderColor: Colors.INPUT_BORDER,
    backgroundColor: '#d8d8d8',
  },
  marginFromImg: {marginLeft: Value.CONSTANT_VALUE_10},
  userRequestName: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_14,
    lineHeight: Value.CONSTANT_VALUE_20,
    color: Colors.BLACK,
  },
  priceRequest: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
    lineHeight: Value.CONSTANT_VALUE_21,
    color: Colors.BLACK,
    marginTop: 2,
  },
  timeRequest: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_13,
    lineHeight: Value.CONSTANT_VALUE_21,
    color: Colors.TIME_COLOR,
    marginTop: Value.CONSTANT_VALUE_5,
  },
  BlueLink: {
    height: Value.CONSTANT_VALUE_25,
    width: Value.CONSTANT_VALUE_25,
    position: Alignment.ABSOLUTE,
    right: -8,

    top: -8,
    zIndex: Value.CONSTANT_VALUE_1,
  },
  imgpdf: {width: 29, height: 33},
  img: {
    height: '99%',
    width: '100%',
  },
  ImageView: {
    height: px(Value.CONSTANT_VALUE_60),
    width: px(Value.CONSTANT_VALUE_60),
    borderWidth: Value.CONSTANT_VALUE_2,
    backgroundColor: Colors.BACKGROUND,
    borderColor: Colors.COLOR_5ABCEC,
    alignItems: Alignment.CENTER,
    justifyContent: 'center',
  },
  AcceptRejectBtn: {
    alignItems: Alignment.CENTER,
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.FLEXEND,
    marginTop: Value.CONSTANT_VALUE_22,
  },
  StatusView: {
    alignItems: Alignment.CENTER,
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.FLEXEND,
    marginTop: Value.CONSTANT_VALUE_26,
  },
  ImageStatusView: {marginRight: 7.5},
  TextStatusView: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_14,
  },
};
