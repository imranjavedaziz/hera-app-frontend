import {Fonts} from '../../../../constants/Constants';
import Colors from '../../../../constants/Colors';
import {Value} from '../../../../constants/FixedValues';
import Alignment from '../../../../constants/Alignment';

export default {
  mainContainer: {},
  conatiner: {
    marginTop: Value.CONSTANT_VALUE_20,
  },
  profileImgContainner: {
    borderWidth: Value.CONSTANT_VALUE_2,
    borderColor: Colors.GREEN,
    borderRadius: Value.CONSTANT_VALUE_40,
  },
  profileImg: {
    width: Value.CONSTANT_VALUE_40,
    height: Value.CONSTANT_VALUE_40,
    borderRadius: Value.CONSTANT_VALUE_20,
    borderWidth: Value.CONSTANT_VALUE_2,
    borderColor: Colors.CLEAR,
  },
  profileImgView: {
    height: Value.CONSTANT_VALUE_210,
    width: Value.CONSTANT_VALUE_167,
  },
  locationContainer: {
    position: Alignment.ABSOLUTE,
    bottom: Value.CONSTANT_VALUE_17,
    left: Value.CONSTANT_VALUE_18,
  },
  profileName: {
    fontWeight: Alignment.BOLD,
    fontSize: Value.CONSTANT_VALUE_20,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BACKGROUND,
    marginBottom: Value.CONSTANT_VALUE_5,
  },
  locationText: {
    fontWeight: Alignment.BOLD,
    fontSize: Value.CONSTANT_VALUE_11,
    letterSpacing: Value.CONSTANT_VALUE_2,
    color: Colors.PARA,
    fontFamily: Fonts.OpenSansBold,
    marginLeft: Value.CONSTANT_VALUE_8,
  },
  profileFooter: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.CENTER,
    alignSelf: Alignment.CENTER,
  },
  headerIcon: {
    position: 'absolute',
    paddingTop: Value.CONSTANT_VALUE_5,
    marginHorizontal: Value.CONSTANT_VALUE_30,
  },
  title: {marginBottom: Value.CONSTANT_VALUE_8},
  search: {
    paddingBottom: Value.CONSTANT_VALUE_10,
  },
  subTitle: {marginBottom: Value.CONSTANT_VALUE_32},
};
