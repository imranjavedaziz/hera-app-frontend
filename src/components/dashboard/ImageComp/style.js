import Colors from '../../../constants/Colors';
import {Value} from '../../../constants/FixedValues';
import Alignment from '../../../constants/Alignment';
import {
  normalizeFont,
  dynamicSize,
} from '../../../utils/responsive';

export default {
  mainContainer: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  bgImage: {
    height: Value.CONSTANT_VALUE_420,
    width: Value.CONSTANT_VALUE_260,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  iconContainer: {
    flex: 0.88,
    justifyContent: Alignment.FLEXEND,
    alignItems: Alignment.CENTER,
  },
  iconImage: {
    marginBottom: dynamicSize(Value.CONSTANT_VALUE_50),
    justifyContent: Alignment.CENTER,
  },
  innerContainer: {
    flexDirection: Alignment.ROW,
  },
  locationText: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_12),
    paddingLeft: dynamicSize(Value.CONSTANT_VALUE_10),
    paddingBottom: dynamicSize(Value.CONSTANT_VALUE_5),
    color: Colors.WHITE,
    fontWeight: '800',
  },
  codeText: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_28),
    color: Colors.WHITE,
  },
  donerAge: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_12),
    color: Colors.WHITE,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_12),
  },
  textInnerContainer: {
    justifyContent: Alignment.FLEXEND,
    alignItems: Alignment.CENTER,
  },
  linearGradient: {
    flex:1,

    width: 260,
    borderRadius:20,
    justifyContent: Alignment.CENTER,
  },
};
