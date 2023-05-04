import {Colors, Alignment} from '../../../constants';
import {Value, Prencentage} from '../../../constants/FixedValues';
import {Fonts} from '../../../constants/Constants';
import {dynamicSize} from '../../../utils/responsive';

export default {
  main: {
    paddingHorizontal: Value.CONSTANT_VALUE_40,
  },
  title: {
    fontSize: Value.CONSTANT_VALUE_11,
    fontFamily: Fonts.OpenSansBold,
    textAlign: Alignment.LEFT,
    width: Prencentage.PRECENTAGE_100,
    marginBottom: Value.CONSTANT_VALUE_15,
    marginTop: Value.CONSTANT_VALUE_60,
  },
  centeredView: {
    flex: Value.CONSTANT_VALUE_1,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  passwordCheck: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
  },
  ValidPwd: {
    marginLeft: Value.CONSTANT_VALUE_5,
    maxWidth: Value.CONSTANT_VALUE_13,
    resizeMode: Alignment.CONTAIN,
  },
  modalView: {
    height: Value.CONSTANT_VALUE_230,
    width: Value.CONSTANT_VALUE_283,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Value.CONSTANT_VALUE_23,
    paddingVertical: Value.CONSTANT_VALUE_20,
    alignItems: Alignment.CENTER,
  },
  radioContainer: {
    flex: Value.CONSTANT_VALUE_1,
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    paddingVertical: Value.CONSTANT_VALUE_8,
    justifyContent: Alignment.FLEX_START,
    width: Prencentage.PRECENTAGE_100,
  },
  radio: {
    width: Value.CONSTANT_VALUE_30,
    resizeMode: 'cover',
    height: Value.CONSTANT_VALUE_30,
  },
  radioLabel: {
    marginLeft: Value.CONSTANT_VALUE_16,
    fontSize: Value.CONSTANT_VALUE_23,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
  },
  imgContainer: {
    alignItems: Alignment.FLEX_START,
    width: Prencentage.PRECENTAGE_100,
    marginTop: Value.CONSTANT_VALUE_20,
  },
  imgView: {
    width: Value.CONSTANT_VALUE_135,
    height: Value.CONSTANT_VALUE_135,
    borderRadius: Value.CONSTANT_VALUE_70,
    backgroundColor: Colors.GREEN,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  img: {
    borderRadius: Value.CONSTANT_VALUE_70,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  camBtn: {
    width: Value.CONSTANT_VALUE_35,
    height: Value.CONSTANT_VALUE_35,
    borderRadius: Value.CONSTANT_VALUE_18,
    backgroundColor: Colors.GREEN,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  camSelectedBtn: {
    position: Alignment.ABSOLUTE,
    bottom: Value.CONSTANT_VALUE_0,
    right: Value.CONSTANT_VALUE_5,
  },
  camImg: {
    width: Value.CONSTANT_VALUE_20,
    height: Value.CONSTANT_VALUE_20,
    resizeMode: 'contain',
  },
  pwdInputContainer: {
    marginVertical: Value.CONSTANT_VALUE_0,
    marginBottom: Value.CONSTANT_VALUE_5,
    marginTop: 10,
  },
  pwdErrContainer: {flexDirection: Alignment.ROW, alignItems: Alignment.CENTER},
  pwdErrText: {
    fontSize: Value.CONSTANT_VALUE_13,
    fontFamily: Fonts.OpenSansBold,
  },
  pwdErrIcon: {
    marginLeft: Value.CONSTANT_VALUE_5,
    maxWidth: Value.CONSTANT_VALUE_13,
    resizeMode: 'contain',
  },
  checkboxContainer: {
    flexDirection: Alignment.ROW,
    flex: Value.CONSTANT_VALUE_1,
    alignItems: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_30,
  },
  checkboxLabel: {
    fontSize: Value.CONSTANT_VALUE_13,
    marginLeft: Value.CONSTANT_VALUE_10,
    flex: Value.CONSTANT_VALUE_1,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansRegular,
  },
  checkboxTitle: {
    fontWeight: Alignment.BOLD,
    textDecorationLine: Alignment.UNDERLINE,
  },
  parentBtn: {
    fontFamily: Fonts.OpenSansBold,
    alignSelf: Alignment.CENTER,
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_16,
    marginTop: Value.CONSTANT_VALUE_20,
    marginBottom: Value.CONSTANT_VALUE_60,
    color: Colors.BLACK,
  },
  imgPickerContainer: {
    width: Prencentage.PRECENTAGE_100,
    paddingHorizontal: Value.CONSTANT_VALUE_20,
    paddingVertical: Value.CONSTANT_VALUE_10,
  },
  pickerBtn: {
    paddingVertical: Value.CONSTANT_VALUE_20,
  },
  pickerBtnCam: {paddingBottom: Value.CONSTANT_VALUE_20},
  pickerBtnBorder: {
    borderBottomWidth: Value.CONSTANT_VALUE_1,
    borderBottomColor: Colors.BORDER_LINE,
  },
  pickerBtnLabel: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
  redColor: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.RED,
  },
  ImageText: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK_KEY,
    lineHeight: Value.CONSTANT_VALUE_21,
  },
  Btn: {
    height: Value.CONSTANT_VALUE_80,
    width: Value.CONSTANT_VALUE_197,
    paddingHorizontal: Value.CONSTANT_VALUE_0,
    paddingVertical: Value.CONSTANT_VALUE_0,
    marginTop: Value.CONSTANT_VALUE_36,
    alignItems: 'center',
  },
  error: {
    width: '100%',
    marginVertical: Value.CONSTANT_VALUE_20,
  },
  starContainer: {
    marginTop: Value.CONSTANT_VALUE_15,
    flexDirection: Alignment.ROW,
  },
  starColor: {
    color: Colors.RED,
  },
  descText: {
    fontFamily: Fonts.OpenSansItalic,
    color: Colors.BLACK_KEY,
    fontSize: Value.CONSTANT_VALUE_14,
  },
  headerIcon: {
    marginRight: dynamicSize(Value.CONSTANT_VALUE_20),
  },
  align: {alignItems: 'center'},
  tmc1: {
    fontSize: Value.CONSTANT_VALUE_13,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK,
    lineHeight: Value.CONSTANT_VALUE_21,
    marginLeft: 10,
  },
  tmcLink1: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_9),
    fontSize: Value.CONSTANT_VALUE_13,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
    lineHeight: Value.CONSTANT_VALUE_18,
    textDecorationLine: Alignment.UNDERLINE,
  },
  tmcLink2: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_9),
    fontSize: Value.CONSTANT_VALUE_13,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
    lineHeight: Value.CONSTANT_VALUE_18,
    textDecorationLine: Alignment.UNDERLINE,
  },
  disableing: {
    backgroundColor: Colors.CLEAR,
    width: '100%',
    height: '100%',
    position: Alignment.ABSOLUTE,
  },
};
