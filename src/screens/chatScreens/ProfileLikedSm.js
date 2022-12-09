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
import { ScrollView } from 'react-native-gesture-handler';
const ProfileLikedSm = props => {
  const headerComp = () => (
    <TouchableOpacity
      style={styles.headersm}
      onPress={() => {
        props?.navigation?.goBack();
      }}>
      <Image source={Images.iconcross} />
    </TouchableOpacity>
  );
  console.log(props.route.params.item,'props.Routes.params.item')
  return (
    <ImageBackground
      source={Images.BLUR_BACKGROUND}
      resizeMode="cover"
      style={{flex: 1}}>
      <View>{headerComp()}</View>
      <ScrollView>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginTop:97
        }}>
        <Text
          style={styles.matchFoundText}>
          Nice, Your match found!
        </Text>
        <View style={styles.profileLikeScree}>
          <FastImage style={styles.userImg} source={{uri: ''}} />
          <FastImage
            style={styles.heartIcon}
            source={Images.WHITE_GREEN_HEART}
          />
        </View>
        <TouchableOpacity  onPress={() =>
              navigation.navigate(Routes.ChatDetail, {
                item:props.Routes.params.item,
                isComingFrom: false,
              })
            }>
          <Image source={Images.button_like} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 35, alignContent: 'center'}}>
          <Text style={styles.SeeProfile}>See Profile</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default React.memo(ProfileLikedSm);
