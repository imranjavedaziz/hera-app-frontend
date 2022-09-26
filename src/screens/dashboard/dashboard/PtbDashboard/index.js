import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useRef} from 'react';


import Swiper from 'react-native-deck-swiper';
import styles from './style';
import {photoCards} from './cardList';
import Images from '../../../../constants/Images';
import Container from '../../../../components/Container';
import TitleComp from '../../../../components/dashboard/TitleComp';
import Strings from '../../../../constants/Strings';
import ImageComp from '../../../../components/dashboard/ImageComp';
import { IconHeader } from '../../../../components/Header';
import Colors from '../../../../constants/Colors';



const PtbDashboard = () => {
  const useSwiper = useRef();
  const handleOnSwipedLeft = () => {
    useSwiper.current.swipeLeft();
  };
  const handleOnSwipedRight = () => {
    useSwiper.current.swipeRight();
  };
  const renderCardData = item => {
    return (
      <ImageComp
        locationText={item.locationText}
        code={item.code}
        donerAge={item.donerAge}
        mapIcon={Images.mapgraypin}
        image={item.image}
      />
    );
  };

  const OverlayLabel = ({label}) => (
    <View style={[styles.overlayLabel, ]}>
      <Text>{label}</Text>
    </View>
  );

  const headerComp = () => (
    <IconHeader leftIcon={Images.person} rightIcon={Images.iconChat} />
  );
  const overlayLabels = {
    left: {
      element: (
        <OverlayLabel
          label={<Image source={Images.iconbigcross} />}
        />
      ),
      style: {
        wrapper: {
          alignItems: 'center',
          marginTop: 50, paddingRight:50
        },
      },
    },
    right: {
      element: (
        <OverlayLabel
          label={<Image source={Images.iconbigheart} />}
        />
      ),
      style: {
        wrapper: {
          alignItems: 'center',
          marginTop: 50,
        },
      },
    },
};

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
          <View style={{alignItems: 'center'}}>
            <ImageBackground
              source={Images.DASHBOARD_BG}
              style={{height: 467, width: 348}}>
              <View style={{}}>
                <Swiper
                  infinite={true}
                  ref={useSwiper}
                  renderCard={renderCardData}
                  cardIndex={0}
                  cards={photoCards}
                  verticalSwipe={false}
                  overlayLabels={overlayLabels}
                />
              </View>
            </ImageBackground>
          </View>
          <View style={styles.innerContainer}>
            <TouchableOpacity onPress={() => handleOnSwipedLeft()}>
              <Image source={Images.iconNotlike} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOnSwipedRight()}>
              <Image source={Images.iconLike} />
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    </>
  );
};
export default PtbDashboard;
