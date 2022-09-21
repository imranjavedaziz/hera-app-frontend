import Colors from '../../constants/Colors';
import {Value, Prencentage} from '../../constants/FixedValues';
import Alignment from '../../constants/Alignment';

export default {
  inputRow: {
    flex: Value.CONSTANT_VALUE_0,
    width: Prencentage.PRECENTAGE_100,
    flexDirection: Alignment.ROW,
  },
  contryCodeContainer: {
    width: Value.CONSTANT_VALUE_50,
    marginRight: Value.CONSTANT_VALUE_20,
  },
  countryCodeInput: {
    color: Colors.BORDER_LINE,
  },
};
