import Alignment from '../../../../constants/Alignment';
import Colors from '../../../../constants/Colors';
import {Fonts} from '../../../../constants/Constants';
import {Value} from '../../../../constants/FixedValues';
import {dynamicSize} from '../../../../utils/responsive';
export default {
  mainContainer: {
    paddingHorizontal: dynamicSize(Value.CONSTANT_VALUE_35),
  },
  innerContainer: {
    paddingBottom: Value.CONSTANT_VALUE_20,
  },
  innerView: {
    flexDirection: 'row',
  },
  line: {
    borderBottomWidth: 2,
    borderColor: '#e4e2d8',
  },
  Icon: {
    width: 13.5,
    height: 18.1,
    marginRight: 14.5,
  },
  heading: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0,
    color: Colors.BLACK,
  },
  Deactivate: {
    color: '#ff4544',
    fontFamily: Fonts.OpenSansBold,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0,
  },
  innerText: {
    fontWeight: Alignment.BOLD,
    fontFamily: Fonts.OpenSansBold,
    fontSize: 13,
    letterSpacing: 0,
    color: '#999488',
  },
  simple: {
    fontWeight: Alignment.BOLD,
    fontFamily: Fonts.OpenSansBold,
    fontSize: 13,
    letterSpacing: 0,
    color: '#999488',
    marginTop: 6,
  },
};
