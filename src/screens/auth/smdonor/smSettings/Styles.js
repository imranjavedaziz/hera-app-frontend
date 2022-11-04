import Colors from '../../../../constants/Colors';
import {Value} from '../../../../constants/FixedValues';
import Alignment from '../../../../constants/Alignment';
import {Fonts} from '../../../../constants/Constants';

export default {
  headerContainer: {
    alignSelf: 'center',
    shadowColor: 'rgba(0,0,0,0.17)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: 34,
    borderRadius:100,
  },
  usernameText: {
    fontSize: Value.CONSTANT_VALUE_24,
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
  },
  profileImg: {
    width: Value.CONSTANT_VALUE_80,
    height: Value.CONSTANT_VALUE_80,
    borderRadius: Value.CONSTANT_VALUE_100,
    borderColor: Colors.WHITE,
  },
  profileImgContainner: {
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    height: Value.CONSTANT_VALUE_90,
    width: Value.CONSTANT_VALUE_90,
    borderWidth: Value.CONSTANT_VALUE_3,
    borderColor: Colors.GREEN,
    borderRadius: Value.CONSTANT_VALUE_100,
    marginBottom: Value.CONSTANT_VALUE_15,
  },
  greyText: {
    color: Colors.PARA,
  },
  camImg: {
    height: Value.CONSTANT_VALUE_14,
    width: Value.CONSTANT_VALUE_17,
  },
  camSelectedBtn: {
    position: Alignment.ABSOLUTE,
    bottom: Value.CONSTANT_VALUE_15,
    right: Value.CONSTANT_VALUE_0,
  },
  camBtn: {
    width: Value.CONSTANT_VALUE_30,
    height: Value.CONSTANT_VALUE_30,
    borderRadius: Value.CONSTANT_VALUE_15,
    backgroundColor: Colors.GREEN,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  tittle: {
    fontSize: Value.CONSTANT_VALUE_11,
    marginBottom: Value.CONSTANT_VALUE_10,
  },
  highlightContainer: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    width: '100%',
    marginTop: Value.CONSTANT_VALUE_35,
    justifyContent: Alignment.SPACE_BETWEEN,
  },
  text: {
    marginLeft: Value.CONSTANT_VALUE_18,
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
  textColor: {
    color: Colors.BLACK,
  },
  dot: {
    height: Value.CONSTANT_VALUE_12,
    width: Value.CONSTANT_VALUE_12,
    borderRadius: Value.CONSTANT_VALUE_6,
    backgroundColor: Colors.GREEN,
  },
  contain: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_35,
  },
  BtnContainer: {
    justifyContent: Alignment.CENTER,
    alignItems: Alignment.CENTER,
  },
  Btn: {
    width: Value.CONSTANT_VALUE_144,
    height: Value.CONSTANT_VALUE_59,
    paddingHorizontal: Value.CONSTANT_VALUE_0,
    paddingVertical: Value.CONSTANT_VALUE_0,
    marginTop: Value.CONSTANT_VALUE_35,
  },
  flexRow: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
  },
  flatlist: {
    paddingBottom: Value.CONSTANT_VALUE_300,
  },
  extraTxt: {
    marginLeft: 15,
  },
};
