import Colors from '../../../constants/Colors';
import {Value} from '../../../constants/FixedValues';
import Alignment from '../../../constants/Alignment';
import {Fonts} from '../../../constants/Constants';
import {
  normalizeFont,
  scaleHeight,
  scaleWidth,
  dynamicSize,
} from '../../../utils/responsive';

export default {
  mainContainer: {
    height: scaleHeight(Value.CONSTANT_VALUE_375),
    width: scaleWidth(Value.CONSTANT_VALUE_290),
    justifyContent: Alignment.CENTER,
    alignItems:Alignment.CENTER,
  },
  bgImage: {
    width: scaleWidth(Value.CONSTANT_VALUE_360),
    height: scaleHeight(Value.CONSTANT_VALUE_445),
  },
  iconContainer: {
    flex: 0.88,
    justifyContent:  Alignment.FLEXEND,
    alignItems:Alignment.CENTER,
  },
  iconImage:{
    marginBottom: dynamicSize(Value.CONSTANT_VALUE_8),
    justifyContent:Alignment.CENTER,
  },
  innerContainer: {
    flexDirection:Alignment.ROW,
  },
  locationText: {
    fontSize:  normalizeFont(Value.CONSTANT_VALUE_12),
    paddingLeft:  dynamicSize(Value.CONSTANT_VALUE_10),
    color: Colors.WHITE,
    fontWeight: '800',
  },
  codeText: {
    fontSize:  normalizeFont(Value.CONSTANT_VALUE_28),
    color: Colors.WHITE,
  },
  donerAge: {
    fontSize:  normalizeFont(Value.CONSTANT_VALUE_12),
    color: Colors.WHITE,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_12),
  },
  textInnerContainer:{
    justifyContent: Alignment.FLEXEND,
    alignItems: Alignment.CENTER,
  }
};
