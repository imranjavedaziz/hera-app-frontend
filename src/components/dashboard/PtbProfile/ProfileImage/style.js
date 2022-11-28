import {dynamicSize} from '../../../../utils/responsive';
import {Fonts} from '../../../../constants/Constants';
import Alignment from '../../../../constants/Alignment';
import {Value} from '../../../../constants/FixedValues';
import Colors from '../../../../constants/Colors';

export default {
  smmainContainer: {
    alignItems: Alignment.CENTER,
    shadowColor: 'rgba(0,0,0,0.23)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: 25,
    borderRadius: dynamicSize(90),
    width: 95,
    height: 95,
    backgroundColor: '#93c0ba',
  },
  mainContainer: {
    alignItems: Alignment.CENTER,
    shadowColor: 'rgba(0,0,0,0.23)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: 25,
    borderRadius: dynamicSize(90),
    width: 95,
    height: 95,
  },
  Image: {
    height: Value.CONSTANT_VALUE_86,
    width: Value.CONSTANT_VALUE_86,
    marginTop: 4,
    borderRadius: dynamicSize(90),
    // borderColor: Colors.WHITE,
    // borderWidth: 1,
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
    marginTop: Value.CONSTANT_VALUE_30,
  },
};
