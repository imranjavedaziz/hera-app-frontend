import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Text,
  Platform,
} from 'react-native';
import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import Swiper from 'react-native-deck-swiper';
import styles from './style';
import Images from '../../../../constants/Images';
import Container from '../../../../components/Container';
import TitleComp from '../../../../components/dashboard/TitleComp';
import Strings from '../../../../constants/Strings';
import ImageComp from '../../../../components/dashboard/ImageComp';
import {IconHeader} from '../../../../components/Header';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getRoleType} from '../../../../utils/other';
import {useDispatch, useSelector} from 'react-redux';
import {getPtbDashboard} from '../../../../redux/actions/PtbDashboard';
import {showAppLoader, hideAppLoader} from '../../../../redux/actions/loader';
import {deviceRegister, logOut} from '../../../../redux/actions/Auth';
import {Routes} from '../../../../constants/Constants';
import {deviceHandler} from '../../../../utils/commonFunction';
import {MaterialIndicator} from 'react-native-indicators';
import Colors from '../../../../constants/Colors';
import SensoryCharacteristics from '../../../../components/SensoryCharacteristics';
import CustomModal from '../../../../components/CustomModal/CustomModal';
import DeviceInfo from 'react-native-device-info';
import {NotificationContext} from '../../../../context/NotificationContextManager';
import {profileMatch} from '../../../../redux/actions/Profile_Match';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

