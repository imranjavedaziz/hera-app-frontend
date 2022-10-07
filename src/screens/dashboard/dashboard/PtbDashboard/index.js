import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Text,
} from 'react-native';
import React, {useRef, useState} from 'react';

import Swiper from 'react-native-deck-swiper';
import styles from './style';
import {photoCards} from './cardList';
import Images from '../../../../constants/Images';
import Container from '../../../../components/Container';
import TitleComp from '../../../../components/dashboard/TitleComp';
import Strings from '../../../../constants/Strings';
import ImageComp from '../../../../components/dashboard/ImageComp';
import {IconHeader} from '../../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import Auth from '../../../../services/Auth';

const PtbDashboard = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isVisibleLogo, setIsVisibleLogo] = useState(false);
  const [islikedLogo, setIslikedLogo] = useState('');
  const useSwiper = useRef();
  const [cardIndex, setCardIndex] = useState(0);
  const [empty, setEmpty] = useState(false);
  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const authService = Auth();
  const handleOnSwipedLeft = () => {
      setCount(count + 1);
    setCardIndex(1);
    {
      if (count >= 4) {
        setEmpty(true);
      } else {
        setEmpty(false);
        setTimeout(() => {
          useSwiper.current.swipeLeft();
        }, 1000);
      }
    }
    setTimeout(() => {
      setCardIndex(0);
      setIsVisibleLogo(false);
      setIslikedLogo('');
    }, 200);
  };
  const handleOnSwipedRight = () => {
      setCount(count + 1);
    setCardIndex(1);
    {
      if (count >= 4) {
        setEmpty(true);
      } else {
        setEmpty(false);
        setTimeout(() => {
          useSwiper.current.swipeRight();
        }, 1000);
      }
    }
    setTimeout(() => {
      setCardIndex(0);
      setIsVisibleLogo(false);
      setIslikedLogo('');
    }, 150);
  };
  const onPressImage = () => {
    navigation.navigate('DashboardDetailScreen');
  };
  console.log('count>>', count);
  function renderCardData(item) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          onPressImage();
        }}>
        <ImageComp
          locationText={item.locationText}
          code={item.code}
          donerAge={item.donerAge}
          mapIcon={Images.mapgraypin}
          image={item.image}
          fadeAnim={fadeAnim}
          isVisibleLogo={isVisibleLogo}
          has_happen={islikedLogo}
        />
      </TouchableOpacity>
    );
  }

  const headerComp = () => (
    <IconHeader
      leftIcon={Images.person}
      leftPress={authService.logout}
      rightIcon={Images.iconChat}
      style={styles.headerIcon}
    />
  );

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
                    cardIndex={cardIndex}
                    cards={photoCards}
                    verticalSwipe={false}
                    horizontalSwipe={false}
                    swipeAnimationDuration={500}
                    showSecondCard={true}
                    stackSize={1}
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
                  setIsVisibleLogo(true);
                  setIslikedLogo('liked');
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
