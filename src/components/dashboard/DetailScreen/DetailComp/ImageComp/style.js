import Alignment from '../../../../../constants/Alignment';
import {Value} from '../../../../../constants/FixedValues';
import {dynamicSize} from '../../../../../utils/responsive';
import {Fonts} from '../../../../../constants/Constants';

export default {
  mainContainer: {
    justifyContent: Alignment.SPACE_BETWEEN,
    alignItems: Alignment.CENTER,
    flexDirection: Alignment.ROW,
  },
  Image: {
    height: dynamicSize(86.8),
    width: dynamicSize(86.8),
    borderRadius: dynamicSize(90),
  },
  row: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
  },
  locationText: {
    fontSize: Value.CONSTANT_VALUE_16,
    marginLeft:Value.CONSTANT_VALUE_5,
    fontFamily: Fonts.OpenSansRegular,
  },
  codeText: {fontSize: Value.CONSTANT_VALUE_32, fontFamily: Fonts.OpenSansBold},
  typeText: {fontSize: Value.CONSTANT_VALUE_20, fontFamily: Fonts.OpenSansRegular},
};
