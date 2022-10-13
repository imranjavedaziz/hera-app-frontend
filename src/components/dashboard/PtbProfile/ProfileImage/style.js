import {
  dynamicSize,
  normalizeFont,
  scaleHeight,
  scaleWidth,
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
    height: dynamicSize(86),
    width: dynamicSize(86),
    borderRadius: dynamicSize(90),
  },
  cameraContainer: {
    height: scaleHeight(30),
    width: scaleWidth(30),
    backgroundColor: Colors.CAMERA_BLUE,
    borderRadius: 30,
    left: 30,
    bottom: 30,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  cameraIcon: {
    height: 14,
    width: 17,
  },
  Heading: {
    fontSize: normalizeFont(15),
    fontFamily: Fonts.OpenSansBold,
    letterSpacing: 2.84,
  },
  Name: {fontSize: normalizeFont(24), fontFamily: Fonts.OpenSansBold},
};
