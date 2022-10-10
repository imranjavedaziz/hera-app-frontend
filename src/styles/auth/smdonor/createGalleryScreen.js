import Colors from '../../../constants/Colors';
import {Value} from '../../../constants/FixedValues';
import Alignment from '../../../constants/Alignment';
import {Fonts} from '../../../constants/Constants';
import {width} from '../../../utils/responsive';

export default {
  profileImgContainner: {
    borderWidth: Value.CONSTANT_VALUE_3,
    borderColor: Colors.GREEN,
    borderRadius: Value.CONSTANT_VALUE_40,
    marginBottom: Value.CONSTANT_VALUE_15,
  },
  profileImg: {
    width: Value.CONSTANT_VALUE_40,
    height: Value.CONSTANT_VALUE_40,
    borderRadius: Value.CONSTANT_VALUE_20,
    borderWidth: Value.CONSTANT_VALUE_2,
    borderColor: Colors.WHITE,
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
    resizeMode: Alignment.CONTAIN,
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
  },
  subTitle:{
    marginBottom: Value.CONSTANT_VALUE_20,
    maxWidth: '90%'
},
delContainer:{
    height: Value.CONSTANT_VALUE_124,
     width: Value.CONSTANT_VALUE_413,
     alignItems:Alignment.CENTER,
     justifyContent: Alignment.CENTER,
     marginVertical:Value.CONSTANT_VALUE_22,
},
selectedText:{
    fontFamily: Fonts.OpenSansItalic,
     color: 'grey'
},
deleteBtnContainer:{
    flexDirection:Alignment.ROW,
     paddingVertical:Value.CONSTANT_VALUE_21
},
rmvText:{
        fontFamily: Fonts.OpenSansBold,
        textDecorationLine: Alignment.UNDERLINE,
        letterSpacing:Value.CONSTANT_VALUE_FRAC36 ,
        marginLeft: Value.CONSTANT_VALUE_15
},
selectIcon:{
  marginLeft:Value.CONSTANT_VALUE_85,
  marginBottom:Value.CONSTANT_VALUE_88
}
};
