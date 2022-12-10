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
import {Images, Strings} from '../../constants';
import {Routes} from '../../constants/Constants';
import {ScrollView} from 'react-native-gesture-handler';
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
            marginTop: 90,
          }}>
          <Text style={styles.matchFoundText}>{Strings.Chat.NICE_WATCH_FOUND}</Text>
          <View style={styles.profileLikeScree}>
            <FastImage
              style={styles.profileScreen}
              source={{
                uri: props?.route?.params?.item?.profile_match_request
                  ?.recieverImage,
              }}
            />
            <FastImage
              style={styles.heartIcon}
              source={Images.WHITE_GREEN_HEART}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              props?.navigation?.navigate(Routes.ChatDetail, {
                item: props?.route?.params?.item?.profile_match_request,
                isComingFrom: true,
              })
            }>
            <Image source={Images.button_like} />
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop: 35, alignContent: 'center'}} onPress={()=>{
            props.navigation.navigate(Routes.DashboardDetailScreen,{userId:props?.route?.params?.item?.id})
          }}>
            <Text style={styles.SeeProfile}>See Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default React.memo(ProfileLikedSm);
