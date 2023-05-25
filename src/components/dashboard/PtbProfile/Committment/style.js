import Alignment from '../../../../constants/Alignment';
import Colors from '../../../../constants/Colors';
import {Fonts} from '../../../../constants/Constants';
import {Value} from '../../../../constants/FixedValues';
import {dynamicSize} from '../../../../utils/responsive';
export default {
  mainContainer: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.SPACE_BETWEEN,
    paddingLeft: Value.CONSTANT_VALUE_20,
    paddingRight: Value.CONSTANT_VALUE_8,
    paddingVertical: 16,
    backgroundColor: Colors.SEARCH_BOX,
    alignItems: Alignment.FLEX_START,
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.COLOR_228226216,
    height: '100%',
  },
  leftItem: {
    borderLeftWidth: 1,
    borderTopLeftRadius: Value.CONSTANT_VALUE_9,
    borderBottomLeftRadius: Value.CONSTANT_VALUE_9,
  },
  rightItem: {
    borderRightWidth: 1,
    borderTopRightRadius: Value.CONSTANT_VALUE_9,
    borderBottomRightRadius: Value.CONSTANT_VALUE_9,
  },
  mainText: {
    fontSize: Value.CONSTANT_VALUE_18,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK,
  },
  innerText: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK,
    fontWeight: Alignment.BOLD,
  },
  Icon: {
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    width: Value.CONSTANT_VALUE_25,
    height: Value.CONSTANT_VALUE_25,
  },
  iconContainer: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    flex: 0,
    resizeMode: 'contain',
  },
  absolutePlan: {
    position: Alignment.ABSOLUTE,
    top: -10,
    width: '50%',
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  leftCurrent: {
    left: 0,
  },
  rightCurrent: {
    right: 0,
  },
  blueBorder: {
    borderColor: Colors.BLUE,
  },
  blueBackground: {
    backgroundColor: Colors.BLUE,
  },
  redBorder: {
    borderColor: Colors.RED,
  },
  redBackground: {
    backgroundColor: Colors.RED,
  },
  subscribeBtn: {
    paddingHorizontal: Value.CONSTANT_VALUE_5,
    backgroundColor: Colors.COLOR_5ABCEC,
    borderRadius: Value.CONSTANT_VALUE_3,
    minHeight: Value.CONSTANT_VALUE_20,
    maxHeight: Value.CONSTANT_VALUE_30,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    flex: Value.CONSTANT_VALUE_0,
  },
  subscribeTxt: {
    color: Colors.WHITE,
    fontSize: Value.CONSTANT_VALUE_12,
  },
  upComingBtn: {
    marginTop: Value.CONSTANT_VALUE_2,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    flex: 1,
  },
  upComingTxt: {
    color: Colors.COLOR_RED,
    fontSize: Value.CONSTANT_VALUE_12,
    flex: 1,
    textAlign: Alignment.LEFT,
    fontFamily: Fonts.OpenSansRegular,
  },
  innerView: {
    flex: 0,
  },
  verticalBar: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.COLOR_228226216,
  },
};
