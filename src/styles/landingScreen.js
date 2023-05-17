import {Platform} from 'react-native';
import {Value, Prencentage} from '../constants/FixedValues';
import {Alignment, Colors} from '../constants';
import {Fonts} from '../constants/Constants';
import {dynamicSize, scaleWidth, scaleHeight,width} from '../utils/responsive';

const BG_IMG_WIDTH = 414;
const BG_IMG_HEIGHT = 342;
const calHeight = (BG_IMG_HEIGHT/BG_IMG_WIDTH)*width;
export default {
  flex: {flex: Value.CONSTANT_VALUE_1, backgroundColor: Colors.BACKGROUND},
  bgContainer: {
    width: Prencentage.PRECENTAGE_100,
    ...Platform.select({
      android: {
        // height: Prencentage.PRECENTAGE_35,
      },
      ios: {
        // height: (BG_IMG_WIDTH/BG_IMG_HEIGHT)*width,
      },
    }),
    height: calHeight,
    backgroundColor: Colors.BACKGROUND,
    marginBottom: 10,
  },
  bgImg: {
    width: Prencentage.PRECENTAGE_100,
    height: calHeight,
    resizeMode: 'cover',
    // bottom: Value.CONSTANT_VALUE_0,
    // top: 0,
    // position: 'absolute',
  },
  mainContainer: {
    flex: 1,
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
    width: scaleWidth(Value.CONSTANT_VALUE_200),
    height:scaleHeight(Value.CONSTANT_VALUE_120),
    resizeMode: Alignment.CONTAIN,
    flex: Value.CONSTANT_VALUE_0,
    marginLeft: dynamicSize(62)
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
  },
  widthText: {width: Value.CONSTANT_VALUE_212},
};
