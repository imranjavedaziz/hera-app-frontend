import Alignment from '../../../../constants/Alignment';
import {Value,Prencentage} from '../../../../constants/FixedValues';
import {Fonts} from '../../../../constants/Constants';
import Colors from '../../../../constants/Colors';
import {
  dynamicSize,
  scaleWidth,
  statusHide,
} from '../../../../utils/responsive';

export default {
  mainContainer: {
    flex: Value.CONSTANT_VALUE_1,
    justifyContent: Alignment.FLEX_START,
    marginTop: statusHide(Value.CONSTANT_VALUE_105),
  },
  logo: {
    width: Value.CONSTANT_VALUE_200,
    height: Value.CONSTANT_VALUE_120,
    resizeMode: Alignment.CONTAIN,
    flex: Value.CONSTANT_VALUE_0,
    marginBottom: Value.CONSTANT_VALUE_25,
    marginLeft: dynamicSize(38),
  },

  headerText: {
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
  terms: {
    top: Value.CONSTANT_VALUE_2,
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_11,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
  mainText: {
    textAlign: Alignment.LEFT,
    fontSize: Value.CONSTANT_VALUE_13,
    color: Colors.COLOR_535858,
  },
  textView: {
    width: scaleWidth(Value.CONSTANT_VALUE_300),
    marginBottom: Value.CONSTANT_VALUE_50,
    alignItems: Alignment.CENTER,
  },
  payButton: {
    marginTop: dynamicSize(20),
    marginBottom: Value.CONSTANT_VALUE_30,
    backgroundColor: Colors.COLOR_163198196,
    textAlign: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    width: Value.CONSTANT_VALUE_236,
    height: Value.CONSTANT_VALUE_80,
    borderRadius: dynamicSize(40),
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  box: {
    borderWidth: Value.CONSTANT_VALUE_2,
    borderColor: Colors.COLOR_A3C6C4,
  },
  innerContainer: {
    marginTop: dynamicSize(34),
  },
  headerIcon: {
    paddingHorizontal: Value.CONSTANT_VALUE_5,
  },
  commitment: {
    bottom: Value.CONSTANT_VALUE_20,
  },
  txting: (font, padd) => ({
    color: '#fff',
    fontSize: 15,
    letterSpacing: 0,
    fontFamily: font,
    paddingLeft: dynamicSize(padd),
  }),
  blueContain: {
    backgroundColor: 'rgb(90,188,236)',
    minWidth: Value.CONSTANT_VALUE_324,
    maxWidth: Value.CONSTANT_VALUE_344,
    height: Value.CONSTANT_VALUE_64,
    borderRadius: Value.CONSTANT_VALUE_11,
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    marginBottom: Value.CONSTANT_VALUE_30,
  },
  btnView: {
    alignItems: Alignment.CENTER,
  },
  roleContainer: {
    paddingHorizontal: Value.CONSTANT_VALUE_20,
    paddingTop: Value.CONSTANT_VALUE_20,
    flex: Value.CONSTANT_VALUE_1,
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.SPACE_BETWEEN,
  },
  roleBox: {
    backgroundColor: Colors.WHITE,
    padding: Value.CONSTANT_VALUE_0,
    borderWidth: Value.CONSTANT_VALUE_1,
    borderRadius: Value.CONSTANT_VALUE_5,
    marginVertical: Value.CONSTANT_VALUE_10,
  },
  roleTxt: {fontSize: Value.CONSTANT_VALUE_16, fontFamily: Fonts.OpenSansBold},
  seperator: {
    height: Value.CONSTANT_VALUE_1,
    width: '100%',
    backgroundColor: Colors.COLOR_228226216,
  },
  subscribeBtn: {
    marginLeft: Value.CONSTANT_VALUE_10,
    paddingHorizontal: Value.CONSTANT_VALUE_5,
    backgroundColor: Colors.COLOR_5ABCEC,
    borderRadius: Value.CONSTANT_VALUE_3,
    minHeight: Value.CONSTANT_VALUE_20,
    maxHeight: Value.CONSTANT_VALUE_30,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    flex: Value.CONSTANT_VALUE_0,
  },
  subscribeTxt: {
    color: Colors.WHITE,
    fontSize: Value.CONSTANT_VALUE_12,
  },
  changeModalContainer: {
    flex: 1,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  changeModalBackdrop: {
    position: Alignment.ABSOLUTE,
    width: Prencentage.PRECENTAGE_100,
    height: Prencentage.PRECENTAGE_100,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: -1,
  },
  changeModalBox: {
    margin: Value.CONSTANT_VALUE_20,
    backgroundColor: Colors.WHITE,
    paddingVertical: Value.CONSTANT_VALUE_30,
    alignItems: Alignment.CENTER,
    paddingHorizontal: Value.CONSTANT_VALUE_20,
    maxWidth: Prencentage.PRECENTAGE_70,
  },
  changeModalTitle: {
    fontSize: Value.CONSTANT_VALUE_16,
    textAlign: Alignment.CENTER,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.COLOR_535858,
  },
  changeModalPara: {
    fontSize: Value.CONSTANT_VALUE_13,
    textAlign: Alignment.CENTER,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.COLOR_535858,
    marginBottom: Value.CONSTANT_VALUE_25,
    marginTop: Value.CONSTANT_VALUE_10,
  },
  changeModalBtn: {
    borderRadius: Value.CONSTANT_VALUE_30,
    paddingHorizontal: Value.CONSTANT_VALUE_30,
    paddingVertical: Value.CONSTANT_VALUE_20,
    backgroundColor: Colors.COLOR_A3C6C4,
  },
  changeModalBtnTxt: {
    color: Colors.COLOR_535858,
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansBold,
  },
};
