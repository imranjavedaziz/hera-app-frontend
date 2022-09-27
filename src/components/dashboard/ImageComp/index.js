import {View, Text, ImageBackground, Image, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Images from '../../../constants/Images';
import styles from './style';

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration:1000,
      useNativeDriver:true
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
  {locationText, code, donerAge, mapIcon, has_happen, image,isVisibleLogo},
  props
) => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={image}
        style={styles.bgImage}
        resizeMode="contain">
        <View style={styles.iconContainer}>{isVisibleLogo===true?  <FadeInView
           >
            <Image
              style={styles.iconImage}
              source={has_happen === 'liked' ?  Images.iconbigheart :
              Images.iconbigcross}  
            />
            
          </FadeInView>: null
        }
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
  );
};

export default ImageComp;
