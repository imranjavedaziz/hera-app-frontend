import {Platform} from 'react-native';
import {Value, Prencentage} from '../constants/FixedValues';
import {Alignment, Colors} from '../constants';
import global from './global';
import {Fonts} from '../constants/Constants';
import {dynamicSize} from '../utils/responsive';

export default {
  flex: {flex: Value.CONSTANT_VALUE_1},
  bgContainer: {
    width: Prencentage.PRECENTAGE_100,
    ...Platform.select({
      android: {
        height: Prencentage.PRECENTAGE_35,
      },
      ios: {
        height: Prencentage.PRECENTAGE_40,
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
        paddingBottom: Value.CONSTANT_VALUE_0,
      },
      ios: {
        paddingBottom: Value.CONSTANT_VALUE_0,
      },
    }),
    bottom: dynamicSize(Value.CONSTANT_VALUE_30),
  },
  logo: {
    width: Value.CONSTANT_VALUE_200,
    height: Value.CONSTANT_VALUE_120,
    resizeMode: 'contain',
    flex: Value.CONSTANT_VALUE_0,
  },
  title: {
    fontSize: Value.CONSTANT_VALUE_23,
    color: Colors.BLACK,
    marginBottom: Value.CONSTANT_VALUE_20,
    marginTop: Value.CONSTANT_VALUE_20,
    fontFamily: Fonts.OpenSansRegular,
    fontWeight: "bold",
  },
  btnContainer: {
    //flex: 1,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    paddingTop: Value.CONSTANT_VALUE_10,
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
    ...global.underlineText,
  },
  widthText: {width: Value.CONSTANT_VALUE_212},
};
