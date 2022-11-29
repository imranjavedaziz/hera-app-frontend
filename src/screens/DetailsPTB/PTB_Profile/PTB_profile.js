import {
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
  Animated,
} from 'react-native';
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
import {MaterialIndicator} from 'react-native-indicators';
import {height, width} from '../../../utils/responsive';
import FastImage from 'react-native-fast-image';

const PTB_profile = props => {
  const [stateRes, setStateRes] = useState();
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const LoadinfRef = useRef(false);
  const [liked, setLiked] = useState(false);
  const [isVisibleLogo, setIsVisibleLogo] = useState(false);
  const [islikedLogo, setIslikedLogo] = useState('');
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

  const FadeInView = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);
    return (
      <Animated.View
        style={{
          ...props.style,
          opacity: fadeAnim,
        }}>
        {props.children}
      </Animated.View>
    );
  };
  const IMG_CONDI =
    islikedLogo === 'liked' ? Images.iconbigheart : Images.iconbigcross;

  const onPressDislike = () => {
    const payload = {
      to_user_id: userid,
      status: 3,
    };
    dispatch(sendLikePtb(payload));
    setIsVisibleLogo(true);
    setIslikedLogo('disliked');
    setTimeout(() => {
      setIsVisibleLogo(false);
      setIslikedLogo('');
      navigation.navigate(Routes.SmDashboard);
    }, 2000);
  };
  const onPresslike = () => {
    const payload = {
      to_user_id: userid,
      status: 1,
    };
    dispatch(sendLikePtb(payload));
    setIsVisibleLogo(true);
    setIslikedLogo('liked');
    setTimeout(() => {
      setIsVisibleLogo(false);
      setIslikedLogo('');
      navigation.navigate(Routes.SmDashboard);
    }, 2000);
  };
  return (
    <Container
      showHeader={true}
      headerEnd={false}
      headerComp={headerComp}
      style={{}}>
      {get_ptb_profile_detail_loading === false ? (
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
              <FastImage
                style={styles.profileLogo}
                source={{
                  uri: stateRes?.profile_pic,
                }}
              />
            </View>
            <Text style={styles.profileType}>{Strings.PTB_Profile.type}</Text>
            <View style={styles.ageContainer}>
              <Text style={styles.colorText}>Age: </Text>
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
              {isVisibleLogo === true ? (
                <FadeInView>
                  <ImageBackground
                    style={{
                      flex: 1,
                      position: 'absolute',
                      left: 80,
                      top: 0,
                      bottom: 0,
                      width: width,
                    }}>
                    <Image style={styles.iconImage} source={IMG_CONDI} />
                  </ImageBackground>
                </FadeInView>
              ) : null}
              <Text style={styles.bioText}>{stateRes?.user_profile?.bio}</Text>
            </View>
            {/* <View style={styles.iconContainer}> */}

            {/* </View> */}
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
              onPresslike();
            }}>
            <Image source={Images.HEARTH_ICON} />
            <Text style={styles.sendMsgText}>
              {' '}
              {Strings.PTB_Profile.send_request}
            </Text>
          </Pressable>

          {props?.route?.params?.seeAll && (
            <Pressable
              style={styles.sendMsgBtnDis}
              onPress={() => {
                onPressDislike();
              }}>
              <Image source={Images.RED_CROSS_ICON} />
              <Text style={styles.sendMsgText}>
                {' '}
                {Strings.donorPofile.Not_interested}
              </Text>
            </Pressable>
          )}
        </>
      ) : (
        <MaterialIndicator
          color="#a3c6c4"
          style={{
            justifyContent: Alignment.CENTER,
            alignItems: Alignment.CENTER,
            marginTop: height / 2.5,
          }}
        />
      )}
    </Container>
  );
};

export default PTB_profile;
