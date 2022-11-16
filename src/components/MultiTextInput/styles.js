import Alignment from '../../constants/Alignment';
import Colors from '../../constants/Colors';
import {Fonts} from '../../constants/Constants';
import {Prencentage, Value} from '../../constants/FixedValues';
import {px} from '../../utils/responsive';

export default {
  container: {
    borderRadius: px(18),
    marginBottom: px(Value.CONSTANT_VALUE_20),
  },
  row: {
    paddingTop: Value.CONSTANT_VALUE_18,
    flex: Value.CONSTANT_VALUE_0,
    width: Prencentage.PRECENTAGE_100,
    // marginVertical: Value.CONSTANT_VALUE_15,
    flexDirection: 'row',
  },
  border: {
    borderWidth: px(2),
    borderColor: Colors.BORDER_LINE,
    paddingHorizontal: px(6),
    width: px(310),
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
    paddingVertical: px(14),
    paddingHorizontal: px(18),
    // textAlign: 'justify',
  },
  label: {
    zIndex: -1,
    marginBottom: px(13),
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK_KEY,
    marginLeft: px(5),
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
