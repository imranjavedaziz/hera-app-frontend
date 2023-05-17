import {Alignment, Colors} from '../../constants';
import {Value} from '../../constants/FixedValues';
import {height, width} from '../../utils/responsive';

export default {
  pdfContainer: {
    flex: Value.CONSTANT_VALUE_1,
    justifyContent: Alignment.FLEX_START,
    alignItems: Alignment.CENTER,
    backgroundColor: Colors.WHITE,
  },
  pdf: {
    flex: Value.CONSTANT_VALUE_1,
    width: width,
    height: height,
    backgroundColor: Colors.WHITE,
  },
  androidHeaderIcons: {
    marginLeft: Value.CONSTANT_VALUE_30,
  },
  container: {
    position: Alignment.ABSOLUTE,
    alignSelf: Alignment.CENTER,
    width: Value.CONSTANT_VALUE_50,
    height: Value.CONSTANT_VALUE_50,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    borderRadius: Value.CONSTANT_VALUE_35,
    backgroundColor: Colors.WHITE,
    zIndex: Value.CONSTANT_VALUE_999999,
  },
};
