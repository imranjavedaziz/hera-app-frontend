import {Alignment, Colors} from '../../constants';
import {Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
import {px} from '../../utils/responsive';

export default {
  fixedheaderStyle: {marginRight: px(Value.CONSTANT_VALUE_20)},
  mainContainer: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    marginTop: px(Value.CONSTANT_VALUE_100),
  },
  header: {marginTop: px(10)},
  heartIconContainer: {
    marginTop: px(Value.CONSTANT_VALUE_35),
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  heartIcon: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    width: px(Value.CONSTANT_VALUE_211),
    justifyContent: Alignment.SPACE_BETWEEN,
  },
  textbtn1: {
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 3.62,
    color: Colors.BLACK,
  },
  btn: color => ({
    borderRadius: px(Value.CONSTANT_VALUE_40),
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    borderColor: color,
    borderWidth: px(Value.CONSTANT_VALUE_1),
    backgroundColor: Colors.BACKGROUND,
    height: Value.CONSTANT_VALUE_80,
    width: Value.CONSTANT_VALUE_296,
    alignSelf: Alignment.CENTER,
  }),

  crossIconContainer: {
    marginTop: px(Value.CONSTANT_VALUE_15),
    marginBottom: px(Value.CONSTANT_VALUE_15),
  },
  crossIcon: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    width: px(Value.CONSTANT_VALUE_211),
    justifyContent: Alignment.SPACE_BETWEEN,
  },
  SeeProfile: {
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
    marginTop: px(Value.CONSTANT_VALUE_10),
  },
};
