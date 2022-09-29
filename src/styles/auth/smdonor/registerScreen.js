import Colors from '../../../constants/Colors';
import {Value, Prencentage} from '../../../constants/FixedValues';
import Alignment from '../../../constants/Alignment';
import {Fonts} from '../../../constants/Constants';

export default {
  title: {
    textAlign: Alignment.LEFT,
    width: Prencentage.PRECENTAGE_100,
    marginBottom: Value.CONSTANT_VALUE_20,
  },
  radioContainer: {
    flex: Value.CONSTANT_VALUE_1,
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    paddingVertical: Value.CONSTANT_VALUE_10,
    justifyContent: Alignment.FLEX_START,
    width: Prencentage.PRECENTAGE_100,
  },
  radio: {
    width: Value.CONSTANT_VALUE_30,
    resizeMode: 'cover',
    height: Value.CONSTANT_VALUE_30,
  },
  radioLabel: {
    marginLeft: Value.CONSTANT_VALUE_10,
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
    width: Value.CONSTANT_VALUE_140,
    height: Value.CONSTANT_VALUE_140,
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
  },
  checkboxLabel: {
    fontSize: Value.CONSTANT_VALUE_13,
    marginLeft: Value.CONSTANT_VALUE_10,
    flex: Value.CONSTANT_VALUE_1,
  },
  checkboxTitle: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  parentBtn: {
    fontWeight: Alignment.BOLD,
    alignSelf: Alignment.CENTER,
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_15,
    marginTop: Value.CONSTANT_VALUE_20,
    marginBottom:Value.CONSTANT_VALUE_60
  },
  imgPickerContainer: {
    width: Prencentage.PRECENTAGE_100,
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
  ImageText: {
    // alignItems: Alignment.FLEX_START,
    fontSize: Value.CONSTANT_VALUE_18,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.LABEL_BLACK,
  },
  Btn:{
    height:Value.CONSTANT_VALUE_80,
    width:Value.CONSTANT_VALUE_197,
    paddingHorizontal:Value.CONSTANT_VALUE_0,
    paddingVertical:Value.CONSTANT_VALUE_0,
    marginTop:Value.CONSTANT_VALUE_36
  }
};
