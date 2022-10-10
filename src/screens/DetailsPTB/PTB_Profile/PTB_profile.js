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
import Images from '../../../constants/Images';
import {CircleBtn} from '../../../components/Header';
import Strings from '../../../constants/Strings';
import Alignment from '../../../constants/Alignment';
import Video from 'react-native-video';
import styles from './Styles';

const PTB_profile = () => {
  const navigation = useNavigation();
  const [sendReq, setSendReq] = useState(false);
  const [requestDecline, SetRequestDecline] = useState(true);
  SetRequestDecline(false);
  const [liked, setLiked] = useState(false);
  setLiked(false)
  const highlits = Strings.PTB_Profile.profileHighlits;
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconBack}
      onPress={() => navigation.goBack()}
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
