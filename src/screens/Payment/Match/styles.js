import {Value} from '../../../constants/FixedValues';
import {dynamicSize, height, statusHide} from '../../../utils/responsive';
import {Alignment, Colors} from '../../../constants';
import {Fonts} from '../../../constants/Constants';

export default {
  flex: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  container: {
    flex: 1,
    marginTop: statusHide(Value.CONSTANT_VALUE_105),
    paddingHorizontal: dynamicSize(Value.CONSTANT_VALUE_30),
  },
  androidHeaderIcons: {
    marginLeft: Value.CONSTANT_VALUE_30,
  },
  mainContainer: {
    flex: Value.CONSTANT_VALUE_1,
    marginTop: statusHide(height / 2),
  },
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
  heraPay: {
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 2.84,
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_11,
  },
  sendPayment: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_23,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_8),
  },
  searchContainer: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_25),
  },
  btnContainer: {
    width: dynamicSize(Value.CONSTANT_VALUE_81),
    height: dynamicSize(Value.CONSTANT_VALUE_35),
    borderRadius: dynamicSize(Value.CONSTANT_VALUE_18),
    backgroundColor: Colors.GREEN,
    justifyContent: Alignment.CENTER,
  },
  pay: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_14,
    textAlign: Alignment.CENTER,
    color: '#000000',
  },
  name: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
    color: Colors.BLACK,
  },
  type: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_14,
    color: Colors.BLACK,
  },
  compMaincontainer: {
    flex: 1,
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.SPACE_BETWEEN,
    alignItems: Alignment.CENTER,
    paddingVertical: dynamicSize(Value.CONSTANT_VALUE_20),
  },
  compInnerRow: {
    justifyContent: Alignment.FLEX_START,
    flexDirection: Alignment.ROW,
  },
  compColoumContainer: {
    justifyContent: Alignment.CENTER,
    marginLeft: dynamicSize(Value.CONSTANT_VALUE_10),
  },
  btnMainContainer: {
    justifyContent: Alignment.FLEXEND,
  },
  compImg: {
    width: dynamicSize(Value.CONSTANT_VALUE_45),
    height: dynamicSize(Value.CONSTANT_VALUE_45),
    borderRadius: dynamicSize(Value.CONSTANT_VALUE_50),
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  noBank:{
  fontFamily: Fonts.OpenSansRegular,
  fontSize: Value.CONSTANT_VALUE_14,
  fontStyle: "italic",
  textAlign: "right",
  color: "#ff5353",
  },
};
