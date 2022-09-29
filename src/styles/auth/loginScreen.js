import Colors from '../../constants/Colors';
import global from '../global';
import {Value} from '../../constants/FixedValues';
import { Fonts } from '../../constants/Constants';

export default {
  logo: {
    width: Value.CONSTANT_VALUE_200,
    height: Value.CONSTANT_VALUE_120,
    resizeMode: 'contain',
    flex: Value.CONSTANT_VALUE_0,
  },
  underlineBtn: {
    ...global.underlineText,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
  },
  loginBtn: {
    height:80,
    width:195,
    marginTop: Value.CONSTANT_VALUE_40,
    marginBottom: Value.CONSTANT_VALUE_20,
  },
  btnMargin: {marginVertical: Value.CONSTANT_VALUE_20},
};
