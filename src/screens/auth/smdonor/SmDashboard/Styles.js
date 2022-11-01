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
    paddingTop: Value.CONSTANT_VALUE_10,
  },
  title: {marginBottom: Value.CONSTANT_VALUE_8},
  search: {
    paddingBottom: Value.CONSTANT_VALUE_10,
  },
  subTitle: {marginBottom: Value.CONSTANT_VALUE_32},
  stateItem: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  stateItemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unSel: {
    paddingVertical: Value.CONSTANT_VALUE_10,
    fontSize: Value.CONSTANT_VALUE_20,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK,
  },
  sel: {
    paddingVertical: Value.CONSTANT_VALUE_10,
    fontSize: Value.CONSTANT_VALUE_20,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
  imgSel: {marginLeft: Value.CONSTANT_VALUE_100, tintColor: Colors.GREEN},
  iconFont: {
    fontFamily: Fonts.OpenSansBold,
    textDecorationLine: 'underline',
    color: Colors.BLACK,
  },
  stateSubtitle: {marginBottom: Value.CONSTANT_VALUE_15},
  flexRow: {
    flexDirection: 'row',
  },
  gradient: {
    width: '100%',
    height: '100%',
    opacity: 0.2,
    borderRadius: Value.CONSTANT_VALUE_18,
  },
  iconHead: {
    position: 'absolute',
    paddingTop: Value.CONSTANT_VALUE_15,
    marginHorizontal: Value.CONSTANT_VALUE_60,
  },
  flatlist: {
    paddingBottom: Value.CONSTANT_VALUE_150,
  },
};
