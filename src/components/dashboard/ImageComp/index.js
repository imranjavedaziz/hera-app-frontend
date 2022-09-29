import {View, Text, ImageBackground, Image, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Images from '../../../constants/Images';
import styles from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
  },
  props,
) => {
  return (
    <View style={{alignItems: 'center', bottom: 20, right: 15}}>
      <View style={styles.mainContainer}>
        <ImageBackground
          source={image}
          style={styles.bgImage}
          imageStyle={{borderRadius: 20}}
          resizeMode="cover">
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
              <Text style={styles.codeText}>{code}</Text>
              <Text style={styles.donerAge}>{donerAge}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default ImageComp;
