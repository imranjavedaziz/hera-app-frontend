import {Platform} from 'react-native';
import {Value, Prencentage} from '../constants/FixedValues';
import Alignment from '../constants/Alignment';
import Colors from '../constants/Colors';
import global from './global';
import {Fonts} from '../constants/Constants';

export default {
  bgContainer: {
    width: Prencentage.PRECENTAGE_100,
    //height: Prencentage.PRECENTAGE_30,
    ...Platform.select({
      android: {
        height: Prencentage.PRECENTAGE_25,
      },
      ios: {
        height: Prencentage.PRECENTAGE_30,
      },
    }),
    backgroundColor: Colors.BACKGROUND,
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
    ...Platform.select({
      android: {
        paddingBottom: Value.CONSTANT_VALUE_100,
      },
      ios: {
        paddingBottom: Value.CONSTANT_VALUE_0,
      },
    }),
    //paddingBottom:Value.CONSTANT_VALUE_60
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
    paddingHorizontal: Value.CONSTANT_VALUE_40,
    position: Alignment.ABSOLUTE,
    ...Platform.select({
      android: {
        bottom: 10,
      },
      ios: {
        bottom: 40,
      },
    }),
  },
  footerBtn: {
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    ...global.underlineText,
  },
};
