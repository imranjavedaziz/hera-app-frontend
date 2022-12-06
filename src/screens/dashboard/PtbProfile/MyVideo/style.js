import Alignment from '../../../../constants/Alignment';
import {Value} from '../../../../constants/FixedValues';
import {dynamicSize, width} from '../../../../utils/responsive';
import {Fonts} from '../../../../constants/Constants';
import Colors from '../../../../constants/Colors';
export default {
  mainContainer: {
    flex: dynamicSize(Value.CONSTANT_VALUE_1),
    marginTop: dynamicSize(Value.CONSTANT_VALUE_40),
  },
  headerIcon: {
    paddingTop: dynamicSize(Value.CONSTANT_VALUE_45),
    marginLeft: Value.CONSTANT_VALUE_30,
  },
  headingContainer: {
    marginTop: dynamicSize(Value.CONSTANT_VALUE_16),
  },
  heading: {
    textAlign: Alignment.CENTER,
    fontSize: Value.CONSTANT_VALUE_11,
    letterSpacing: 2.84,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.COLOR_535858,
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
    alignSelf: Alignment.CENTER,
    top: 180 / 2,
  },
  videoSel: {
    position: Alignment.ABSOLUTE,
    right: Value.CONSTANT_VALUE_5,
    top: Value.CONSTANT_VALUE_10,
  },
  deleteBtnContainer: {
    flexDirection: Alignment.ROW,
    paddingVertical: Value.CONSTANT_VALUE_57,
    justifyContent: Alignment.CENTER,
  },
  rmvText: {
    fontFamily: Fonts.OpenSansBold,
    textDecorationLine: Alignment.UNDERLINE,
    letterSpacing: Value.CONSTANT_VALUE_FRAC3_62,
    marginLeft: Value.CONSTANT_VALUE_15,
    fontSize: Value.CONSTANT_VALUE_14,
  },
  centeredView: {
    flex: Value.CONSTANT_VALUE_1,
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_52,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    height: Value.CONSTANT_VALUE_230,
    width: Value.CONSTANT_VALUE_283,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Value.CONSTANT_VALUE_23,
    paddingVertical: Value.CONSTANT_VALUE_20,
    alignItems: Alignment.CENTER,
    borderWidth: Value.CONSTANT_VALUE_1,
    borderColor: Colors.SEARCH_BOX,
  },
  modalHeader: {
    lineHeight: Value.CONSTANT_VALUE_21,
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
    paddingBottom: Value.CONSTANT_VALUE_5,
    color: Colors.COLOR_535858,
  },
  modalSubHeader: {
    textAlign: Alignment.CENTER,
    lineHeight: Value.CONSTANT_VALUE_18,
    marginTop: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansRegular,
  },
  modalOption1: {
    color: Colors.RED,
    fontSize: Value.CONSTANT_VALUE_16,
    paddingBottom: Value.CONSTANT_VALUE_10,
    marginVertical: Value.CONSTANT_VALUE_27,
    letterSpacing: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansBold,
  },
  modalOption2: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontWeight: Alignment.BOLD,
    letterSpacing: Value.CONSTANT_VALUE_1,
    fontFamily: Fonts.OpenSansBold,
  },
  videoCover: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    height: '100%',
  },
};
