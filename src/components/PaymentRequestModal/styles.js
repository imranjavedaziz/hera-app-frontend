import {Alignment, Colors} from '../../constants';
import {Fonts} from '../../constants/Constants';
import {Value} from '../../constants/FixedValues';
export default {
  centeredView: {
    flex: Value.CONSTANT_VALUE_1,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    width: Value.CONSTANT_VALUE_283,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Value.CONSTANT_VALUE_23,
    paddingVertical: Value.CONSTANT_VALUE_30,
    alignItems: Alignment.CENTER,
  },
  modalHeader: {
    lineHeight: Value.CONSTANT_VALUE_21,
    fontWeight: Alignment.BOLD,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansRegular,
    paddingBottom: Value.CONSTANT_VALUE_10,
    color: Colors.BLACK,
  },
  modalSubHeader: {
    textAlign: Alignment.CENTER,
    lineHeight: Value.CONSTANT_VALUE_18,
    fontSize: Value.CONSTANT_VALUE_13,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansRegular,
  },
  modalOption1: {
    color: Colors.RED,
    fontSize: Value.CONSTANT_VALUE_16,
    marginVertical: Value.CONSTANT_VALUE_20,
    letterSpacing: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansBold,
    width: Value.CONSTANT_VALUE_234,
    textAlign: Alignment.CENTER,
  },
  modalOption2: {
    marginTop: Value.CONSTANT_VALUE_20,
    fontWeight: Alignment.BOLD,
    fontSize: Value.CONSTANT_VALUE_16,
    letterSpacing: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansBold,
    color: '#353a3a',
    width: 234,
    textAlign: 'center',
  },
};
