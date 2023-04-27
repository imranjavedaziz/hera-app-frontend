import {Alignment, Colors} from '../../constants';
import {Value} from '../../constants/FixedValues';
import {height, width} from '../../utils/responsive';

export default {
  pdfContainer: {
    flex: Value.CONSTANT_VALUE_1,
    justifyContent: Alignment.FLEX_START,
    alignItems: Alignment.CENTER,
    backgroundColor: Colors.BACKGROUND,
  },
  pdf: {
    flex: Value.CONSTANT_VALUE_1,
    width: width,
    height: height,
    backgroundColor: Colors.BACKGROUND,
  },
  androidHeaderIcons: {
    marginLeft: Value.CONSTANT_VALUE_30,
  },
};
