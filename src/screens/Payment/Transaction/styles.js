import {Value} from '../../../constants/FixedValues';
import {height, statusHide} from '../../../utils/responsive';
import {Alignment, Colors} from '../../../constants';
import {Fonts} from '../../../constants/Constants';

export default {
  flex: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  androidHeaderIcons: {
    marginLeft: Value.CONSTANT_VALUE_30,
  },
  mainContainer: {
    flex: Value.CONSTANT_VALUE_1,
    justifyContent: Alignment.FLEX_START,
    marginTop: statusHide(Value.CONSTANT_VALUE_105),
    marginHorizontal: 10,
  },
  EmptymainContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  emptyText: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_23,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginBottom: Value.CONSTANT_VALUE_5,
  },
  secondEmptyText: {
    paddingHorizontal: Value.CONSTANT_VALUE_35,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_16,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  seperator: {
    flex: Value.CONSTANT_VALUE_1,
    height: Value.CONSTANT_VALUE_1,
    backgroundColor: Colors.COLOR_228226216,
    marginVertical: Value.CONSTANT_VALUE_20,
  },
  title: {
    textAlign: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_16,
    marginBottom: Value.CONSTANT_VALUE_30,
    fontSize: Value.CONSTANT_VALUE_11,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 2.8,
  },
  transId: {
    marginBottom: Value.CONSTANT_VALUE_15,
    fontSize: Value.CONSTANT_VALUE_13,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.COLOR_535858,
  },
  transRow: {
    flex: Value.CONSTANT_VALUE_1,
    flexDirection: Alignment.ROW,
    alignItems: Alignment.FLEX_START,
  },
  transImg: {
    flex: Value.CONSTANT_VALUE_0,
    height: Value.CONSTANT_VALUE_35,
    width: Value.CONSTANT_VALUE_35,
    borderRadius: Value.CONSTANT_VALUE_18,
  },
  transColumn: {
    flex: Value.CONSTANT_VALUE_1,
    marginLeft: Value.CONSTANT_VALUE_10,
  },
  transName: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.COLOR_535858,
  },
  transDetail: {
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.COLOR_535858,
    flex: Value.CONSTANT_VALUE_0,
  },
  transDate: {
    marginTop: Value.CONSTANT_VALUE_15,
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.COLOR_535858,
  },
  transStatus: {
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansBold,
  },
  statusIcon: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginRight: 4.5,
  },
  wrapRow: {flex: 0, flexDirection: 'row', alignItems: 'center'},
};
