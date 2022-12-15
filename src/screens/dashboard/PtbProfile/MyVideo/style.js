import Alignment from '../../../../constants/Alignment';
import {Value} from '../../../../constants/FixedValues';
import {dynamicSize} from '../../../../utils/responsive';
import {Fonts} from '../../../../constants/Constants';
import Colors from '../../../../constants/Colors';
export default {
  mainContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
  },
  innerHeadingContainer: {
    marginTop: Value.CONSTANT_VALUE_8,
  },
  innerHeading: {
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_23,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
  innerVdo: {
    alignItems: Alignment.CENTER,
  },
  vdoHeading: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    lineHeight: Value.CONSTANT_VALUE_21,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  content: {
    marginTop: Value.CONSTANT_VALUE_5,
    textAlign: Alignment.CENTER,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_13,
    lineHeight: Value.CONSTANT_VALUE_21,
    color: Colors.BLACK,
  },
  centeredView: {
    flex: Value.CONSTANT_VALUE_1,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_52,
  },
  modalView: {
    height: Value.CONSTANT_VALUE_230,
    width: Value.CONSTANT_VALUE_283,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Value.CONSTANT_VALUE_23,
    paddingVertical: Value.CONSTANT_VALUE_20,
    alignItems: Alignment.CENTER,
    borderWidth: Value.CONSTANT_VALUE_1,
    borderColor: Colors.SEARCH_BOX,
  },
  modalHeader: {
    lineHeight: Value.CONSTANT_VALUE_21,
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
    paddingBottom: Value.CONSTANT_VALUE_5,
    color: Colors.COLOR_535858,
  },
  materialIcon: {
    width: Value.CONSTANT_VALUE_50,
    height: Value.CONSTANT_VALUE_50,
    alignSelf: 'center',
  },
};
