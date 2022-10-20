import Colors from '../../../../constants/Colors';
import {Fonts} from '../../../../constants/Constants';
import Alignment from '../../../../constants/Alignment';
import {Value} from '../../../../constants/FixedValues';
import {dynamicSize, normalizeFont} from '../../../../utils/responsive';

export default {
  container: {
    flexDirection: Alignment.ROW,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_40),
    paddingHorizontal: dynamicSize(Value.CONSTANT_VALUE_26),
  },
  row: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
  },
  iconContent: {
    width: dynamicSize(Value.CONSTANT_VALUE_17),
  },
  title: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_16),
    fontFamily: Fonts.OpenSansBold,
    marginLeft: dynamicSize(Value.CONSTANT_VALUE_15),
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
