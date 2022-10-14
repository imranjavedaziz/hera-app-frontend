import Alignment from '../../../../constants/Alignment';
import {Value} from '../../../../constants/FixedValues';
import {dynamicSize} from '../../../../utils/responsive';
import Colors from '../../../../constants/Colors';
import {Fonts} from '../../../../constants/Constants';
export default {
  mainContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
  },
  headerIcon: {
    paddingTop: Value.CONSTANT_VALUE_5,
    paddingHorizontal: Value.CONSTANT_VALUE_30,
  },
  headingContainer: {
    marginTop: Value.CONSTANT_VALUE_16,
  },
  heading: {
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_11,
    letterSpacing: 2.84,
    fontFamily: Fonts.OpenSansBold,
  },
  innerHeadingContainer: {
    marginTop: Value.CONSTANT_VALUE_8,
  },
  innerHeading: {
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_23,
    fontFamily: Fonts.OpenSansBold,
  },
  iconView: {
    paddingHorizontal: 36,
  },
  passwordContainer: {
    marginTop: 45,
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
  },
  passwordText: {
    fontSize: 16,
    marginLeft: 14,
    fontFamily: Fonts.OpenSansBold,
  },
  deactivateContainer: {
    borderWidth: 1,
    width: 330,
    borderColor: '#E4E2D8',
  },
  deleteContainer: {
    borderWidth: 1,
    width: 330,
    borderColor: '#E4E2D8',
  },
};
