import {
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/Container';
import {useNavigation} from '@react-navigation/native';
import globalStyle from '../../../styles/global';
import Images from '../../../constants/Images';
import {CircleBtn} from '../../../components/Header';
import Strings from '../../../constants/Strings';
import Alignment from '../../../constants/Alignment';
import Video from 'react-native-video';
import styles from './Styles';

const PTB_profile = () => {
  const navigation = useNavigation();
  const [sendReq, setSendReq] = useState(false);
  const [requestDecline, SetRequestDecline] = useState(false);
  const [liked, setLiked] = useState(false);

  const highlits = Strings.PTB_Profile.profileHighlits;

  const headerComp = () => (
    <CircleBtn
      icon={Images.iconBack}
      onPress={() => navigation.goBack}
      accessibilityLabel="Cross Button, Go back"
    />
  );
  return (
    <Container
      showHeader={true}
      headerEnd={false}
      headerComp={headerComp}
      style={{}}>
      <View>
        <View style={styles.location}>
          <Image source={Images.iconmapblue} />
          <Text style={styles.locationText}>{Strings.PTB_Profile.State}</Text>
        </View>
        <Text style={styles.profileName}>{Strings.PTB_Profile.first_name}</Text>
        <Text style={styles.profileName}>
          {Strings.PTB_Profile.second_name}
        </Text>
        <View style={styles.profileImg}>
          <Image
            style={styles.profileLogo}
            source={{
              uri: 'https://dindin-preprod-backend.s3.amazonaws.com/chefs/kelsey-kane/profile-screen_2x.jpg',
            }}
          />
        </View>

        <Text style={styles.profileType}>{Strings.PTB_Profile.type}</Text>
        <View style={styles.ageContainer}>
          <Text>Age: </Text>
          <Text style={styles.ageYrs}>
            {Strings.PTB_Profile.age} {Strings.PTB_Profile.yrs}
          </Text>
        </View>
        <View>
          <ImageBackground
            source={Images.QUOTES}
            style={styles.bioBackground}></ImageBackground>
          <Text style={styles.bioText}>{Strings.PTB_Profile.bio}</Text>
        </View>
        <View style={{flexDirection: Alignment.ROW}}>
          {highlits.map((item, i) => {
            return (
              <View key={i} style={styles.highlits}>
                <Text style={styles.highlitsText}>{item}</Text>
              </View>
            );
          })}
        </View>

        <View>
          <Text style={styles.videoText}>{Strings.PTB_Profile.video_text}</Text>

          <Video
               controls={true}
              source={require('../../../assets/video/text-vid2.mp4')}
              onError={(err)=>console.log(err)} 
              style={styles.videoContainer}
              paused={true}
            />
        </View>

        {sendReq ? (
          <Pressable
            style={styles.reqSentBtn}
            onPress={() => console.log(sendReq)}>
            <Image source={Images.HEARTH_ICON} />
            <Text style={styles.reqsentText}>
              {Strings.PTB_Profile.request_sent}
            </Text>
          </Pressable>
        ) : requestDecline ? (
          <Pressable style={styles.declineReq}>
            <Image source={Images.RED_CROSS_ICON} />
            <Text style={styles.declineText}>
              {Strings.PTB_Profile.request_decline}
            </Text>
          </Pressable>
        ) : (
          <Pressable style={styles.sendMsgBtn} onPress={() => setSendReq(true)}>
            <Image source={liked ? Images.iconChat : Images.HEARTH_ICON} />
            <Text style={[styles.sendMsgText, {padding: liked ? 10 : 0}]}>
              {liked
                ? Strings.PTB_Profile.send_msg
                : Strings.PTB_Profile.send_request}
            </Text>
          </Pressable>
        )}
      </View>
    </Container>
  );
};

export default PTB_profile;

// const styles = StyleSheet.create({
//   profileLogo: {
//     width: Value.CONSTANT_VALUE_80,
//     height: Value.CONSTANT_VALUE_80,
//     borderRadius: Value.CONSTANT_VALUE_40,
//   },
//   location: {
//     flexDirection: Alignment.ROW,
//     marginTop: Value.CONSTANT_VALUE_10,
//     alignItems: Alignment.CENTER,
//   },
//   locationText: {
//     fontFamily: Fonts.OpenSansRegular,
//     marginLeft: Value.CONSTANT_VALUE_5,
//   },
//   profileName: {
//     fontFamily: Fonts.OpenSansRegular,
//     fontSize: Value.CONSTANT_VALUE_32,
//     fontWeight: Alignment.BOLD,
//     color: Colors.BLACK,
//   },
//   profileImg: {
//     flexDirection: Alignment.ROW_REVERSE,
//     position: Alignment.ABSOLUTE,
//     right: Value.CONSTANT_VALUE_3,
//     top: Value.CONSTANT_VALUE_10,
//   },
//   profileType: {
//     fontFamily: Fonts.OpenSansRegular,
//     fontSize: Value.CONSTANT_VALUE_20,
//   },
//   ageContainer: {
//     flexDirection: Alignment.ROW,
//     marginVertical: Value.CONSTANT_VALUE_15,
//     marginBottom: Value.CONSTANT_VALUE_52,
//   },
//   ageYrs: {
//     fontFamily: Fonts.OpenSansRegular,
//     fontWeight: Alignment.BOLD,
//     color: Colors.BLACK,
//   },
//   bioBackground: {
//     height: Value.CONSTANT_VALUE_70,
//     width: Value.CONSTANT_VALUE_70,
//     position: Alignment.ABSOLUTE,
//     top: -35,
//   },
//   bioText: {
//     fontFamily: Fonts.OpenSansLight,
//     fontSize: Value.CONSTANT_VALUE_22,
//   },
//   highlits: {
//     backgroundColor: Colors.HIGHLIGHT_PINK,
//     marginRight: Value.CONSTANT_VALUE_8,
//     height: Value.CONSTANT_VALUE_31,
//     alignContent: Alignment.CENTER,
//     justifyContent: Alignment.CENTER,
//     paddingHorizontal: Value.CONSTANT_VALUE_5,
//     marginVertical: Value.CONSTANT_VALUE_15,
//   },
//   videoText: {
//     fontFamily: Fonts.OpenSansRegular,
//     marginVertical: Value.CONSTANT_VALUE_15,
//     fontWeight: Alignment.BOLD,
//   },
//   videoContainer: {
//     height: Value.CONSTANT_VALUE_200,
//     backgroundColor: Colors.BLACK,
//   },
//   reqSentBtn: {
//     flexDirection: Alignment.ROW,
//     alignItems: Alignment.CENTER,
//     alignItems: Alignment.CENTER,
//     justifyContent: Alignment.CENTER,
//     marginHorizontal: Value.CONSTANT_VALUE_30,
//     marginVertical: Value.CONSTANT_VALUE_50,
//     height: Value.CONSTANT_VALUE_80,
//   },
//   reqsentText: {
//     letterSpacing: Value.CONSTANT_VALUE_FRAC36,
//     fontFamily: Fonts.OpenSansBold,
//     color: Colors.BLACK,
//   },
//   declineReq: {
//     flexDirection: Alignment.ROW,
//     alignItems: Alignment.CENTER,
//     justifyContent: Alignment.CENTER,
//     marginHorizontal: Value.CONSTANT_VALUE_30,
//     marginVertical: Value.CONSTANT_VALUE_50,
//     height: Value.CONSTANT_VALUE_80,
//     width: Value.CONSTANT_VALUE_297,
//   },
//   declineText: {
//     letterSpacing: Value.CONSTANT_VALUE_FRAC36,
//     color: Colors.RED,
//     fontFamily: Fonts.OpenSansBold,
//     margin: Value.CONSTANT_VALUE_10,
//   },
//   sendMsgBtn: {
//     flexDirection: Alignment.ROW,
//     alignItems: Alignment.CENTER,
//     borderWidth: Value.CONSTANT_VALUE_1,
//     borderColor: Colors.COLOR_A3C6C4,
//     borderRadius: Value.CONSTANT_VALUE_40,
//     alignItems: Alignment.CENTER,
//     justifyContent: Alignment.CENTER,
//     marginHorizontal: Value.CONSTANT_VALUE_30,
//     marginVertical: Value.CONSTANT_VALUE_50,
//     height: Value.CONSTANT_VALUE_80,
//   },
//   sendMsgText: {
//     letterSpacing: Value.CONSTANT_VALUE_FRAC36,
//     fontFamily: Fonts.OpenSansBold,
//     color: Colors.BLACK,
//   },
//   highlitsText: {
//     fontFamily: Fonts.OpenSansRegular,
//   },
// });
