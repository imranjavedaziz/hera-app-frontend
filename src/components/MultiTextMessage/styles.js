import Alignment from '../../constants/Alignment';
import Colors from '../../constants/Colors';
import {Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
import {px} from '../../utils/responsive';

export default {
  container: {
    borderRadius: px(18),
    marginBottom: px(Value.CONSTANT_VALUE_20),
  },
  row: {flexDirection: 'row'},
  border: {
    borderWidth: px(1),
    borderColor: Colors.BORDER_LINE,
    paddingHorizontal: px(10),
    width: px(320),
    height: px(121),
  },
  description: {
    fontSize: px(14),
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK_KEY,
  },
  input: {
    fontSize: px(14),
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
    textAlignVertical: 'top',
    marginTop: px(8),
  },
  label: {
    right: 145,
    marginBottom: 13,
    top: Value.CONSTANT_VALUE_0,
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK_KEY,
  },
  red: {color: Colors.RED},
  focusBorder: {
    borderColor: Colors.BLUE,
  },
  blurBorder: {
    borderColor: Colors.INPUT_BORDER,
  },
  errMessage: {
    color: Colors.RED,
    textAlign: Alignment.RIGHT,
    marginTop: Value.CONSTANT_VALUE_5,
    fontSize: Value.CONSTANT_VALUE_14,
    lineHeight: Value.CONSTANT_VALUE_21,
    textVerticleAlignment: Alignment.CENTER,
    fontFamily: Fonts.OpenSansRegular,
    position: Alignment.ABSOLUTE,
    bottom: -25,
    right: 5,
  },
  bottom: {marginBottom: px(Value.CONSTANT_VALUE_30)},
};
