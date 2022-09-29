import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
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
import style from './style';

const PtbDashboard = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isVisibleLogo, setIsVisibleLogo] = useState(false);
  const [islikedLogo, setIslikedLogo] = useState('');
  const useSwiper = useRef();
  const [cardIndex, setCardIndex] = useState(0);

  const handleOnSwipedLeft = () => {
    setIsVisibleLogo(true);
    setIslikedLogo('disliked');
    setCardIndex(1);
    setTimeout(() => {
      useSwiper.current.swipeLeft();
    }, 1000);

    setTimeout(() => {
      setCardIndex(0);
      setIsVisibleLogo(false);
      setIslikedLogo('');
    }, 200);
  };

  const handleOnSwipedRight = () => {
    setIsVisibleLogo(true);
    setIslikedLogo('liked');
    setCardIndex(1);
    setTimeout(() => {
      useSwiper.current.swipeRight();
    }, 1000);

    setTimeout(() => {
      setCardIndex(0);
      setIsVisibleLogo(false);
      setIslikedLogo('');
    }, 200);
  };
  function renderCardData(item) {
    return (
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
    );
  }

  const headerComp = () => (
    <IconHeader leftIcon={Images.person} rightIcon={Images.iconChat} />
  );

  return (
    <>
      <Container
        mainStyle={true}
        scroller={true}
        showHeader={true}
        headerComp={headerComp}>
        <View style={styles.mainContainer}>
          <TitleComp
            Title={Strings.dashboard.Title}
            Subtitle={Strings.dashboard.Subtitle}
            Icon={Images.iconArrow}
          />
          <View style={style.mainImageContainer}>
            <ImageBackground
              source={Images.DASHBOARD_BG}
              style={style.ImageSize}>
              <View>
                <Swiper
                  infinite={true}
                  ref={useSwiper}
                  renderCard={renderCardData}
                  cardIndex={cardIndex}
                  cards={photoCards}
                  verticalSwipe={false}
                  horizontalSwipe={false}
                  swipeAnimationDuration={700}
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
              <Image source={Images.iconNotlike} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsVisibleLogo(true);
                setIslikedLogo('liked');
                handleOnSwipedRight();
              }}>
              <Image source={Images.iconLike} />
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    </>
  );
};
export default PtbDashboard;
