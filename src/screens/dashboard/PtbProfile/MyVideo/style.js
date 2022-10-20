import Alignment from '../../../../constants/Alignment';
import {Value} from '../../../../constants/FixedValues';
import { dynamicSize, width } from "../../../../utils/responsive";
import {Fonts} from '../../../../constants/Constants';
import Colors from '../../../../constants/Colors';
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
  VdoContainer: {
    justifyContent:'center',
    width: width,
    height: 232,
    backgroundColor: Colors.VDOCONTAINER,
    marginTop: Value.CONSTANT_VALUE_30,
  },
  innerVdo: {
    alignItems: Alignment.CENTER,
    paddingTop: 82,
  },
  vdoHeading: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    lineHeight: Value.CONSTANT_VALUE_21,
    textAlign: Alignment.CENTER,
  },
  content: {
    marginTop: Value.CONSTANT_VALUE_5,
    textAlign: Alignment.CENTER,
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_13,
    lineHeight: Value.CONSTANT_VALUE_21,
  },
  imageOverlayWrapper: {
    position: Alignment.RELATIVE,
    overflow: Alignment.HIDDEN,
  },
  video: {
    overflow: Alignment.HIDDEN,
    width: width,
    height: 232,
    resizeMode: Alignment.COVER,
    marginTop: Value.CONSTANT_VALUE_3,
  },
  playIcon: {
    position: Alignment.ABSOLUTE,
    left: width / Value.CONSTANT_VALUE_2,
    top: Value.CONSTANT_VALUE_80,
  },
};
