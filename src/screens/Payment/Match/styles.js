import {Value} from '../../../constants/FixedValues';
import {height, statusHide} from '../../../utils/responsive';
import {Alignment, Colors} from '../../../constants';
import {Fonts} from '../../../constants/Constants';

export default {
  flex: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  androidHeaderIcons: {
    marginLeft: Value.CONSTANT_VALUE_30,
  },
  mainContainer: {
    flex: Value.CONSTANT_VALUE_1,
    marginTop: statusHide(height / 2),
  },
  emptyText: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_23,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginBottom: Value.CONSTANT_VALUE_5,
  },
  secondEmptyText: {
    paddingHorizontal: Value.CONSTANT_VALUE_35,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_16,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
};
