import {Alignment, Colors} from '../../constants';
import {Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
import {dynamicSize, px} from '../../utils/responsive';

export default {
  mainContainer: {
    paddingHorizontal: dynamicSize(Value.CONSTANT_VALUE_5),
  },
  innerContainer: {
    paddingBottom: dynamicSize(Value.CONSTANT_VALUE_25),
  },
  innerView: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
  },
  line: {
    borderBottomWidth: Value.CONSTANT_VALUE_2,
    borderColor: '#e4e2d8',
  },
  Icon: {
    marginRight: dynamicSize(Value.CONSTANT_VALUE_10),
  },
  heading: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
    lineHeight: Value.CONSTANT_VALUE_21,
    color: Colors.BLACK,
  },
  Deactivate: {
    color: '#ff4544',
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
    lineHeight: Value.CONSTANT_VALUE_21,
  },
  toggle: {
    fontSize: Value.CONSTANT_VALUE_13,
    fontFamily: Fonts.OpenSansBold,
    color: '#999488',
  },
  pending: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_13,
    color: '#ff4544',
    marginLeft: dynamicSize(Value.CONSTANT_VALUE_7),
  },
  dot: {
    width: px(Value.CONSTANT_VALUE_12),
    height: px(Value.CONSTANT_VALUE_12),
    borderStyle: Alignment.SOLID,
    borderRadius: px(Value.CONSTANT_VALUE_12),
    backgroundColor: '#ff4544',
    borderWidth: px(Value.CONSTANT_VALUE_1),
    borderColor: '#ffffff',
  },
};
