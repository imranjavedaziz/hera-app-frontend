import {dynamicSize} from '../../../../utils/responsive';
import {Fonts} from '../../../../constants/Constants';
import Alignment from '../../../../constants/Alignment';
import {Value} from '../../../../constants/FixedValues';
import Colors from '../../../../constants/Colors';
import {Platform} from 'react-native';

export default {
  smmainContainer: {
    alignItems: Alignment.CENTER,
    shadowColor: 'rgba(0,0,0,0.17)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: Value.CONSTANT_VALUE_1,
    elevation: Value.CONSTANT_VALUE_1,
    shadowRadius: Value.CONSTANT_VALUE_34,
    borderRadius: dynamicSize(90),
    width: Value.CONSTANT_VALUE_95,
    height: Value.CONSTANT_VALUE_95,
    backgroundColor: '#E2E1D8',
  },
  mainContainer: {
    alignItems: Alignment.CENTER,
    shadowColor: 'rgba(0,0,0,0.17)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: Value.CONSTANT_VALUE_34,
    borderRadius: dynamicSize(100),
    width: Value.CONSTANT_VALUE_95,
    height: Value.CONSTANT_VALUE_95,
    backgroundColor: Platform.OS === 'ios' ? '#E2E1D8' : '#f2f2f2',
  },
  SmImage: {
    height: Value.CONSTANT_VALUE_86,
    width: Value.CONSTANT_VALUE_86,
    marginTop: 4,
    borderRadius: dynamicSize(90),
    borderColor: Colors.WHITE,
    borderWidth: 1,
  },
  Image: {
    height: Value.CONSTANT_VALUE_86,
    width: Value.CONSTANT_VALUE_86,
    marginTop: Value.CONSTANT_VALUE_4,
    borderRadius: dynamicSize(90),
    backgroundColor: 'rgb(226, 225, 216)',
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
  roleId: {
    fontSize: Value.CONSTANT_VALUE_11,
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: Value.CONSTANT_VALUE_2_84,
    color: Colors.BLACK,
    marginTop: Value.CONSTANT_VALUE_8,
    textTransform: Alignment.UPPERCASE,
  },
  Name: {
    fontSize: Value.CONSTANT_VALUE_24,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
    marginTop: Value.CONSTANT_VALUE_26,
  },
  upperContainer: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
};
