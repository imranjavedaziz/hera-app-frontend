import {Value} from '../../constants/FixedValues';
import {Fonts} from '../../constants/Constants';
import Colors from '../../constants/Colors';
import Alignment from '../../constants/Alignment';
import {dynamicSize} from '../../utils/responsive';

export default {
  imgContainer: {
    flex: Value.CONSTANT_VALUE_1,
    alignItems: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_105,
    marginBottom: 4,
  },
  flex: {flex: Value.CONSTANT_VALUE_1, backgroundColor: Colors.BACKGROUND},
  profileContainer: {
    marginTop: Value.CONSTANT_VALUE_25,
  },
  imgBack: {
    borderRadius: Value.CONSTANT_VALUE_70,
    overflow: Alignment.HIDDEN,
    resizeMode: Alignment.COVER,
  },
  profileImg: {
    width: Value.CONSTANT_VALUE_31,
    height: Value.CONSTANT_VALUE_25,
    resizeMode: Alignment.CONTAIN,
  },
  profileUploadedStyle: {
    height: Value.CONSTANT_VALUE_14,
    width: Value.CONSTANT_VALUE_17,
  },
  ValidPwd: {
    marginLeft: Value.CONSTANT_VALUE_5,
    maxWidth: Value.CONSTANT_VALUE_13,
    resizeMode: Alignment.CONTAIN,
  },
  passwordCheck: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
  },
  tmc1: {
    fontSize: Value.CONSTANT_VALUE_13,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK,
    lineHeight: Value.CONSTANT_VALUE_21,
  },
  centeredView: {
    flex: Value.CONSTANT_VALUE_1,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  tmc: {
    flexDirection: Alignment.ROW,
    width: Value.CONSTANT_VALUE_306,
    right: Value.CONSTANT_VALUE_2,
  },
  rowContainer: {
    alignItems: Alignment.CENTER,
    right: Value.CONSTANT_VALUE_10,
    justifyContent: Alignment.CENTER,
  },
  tmcLink1: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_5),
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
  smRegister: {
    fontWeight: Alignment.BOLD,
    alignSelf: Alignment.CENTER,
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_16,
    marginTop: Value.CONSTANT_VALUE_20,
    marginBottom: Value.CONSTANT_VALUE_60,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK,
  },
  modalView: {
    height: Value.CONSTANT_VALUE_230,
    width: Value.CONSTANT_VALUE_283,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Value.CONSTANT_VALUE_23,
    paddingVertical: Value.CONSTANT_VALUE_20,
    alignItems: Alignment.CENTER,
  },
  modalHeader: {
    lineHeight: Value.CONSTANT_VALUE_21,
    fontWeight: Alignment.BOLD,
    fontFamily: Fonts.OpenSansRegular,
    paddingBottom: Value.CONSTANT_VALUE_5,
  },
  modalSubHeader: {
    textAlign: Alignment.CENTER,
    lineHeight: Value.CONSTANT_VALUE_18,
    marginTop: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansRegular,
  },
  modalOption1: {
    color: Colors.RED,
    fontSize: Value.CONSTANT_VALUE_16,
    paddingBottom: Value.CONSTANT_VALUE_10,
    marginVertical: Value.CONSTANT_VALUE_27,
    letterSpacing: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansBold,
  },
  modalOption2: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontWeight: Alignment.BOLD,
    letterSpacing: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansBold,
  },
  ImageText: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.LABEL_BLACK,
    marginTop: Value.CONSTANT_VALUE_10,
  },
  uploadBackground: {
    width: Value.CONSTANT_VALUE_35,
    height: Value.CONSTANT_VALUE_35,
    borderRadius: Value.CONSTANT_VALUE_18,
    backgroundColor: Colors.GREEN,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  background: {
    width: Value.CONSTANT_VALUE_138,
    height: Value.CONSTANT_VALUE_138,
    borderRadius: Value.CONSTANT_VALUE_70,
    backgroundColor: Colors.GREEN,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  Btn: {
    height: Value.CONSTANT_VALUE_80,
    width: Value.CONSTANT_VALUE_197,
    paddingHorizontal: Value.CONSTANT_VALUE_0,
    paddingVertical: Value.CONSTANT_VALUE_0,
  },
  BtnContainer: {
    paddingTop: Value.CONSTANT_VALUE_31,
    alignItems: Alignment.CENTER,
  },
  imgPickerContainer: {
    width: '100%',
    paddingHorizontal: Value.CONSTANT_VALUE_20,
    paddingVertical: Value.CONSTANT_VALUE_10,
  },
  pickerBtn: {
    paddingVertical: Value.CONSTANT_VALUE_20,
  },
  pickerBtnBorder: {
    borderBottomWidth: Value.CONSTANT_VALUE_1,
    borderBottomColor: Colors.BORDER_LINE,
  },
  pickerBtnLabel: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
  fullWidth: {
    paddingHorizontal: Value.CONSTANT_VALUE_40,
  },
  userImg: {
    position: Alignment.ABSOLUTE,
    bottom: Value.CONSTANT_VALUE_0,
    right: Value.CONSTANT_VALUE_10,
  },
  calender: {
    width: Value.CONSTANT_VALUE_16,
    height: Value.CONSTANT_VALUE_16,
  },
  footText: {
    marginTop: Value.CONSTANT_VALUE_20,
    marginBottom: Value.CONSTANT_VALUE_60,
  },
  innerView: {
    justifyContent: Alignment.FLEX_START,
  },
};
