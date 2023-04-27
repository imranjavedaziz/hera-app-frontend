import {Alignment, Colors} from '../../../../constants';
import {Fonts} from '../../../../constants/Constants';
import {Value} from '../../../../constants/FixedValues';
import {
  dynamicSize,
  px,
  scaleHeight,
  scaleWidth,
  statusHide,
} from '../../../../utils/responsive';

export default {
  container: {
    flex: 1,
    marginTop: statusHide(Value.CONSTANT_VALUE_105),
  },
  heading: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_263),
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  matches:{
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_23,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
  },
  matchesDes:{
  fontFamily: Fonts.OpenSansRegular,
  fontSize: Value.CONSTANT_VALUE_16,
  textAlign: Alignment.CENTER,
  color: Colors.BLACK,
  },
};
