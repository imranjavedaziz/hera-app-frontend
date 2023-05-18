import {StyleSheet} from 'react-native';
import {
  statusHide,
  dynamicSize,
  scaleWidth,
  scaleHeight,
  px,
} from '../../../utils/responsive';
import {Alignment, Colors} from '../../../constants';
import {Fonts} from '../../../constants/Constants';
import {Value} from '../../../constants/FixedValues';

export default {
  androidMainContainer: {
    flex: 1,
    justifyContent: Alignment.FLEX_START,
    marginTop: statusHide(Value.CONSTANT_VALUE_105),
    paddingHorizontal: 25,
  },
  flex: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    // justifyContent: Alignment.SPACE_BETWEEN,
  },
  title: {
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 2.84,
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_11,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_23,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_8),
  },
  header: {
    marginHorizontal: Value.CONSTANT_VALUE_25,
  },
  profileContainer: {
    flex: 0,
    width: '100%',
    alignItems: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_20,
  },
  profileBox: {
    flex: 0,
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
  },
  profileImg: {
    height: Value.CONSTANT_VALUE_35,
    width: Value.CONSTANT_VALUE_35,
    borderRadius: Value.CONSTANT_VALUE_18,
    marginRight: Value.CONSTANT_VALUE_8,
  },
  profileName: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.COLOR_535858,
    textAlign: Alignment.CENTER,
    maxWidth: '70%',
  },
  uploadImgTxt: {
    fontSize: Value.CONSTANT_VALUE_16,
    color: Colors.COLOR_535858,
    fontFamily: Fonts.OpenSansRegular,
    marginTop: Value.CONSTANT_VALUE_35,
    marginBottom: Value.CONSTANT_VALUE_20,
  },
  selectImgContainer: {
    height: 95,
    width: 95,
    backgroundColor: Colors.DocBack,
    flex: 0,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  Imgs: {
    backgroundColor: Colors.DocBack,
    width: 95,
    flex: 1,
  },
  btnContainer: {
    width: px(Value.CONSTANT_VALUE_306),
    backgroundColor: Colors.GREEN,
    borderRadius: scaleWidth(Value.CONSTANT_VALUE_40),
    height: scaleHeight(Value.CONSTANT_VALUE_80),
    justifyContent: Alignment.CENTER,
    alignSelf: Alignment.CENTER,
    marginBottom: scaleHeight(Value.CONSTANT_VALUE_25),
    marginTop: scaleHeight(Value.CONSTANT_VALUE_60),
    marginHorizontal: Value.CONSTANT_VALUE_15,
  },
  btnText: {
    textAlign: Alignment.CENTER,
    color: Colors.COLOR_535858,
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 1.8,
  },
};
