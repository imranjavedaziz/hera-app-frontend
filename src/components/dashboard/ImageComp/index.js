import {View, Text, ImageBackground, Image, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Images from '../../../constants/Images';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';

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
const ImageComp = (
  {
    locationText,
    code,
    donerAge,
    mapIcon,
    onPress,
    has_happen,
    image,
    isVisibleLogo,
    category,
  },
  props,
) => {
  return (
    <View style={styles.upperContainer}>
      <View style={styles.mainContainer}>
        <ImageBackground
          source={image}
          style={styles.bgImage}
          imageStyle={styles.imageStyle}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgb(0, 0, 0)']}
            style={styles.linearGradient}
            start={{x: 0.0, y: 0.28}}
            end={{x: 0.011, y: 1.15}}>
            <View style={styles.iconContainer}>
              {isVisibleLogo === true ? (
                <FadeInView>
                  <Image
                    style={styles.iconImage}
                    source={
                      has_happen === 'liked'
                        ? Images.iconbigheart
                        : Images.iconbigcross
                    }
                  />
                </FadeInView>
              ) : null}
              <View style={styles.textInnerContainer}>
                <View style={styles.innerContainer}>
                  <Image source={mapIcon} />
                  <Text style={styles.locationText}>{locationText}</Text>
                </View>
                <Text style={styles.codeText}>#{code}</Text>
                <Text style={styles.donerAge}>
                  {category} ,{donerAge} yrs
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </View>
  );
};

export default ImageComp;
