import {Colors, Alignment} from '../../constants';
import {Value} from '../../constants/FixedValues';
import {Fonts} from '../../constants/Constants';

export default {
  troubleRow: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_15,
  },
  marginStyle: {marginHorizontal: Value.CONSTANT_VALUE_10},
  redColor: {color: Colors.RED},
  trouble: {
    fontSize: Value.CONSTANT_VALUE_16,
    lineHeight: Value.CONSTANT_VALUE_25,
    textAlignVertical: Alignment.CENTER,
    marginRight: Value.CONSTANT_VALUE_5,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansRegular,
  },
  resend: {
    fontSize: Value.CONSTANT_VALUE_16,
    lineHeight: Value.CONSTANT_VALUE_25,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlignVertical: Alignment.CENTER,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
  },
  errMsg: {
    flex: Value.CONSTANT_VALUE_1,
    alignItems: Alignment.CENTER,
    marginVertical: Value.CONSTANT_VALUE_20,
  },
};
