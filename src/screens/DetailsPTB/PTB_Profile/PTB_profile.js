import {
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import Images from '../../../constants/Images';
import Header, {IconHeader} from '../../../components/Header';
import Strings from '../../../constants/Strings';
import Alignment from '../../../constants/Alignment';
import Video from 'react-native-video';
import styles from './Styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  getPtbProfileDetail,
  sendLikePtb,
} from '../../../redux/actions/PtbProfileDetail';
import {showAppLoader, hideAppLoader} from '../../../redux/actions/loader';
import {Routes} from '../../../constants/Constants';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {width} from '../../../utils/responsive';
import {profileMatchResponse} from '../../../redux/actions/Profile_Match';
import {getMessageID} from '../../../redux/actions/MessageId';
import ButtonPay from '../../../components/BtnPay';
const PTB_profile = props => {
  const [stateRes, setStateRes] = useState();
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const LoadinfRef = useRef(false);
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
  // expected output: true
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getMessageID(''));
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, dispatch]);
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
  useFocusEffect(
    useCallback(() => {
      dispatch(showAppLoader());
      dispatch(getPtbProfileDetail(userid));
    }, [dispatch, userid]),
  );
  const navigation = useNavigation();
  console.log(stateRes, 'stateRes');
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      onPress={() => {
        if (props?.route?.params?.coming === true) {
          if (stateRes?.profile_match_request?.status === 2) {
            navigation.navigate(Routes.ChatDetail, {
              item: stateRes?.profile_match_chat,
            });
          } else {
            navigation.goBack();
          }
        } else {
          navigation.goBack();
        }
      }}
      style={styles.androidHeaderIcons}
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
      <Animated.View style={{...props.style, opacity: fadeAnim}}>
        {props.children}
      </Animated.View>
    );
  };
  const IMG_CONDI =
    islikedLogo === 'liked' ? Images.iconbigheart : Images.iconbigcross;

  const onPresslike = () => {
    const payload = {to_user_id: userid, status: 1};
    dispatch(sendLikePtb(payload));
    setIsVisibleLogo(true);
    setIslikedLogo('liked');
    setTimeout(() => {
      setIsVisibleLogo(false);
      setIslikedLogo('');
      navigation.navigate(Routes.SmDashboard);
    }, 1000);
  };

  const onPressLike = () => {
    const payload = {
      id: props?.route?.params?.id,
      status: 2,
    };
    dispatch(profileMatchResponse(payload));
  };
  const onPressDislike = () => {
    const payload = {
      id: props?.route?.params?.id,
      status: 4,
    };
    dispatch(profileMatchResponse(payload));
    setIsVisibleLogo(true);
    setIslikedLogo('disliked');
  };
  return (
    <View style={[styles.flex]}>
      <Header end={false}>{headerComp()}</Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {get_ptb_profile_detail_loading === false ? (
          <View style={styles.mainAndroidContainer}>
            <View>
              <View style={styles.location}>
                <Image source={Images.iconmapblue} />
                <Text style={styles.locationText}>
                  {stateRes?.location?.name}
                </Text>
              </View>
              <View style={{width: width - 160}}>
                <Text style={styles.profileName}>{`${stateRes?.first_name} ${
                  stateRes?.middle_name === null ||
                  stateRes?.middle_name === '' ||
                  stateRes?.middle_name === undefined
                    ? ''
                    : stateRes?.middle_name
                } ${stateRes?.last_name}`}</Text>
              </View>
              <View style={styles.profileImg}>
                <FastImage
                  style={styles.profileLogo}
                  source={{uri: stateRes?.profile_pic}}
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
                {isVisibleLogo && (
                  <FadeInView>
                    <ImageBackground style={styles.imgCondi}>
                      <Image style={styles.iconImage} source={IMG_CONDI} />
                    </ImageBackground>
                  </FadeInView>
                )}
                <Text style={styles.bioText}>
                  {stateRes?.user_profile?.bio}
                </Text>
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
            {stateRes?.profile_match_request?.status !== 2 && (
              <TouchableOpacity
                style={styles.sendMsgBtn}
                onPress={() => {
                  props?.route?.params?.seeAll ? onPressLike() : onPresslike();
                }}>
                <Image source={Images.HEARTH_ICON} />
                <Text style={styles.sendMsgText}>
                  {Strings.PTB_Profile.send_request}
                </Text>
              </TouchableOpacity>
            )}
            {stateRes?.profile_match_request?.status === 2 && (
              <>
                <View style={styles.dateTextView}>
                  <Image source={Images.HEARTH_ICON} />
                  <Text style={styles.dateText}>
                    {Strings.PTB_Profile.YouMatched}{' '}
                    {moment(stateRes?.profile_match_request?.updated_at).format(
                      'MMM DD, YYYY',
                    )}
                  </Text>
                </View>
                <View style={styles.centerView}>
                  <ButtonPay
                    label={Strings.dashboard.ReqPayment}
                    style={styles.loginBtn}
                    onPress={()=>navigation.navigate(Routes.SendRequest,stateRes)}
                  />
                </View>
              </>
            )}
            {props?.route?.params?.seeAll && (
              <Pressable
                style={styles.sendMsgBtnDis}
                onPress={() => {
                  onPressDislike();
                }}>
                <Image source={Images.RED_CROSS_ICON} />
                <Text style={styles.sendMsgText}>
                  {Strings.donorPofile.Not_interested}
                </Text>
              </Pressable>
            )}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};
export default React.memo(PTB_profile);
