import {Alignment, Colors} from '../../constants';
import {Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';

export default {
  noInternetText: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_23,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  bottomTextData: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_16,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  retry: {
    width: Value.CONSTANT_VALUE_76,
    height: Value.CONSTANT_VALUE_36,
    borderRadius: 18,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.BLACK,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    marginTop: 25,
  },
};
