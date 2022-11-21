import {Platform} from 'react-native';
import {Value, Prencentage} from '../constants/FixedValues';
import {Alignment, Colors} from '../constants';
import {Fonts} from '../constants/Constants';
import {dynamicSize} from '../utils/responsive';

export default {
  flex: {flex: Value.CONSTANT_VALUE_1, backgroundColor: Colors.BACKGROUND},
  bgContainer: {
    width: Prencentage.PRECENTAGE_100,
    ...Platform.select({
      android: {
        height: 296,
      },
      ios: {
        height: 300,
      },
    }),
  },
  bgImg: {
    width: Prencentage.PRECENTAGE_100,
    resizeMode: 'cover',
    position: 'absolute',
  },
  mainContainer: {
    marginTop: 30,
    flex: 1,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.FLEX_START,
  },
  logo: {
    width: Value.CONSTANT_VALUE_200,
    height: Value.CONSTANT_VALUE_120,
    resizeMode: Alignment.CONTAIN,
    flex: Value.CONSTANT_VALUE_0,
  },
  title: {
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_23,
    color: Colors.BLACK,
    marginBottom: Value.CONSTANT_VALUE_20,
    marginTop: Value.CONSTANT_VALUE_20,
    fontFamily: Fonts.OpenSansBold,
  },
  btnContainer: {
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    paddingTop: Value.CONSTANT_VALUE_10,
    marginBottom: Value.CONSTANT_VALUE_150,
  },
  footer: {
    flex: 0,
    width: Prencentage.PRECENTAGE_100,
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.SPACE_BETWEEN,
    paddingVertical: Value.CONSTANT_VALUE_40,
    paddingHorizontal: Value.CONSTANT_VALUE_40,
    position: Alignment.ABSOLUTE,
    ...Platform.select({
      android: {
        bottom: 0,
      },
      ios: {
        bottom: 0,
      },
    }),
  },
  footerBtn: {
    fontSize: Value.CONSTANT_VALUE_16,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    // ...global.underlineText,
  },
  widthText: {width: Value.CONSTANT_VALUE_212},
};
