
import {Fonts} from '../../../../constants/Constants';
import Colors from '../../../../constants/Colors';
import {Value} from '../../../../constants/FixedValues';
import Alignment from '../../../../constants/Alignment';

export default {
  mainContainer:{
    // height: Value.CONSTANT_VALUE_210,
    // width: Value.CONSTANT_VALUE_167,
    // backgroundColor:'red',
    borderRadius: Value.CONSTANT_VALUE_20,
    // marginVertical:Value.CONSTANT_VALUE_20
  },
    conatiner: {
        // justifyContent:Alignment.SPACE_BETWEEN,
        marginTop: Value.CONSTANT_VALUE_20,
        borderRadius: Value.CONSTANT_VALUE_180
      },
      profileImgContainner:
      {
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
      profileImgView:{
        height: Value.CONSTANT_VALUE_210,
        width: Value.CONSTANT_VALUE_167,
        borderRadius: Value.CONSTANT_VALUE_18,
        alignSelf: Alignment.CENTER,
        resizeMode : 'contain'
        // backgroundColor:'black'
      },
      locationContainer:{
        position: Alignment.ABSOLUTE,
         bottom: Value.CONSTANT_VALUE_17,
          left: Value.CONSTANT_VALUE_18,
        },
        profileName:{
          fontWeight: Alignment.BOLD,
          fontSize: Value.CONSTANT_VALUE_20,
          fontFamily: Fonts.OpenSansBold,
          color: Colors.BACKGROUND,
        },
        locationText:{
          fontWeight: Alignment.BOLD,
          fontSize: Value.CONSTANT_VALUE_11,
          letterSpacing: Value.CONSTANT_VALUE_2,
          color: Colors.PARA,
          fontFamily: Fonts.OpenSansBold,
          marginLeft: Value.CONSTANT_VALUE_8,
        }
}
