import {
  dynamicSize,
 } from '../../../../utils/responsive';
import {Fonts} from '../../../../constants/Constants';
import Alignment from '../../../../constants/Alignment';
import {Value} from '../../../../constants/FixedValues';
import Colors from '../../../../constants/Colors';

export default {
  mainContainer: {
    alignItems: Alignment.CENTER,
  },
  Image: {
    height: Value.CONSTANT_VALUE_86,
    width: Value.CONSTANT_VALUE_86,
    borderRadius: dynamicSize(90),
  },
  cameraContainer: {
    height: Value.CONSTANT_VALUE_30,
    width: Value.CONSTANT_VALUE_30,
    backgroundColor: Colors.CAMERA_BLUE,
    borderRadius: Value.CONSTANT_VALUE_30,
    left: Value.CONSTANT_VALUE_30,
    bottom: Value.CONSTANT_VALUE_30,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  cameraIcon: {
    height: Value.CONSTANT_VALUE_14,
    width: Value.CONSTANT_VALUE_17,
  },
  Heading: {
    fontSize: Value.CONSTANT_VALUE_11,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: Value.CONSTANT_VALUE_2_84,
    color: Colors.BLACK,
  },
  Name: {
    fontSize: Value.CONSTANT_VALUE_24,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
};
