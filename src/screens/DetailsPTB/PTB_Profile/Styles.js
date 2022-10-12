import {Fonts} from '../../../constants/Constants';
import Colors from '../../../constants/Colors';
import {Value} from '../../../constants/FixedValues';
import Alignment from '../../../constants/Alignment';

export default {
        profileLogo: {
          width: Value.CONSTANT_VALUE_80,
          height: Value.CONSTANT_VALUE_80,
          borderRadius: Value.CONSTANT_VALUE_40,
        },
        location: {
          flexDirection: Alignment.ROW,
          marginTop: Value.CONSTANT_VALUE_10,
          alignItems: Alignment.CENTER,
        },
        locationText: {
          fontFamily: Fonts.OpenSansRegular,
          marginLeft: Value.CONSTANT_VALUE_5,
        },
        profileName: {
          fontFamily: Fonts.OpenSansRegular,
          fontSize: Value.CONSTANT_VALUE_32,
          fontWeight: Alignment.BOLD,
          color: Colors.BLACK,
        },
        profileImg: {
          flexDirection: Alignment.ROW_REVERSE,
          position: Alignment.ABSOLUTE,
          right: Value.CONSTANT_VALUE_3,
          top: Value.CONSTANT_VALUE_10,
        },
        profileType: {
          fontFamily: Fonts.OpenSansRegular,
          fontSize: Value.CONSTANT_VALUE_20,
        },
        ageContainer: {
          flexDirection: Alignment.ROW,
          marginVertical: Value.CONSTANT_VALUE_15,
          marginBottom: Value.CONSTANT_VALUE_52,
        },
        ageYrs: {
          fontFamily: Fonts.OpenSansRegular,
          fontWeight: Alignment.BOLD,
          color: Colors.BLACK,
        },
        bioBackground: {
          height: Value.CONSTANT_VALUE_70,
          width: Value.CONSTANT_VALUE_70,
          position: Alignment.ABSOLUTE,
          top: -35,
        },
        bioText: {
          fontFamily: Fonts.OpenSansLight,
          fontSize: Value.CONSTANT_VALUE_22,
        },
        highlits: {
          backgroundColor: Colors.HIGHLIGHT_PINK,
          marginRight: Value.CONSTANT_VALUE_8,
          height: Value.CONSTANT_VALUE_31,
          alignContent: Alignment.CENTER,
          justifyContent: Alignment.CENTER,
          paddingHorizontal: Value.CONSTANT_VALUE_5,
          marginVertical: Value.CONSTANT_VALUE_15,
        },
        videoText: {
          fontFamily: Fonts.OpenSansRegular,
          marginVertical: Value.CONSTANT_VALUE_15,
          fontWeight: Alignment.BOLD,
        },
        videoContainer: {
          height: Value.CONSTANT_VALUE_200,
          backgroundColor: Colors.BLACK,
        },
        reqSentBtn: {
          flexDirection: Alignment.ROW,
          alignItems: Alignment.CENTER,
          justifyContent: Alignment.CENTER,
          marginHorizontal: Value.CONSTANT_VALUE_80,
          marginVertical: Value.CONSTANT_VALUE_50,
          height: Value.CONSTANT_VALUE_80,
        },
        reqsentText: {
          letterSpacing: Value.CONSTANT_VALUE_FRAC36,
          fontFamily: Fonts.OpenSansBold,
          color: Colors.BLACK,
          marginHorizontal: Value.CONSTANT_VALUE_10
        },
        declineReq: {
          flexDirection: Alignment.ROW,
          alignItems: Alignment.CENTER,
          justifyContent: Alignment.CENTER,
          marginHorizontal: Value.CONSTANT_VALUE_30,
          marginVertical: Value.CONSTANT_VALUE_50,
          height: Value.CONSTANT_VALUE_80,
          width: Value.CONSTANT_VALUE_297,
        },
        declineText: {
          letterSpacing: Value.CONSTANT_VALUE_FRAC36,
          color: Colors.RED,
          fontFamily: Fonts.OpenSansBold,
          margin: Value.CONSTANT_VALUE_10,
        },
        sendMsgBtn: {
          flexDirection: Alignment.ROW,
          alignItems: Alignment.CENTER,
          borderWidth: Value.CONSTANT_VALUE_1,
          borderColor: Colors.COLOR_A3C6C4,
          borderRadius: Value.CONSTANT_VALUE_40,
          justifyContent: Alignment.CENTER,
          marginHorizontal: Value.CONSTANT_VALUE_30,
          marginVertical: Value.CONSTANT_VALUE_50,
          height: Value.CONSTANT_VALUE_80,
          width:Value.CONSTANT_VALUE_296,
        },
        sendMsgText: {
          letterSpacing: Value.CONSTANT_VALUE_FRAC36,
          fontFamily: Fonts.OpenSansBold,
          color: Colors.BLACK,
          marginHorizontal: Value.CONSTANT_VALUE_10
        },
        highlitsText: {
          fontFamily: Fonts.OpenSansRegular,
        }
}
