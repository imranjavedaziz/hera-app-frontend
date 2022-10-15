import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Text,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Swiper from 'react-native-deck-swiper';
import styles from './style';
import Images from '../../../../constants/Images';
import Container from '../../../../components/Container';
import TitleComp from '../../../../components/dashboard/TitleComp';
import Strings from '../../../../constants/Strings';
import ImageComp from '../../../../components/dashboard/ImageComp';
import {IconHeader} from '../../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import Auth from '../../../../services/Auth';
import SetterData from '../../../../services/SetterData';
import {getRoleType} from '../../../../utils/other';
import {useSelector} from 'react-redux';

const PtbDashboard = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const updateRegister = useSelector(state => state.auth);
  const [isVisibleLogo, setIsVisibleLogo] = useState(false);
  const [islikedLogo, setIslikedLogo] = useState('');
  const useSwiper = useRef();
  const [cardIndex, setCardIndex] = useState(0);
  const [empty, setEmpty] = useState(false);
  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const authService = Auth();
  const data = SetterData();

  const handleOnSwipedLeft = () => {
    setCount(count + 1);
    // setCardIndex(1);
    console.log('useSwiper.current::::::', useSwiper.current);
    if (count >= 4) {
      setEmpty(true);
    } else {
      setEmpty(false);
      setTimeout(() => {
        useSwiper.current.swipeLeft();
      }, 1000);
    }

    setTimeout(() => {
      console.log('cardIndex', cardIndex);
      // setCardIndex(0);
      setIsVisibleLogo(false);
      setIslikedLogo('');
    }, 200);
  };

  const handleOnSwipedRight = () => {
    setCardIndex(cardIndex + 1);
    setIsVisibleLogo(true);
    setIslikedLogo('liked');
    setCount(count + 1);
    if (count >= 4) {
      setEmpty(true);
    } else {
      console.log('isCardCount', count);
      setEmpty(false);
      setTimeout(() => {
        setIsVisibleLogo(false);
        setIslikedLogo('');
        // setCardIndex(cardIndex + 1);
        useSwiper.current.swipeRight();
      }, 1000);
    }
  };
  console.log('cardIndex>>>', cardIndex);

  useEffect(() => {
    data.ptbCardDashboard();
  }, []);

  function renderCardData(item) {
    return (
      <View key={item?.user?.id}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('DashboardDetailScreen', {
              userId: item?.user?.id,
            });
          }}>
          <ImageComp
            locationText={item?.user?.state_name}
            code={item?.user?.username}
            donerAge={item?.user?.age}
            mapIcon={Images.mapgraypin}
            image={{uri: item?.user?.profile_pic}}
            fadeAnim={fadeAnim}
            isVisibleLogo={isVisibleLogo}
            has_happen={islikedLogo}
            category={getRoleType(item?.user?.role_id)}
          />
        </TouchableOpacity>
      </View>
    );
  }
  console.log('like>>>>', islikedLogo);
  console.log('visible>>>>', isVisibleLogo);
  const headerComp = () => (
    <IconHeader
      leftIcon={{uri: updateRegister?.user?.profile_pic}}
      leftPress={() => {
        navigation.navigate('PtbProfile');
      }}
      updateRegister={true}
      rightIcon={Images.iconChat}
      rightPress={authService.logout}
      style={styles.headerIcon}
    />
  );

  console.log('cardIndex??', cardIndex);
  // console.log('ptbDashboard', data.ptbDashboard);
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
          <View style={styles.mainContainer}>
            <TitleComp
              Title={Strings.dashboard.Title}
              Subtitle={Strings.dashboard.Subtitle}
              Icon={Images.iconArrow}
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
                    cardIndex={0}
                    cards={data.ptbDashboard}
                    verticalSwipe={false}
                    horizontalSwipe={false}
                    swipeAnimationDuration={500}
                    showSecondCard={true}
                    stackSize={1}
                    keyExtractor={(item, index) => item?.user?.id}
                  />
                </View>
              </ImageBackground>
            </View>
            <View style={styles.innerContainer}>
              <TouchableOpacity
                onPress={() => {
                  setIsVisibleLogo(true);
                  setIslikedLogo('disliked');
                  handleOnSwipedLeft();
                }}>
                <Image
                  style={styles.dislikeButton}
                  source={Images.iconNotlike}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleOnSwipedRight();
                }}>
                <Image style={styles.likeButton} source={Images.iconLike} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Container>
    </>
  );
};
export default PtbDashboard;
