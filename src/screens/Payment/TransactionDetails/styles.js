import {Value} from '../../../constants/FixedValues';
import {dynamicSize, statusHide} from '../../../utils/responsive';
import {Alignment, Colors} from '../../../constants';
import {Fonts} from '../../../constants/Constants';

export default {
  flex: {
    flex: Value.CONSTANT_VALUE_1,
    backgroundColor: Colors.BACKGROUND,
  },
  mainContainer: {
    flex: Value.CONSTANT_VALUE_1,
    justifyContent: Alignment.FLEX_START,
    marginTop: statusHide(Value.CONSTANT_VALUE_105),
    marginHorizontal: Value.CONSTANT_VALUE_10,
    alignItems: Alignment.CENTER,
    marginBottom: Value.CONSTANT_VALUE_50,
  },
  doneText: {
    fontFamily: Fonts.OpenSansBold,
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_16,
    letterSpacing: Value.CONSTANT_VALUE_0,
    color: Colors.COLOR_535858,
    height: Value.CONSTANT_VALUE_22,
    marginRight: Value.CONSTANT_VALUE_30,
  },
  statusContainer: {
    width: dynamicSize(Value.CONSTANT_VALUE_65),
    height: dynamicSize(Value.CONSTANT_VALUE_65),
    borderRadius: dynamicSize(Value.CONSTANT_VALUE_35),
    borderWidth: Value.CONSTANT_VALUE_5,
    borderColor: Colors.WHITE,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    top: Value.CONSTANT_VALUE_0,
    right: Value.CONSTANT_VALUE_0,
    position: Alignment.ABSOLUTE,
  },
  statusIcon: {
    tintColor: Colors.WHITE,
    width: dynamicSize(Value.CONSTANT_VALUE_27),
    height: dynamicSize(Value.CONSTANT_VALUE_27),
    borderRadius: Value.CONSTANT_VALUE_15,
    resizeMode: 'contain',
  },
  title: {
    textAlign: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_16,
    marginBottom: Value.CONSTANT_VALUE_30,
    fontSize: Value.CONSTANT_VALUE_11,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 2.8,
    width: '100%',
  },
  transDetail: {
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.COLOR_535858,
    flex: Value.CONSTANT_VALUE_0,
    marginRight: Value.CONSTANT_VALUE_10,
  },
  bottomRow: {
    flex: Value.CONSTANT_VALUE_1,
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    marginBottom: Value.CONSTANT_VALUE_14,
  },
  seperator: {
    flex: Value.CONSTANT_VALUE_1,
    height: Value.CONSTANT_VALUE_2,
    backgroundColor: Colors.COLOR_228226216,
    marginVertical: Value.CONSTANT_VALUE_20,
    width: '100%',
  },
  userImg: {
    width: dynamicSize(Value.CONSTANT_VALUE_190),
    height: dynamicSize(Value.CONSTANT_VALUE_190),
    borderRadius: dynamicSize(Value.CONSTANT_VALUE_100),
    borderWidth: Value.CONSTANT_VALUE_5,
    borderColor: Colors.WHITE,
    backgroundColor: '#d8d8d8',
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 34,
    shadowOpacity: 1,
  },
  heading: {
    fontSize: Value.CONSTANT_VALUE_30,
    fontFamily: Fonts.OpenSansBold,
    textAlign: Alignment.CENTER,
    color: Colors.COLOR_535858,
    marginBottom: Value.CONSTANT_VALUE_40,
  },
  spaceBetween: {
    flex: Value.CONSTANT_VALUE_1,
    width: '100%',
    justifyContent: Alignment.SPACE_BETWEEN,
  },
  smDonorPara: {
    fontSize: Value.CONSTANT_VALUE_13,
    fontFamily: Fonts.OpenSansItalic,
    color: Colors.COLOR_535858,
    marginTop: Value.CONSTANT_VALUE_6,
  },
};
