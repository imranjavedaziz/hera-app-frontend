import Alignment from '../../../../constants/Alignment';
import Colors from '../../../../constants/Colors';
import {Fonts} from '../../../../constants/Constants';
import {Value} from '../../../../constants/FixedValues';
import {dynamicSize, width} from '../../../../utils/responsive';
export default {
  mainContainer: {
    paddingHorizontal: dynamicSize(Value.CONSTANT_VALUE_35),
  },
  innerContainer: {
    paddingBottom: Value.CONSTANT_VALUE_25,
  },
  innerView: {
    flexDirection: 'row',
  },
  line: {
    borderBottomWidth: 2,
    borderColor: '#e4e2d8',
  },
  Icon: {
    marginRight: 14.5,
  },
  red: {
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
    fontSize: Value.CONSTANT_VALUE_13,
    color: '#999488',
    marginTop: 6,
    marginBottom: 15,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: '#999488',
    borderStyle: 'solid',
    borderColor: '#979797',
    borderRadius: 90,
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    marginRight: 7,
  },
  desTexts: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_13,
    color: '#999488',
  },
  ContextRow: {
    flexDirection: 'row',
    marginTop: 6,
    width: width - dynamicSize(80),
  },
};
