import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Text,
  Platform,
} from 'react-native';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import Swiper from 'react-native-deck-swiper';
import styles from './style';
import Images from '../../../../constants/Images';
import Container from '../../../../components/Container';
import TitleComp from '../../../../components/dashboard/TitleComp';
import Strings from '../../../../constants/Strings';
import ImageComp from '../../../../components/dashboard/ImageComp';
import { IconHeader } from '../../../../components/Header';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getRoleType } from '../../../../utils/other';
import { useDispatch, useSelector } from 'react-redux';
import { getPtbDashboard } from '../../../../redux/actions/PtbDashboard';
import { showAppLoader, hideAppLoader } from '../../../../redux/actions/loader';
import { logOut } from '../../../../redux/actions/Auth';
import { Routes } from '../../../../constants/Constants';
import { deviceHandler } from '../../../../utils/commonFunction';
import { MaterialIndicator } from 'react-native-indicators';
import Colors from '../../../../constants/Colors';
import SensoryCharacteristics from '../../../../components/SensoryCharacteristics';
import CustomModal from '../../../../components/CustomModal/CustomModal';
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
  const loadingRef = useRef();
  const profileImg = useSelector(state => state.Auth?.user?.profile_pic);
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
  const {
    get_ptb_dashboard_success,
    get_ptb_dashboard_loading,
    get_ptb_dashboard_error_msg,
    get_ptb_dashboard_res,
  } = useSelector(state => state.PtbDashboard);

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
  const handleOnSwipedLeft = () => {
    setCount(count + 1);
    setCardIndex(cardIndex + 1);
    if (count >= ptbDashboardRes.length - 1) {
      setEmpty(true);
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
    setCount(count + 1);
    setCardIndex(cardIndex + 1);
    if (count >= ptbDashboardRes.length - 1) {
      setEmpty(true);
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
          image={{ uri: item?.user?.profile_pic }}
          fadeAnim={fadeAnim}
          isVisibleLogo={index + 1 === cardIndex ? isVisibleLogo : false}
          has_happen={islikedLogo}
          category={getRoleType(item?.user?.role_id)}
          activeOpacity={1}
          key={cardIndex}
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
      rightPress={() => logoutScreen()}
      style={styles.headerIcon}
      ApiImage={true}
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
                    showSecondCard={true}
                    stackSize={2}
                  />
                </View>
              </ImageBackground>
            </View>
            <View
              style={
                Platform.OS === 'ios'
                  ? styles.iosInnerContainer
                  : styles.innerContainer
              }>
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
          <SensoryCharacteristics  onPress={() => setModalVisible(!modalVisible)}/>
        </CustomModal>
      )}
    </>
  );
};
export default PtbDashboard;
