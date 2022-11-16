import {Value} from '../../../constants/FixedValues';
import {Fonts} from '../../../constants/Constants';
import Colors from '../../../constants/Colors';
import Alignment from '../../../constants/Alignment';
import {dynamicSize, scaleWidth} from '../../../utils/responsive';

export default {
  mainContainer: {
    flex: Value.CONSTANT_VALUE_1,
    alignItems: Alignment.CENTER,
  },
  fixedheaderStyle: {marginRight: Value.CONSTANT_VALUE_20},
  lookingFor: {
    width: '100%',
    marginTop: Value.CONSTANT_VALUE_50,
  },
  lookingForText: {
    fontFamily: Fonts.OpenSansRegular,
    marginBottom: Value.CONSTANT_VALUE_17,
    fontSize: Value.CONSTANT_VALUE_14,
    lineHeight: Value.CONSTANT_VALUE_21,
  },
  required: {
    color: Colors.RED,
    fontSize: Value.CONSTANT_VALUE_18,
  },
  heightTextView: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_14,
    lineHeight: 21,
    letterSpacing: 0,
    color: Colors.BLACK_0,
  },
  containerView: {
    marginBottom: -40,
    marginHorizontal: scaleWidth(35),
  },
  label: {
    position: Alignment.ABSOLUTE,
    left: Value.CONSTANT_VALUE_0,
    zIndex: -1,
    color: Colors.LABEL_BLACK,
  },
  ageContainer: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.SPACE_BETWEEN,
  },
  lookingsm: {
    alignItems: Alignment.CENTER,
    marginLeft: Value.CONSTANT_VALUE_10,
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
    marginBottom: Value.CONSTANT_VALUE_27,
    color: Colors.BLACK,
    lineHeight: Value.CONSTANT_VALUE_21,
  },
  lookingDonor: {
    marginLeft: Value.CONSTANT_VALUE_10,
    fontWeight: Alignment.BOLD,
    fontSize: Value.CONSTANT_VALUE_16,
    marginBottom: Value.CONSTANT_VALUE_29,
  },
  lookingsDonor: {
    marginLeft: Value.CONSTANT_VALUE_10,
    fontWeight: Alignment.BOLD,
    fontSize: Value.CONSTANT_VALUE_16,
  },
  SDonorContainer: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
  },
  heightContainer: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.SPACE_BETWEEN,
    paddingBottom: Value.CONSTANT_VALUE_10,
  },
  heightText: {
    color: Colors.RED,
    fontSize: Value.CONSTANT_VALUE_18,
  },
  chipText: {
    fontSize: Value.CONSTANT_VALUE_14,
    // marginBottom: dynamicSize(Value.CONSTANT_VALUE_14),
    marginTop: dynamicSize(Value.CONSTANT_VALUE_25),
    marginBottom: dynamicSize(Value.CONSTANT_VALUE_10),
    fontFamily: Fonts.OpenSansRegular,
  },
  chipsRequiredText: {
    color: Colors.RED,
    fontSize: Value.CONSTANT_VALUE_18,
  },
  hairContainer: {
    flexDirection: Alignment.ROW,
    flexWrap: 'wrap',
  },
  chips: {
    height: Value.CONSTANT_VALUE_41,
    width: Value.CONSTANT_VALUE_90,
    borderRadius: Value.CONSTANT_VALUE_21,
    justifyContent: Alignment.CENTER,
    marginRight: Value.CONSTANT_VALUE_9,
    marginVertical: Value.CONSTANT_VALUE_5,
  },
  eyeContainer: {
    flexDirection: Alignment.ROW,
    flexWrap: 'wrap',
    marginVerticle: Value.CONSTANT_VALUE_5,
    marginBottom: Value.CONSTANT_VALUE_20,
  },
  ageText: {
    marginVertical: Value.CONSTANT_VALUE_5,
    fontSize: Value.CONSTANT_VALUE_14,
    marginTop: Value.CONSTANT_VALUE_25,
    fontFamily: Fonts.OpenSansRegular,
  },
  heightTextInner: {
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansRegular,
  },
  ageRangeChip: {
    height: Value.CONSTANT_VALUE_41,
    width: Value.CONSTANT_VALUE_100,
    borderRadius: Value.CONSTANT_VALUE_21,
    justifyContent: Alignment.CENTER,
    marginRight: Value.CONSTANT_VALUE_5,
    marginVertical: Value.CONSTANT_VALUE_10,
    padding: Value.CONSTANT_VALUE_0,
  },
  chipInsideText: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    alignSelf: Alignment.CENTER,
  },
  flexRow: {
    flexDirection: Alignment.ROW,
  },
  headerTxt: {
    color: Colors.RED,
    textDecorationLine: Alignment.UNDERLINE,
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
  },
  Btn: {
    height: Value.CONSTANT_VALUE_80,
    width: Value.CONSTANT_VALUE_195,
    marginTop: 26,
    marginBottom: 78,
  },
  header: {justifyContent: Alignment.FLEXEND},
  headerText: {
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.RED,
    marginRight: 30,
  },
  heightlmt: {
    fontSize: Value.CONSTANT_VALUE_14,
    fontFamily: Fonts.OpenSansBold,
  },
};
