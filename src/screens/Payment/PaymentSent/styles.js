import {Value} from '../../../constants/FixedValues';
import {
  px,
  scaleHeight,
  scaleWidth,
  statusHide,
  width,
} from '../../../utils/responsive';
import {Alignment, Colors} from '../../../constants';
import {Fonts} from '../../../constants/Constants';

export default {
  flex: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    justifyContent: Alignment.SPACE_BETWEEN,
  },
  androidHeaderIcons: {
    marginRight: Value.CONSTANT_VALUE_30,
  },
  mainContainer: {
    flex: 0,
    marginTop: statusHide(95),
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.FLEX_START,
  },
  mainText: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_23,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginBottom: Value.CONSTANT_VALUE_21,
  },
  profileImg: {
    width: Value.CONSTANT_VALUE_66,
    height: Value.CONSTANT_VALUE_66,
    borderStyle: Alignment.SOLID,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    borderRadius: 100,
    backgroundColor: '#d8d8d8',
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 34,
    shadowOpacity: 1,
    marginBottom: Value.CONSTANT_VALUE_13,
  },
  userName: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
    color: Colors.BLACK,
    marginBottom: Value.CONSTANT_VALUE_2,
  },
  type: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_14,
    color: Colors.BLACK,
    marginBottom: Value.CONSTANT_VALUE_17,
  },
  rowView: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    maxWidth: width - 60,
    justifyContent: Alignment.CENTER,
    marginBottom: Value.CONSTANT_VALUE_21,
  },
  dollar: {
    fontFamily: Fonts.OpenSansSemibold,
    fontSize: Value.CONSTANT_VALUE_25,
    color: Colors.BLACK,
    marginRight: Value.CONSTANT_VALUE_5,
  },
  textInputStyle: {
    flex: Value.CONSTANT_VALUE_0,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_50,
    color: Colors.BLACK,
    textAlign: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  addProcess: {
    fontFamily: Fonts.OpenSansItalic,
    fontSize: Value.CONSTANT_VALUE_13,
    fontStyle: Alignment.ITALIC,
    color: Colors.BLACK_KEY,
  },
  rowStyle: {flexDirection: Alignment.ROW, paddingHorizontal: 30},
  star: {color: Colors.RED, fontSize: Value.CONSTANT_VALUE_13},
  btnContainer: {
    width: px(Value.CONSTANT_VALUE_306),
    backgroundColor: Colors.GREEN,
    borderRadius: scaleWidth(Value.CONSTANT_VALUE_40),
    height: scaleHeight(Value.CONSTANT_VALUE_80),
    justifyContent: Alignment.CENTER,
    alignSelf: Alignment.CENTER,
    marginBottom: scaleHeight(Value.CONSTANT_VALUE_45),
    marginTop: scaleHeight(Value.CONSTANT_VALUE_50),
    marginHorizontal: Value.CONSTANT_VALUE_15,
  },
  bottonView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  btnText: {
    textAlign: Alignment.CENTER,
    color: Colors.COLOR_535858,
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 1.8,
  },
  bottonFloat: {
    alignItems: Alignment.CENTER,
    flex: 0,
    justifyContent: Alignment.FLEXEND,
    alignSelf: Alignment.CENTER,
  },
};
