import Colors from '../../../../constants/Colors';
import {Value} from '../../../../constants/FixedValues';
import Alignment from '../../../../constants/Alignment';
export default {
  conatiner: {
    marginTop: Value.CONSTANT_VALUE_20,
  },
  profileImgContainers: {
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
  },
  locationContainer: {
    position: Alignment.ABSOLUTE,
    bottom: Value.CONSTANT_VALUE_17,
    left: Value.CONSTANT_VALUE_18,
  },
  profileName: {
    fontSize: Value.CONSTANT_VALUE_20,
  },
  locationText: {
    fontWeight: Alignment.BOLD,
    fontSize: Value.CONSTANT_VALUE_11,
    marginLeft: Value.CONSTANT_VALUE_8,
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
  imgSelected: {
    alignSelf: 'center',
    tintColor: Colors.GREEN,
    alignItems: 'flex-end',
  },
  iconFonts: {
    fontSize: 16,
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
  emptyContainer: {
    alignItems: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_203,
  },
  emptyText: {
    fontSize: Value.CONSTANT_VALUE_23,
    color: Colors.BLACK,
  },
  content: {
    fontSize: Value.CONSTANT_VALUE_16,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    marginTop: Value.CONSTANT_VALUE_5,
  },
  btnView: {
    alignItems: Alignment.CENTER,
    bottom: 20,
    position: 'absolute',
  },
  headerIconBack: {
    marginLeft: Value.CONSTANT_VALUE_30,
  },
  upperContainer: {
    flex: Value.CONSTANT_VALUE_1,
    backgroundColor: Colors.BACKGROUND,
  },
  footerCon: {
    paddingBottom: Value.CONSTANT_VALUE_236,
  },
};
