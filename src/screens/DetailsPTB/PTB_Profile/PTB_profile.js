import {Text, View, Image, ImageBackground, Pressable} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Container from '../../../components/Container';
import {useNavigation, useRoute} from '@react-navigation/native';
import Images from '../../../constants/Images';
import {CircleBtn} from '../../../components/Header';
import Strings from '../../../constants/Strings';
import Alignment from '../../../constants/Alignment';
import Video from 'react-native-video';
import styles from './Styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  getPtbProfileDetail,
  sendLikePtb,
} from '../../../redux/actions/PtbProfileDetail';
import {
  showAppLoader,
  hideAppLoader,
  showAppToast,
} from '../../../redux/actions/loader';
import {Routes} from '../../../constants/Constants';
const PTB_profile = () => {
  const [stateRes, setStateRes] = useState();
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const LoadinfRef = useRef(false);
  const {
    get_ptb_profile_detail_success,
    get_ptb_profile_detail_loading,
    get_ptb_profile_detail_res,
    send_like_ptb_success,
    send_like_ptb_loading,
    send_like_ptb_res,
  } = useSelector(state => state.PtbProfileDetail);
  useEffect(() => {
    if (loadingRef.current && !get_ptb_profile_detail_loading) {
      dispatch(showAppLoader());
      if (get_ptb_profile_detail_success) {
        dispatch(hideAppLoader());
        setStateRes(get_ptb_profile_detail_res);
      } else {
        dispatch(hideAppLoader());
      }
    }
    loadingRef.current = get_ptb_profile_detail_loading;
  }, [
    get_ptb_profile_detail_success,
    get_ptb_profile_detail_loading,
    get_ptb_profile_detail_res,
    dispatch,
  ]);

  useEffect(() => {
    if (LoadinfRef.current && !send_like_ptb_loading) {
      dispatch(showAppLoader());
      if (send_like_ptb_success) {
        dispatch(hideAppLoader());
        dispatch(showAppToast(false, send_like_ptb_res.message));
      } else {
        dispatch(hideAppLoader());
      }
    }
    LoadinfRef.current = send_like_ptb_loading;
  }, [
    send_like_ptb_success,
    send_like_ptb_loading,
    send_like_ptb_res,
    dispatch,
  ]);
  const {
    params: {userid},
  } = useRoute();
  useEffect(() => {
    dispatch(getPtbProfileDetail(userid));
  }, [dispatch, userid]);
  const navigation = useNavigation();
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconBack}
      onPress={navigation.goBack}
      accessibilityLabel="Cross Button, Go back"
    />
  );
  // console.log(
  //   stateRes?.doner_video_gallery,
  //   'stateRes?.doner_video_gallery :::::',
  // );
  return (
    <Container
      showHeader={true}
      headerEnd={false}
      headerComp={headerComp}
      style={{}}>
      {stateRes?.doner_video_gallery !== undefined && (
        <>
          <View>
            <View style={styles.location}>
              <Image source={Images.iconmapblue} />
              <Text style={styles.locationText}>
                {stateRes?.location?.name}
              </Text>
            </View>
            <Text style={styles.profileName}>{stateRes?.first_name}</Text>
            <Text style={styles.profileName}>{stateRes?.last_name}</Text>
            <View style={styles.profileImg}>
              <Image
                style={styles.profileLogo}
                source={{
                  uri: stateRes?.profile_pic,
                }}
              />
            </View>
            <Text style={styles.profileType}>{Strings.PTB_Profile.type}</Text>
            <View style={styles.ageContainer}>
              <Text>Age: </Text>
              <Text style={styles.ageYrs}>
                {stateRes?.age}
                {Strings.PTB_Profile.yrs}
              </Text>
            </View>
            <View>
              <ImageBackground
                source={Images.QUOTES}
                style={styles.bioBackground}
              />
              <Text style={styles.bioText}>{stateRes?.user_profile?.bio}</Text>
            </View>
            <View style={{flexDirection: Alignment.ROW}}>
              <View style={{flexDirection: Alignment.ROW}}>
                {stateRes?.user_profile?.gender && (
                  <View style={styles.highlits}>
                    <Text style={styles.highlitsText}>
                      {stateRes?.user_profile?.gender}
                    </Text>
                  </View>
                )}
                {stateRes?.user_profile?.sexual_orientation && (
                  <View style={styles.highlits}>
                    <Text style={styles.highlitsText}>
                      {stateRes?.user_profile?.sexual_orientation}
                    </Text>
                  </View>
                )}
                {stateRes?.user_profile?.relationship_status && (
                  <View style={styles.highlits}>
                    <Text style={styles.highlitsText}>
                      {stateRes?.user_profile?.relationship_status}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          {stateRes?.doner_video_gallery?.file_url && (
            <View>
              <Text style={styles.videoText}>
                {Strings.PTB_Profile.video_text}
              </Text>
              <Video
                controls={true}
                source={{
                  uri:
                    stateRes?.doner_video_gallery?.file_url === undefined
                      ? ''
                      : stateRes?.doner_video_gallery?.file_url,
                }}
                style={styles.videoContainer}
                paused={true}
              />
            </View>
          )}
          <Pressable
            style={styles.sendMsgBtn}
            onPress={() => {
              dispatch(
                sendLikePtb({
                  to_user_id: userid,
                  status: 1,
                }),
              );
              setTimeout(() => {
                navigation.navigate(Routes.SmDashboard);
              }, 1000);
            }}>
            <Image source={Images.HEARTH_ICON} />
            <Text style={styles.sendMsgText}>
              {' '}
              Strings.PTB_Profile.send_request
            </Text>
          </Pressable>
        </>
      )}
    </Container>
  );
};

export default PTB_profile;
