import {Value, Prencentage} from '../constants/FixedValues';
import Alignment from '../constants/Alignment';
import Colors from '../constants/Colors';
import global from './global';
import { Fonts } from '../constants/Constants';

export default {
  bgContainer: {
    width: Prencentage.PRECENTAGE_100,
    height: Prencentage.PRECENTAGE_40,
  },
  bgImg: {
    width: Prencentage.PRECENTAGE_100,
    resizeMode: 'cover',
    bottom: Value.CONSTANT_VALUE_0,
    position: 'absolute',
  },
  mainContainer: {
    flex: 1,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.FLEX_START,
  },
  logo: {
    width: Value.CONSTANT_VALUE_200,
    height: Value.CONSTANT_VALUE_120,
    resizeMode: 'contain',
    flex: Value.CONSTANT_VALUE_0,
  },
  title: {
    fontSize: Value.CONSTANT_VALUE_22,
    lineHeight: Value.CONSTANT_VALUE_28,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginBottom: Value.CONSTANT_VALUE_20,
    marginTop: Value.CONSTANT_VALUE_10,
    flex: Value.CONSTANT_VALUE_0,
    fontFamily: Fonts.OpenSansBold,
  },
  btnContainer: {
    flex: 1,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  footer: {
    flex: 0,
    width: Prencentage.PRECENTAGE_100,
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.SPACE_BETWEEN,
    paddingVertical: Value.CONSTANT_VALUE_10,
  },
  footerBtn: {
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    ...global.underlineText
  },
};
