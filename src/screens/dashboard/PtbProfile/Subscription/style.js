import Alignment from '../../../../constants/Alignment';
import {Value} from '../../../../constants/FixedValues';
import {Fonts} from '../../../../constants/Constants';
import Colors from '../../../../constants/Colors';
import {dynamicSize, scaleWidth} from '../../../../utils/responsive';

export default {
  mainContainer: {
    flex: Value.CONSTANT_VALUE_1,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.FLEX_START,
    marginTop: Value.CONSTANT_VALUE_40,
  },
  logo: {
    width: Value.CONSTANT_VALUE_200,
    height: Value.CONSTANT_VALUE_120,
    resizeMode: Alignment.CONTAIN,
    flex: Value.CONSTANT_VALUE_0,
    marginBottom: Value.CONSTANT_VALUE_25,
    marginTop:Value.CONSTANT_VALUE_20
  },
  header: {justifyContent: Alignment.FLEXEND},
  headerText: {
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
  terms: {
    
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_11,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
  mainText: {
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_13,
    color: Colors.BLACK,
  },
  textView: {
    width: scaleWidth(Value.CONSTANT_VALUE_332),
    marginBottom: Value.CONSTANT_VALUE_75,
  },
  payButton: {
    marginTop: dynamicSize(36),
    marginBottom: Value.CONSTANT_VALUE_30,
    backgroundColor: Colors.COLOR_163198196,
    textAlign: Alignment.CENTER,
    width: dynamicSize(236),
    height: dynamicSize(80),
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
};
