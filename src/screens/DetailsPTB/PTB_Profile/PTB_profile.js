import {Text, View, Image, ImageBackground, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import Container from '../../../components/Container';
import {useNavigation} from '@react-navigation/native';
import Images from '../../../constants/Images';
import {CircleBtn} from '../../../components/Header';
import Strings from '../../../constants/Strings';
import Alignment from '../../../constants/Alignment';
import Video from 'react-native-video';
import styles from './Styles';
import SetterData from '../../../services/SetterData';

const PTB_profile = ({route}) => {
  console.log('Parameter==', route.params.userid);
  const navigation = useNavigation();
  const [sendReq, setSendReq] = useState(false);
  const [requestDecline, SetRequestDecline] = useState(false);
  const [liked, setLiked] = useState(false);


  const data = SetterData();
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconBack}
      onPress={() => navigation.goBack()}
      accessibilityLabel="Cross Button, Go back"
    />
  );
  useEffect(() => {
    data.ptbProfileDetail(route.params.userid);
    
  }, []);
  
  // console.log("HIGHLITS==", highlits);
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
        <Text style={styles.profileName}>
          {data.ptbProfileDetails?.first_name}
        </Text>
        <Text style={styles.profileName}>
          {data.ptbProfileDetails?.last_name}
        </Text>
        <View style={styles.profileImg}>
          <Image
            style={styles.profileLogo}
            source={{
              uri: data.ptbProfileDetails?.profile_pic,
            }}
          />
        </View>
        <Text style={styles.profileType}>{Strings.PTB_Profile.type}</Text>
        <View style={styles.ageContainer}>
          <Text>Age: </Text>
          <Text style={styles.ageYrs}>
            {data.ptbProfileDetails?.age} {Strings.PTB_Profile.yrs}
          </Text>
        </View>
        <View>
          <ImageBackground
            source={Images.QUOTES}
            style={styles.bioBackground}></ImageBackground>
          <Text style={styles.bioText}>
            {data.ptbProfileDetails?.user_profile?.bio}
          </Text>
        </View>
        <View style={{flexDirection: Alignment.ROW}}>

          {/* {data.highlits?.map((item, i) => {
            return (
              <View key={i} style={styles.highlits}>
                <Text style={styles.highlitsText}>{item}</Text>
              </View>
            );
          })} */}
        </View>
        {data.ptbProfileDetails?.doner_video_gallery != null ? (
          <View>
            <Text style={styles.videoText}>
              {Strings.PTB_Profile.video_text}
            </Text>
            <Video
              controls={true}
              source={{uri:data.ptbProfileDetails?.doner_video_gallery}}
              onError={err => console.log(err)}
              style={styles.videoContainer}
              paused={true}
            />
          </View>
        ) : null}

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
