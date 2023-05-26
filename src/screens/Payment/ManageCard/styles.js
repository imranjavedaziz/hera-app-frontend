import {Value} from '../../../constants/FixedValues';
import {dynamicSize, statusHide} from '../../../utils/responsive';
import {Alignment, Colors} from '../../../constants';
import {Fonts} from '../../../constants/Constants';

export default {
  flex: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  androidHeaderIcons: {
    marginLeft: Value.CONSTANT_VALUE_30,
  },
  mainContainer: {
    flex: Value.CONSTANT_VALUE_1,
    marginTop: statusHide(104),
    marginHorizontal: dynamicSize(Value.CONSTANT_VALUE_40),
  },
  mainText: {
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 2.84,
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_11,
  },
  cardDetails: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_23,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_8),
  },
  addBtn: {
    height: 80,
    marginTop: Value.CONSTANT_VALUE_45,
    marginBottom: Value.CONSTANT_VALUE_20,
    width: 305,
  },
  addFutureCard: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_13,
    color: Colors.BLACK,
    textAlign: Alignment.CENTER,
    marginLeft: Value.CONSTANT_VALUE_10,
  },
  bottomPara: {
    fontSize: Value.CONSTANT_VALUE_13,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.COLOR_535858,
    marginTop: Value.CONSTANT_VALUE_26,
  },
  cvvDes: {
    fontFamily: Fonts.OpenSansItalic,
    fontSize: Value.CONSTANT_VALUE_14,
    color: Colors.BLACK_0,
    marginTop: Value.CONSTANT_VALUE_10,
  },
};
