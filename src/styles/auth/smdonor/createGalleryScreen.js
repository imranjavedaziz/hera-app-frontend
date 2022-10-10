import Colors from '../../../constants/Colors';
import {Value} from '../../../constants/FixedValues';
import Alignment from '../../../constants/Alignment';
import {Fonts} from '../../../constants/Constants';
import {width} from '../../../utils/responsive';

export default {
  profileImgContainner: {
    borderWidth: Value.CONSTANT_VALUE_2,
    borderColor: Colors.GREEN,
    borderRadius: Value.CONSTANT_VALUE_40,
    marginBottom: Value.CONSTANT_VALUE_15,
  },
  profileImg: {
    width: Value.CONSTANT_VALUE_40,
    height: Value.CONSTANT_VALUE_40,
    borderRadius: Value.CONSTANT_VALUE_20,
    borderWidth: Value.CONSTANT_VALUE_2,
    borderColor: Colors.CLEAR,
  },
  galleryImgContainer: {
    flex: Value.CONSTANT_VALUE_1,
    flexWrap: 'wrap',
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.SPACE_BETWEEN,
    // alignItems: Alignment.CENTER,
    // justifyContent: Alignment.CENTER
  },
  galleryImgView: {
    width: width / Value.CONSTANT_VALUE_3 - Value.CONSTANT_VALUE_2,
    height: width / Value.CONSTANT_VALUE_3 - Value.CONSTANT_VALUE_2,
    backgroundColor: Colors.BORDER_LINE,
    marginTop: Value.CONSTANT_VALUE_3,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  camIcon: {
    tintColor: Colors.BLACK,
    maxWidth: Value.CONSTANT_VALUE_25,
    resizeMode: 'contain',
    // alignItems: Alignment.CENTER,
    // justifyContent: Alignment.CENTER,
    // alignSlef:'center'
  },
  videoContainer: {
    width: width,
    height: (width / Value.CONSTANT_VALUE_3 - Value.CONSTANT_VALUE_2) * 1.5,
    backgroundColor: Colors.BORDER_LINE,
    marginTop: Value.CONSTANT_VALUE_3,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
  },
  videoTitle: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.BLACK,
  },
  videoPara: {
    fontSize: Value.CONSTANT_VALUE_13,
    fontFamily: Fonts.OpenSansRegular,
    color: Colors.BLACK,
  },
  p1: {
    textAlign: Alignment.CENTER,
    marginTop: Value.CONSTANT_VALUE_5,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansRegular,
  },
  p2: {
    textAlign: Alignment.CENTER,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansRegular,
  },
  btn:{
    height:Value.CONSTANT_VALUE_80,
    width:Value.CONSTANT_VALUE_259,
    paddingHorizontal:Value.CONSTANT_VALUE_0 ,
  }
};
