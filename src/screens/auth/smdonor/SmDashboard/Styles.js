import {Fonts} from '../../../../constants/Constants';
import Colors from '../../../../constants/Colors';
import {Value} from '../../../../constants/FixedValues';
import Alignment from '../../../../constants/Alignment';
import {width} from '../../../../utils/responsive';

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
    width: (width - 70) / 2,
  },
  locationContainer: {
    position: Alignment.ABSOLUTE,
    bottom: Value.CONSTANT_VALUE_17,
    left: Value.CONSTANT_VALUE_18,
  },
  profileName: {
    fontSize: Value.CONSTANT_VALUE_20,
    fontFamily: Fonts.OpenSansSemibold,
    color: Colors.WHITE,
    marginBottom: Value.CONSTANT_VALUE_5,
  },
  locationText: {
    fontWeight: Alignment.BOLD,
    fontSize: Value.CONSTANT_VALUE_11,
    letterSpacing: Value.CONSTANT_VALUE_2_84,
    color: Colors.WHITE,
    fontFamily: Fonts.OpenSansBold,
    marginLeft: Value.CONSTANT_VALUE_8,
    opacity: 0.75,
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
  search: {},
  subTitle: {marginBottom: Value.CONSTANT_VALUE_32},
  stateItem: {
    flexDirection: 'row',
  },
  stateItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  unSel: {
    paddingVertical: Value.CONSTANT_VALUE_10,
    fontSize: Value.CONSTANT_VALUE_20,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK,
    justifyContent: 'flex-start',
  },
  sel: {
    paddingVertical: Value.CONSTANT_VALUE_10,
    fontSize: Value.CONSTANT_VALUE_20,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
    justifyContent: 'flex-start',
  },
  imgSel: {
    alignSelf: 'center',
    tintColor: Colors.GREEN,
    alignItems: 'flex-end',
  },
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
    borderRadius: Value.CONSTANT_VALUE_20,
    justifyContent: Alignment.CENTER,
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  iconHead: {
    position: 'absolute',
    paddingTop: Value.CONSTANT_VALUE_15,
    marginHorizontal: Value.CONSTANT_VALUE_60,
  },
  flatlist: {
    paddingBottom: Value.CONSTANT_VALUE_150,
  },
  loaderContainer: {
    marginTop: Value.CONSTANT_VALUE_15,
  },
};
