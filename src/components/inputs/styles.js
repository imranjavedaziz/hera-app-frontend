import Colors from '../../constants/Colors';
import {Prencentage, Value} from '../../constants/FixedValues';
import Alignment from '../../constants/Alignment';
import {Fonts} from '../../constants/Constants';

export default {
  container: {
    paddingTop: Value.CONSTANT_VALUE_18,
    flex: Value.CONSTANT_VALUE_0,
    width: Prencentage.PRECENTAGE_100,
    marginVertical: Value.CONSTANT_VALUE_15,
  },
  label: {
    position: Alignment.ABSOLUTE,
    left: Value.CONSTANT_VALUE_0,
    zIndex: -1,
    color: Colors.LABEL_BLACK,
    fontFamily: Fonts.OpenSansRegular,
  },
  floated: {
    top: Value.CONSTANT_VALUE_0,
    fontSize: Value.CONSTANT_VALUE_14,
  },
  floatedmessage: {
    top: Value.CONSTANT_VALUE_0,
    fontSize: Value.CONSTANT_VALUE_18,
  },
  unfloated: {
    top: Value.CONSTANT_VALUE_24,
    fontSize: Value.CONSTANT_VALUE_18,
  },
  input: {
    minHeight: Value.CONSTANT_VALUE_40,
    fontSize: Value.CONSTANT_VALUE_18,
    color: Colors.BLACK,
    borderBottomWidth: Value.CONSTANT_VALUE_FRAC115,
    paddingBottom: Value.CONSTANT_VALUE_10,
    textVerticleAlignment: Alignment.CENTER,
    fontFamily: Fonts.OpenSansBold,
  },
  focusBorder: {
    borderColor: Colors.BLUE,
  },
  blurBorder: {
    borderColor: Colors.INPUT_BORDER,
  },
  endComponent: {
    position: Alignment.ABSOLUTE,
    right: Value.CONSTANT_VALUE_10,
    bottom: Value.CONSTANT_VALUE_15,
    borderRadius: Value.CONSTANT_VALUE_50,
    zIndex: Value.CONSTANT_VALUE_2,
  },
  errMessage: {
    color: 'red',
    textAlign: Alignment.RIGHT,
    marginTop: Value.CONSTANT_VALUE_5,
    fontSize: Value.CONSTANT_VALUE_14,
    lineHeight: Value.CONSTANT_VALUE_21,
    textVerticleAlignment: Alignment.CENTER,
    fontFamily: Fonts.OpenSansRegular,
    position: 'absolute',
    bottom: -25,
    right: 0,
  },
  rowStyle: {width: Prencentage.PRECENTAGE_100},
  rowTextStyle: {textAlign: Alignment.CENTER, color: Colors.BLACK},
  dropdownStyle: {
    textAlign: Alignment.LEFT,
    minHeight: Value.CONSTANT_VALUE_40,
  },
  buttonStyle: {
    width: Prencentage.PRECENTAGE_100,
    backgroundColor: Colors.CLEAR,
    borderBottomWidth: Value.CONSTANT_VALUE_1,
    height: 'auto',
    minHeight: Value.CONSTANT_VALUE_40,
    paddingHorizontal: Value.CONSTANT_VALUE_0,
  },
  buttonTextStyle: {
    textAlign: Alignment.LEFT,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_18,
    marginHorizontal: Value.CONSTANT_VALUE_0,
    width: Prencentage.PRECENTAGE_100,
  },
};
