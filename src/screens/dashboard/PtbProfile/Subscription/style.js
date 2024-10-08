import Alignment from '../../../../constants/Alignment';
import {Value} from '../../../../constants/FixedValues';
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
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.FLEX_START,
    marginTop: statusHide(Value.CONSTANT_VALUE_105),
  },
  logo: {
    width: Value.CONSTANT_VALUE_200,
    height: Value.CONSTANT_VALUE_120,
    resizeMode: Alignment.CONTAIN,
    flex: Value.CONSTANT_VALUE_0,
    marginBottom: Value.CONSTANT_VALUE_25,
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
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_13,
    color: Colors.COLOR_535858,
  },
  textView: {
    width: scaleWidth(Value.CONSTANT_VALUE_300),
    marginBottom: Value.CONSTANT_VALUE_50,
  },
  payButton: {
    marginTop: dynamicSize(26),
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
    bottom: Value.CONSTANT_VALUE_10,
  },
  txting: (font,padd) => ({ color: "#fff", fontSize: 15, letterSpacing: 0, fontFamily: font, paddingLeft: dynamicSize(padd) }),
  blueContain: {
    backgroundColor: "rgb(90,188,236)",
    width: Value.CONSTANT_VALUE_324,
    height: Value.CONSTANT_VALUE_64,
    borderRadius: Value.CONSTANT_VALUE_11,
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    marginBottom:Value.CONSTANT_VALUE_30
  }
};
