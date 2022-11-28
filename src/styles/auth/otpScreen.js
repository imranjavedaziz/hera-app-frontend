import {Colors, Alignment} from '../../constants';
import {Value} from '../../constants/FixedValues';
import {Fonts} from '../../constants/Constants';

export default {
  troubleRow: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_15,
  },
  troubleKeyRow: {
    marginTop: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {marginLeft: Value.CONSTANT_VALUE_30, marginTop: 54},
  marginStyle: {marginHorizontal: Value.CONSTANT_VALUE_10},
  redColor: {
    color: Colors.RED,
    fontFamily: Fonts.OpenSansSemibold,
    fontSize: Value.CONSTANT_VALUE_14,
    lineHeight: 21,
    letterSpacing: 0,
    top: 42,
  },
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
    // marginTop:50
  },
};
