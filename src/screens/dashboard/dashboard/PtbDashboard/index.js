import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Text,
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
import {
  showAppLoader,
  hideAppLoader,
  showAppToast,
} from '../../../../redux/actions/loader';
import {Routes} from '../../../../constants/Constants';
import {deviceHandler} from '../../../../utils/commonFunction';
import {MaterialIndicator} from 'react-native-indicators';
import Colors from '../../../../constants/Colors';
import SensoryCharacteristics from '../../../../components/SensoryCharacteristics';
import CustomModal from '../../../../components/CustomModal/CustomModal';
import {NotificationContext} from '../../../../context/NotificationContextManager';
import {profileMatch} from '../../../../redux/actions/Profile_Match';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import _ from 'lodash';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {dynamicSize, scaleWidth} from '../../../../utils/responsive';
import chatHistory from '../../../../hooks/chatHistory';
import { getSubscriptionStatus } from '../../../../redux/actions/Subsctiption';

const PtbDashboard = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isVisibleLogo, setIsVisibleLogo] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [islikedLogo, setIslikedLogo] = useState('');
  const useSwiper = useRef();
  const [cardIndex, setCardIndex] = useState(0);
  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const [ptbDashboardRes, setPtbDashboardRes] = useState([]);
  const [statusRes, setStatusRes] = useState([]);
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const loadingMatchRef = useRef(false);
  const {fcmToken} = useContext(NotificationContext);
  const [empty, setEmpty] = useState(false);
  const profileImg = useSelector(state => state.Auth?.user?.profile_pic);
  const subscriptionStatus = useSelector(
    state => state.Subscription.subscription_status_res,
  );
  const chats = useSelector(state => state.Chat.chats);
  const chatData = chatHistory();
  const fetchData = useCallback(() => {
    chatData.update();
  }, []);

  const [msgRead, setMsgRead] = useState(false);
  useEffect(() => {
    if (props?.navigation?.route?.name === 'PtbDashboard') {
      deviceHandler(navigation, 'exit');
    }
    if (_.isEmpty(chats)) {
      setMsgRead(false);
    } else {
      setMsgRead(chats.some(x => x?.read === 0));
    }
  }, [chats]);
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );
  useFocusEffect(
    useCallback(() => {
      dispatch(getSubscriptionStatus());
      dispatch(getPtbDashboard());
      setCardIndex(0);
    }, [dispatch]),
  );

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
          if (notification.data.notify_type === 'subscribe') {
            navigation.navigate(Routes.PtbProfile);
          }
          if (notification.data.notify_type === 'profile') {
            const {status} = JSON.parse(notification.data?.match_request);
            if (status === 2) {
              navigation.navigate(Routes.ChatDetail, {
                item: notification?.data,
                isComingFrom: false,
                chatPush: true,
              });
            } else {
              navigation.navigate(Routes.Chat_Request, {
                item: notification?.data,
                user: JSON.parse(notification.data?.match_request),
                chatPush: true,
              });
            }
          }
          if (notification.data.notify_type === 'chat') {
            navigation.navigate(Routes.ChatDetail, {
              item: notification?.data,
              isComingFrom: false,
              chatPush: true,
            });
          }
        }
        console.log('NOTIFICATION2nd:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION3rd:', notification);
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
      const {notification} = remoteMessage;
      if (notification.userInteraction === true) {
        if (notification.data.notify_type === 'subscribe') {
          navigation.navigate(Routes.PtbProfile);
        }
        if (notification.data.notify_type === 'profile') {
          const {status} = JSON.parse(notification.data?.match_request);
          if (status === 2) {
            navigation.navigate(Routes.ChatDetail, {
              item: notification?.data,
              isComingFrom: false,
              chatPush: true,
            });
          } else {
            navigation.navigate(Routes.Chat_Request, {
              item: notification?.data,
              user: JSON.parse(notification.data?.match_request),
            });
          }
        }
        if (notification.data.notify_type === 'chat') {
          navigation.navigate(Routes.ChatDetail, {
            item: notification?.data,
            isComingFrom: false,
            chatPush: true,
          });
        }
      }
    });
  }, [fcmToken, navigation]);

  const {
    get_ptb_dashboard_success,
    get_ptb_dashboard_loading,
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
          setStatusRes(get_ptb_dashboard_res?.data?.status);
          if (get_ptb_dashboard_res?.data?.status === 3) {
            setEmpty(false);
          }
          setPtbDashboardRes(get_ptb_dashboard_res?.data?.data?.data);
        } else {
          dispatch(hideAppLoader());
        }
      }
      loadingRef.current = get_ptb_dashboard_loading;
    }, [get_ptb_dashboard_success, get_ptb_dashboard_loading]),
  );
  useEffect(() => {
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
  ]);
  const handleOnSwipedLeft = () => {
    const payload = {
      to_user_id: ptbDashboardRes[cardIndex]?.user?.id,
      status: 3,
    };
    dispatch(profileMatch(payload));
    setCount(count + 1);
    setCardIndex(cardIndex + 1);
    if (count === get_ptb_dashboard_res?.data?.data?.total) {
      useSwiper?.current?.swipeLeft();
      setEmpty(true);
    } else {
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
    if (count === get_ptb_dashboard_res?.data?.data?.total) {
      useSwiper?.current?.swipeRight();
      setEmpty(true);
    } else {
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
            if (subscriptionStatus?.data?.status) {
              setCardIndex(0);
              navigation.navigate('DashboardDetailScreen', {
                userId: item?.user?.id,
              });
            } else {
              navigation.navigate(Routes.Subscription);
            }
          }}
        />
      </>
    );
  }

  const headerComp = () => (
    <IconHeader
      leftIcon={{
        uri: profileImg,
      }}
      leftPress={() => {
        navigation.navigate('PtbProfile');
      }}
      rightIcon={Images.iconChat}
      chatptb={msgRead === true ? true : false}
      rightPress={() =>
        navigation.navigate(Routes.Chat_Listing, {ptbChat: true})
      }
      ApiImage={true}
      rightPrevIcon={Images.I_BUTTON}
      rightImg={{marginRight: scaleWidth(18)}}
      rightPrevPress={() => setModalVisible(!modalVisible)}
    />
  );
  const dashboardShow = () => {
    const STYLE = styles.androidInnerContainer;
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
                resizeMode={'contain'}>
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
                    showSecondCard={true}
                    stackSeparation={0}
                    stackSize={get_ptb_dashboard_res?.data?.data?.total}
                  />
                </View>
              </ImageBackground>
            </View>
            <View style={STYLE}>
              <TouchableOpacity
                onPress={() => {
                  if (subscriptionStatus?.data?.status) {
                    setIsVisibleLogo(true);
                    setIslikedLogo('disliked');
                    handleOnSwipedLeft();
                  } else {
                    navigation.navigate(Routes.Subscription);
                  }
                }}>
                <Image
                  style={styles.dislikeButton}
                  source={Images.shadowIconNotLike}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (subscriptionStatus?.data?.status) {
                    if (ptbDashboardRes?.match_request?.status === 2) {
                      dispatch(
                        showAppToast(
                          false,
                          Strings.Chat.PLEASE_SEND_MESSAGE_INITIATE,
                        ),
                      );
                    } else {
                      dispatch(
                        showAppToast(
                          false,
                          Strings.Chat.MATCH_SEND_SUCCESSFULLY,
                        ),
                      );
                    }
                    setIsVisibleLogo(true);
                    setIslikedLogo('liked');
                    handleOnSwipedRight();
                  } else {
                    navigation.navigate(Routes.Subscription);
                  }
                }}>
                <Image
                  style={styles.likeButton}
                  source={Images.greenIconLike}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.loaderContainer}>
            <MaterialIndicator
              color={Colors.COLOR_A3C6C4}
              size={dynamicSize(25)}
            />
          </View>
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
        {(statusRes === 2 || empty === true) && (
          <View style={styles.emptyCardContainer}>
            <Text style={styles.sryText}>{Strings.dashboard.Sorry}</Text>
            <Text style={styles.innerText}>{Strings.dashboard.Para1}</Text>
            <Text style={styles.innerText2}>{Strings.dashboard.Para2}</Text>
          </View>
        )}
        {statusRes === 1 && empty === false && dashboardShow()}
        {statusRes === 3 && (
          <View style={styles.emptyCardContainer}>
            <Text style={styles.sryText}>{Strings.dashboard.Sorry}</Text>
            <Text style={styles.innerText}>
              {Strings.dashboard.SecondPara1}
            </Text>
            <Text style={styles.innerText2}>
              {Strings.dashboard.secondPara2}
            </Text>
          </View>
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
