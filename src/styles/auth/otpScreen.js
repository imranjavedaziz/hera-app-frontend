import {Colors, Alignment} from '../../constants';
import {Value} from '../../constants/FixedValues';
import {Fonts} from '../../constants/Constants';

export default {
  troubleRow: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    justifyContent: 'center',
    marginTop: 42,
    marginBottom: 190,
  },
  troubleRowKey: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    justifyContent: 'center',
    marginTop: 72,
    marginBottom: 30,
  },
  leftIcon: {
    marginLeft: Value.CONSTANT_VALUE_30,
  },
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
    textAlignVertical: Alignment.CENTER,
    marginRight: Value.CONSTANT_VALUE_5,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansRegular,
  },
  resend: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlignVertical: Alignment.CENTER,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
  },
  errMsg: {
    flex: Value.CONSTANT_VALUE_1,
    alignItems: Alignment.CENTER,
  },
  btnTouch: {
    width: 305,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#a3c6c4',
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  btn: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 14,
    letterSpacing: 1.8,
    textAlign: Alignment.CENTER,
    color: '#353a3a',
  },
};
