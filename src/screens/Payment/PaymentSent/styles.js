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
  },
  androidHeaderIcons: {
    marginRight: Value.CONSTANT_VALUE_30,
  },
  mainContainer: {
    flex: Value.CONSTANT_VALUE_1,
    marginTop: statusHide(105),
    alignItems: Alignment.CENTER,
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
    borderStyle: 'solid',
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
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: width - 60,
    justifyContent: 'center',
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
    height: Value.CONSTANT_VALUE_68,
    fontFamily: 'OpenSans',
    fontSize: Value.CONSTANT_VALUE_50,
    color: Colors.BLACK,
  },
  addProcess: {
    fontFamily: Fonts.OpenSansItalic,
    fontSize: Value.CONSTANT_VALUE_13,
    fontStyle: 'italic',
    color: Colors.BLACK_KEY,
  },
  rowStyle: {flexDirection: 'row'},
  star: {color: Colors.RED, fontSize: Value.CONSTANT_VALUE_13},
  btnContainer: {
    width: px(Value.CONSTANT_VALUE_306),
    backgroundColor: Colors.GREEN,
    borderRadius: scaleWidth(Value.CONSTANT_VALUE_40),
    height: scaleHeight(Value.CONSTANT_VALUE_80),
    justifyContent: Alignment.CENTER,
    alignSelf: Alignment.CENTER,
    marginBottom: scaleHeight(Value.CONSTANT_VALUE_50),
    marginTop: scaleHeight(Value.CONSTANT_VALUE_60),
    marginHorizontal: Value.CONSTANT_VALUE_15,
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
    top: 650,
    position: 'absolute',
    alignSelf: Alignment.CENTER,
  },
};
