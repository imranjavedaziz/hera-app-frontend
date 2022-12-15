import Colors from '../../../../constants/Colors';
import {Fonts} from '../../../../constants/Constants';
import Alignment from '../../../../constants/Alignment';
import {Value} from '../../../../constants/FixedValues';
import {dynamicSize, px} from '../../../../utils/responsive';

export default {
  container: {
    flexDirection: Alignment.ROW,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_30),

    justifyContent: Alignment.SPACE_BETWEEN,
    alignItems: Alignment.CENTER,
  },
  row: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
  },
  iconContent: {
    width: Value.CONSTANT_VALUE_17,
  },
  title: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    marginLeft: Value.CONSTANT_VALUE_16,
    color: Colors.BLACK,
  },
  blueDot: {
    backgroundColor: Colors.GREEN,
    width: px(Value.CONSTANT_VALUE_12),
    height: px(Value.CONSTANT_VALUE_12),
    borderStyle: Alignment.SOLID,
    borderWidth: px(Value.CONSTANT_VALUE_1),
    borderColor: Colors.WHITE,
    borderRadius: px(Value.CONSTANT_VALUE_30),
    justifyContent: Alignment.FLEXEND,
    alignItems: Alignment.CENTER,
  },
  toggle: {
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansRegular,
    color: 'rgb(53,58,58)',
  },
};