import _ from 'lodash';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {scaleWidth} from '../../../../utils/responsive';
const PtbDashboard = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isVisibleLogo, setIsVisibleLogo] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [islikedLogo, setIslikedLogo] = useState('');
  const useSwiper = useRef();
  const [cardIndex, setCardIndex] = useState(0);
  const [empty, setEmpty] = useState(false);
  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const [ptbDashboardRes, setPtbDashboardRes] = useState([]);
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const loadingMatchRef = useRef();
  const {fcmToken} = useContext(NotificationContext);
  const profileImg = useSelector(state => state.Auth?.user?.profile_pic);
  const login = useSelector(state => state.Auth);
  useEffect(() => {
    if (props?.navigation?.route?.name === 'PtbDashboard') {
      deviceHandler(navigation, 'exit');
    }
  });
  useFocusEffect(
    useCallback(() => {
      dispatch(getPtbDashboard());
    }, [dispatch]),
  );
  //Get device Info
  useEffect(() => {
    async function fetchDeviceInfo() {
      const deviceName = await DeviceInfo.getDeviceName();
      const _deviceInfo = {
        device_id: DeviceInfo.getDeviceId(),
        device_token: fcmToken,
        device_type: Platform.OS,
      };
      console.log(deviceName, 'deviceName');
      dispatch(deviceRegister(_deviceInfo));
    }
    fetchDeviceInfo();
  }, [dispatch, fcmToken]);
  //Push Notification
  useEffect(() => {
    //For foreground
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        if (notification.userInteraction === true) {
          if (notification.priority === 'high') {
            navigation.navigate('PushNotificationExample');
          }
        }
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        '***Notification caused app to open from background state***',
        remoteMessage,
      );
      const {notification, messageId} = remoteMessage;
      console.log(messageId);
      if (!_.isEmpty(notification)) {
        navigation.navigate('PushNotificationExample');
      }
    });
  }, [fcmToken, navigation]);

  const {
    get_ptb_dashboard_success,
    get_ptb_dashboard_loading,
    get_ptb_dashboard_error_msg,
    get_ptb_dashboard_res,
  } = useSelector(state => state.PtbDashboard);
  const {
    profile_match_success,
    profile_match_loading,
    profile_match_error_msg,
  } = useSelector(state => state.Profile_Match);
  useFocusEffect(
    useCallback(() => {
      if (loadingRef.current && !get_ptb_dashboard_loading) {
        dispatch(showAppLoader());
        if (get_ptb_dashboard_success) {
          dispatch(hideAppLoader());
          setPtbDashboardRes(get_ptb_dashboard_res?.data?.data?.data);
        }
        if (get_ptb_dashboard_error_msg) {
          dispatch(hideAppLoader());
        }
      }
      loadingRef.current = get_ptb_dashboard_loading;
    }, [get_ptb_dashboard_success, get_ptb_dashboard_loading]),
  );
  useFocusEffect(
    useCallback(() => {
      if (loadingMatchRef.current && !profile_match_loading) {
        dispatch(showAppLoader());
        if (profile_match_success) {
          dispatch(hideAppLoader());
        }
        if (profile_match_error_msg) {
          dispatch(hideAppLoader());
        }
      }
      loadingMatchRef.current = profile_match_loading;
    }, [
      profile_match_success,
      profile_match_loading,
      dispatch,
      profile_match_error_msg,
    ]),
  );
  const handleOnSwipedLeft = () => {
    const payload = {
      to_user_id: ptbDashboardRes[cardIndex]?.user?.id,
      status: 3,
    };
    dispatch(profileMatch(payload));
    setCount(count + 1);
    setCardIndex(cardIndex + 1);
    if (count >= ptbDashboardRes.length - 1) {
      useSwiper?.current?.swipeLeft();
      setTimeout(() => {
        setEmpty(true);
      }, 400);
    } else {
      setEmpty(false);
      setTimeout(() => {
        useSwiper?.current?.swipeLeft();
      }, 1000);
    }
    setTimeout(() => {
      setIsVisibleLogo(false);
      setIslikedLogo('');
    }, 200);
  };
  const handleOnSwipedRight = () => {
    const payload = {
      to_user_id: ptbDashboardRes[cardIndex]?.user?.id,
      status: 1,
    };
    dispatch(profileMatch(payload));
    setCount(count + 1);
    setCardIndex(cardIndex + 1);

    if (count >= ptbDashboardRes.length - 1) {
      useSwiper?.current?.swipeRight();
      setTimeout(() => {
        setEmpty(true);
      }, 400);
    } else {
      setEmpty(false);
      setTimeout(() => {
        useSwiper?.current?.swipeRight();
      }, 1000);
    }
    setTimeout(() => {
      setIsVisibleLogo(false);
      setIslikedLogo('');
    }, 150);
  };

  function renderCardData(item, index) {
    return (
      <>
        <ImageComp
          locationText={item?.user?.state_name}
          code={item?.user?.username}
          donerAge={item?.user?.age}
          mapIcon={Images.iconmapwhite}
          image={{uri: item?.user?.profile_pic}}
          fadeAnim={fadeAnim}
          isVisibleLogo={index + 1 === cardIndex ? isVisibleLogo : false}
          has_happen={islikedLogo}
          category={getRoleType(item?.user?.role_id)}
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('DashboardDetailScreen', {
              userId: item?.user?.id,
            });
          }}
        />
      </>
    );
  }
  const logoutScreen = () => {
    dispatch(logOut());
    navigation.navigate(Routes.Landing);
  };

  const headerComp = () => (
    <IconHeader
      leftIcon={{
        uri: profileImg,
      }}
      leftPress={() => {
        navigation.navigate('PtbProfile');
      }}
      rightIcon={Images.iconChat}
      rightPress={() => navigation.navigate(Routes.Chat_Listing)}
      style={styles.headerIcon}
      ApiImage={true}
      rightPrevIcon={Images.I_BUTTON}
      rightImg={{marginRight: scaleWidth(18)}}
      rightPrevPress={() => setModalVisible(!modalVisible)}
    />
  );

  const dashboardShow = () => {
    return (
      <>
        {get_ptb_dashboard_res?.data?.data?.data.length > 0 ? (
          <View style={styles.mainContainer}>
            <TitleComp
              Title={Strings.landing.Like_Match_Connect}
              Subtitle={Strings.dashboard.Subtitle}
              Icon={Images.iconArrow}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <View style={styles.mainImageContainer}>
              <ImageBackground
                source={Images.DASHBOARD_BG}
                style={styles.ImageSize}
                resizeMode={'center'}>
                <View>
                  <Swiper
                    infinite={true}
                    ref={useSwiper}
                    renderCard={renderCardData}
                    cardIndex={cardIndex}
                    cards={ptbDashboardRes}
                    verticalSwipe={false}
                    horizontalSwipe={false}
                    swipeAnimationDuration={500}
                    showSecondCard={false}
                    stackSize={2}
                  />
                </View>
              </ImageBackground>
            </View>
            <View style={styles.iosInnerContainer}>
              <TouchableOpacity
                onPress={() => {
                  setIsVisibleLogo(true);
                  setIslikedLogo('disliked');
                  handleOnSwipedLeft();
                }}>
                <Image
                  style={styles.dislikeButton}
                  source={Images.shadowIconNotLike}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsVisibleLogo(true);
                  setIslikedLogo('liked');
                  handleOnSwipedRight();
                }}>
                <Image
                  style={styles.likeButton}
                  source={Images.greenIconLike}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <MaterialIndicator color={Colors.COLOR_A3C6C4} />
        )}
      </>
    );
  };

  return (
    <>
      <Container
        mainStyle={true}
        scroller={false}
        showHeader={true}
        headerComp={headerComp}>
        {empty === true ? (
          <View style={styles.emptyCardContainer}>
            <Text style={styles.sryText}>{Strings.dashboard.Sorry}</Text>
            <Text style={styles.innerText}>{Strings.dashboard.Para1}</Text>
            <Text style={styles.innerText2}>{Strings.dashboard.Para2}</Text>
          </View>
        ) : (
          dashboardShow()
        )}
      </Container>
      {modalVisible && (
        <CustomModal>
          <SensoryCharacteristics
            onPress={() => setModalVisible(!modalVisible)}
          />
        </CustomModal>
      )}
    </>
  );
};
export default PtbDashboard;
