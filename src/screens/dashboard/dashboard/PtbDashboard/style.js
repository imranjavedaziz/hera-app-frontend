import Alignment from '../../../../constants/Alignment';
import {dynamicSize} from '../../../../utils/responsive';
import {Value} from '../../../../constants/FixedValues';

export default {
  mainContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
  },
  innerContainer: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.CENTER,
  },
  overlayLabel: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  iconContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_FRAC88),
    justifyContent: Alignment.FLEXEND,
    alignItems: Alignment.CENTER,
  },
};
