import {View, Text} from 'react-native';
import React, {useState, useCallback} from 'react';

import styles from './style';
import Images from '../../../../constants/Images';
import Container from '../../../../components/Container';

import Strings from '../../../../constants/Strings';

import {IconHeader} from '../../../../components/Header';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';
import {getPtbDashboard} from '../../../../redux/actions/PtbDashboard';
import {Routes} from '../../../../constants/Constants';
import SensoryCharacteristics from '../../../../components/SensoryCharacteristics';
import CustomModal from '../../../../components/CustomModal/CustomModal';
<<<<<<< HEAD
import {NotificationContext} from '../../../../context/NotificationContextManager';
import {profileMatch} from '../../../../redux/actions/Profile_Match';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import _ from 'lodash';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {dynamicSize, scaleWidth} from '../../../../utils/responsive';
import chatHistory from '../../../../hooks/chatHistory';
import { getSubscriptionStatus } from '../../../../redux/actions/Subsctiption';

=======
import {scaleWidth} from '../../../../utils/responsive';
>>>>>>> e02f312e7c306daffa02950553263ffd05048da6
const PtbDashboard = props => {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profileImg = useSelector(state => state.Auth?.user?.profile_pic);

  useFocusEffect(
    useCallback(() => {
      dispatch(getPtbDashboard());
    }, [dispatch]),
  );

  const headerComp = () => (
    <IconHeader
      leftIcon={{
        uri: profileImg,
      }}
      leftPress={() => {
        navigation.navigate('PtbProfile');
      }}
      rightIcon={Images.iconChat}
      rightPress={() =>
        navigation.navigate(Routes.Chat_Listing, {ptbChat: true})
      }
      ApiImage={true}
      rightPrevIcon={Images.I_BUTTON}
      rightImg={{marginRight: scaleWidth(18)}}
      rightPrevPress={() => setModalVisible(!modalVisible)}
    />
  );
<<<<<<< HEAD
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
  useEffect(()=>{
    dispatch(getSubscriptionStatus());
  },[]);
=======
>>>>>>> e02f312e7c306daffa02950553263ffd05048da6
  return (
    <>
      <Container
        mainStyle={true}
        scroller={false}
        showHeader={true}
        headerComp={headerComp}>
        <View style={styles.emptyCardContainer}>
          <Text style={styles.sryText}>{Strings.dashboard.Sorry}</Text>
          <Text style={styles.innerText}>{Strings.dashboard.Para1}</Text>
          <Text style={styles.innerText2}>{Strings.dashboard.Para2}</Text>
        </View>
        <View style={styles.emptyCardContainer}>
          <Text style={styles.sryText}>{Strings.dashboard.Sorry}</Text>
          <Text style={styles.innerText}>{Strings.dashboard.SecondPara1}</Text>
          <Text style={styles.innerText2}>{Strings.dashboard.secondPara2}</Text>
        </View>
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
