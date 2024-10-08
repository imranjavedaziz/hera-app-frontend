import {Fonts} from '../../../../constants/Constants';
import Colors from '../../../../constants/Colors';
import {Value} from '../../../../constants/FixedValues';
import Alignment from '../../../../constants/Alignment';
import {
  dynamicSize,
  height,
  normalizeFont,
  px,
  statusHide,
  width,
} from '../../../../utils/responsive';
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
  clearView: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  clearText: {
    fontFamily: Fonts.OpenSansBold,
    textDecorationLine: Alignment.UNDERLINE,
    fontSize: 16,
    letterSpacing: 0,
    color: 'rgb(255,69,68)',
    height: 22,
  },
  cancelbtn: {
    justifyContent: Alignment.FLEXEND,
    alignItems: Alignment.FLEXEND,
    marginBottom: Value.CONSTANT_VALUE_25,
    marginRight: 20
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
    width: (width - px(70)) / 2,
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
    width: 96,
  },
  profileFooter: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.CENTER,
    alignSelf: Alignment.CENTER,
  },
  headerIcon: {
    marginTop: Value.CONSTANT_VALUE_40,
    paddingHorizontal: 30,
  },
  androidIconHeader: {
    paddingHorizontal: 30,
  },
  title: {marginBottom: Value.CONSTANT_VALUE_8},
  search: {alignItems: Alignment.CENTER, justifyContent: Alignment.CENTER},
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
    fontSize: 16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.COLOR_RED,
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
    position: Alignment.ABSOLUTE,
    top: height / 2.5,
    alignSelf: Alignment.CENTER,
    width: Value.CONSTANT_VALUE_40,
    height: Value.CONSTANT_VALUE_40,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    borderRadius: Value.CONSTANT_VALUE_35,
    backgroundColor: Colors.WHITE,
    zIndex: Value.CONSTANT_VALUE_999999,
  },
  emptyContainer: {
    alignItems: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_203,
  },
  emptyText: {
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_23,
    color: Colors.BLACK,
  },
  content: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: Value.CONSTANT_VALUE_16,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginTop: Value.CONSTANT_VALUE_5,
  },
  Btn: {
    height: Value.CONSTANT_VALUE_80,
    width: Value.CONSTANT_VALUE_259,
    paddingVertical: Value.CONSTANT_VALUE_0,
    paddingHorizontal: Value.CONSTANT_VALUE_0,
  },
  btnView: {
    alignItems: Alignment.CENTER,
    bottom: 20,
    position: 'absolute',
  },
  headerIconBack: {
    marginLeft: Value.CONSTANT_VALUE_30,
  },
  CancelBack: {
    marginRight: Value.CONSTANT_VALUE_30,
  },
  upperContainer: {
    flex: Value.CONSTANT_VALUE_1,
    backgroundColor: Colors.BACKGROUND,
  },
  con: {
    marginTop: statusHide(Value.CONSTANT_VALUE_105),
    alignItems: Alignment.CENTER,
    flex: Value.CONSTANT_VALUE_1,
  },
  containrMain: {
    flex: Value.CONSTANT_VALUE_1,
    backgroundColor: Colors.BACKGROUND,
  },
  emptyCardContainer: {
    marginTop: Value.CONSTANT_VALUE_110,
    alignSelf: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    paddingHorizontal: Value.CONSTANT_VALUE_10,
  },
  sryText: {
    textAlign: Alignment.CENTER,
    fontSize: normalizeFont(Value.CONSTANT_VALUE_23),
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
  },
  innerText: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_23),
    textAlign: Alignment.CENTER,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_5),
  },
  innerText2: {
    fontSize: normalizeFont(Value.CONSTANT_VALUE_16),
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginTop: dynamicSize(Value.CONSTANT_VALUE_5),
    fontFamily: Fonts.OpenSansRegular,
  },
};
