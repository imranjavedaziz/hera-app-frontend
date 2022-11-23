import {Alignment, Colors} from '../../../../constants';
import {Value} from '../../../../constants/FixedValues';
import {dynamicSize, normalizeFont} from '../../../../utils/responsive';
import {Fonts} from '../../../../constants/Constants';
export default {
  mainContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
    backgroundColor: Colors.BACKGROUND_WHOLE,
  },
  headerIcon: {
    paddingTop: dynamicSize(Value.CONSTANT_VALUE_54),
    marginLeft: Value.CONSTANT_VALUE_30,
  },
  headingContainer: {
    alignItems: Alignment.CENTER,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_105),
  },
  Settings: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: normalizeFont(Value.CONSTANT_VALUE_11),
    letterSpacing: 2.84,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  innerHeading: {
    marginTop: Value.CONSTANT_VALUE_8,
    alignItems: Alignment.CENTER,
  },
  account: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: normalizeFont(Value.CONSTANT_VALUE_23),
    letterSpacing: Value.CONSTANT_VALUE_0,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  line: {
    width: 344,
    height: 1,
    borderWidth: 2,
    borderColor: '#e4e2d8',
    marginTop: 24,
  },
  changePsswrd: {
    marginTop: 45,
  },
  deactivate: {
    marginTop: 25,
  },
  delete: {
    marginTop: 28,
  },
};
