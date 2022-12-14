import {Value} from '../../../../constants/FixedValues';
import {Fonts} from '../../../../constants/Constants';
import Colors from '../../../../constants/Colors';
import Alignment from '../../../../constants/Alignment';

export default {
  imgContainer: {
    flex: Value.CONSTANT_VALUE_1,
    alignItems: Alignment.CENTER,
  },
  header: {
    marginLeft: Value.CONSTANT_VALUE_30,
  },
  containerStyle: {
    marginHorizontal: Value.CONSTANT_VALUE_0,
  },
  subTitle: {
    marginVertical: Value.CONSTANT_VALUE_8,
  },
  profileContainer: {
    marginTop: Value.CONSTANT_VALUE_20,
  },
  imgBack: {
    borderRadius: Value.CONSTANT_VALUE_70,
    overflow: Alignment.HIDDEN,
    resizeMode: Alignment.COVER,
  },
  profileImg: {
    width: Value.CONSTANT_VALUE_20,
    height: Value.CONSTANT_VALUE_20,
    resizeMode: Alignment.CONTAIN,
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
  },
  centeredView: {
    flex: Value.CONSTANT_VALUE_1,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  tmc: {
    flexDirection: Alignment.ROW,
  },
  tmcLink: {
    fontWeight: Alignment.BOLD,
    textDecorationLine: Alignment.UNDERLINE,
  },
  smRegister: {
    fontWeight: Alignment.BOLD,
    alignSelf: Alignment.CENTER,
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_15,
    marginTop: Value.CONSTANT_VALUE_25,
  },
  ImageText: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_18,
    color: Colors.LABEL_BLACK,
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
    width: Value.CONSTANT_VALUE_140,
    borderRadius: Value.CONSTANT_VALUE_70,
    justifyContent: Alignment.CENTER,
    backgroundColor: Colors.GREEN,
    height: Value.CONSTANT_VALUE_140,
    alignItems: Alignment.CENTER,
  },
  Btn: {
    height: Value.CONSTANT_VALUE_80,
    paddingHorizontal: Value.CONSTANT_VALUE_0,
    width: Value.CONSTANT_VALUE_197,
    paddingVertical: Value.CONSTANT_VALUE_0,
  },
  BtnContainer: {
    paddingTop: Value.CONSTANT_VALUE_31,
    alignItems: Alignment.CENTER,
  },
  imgPickerContainer: {
    paddingHorizontal: Value.CONSTANT_VALUE_20,
    width: '100%',
    paddingVertical: Value.CONSTANT_VALUE_10,
  },
  pickerBtn: {
    paddingVertical: Value.CONSTANT_VALUE_20,
  },
  pickerBtnBorder: {
    borderBottomColor: Colors.BORDER_LINE,
    borderBottomWidth: Value.CONSTANT_VALUE_1,
  },
  pickerBtnLabel: {
    fontSize: Value.CONSTANT_VALUE_16,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
  },
  imageStyling: {
    resizeMode: Alignment.COVER,
  },
};
