import Colors from '../../../../constants/Colors';
import {Fonts} from '../../../../constants/Constants';
import Alignment from '../../../../constants/Alignment';
import {Value} from '../../../../constants/FixedValues';
import {dynamicSize} from '../../../../utils/responsive';

export default {
  container: {
    flexDirection: Alignment.ROW,
    marginTop: Value.CONSTANT_VALUE_40,
    paddingHorizontal: Value.CONSTANT_VALUE_26,
  },
  row: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
  },
  iconContent: {
    width: 17,
  },
  title: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    marginLeft: Value.CONSTANT_VALUE_15,
  },
  blueDot: {
    borderRadius: Value.CONSTANT_VALUE_6,
    borderWidth: Value.CONSTANT_VALUE_6,
    height: 12,
    borderColor: Colors.CAMERA_BLUE,
    marginTop: Value.CONSTANT_VALUE_5,
  },
};
