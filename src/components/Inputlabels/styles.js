import Colors from '../../constants/Colors';
import {Value} from '../../constants/FixedValues';
import Alignment from '../../constants/Alignment';
import {Fonts} from '../../constants/Constants';

export default {
  errMessage: {
    color: 'red',
    textAlign: Alignment.RIGHT,
    marginTop: Value.CONSTANT_VALUE_5,
    fontSize: Value.CONSTANT_VALUE_14,
    lineHeight: Value.CONSTANT_VALUE_21,
    textVerticleAlignment: Alignment.CENTER,
    fontFamily: Fonts.OpenSansRegular,
    position: 'absolute',
    bottom: -25,
    right: 40,
  },
  labelView: {flex: Value.CONSTANT_VALUE_1, marginTop: Value.CONSTANT_VALUE_30},
  numberView: {height: 50, flex: 1, marginLeft: 17.3},
  codeText: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#000000',
  },
  codeInputText: {
    borderBottomWidth: 2,
    minHeight: 40,
    fontSize: 16,
  },
  focusBorder: {
    borderColor: Colors.SKY_BLUE,
  },
  blurBorder: {
    borderColor: Colors.INPUT_BORDER,
  },
  NumberText: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#000000',
  },
  firstName: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    color: '#000000',
  },
  firstNameCopy: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    color: Colors.BLACK_0,
    top: 30,
  },
  InputText: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0,
    color: Colors.BLACK,
    borderBottomWidth: 2,
    minHeight: 40,
  },
  InputTextField: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0,
    color: '#353a3a',
    borderBottomWidth: 2,
    minHeight: 40,
  },
};
