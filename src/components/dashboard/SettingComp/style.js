import Alignment from '../../../constants/Alignment';
import {Value} from '../../../constants/FixedValues';
import {Fonts} from '../../../constants/Constants';
import {dynamicSize} from '../../../utils/responsive';
import Colors from '../../../constants/Colors';
export default {
  mainContainer: {
    marginTop: Value.CONSTANT_VALUE_25,
    marginBottom: Value.CONSTANT_VALUE_25,
  },
  row: {
    flexDirection: Alignment.ROW,
  },
  headingText: {
    fontSize: Value.CONSTANT_VALUE_16,
    color: '#FF4544',
    marginLeft: 14,
    fontFamily: Fonts.OpenSansBold,
  },
  description: {
    fontSize: Value.CONSTANT_VALUE_13,
    fontFamily: Fonts.OpenSansBold,
    color: '#9A9488',
    marginTop: Value.CONSTANT_VALUE_6,
    width: 336,
  },
};
