import Alignment from '../../../../constants/Alignment';
import {Value} from '../../../../constants/FixedValues';
import {dynamicSize, width} from '../../../../utils/responsive';
import {Fonts} from '../../../../constants/Constants';
import Colors from '../../../../constants/Colors';
export default {
  mainContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
  },
  headerIcon: {
    paddingTop: dynamicSize(Value.CONSTANT_VALUE_10),
    paddingHorizontal: Value.CONSTANT_VALUE_30,
  },
  headingContainer: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_16),
  },
  heading: {
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_11,
    letterSpacing: 2.84,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
  innerHeadingContainer: {
    marginTop: Value.CONSTANT_VALUE_8,
  },
  innerHeading: {
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_23,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
  VdoContainer: {
    justifyContent: Alignment.CENTER,
    // width: width,
    height: 232,
    backgroundColor: Colors.VDOCONTAINER,
    marginTop: Value.CONSTANT_VALUE_30,
  },
  innerVdo: {
    alignItems: Alignment.CENTER,
  },
  vdoHeading: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    lineHeight: Value.CONSTANT_VALUE_21,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
  },
  content: {
    marginTop: Value.CONSTANT_VALUE_5,
    textAlign: Alignment.CENTER,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_13,
    lineHeight: Value.CONSTANT_VALUE_21,
    color: Colors.BLACK,
  },
  imageOverlayWrapper: {
    position: Alignment.RELATIVE,
    overflow: Alignment.HIDDEN,
  },
  video: {
    overflow: Alignment.HIDDEN,
    width: width,
    height: 232,
    marginTop: Value.CONSTANT_VALUE_3,
  },
  playIcon: {
    position: Alignment.ABSOLUTE,
    left: width / Value.CONSTANT_VALUE_2_3,
    top: Value.CONSTANT_VALUE_80,
  },
};
