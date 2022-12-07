import Colors from '../../constants/Colors';
import {Prencentage, Value} from '../../constants/FixedValues';
import Alignment from '../../constants/Alignment';
import {Fonts} from '../../constants/Constants';

export default {
  container: {
    marginTop: Value.CONSTANT_VALUE_30,
    flex: Value.CONSTANT_VALUE_0,
    width: Prencentage.PRECENTAGE_100,
  },
  bottom: {bottom: 10},
  label: {
    position: Alignment.ABSOLUTE,
    left: Value.CONSTANT_VALUE_0,
    zIndex: -1,
    color: Colors.LABEL_BLACK,
    fontFamily: Fonts.OpenSansRegular,
  },
  marginBottom: {marginBottom: 10},

  iosFloatingText: {
    top: Value.CONSTANT_VALUE_5,
    fontSize: Value.CONSTANT_VALUE_14,
    color: Colors.BLACK_KEY,
  },

  IOSfloated: {
    fontFamily: Fonts.OpenSansRegular,
    lineHeight: 21,
    letterSpacing: 0,
    color: '#000000',
    top: Value.CONSTANT_VALUE_8,
    fontSize: Value.CONSTANT_VALUE_14,
  },
  floated: {
    top: Value.CONSTANT_VALUE_0,

    fontSize: Value.CONSTANT_VALUE_14,
    color: Colors.BLACK_KEY,
  },
  floatedmessage: {
    top: Value.CONSTANT_VALUE_0,
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK_KEY,
  },
  unIosfloated: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    color: Colors.BLACK_0,
    top: 22,
  },
  unIosfloatedText: {
    top: Value.CONSTANT_VALUE_22,
    fontSize: Value.CONSTANT_VALUE_16,
  },
  unfloated: {
    marginTop: Value.CONSTANT_VALUE_30,
    fontSize: Value.CONSTANT_VALUE_16,
  },
  input: {
    minHeight: Value.CONSTANT_VALUE_40,
    fontSize: Value.CONSTANT_VALUE_16,
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
  errMessage_1: {
    color: 'red',
    textAlign: Alignment.RIGHT,
    marginTop: Value.CONSTANT_VALUE_5,
    fontSize: Value.CONSTANT_VALUE_14,
    lineHeight: Value.CONSTANT_VALUE_21,
    textVerticleAlignment: Alignment.CENTER,
    fontFamily: Fonts.OpenSansRegular,
    right: 0,
  },
  rowStyle: {
    width: Prencentage.PRECENTAGE_100,
    borderBottomWidth: Value.CONSTANT_VALUE_0,
  },
  rowTextStyle: {textAlign: Alignment.CENTER, color: Colors.BLACK},
  dropdownStyle: {
    textAlign: Alignment.LEFT,
    minHeight: Value.CONSTANT_VALUE_40,
  },
  buttonStyle: {
    width: Prencentage.PRECENTAGE_100,
    backgroundColor: Colors.CLEAR,
    borderBottomWidth: Value.CONSTANT_VALUE_2,
    height: 'auto',
    minHeight: Value.CONSTANT_VALUE_40,
    paddingHorizontal: Value.CONSTANT_VALUE_0,
  },
  buttonTextStyle: {
    textAlign: Alignment.LEFT,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
    marginHorizontal: Value.CONSTANT_VALUE_0,
    width: Prencentage.PRECENTAGE_100,
  },
  linebelow: {
    borderBottomWidth: Value.CONSTANT_VALUE_2,
    justifyContent: 'center',
    top: Value.CONSTANT_VALUE_17,
  },
  linebelowFloat: {
    borderBottomWidth: Value.CONSTANT_VALUE_2,
    justifyContent: 'center',
    top: Value.CONSTANT_VALUE_6,
  },
  red: {color: 'red'},
  left: {left: '90%'},
  //CHanges
  firstName: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    color: '#000000',
  },
  firstNameCopy: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    color: Colors.BLACK_0,
    top: 30,
  },
};
