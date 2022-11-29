import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {Images} from '../../constants';
import {Header} from '../../components';
const ProfileLikedSm = props => {
  const headerComp = () => (
    <TouchableOpacity
      style={styles.headersm}
      onPress={() => {
        props?.navigation?.navigate?.goBack();
      }}>
      <Image source={Images.iconcross} />
    </TouchableOpacity>
  );
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        blurType: 'light',
        blurAmount: 5,
      }}>
      <ImageBackground
        source={Images.BLUR_BACKGROUND}
        resizeMode="cover"
        style={{blurAmount: 5, blurType: 'light'}}>
        <Header end={true}>{headerComp()}</Header>
        <Text
          style={{
            fontFamily: 'OpenSans',
            fontSize: 35,
            fontWeight: 'bold',
            fontStyle: 'normal',
            letterSpacing: 0,
            textAlign: 'center',
            color: '#353a3a',
          }}>
          Nice, Your match found!
        </Text>
        <View style={styles.ImgView}>
          <FastImage style={styles.userImg} source={{uri: ''}} />
          <FastImage
            style={styles.heartIcon}
            source={Images.WHITE_GREEN_HEART}
          />
        </View>
        <View
          style={{
            width: 296.7,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#ffffff',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#a3c6c4',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image style={{tintColor: '#000000'}} source={Images.iconChat} />
          <Text>SEND MESSAGE</Text>
        </View>
        <TouchableOpacity style={{marginTop: 35}}>
          <Text style={styles.SeeProfile}>See Profile</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};
export default React.memo(ProfileLikedSm);
