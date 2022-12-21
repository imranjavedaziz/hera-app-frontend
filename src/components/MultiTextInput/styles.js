import Alignment from '../../constants/Alignment';
import Colors from '../../constants/Colors';
import {Fonts} from '../../constants/Constants';
import {Prencentage, Value} from '../../constants/FixedValues';
import {px} from '../../utils/responsive';

export default {
  container: {
    borderRadius: px(18),
  },
  row: {
    paddingTop: Value.CONSTANT_VALUE_30,
    flex: Value.CONSTANT_VALUE_0,
    width: Prencentage.PRECENTAGE_100,
    // marginVertical: Value.CONSTANT_VALUE_15,
    flexDirection: 'row',
  },
  border: {
    borderWidth: px(2),
    borderColor: Colors.BORDER_LINE,
    paddingHorizontal: px(6),
    width: px(300),
    height: px(161),
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
    paddingVertical: Value.CONSTANT_VALUE_18,
    paddingHorizontal: Value.CONSTANT_VALUE_18,
    width: '98%',
    height: '100%',
  },
  label: {
    marginBottom: px(14),
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansRegular,
    marginLeft: px(1),
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
  bottom: {marginBottom: px(Value.CONSTANT_VALUE_30), borderColor: Colors.RED},
};
