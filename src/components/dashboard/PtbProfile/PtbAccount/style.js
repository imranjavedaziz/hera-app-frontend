import Colors from '../../../../constants/Colors';
import {Fonts} from '../../../../constants/Constants';
import Alignment from '../../../../constants/Alignment';
import {Value} from '../../../../constants/FixedValues';
import {dynamicSize} from '../../../../utils/responsive';

export default {
  container: {
    flexDirection: Alignment.ROW,
    marginTop: Value.CONSTANT_VALUE_30,
    paddingHorizontal: dynamicSize(Value.CONSTANT_VALUE_26),
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
    marginLeft: dynamicSize(Value.CONSTANT_VALUE_15),
    color: Colors.BLACK,
  },
  blueDot: {
    borderRadius: dynamicSize(Value.CONSTANT_VALUE_6),
    borderWidth: dynamicSize(Value.CONSTANT_VALUE_6),
    height: dynamicSize(Value.CONSTANT_VALUE_12),
    borderColor: Colors.CAMERA_BLUE,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_5),
    marginLeft: dynamicSize(Value.CONSTANT_VALUE_174),
  },
};
