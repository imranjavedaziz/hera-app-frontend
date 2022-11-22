import React, {useEffect, useRef} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Container} from '../../components';
import {IconHeader} from '../../components/Header';
import {Colors, Images, Strings} from '../../constants';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {Value} from '../../constants/FixedValues';
import ChatImagComp from '../../components/Chat_Request_Ptb/ChatImagComp';
import User_detail from '../../components/Chat_Request_Ptb/User_detail';
import LikeProfileDetail from '../../components/Chat_Request_Ptb/LikeProfileDetail';
import {useDispatch, useSelector} from 'react-redux';
import {profileMatchResponse} from '../../redux/actions/Profile_Match';
import {
  showAppLoader,
  hideAppLoader,
  showAppToast,
} from '../../redux/actions/loader';
import {Routes} from '../../constants/Constants';
const Chat_Request = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loadingMatchRef = useRef(false);
  const {
    profile_match_response_success,
    profile_match_response_loading,
    profile_match_response_error_msg,
    profile_match_response_res,
  } = useSelector(state => state.Profile_Match);

  useEffect(() => {
    if (loadingMatchRef.current && !profile_match_response_loading) {
      dispatch(showAppLoader());
      if (profile_match_response_success) {
        dispatch(hideAppLoader());
        dispatch(showAppToast(false, profile_match_response_res));
      
      } else {
        dispatch(hideAppLoader());
      }
    }
    loadingMatchRef.current = profile_match_response_loading;
  }, [
    profile_match_response_success,
    profile_match_response_loading,
    profile_match_response_error_msg,
    profile_match_response_res,
  ]);

  const onPressLike = () => {
    const payload = {
      id:  props?.route?.params?.user?.id,
      status: 2,
    };
    dispatch(profileMatchResponse(payload));
    navigation.navigate(Routes.ChatDetail,{item: props?.route?.params?.item})
  };
  const onPressDislike = () => {
    const payload = {
      id: props?.route?.params?.user?.id,
      status: 4,
    };
    console.log(payload, 'payload');
    dispatch(profileMatchResponse(payload));
    navigation.navigate(Routes.ChatList)
  };
  const onNavigationDetail = () => {
    navigation.navigate(Routes.ProfileDetails, {
      userid: props?.route?.params?.item?.recieverId,
      seeAll: true,
    });
  };
  const headerComp = () => (
    <IconHeader
      rightIcon={Images.iconcross}
      rightPress={() => navigation.goBack()}
      style={styles.header}
    />
  );
  return (
    <Container
      mainStyle={true}
      scroller={false}
      showHeader={true}
      headerComp={headerComp}>
      <View style={styles.mainContainer}>
        <ChatImagComp
          source={
            props?.route?.params?.item?.recieverImage
              ? props?.route?.params?.item?.recieverImage
              : props?.route?.params?.user?.profile_pic
          }
        />
        <User_detail
          Name={
            props?.route?.params?.item?.recieverName
              ? props?.route?.params?.item?.recieverName
              : `${props?.route?.params?.user?.first_name} ${props?.route?.params?.user?.last_name}`
          }
          Type={Strings.Type}
        />
        <LikeProfileDetail
          likeProfile={Strings.Liked_your_profile}
          Start_Converstation={Strings.Start_Converstation}
        />
        <View style={styles.heartIconContainer}>
          <TouchableOpacity
            onPress={() => {
              onPressLike();
            }}
            style={styles.btn(Colors.GREEN)}
            accessibilityRole={'button'}
            accessible={true}>
            <View style={styles.heartIcon}>
              <Image source={Images.HEARTH_ICON} />
              <Text
                style={styles.textbtn1}
                accessible={false}
                numberOfLines={Value.CONSTANT_VALUE_1}>
                {Strings.donorPofile.like_this_profile}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.crossIconContainer}>
          <TouchableOpacity
            onPress={() => {
              onPressDislike();
            }}
            style={styles.btn(Colors.RED)}
            accessibilityRole={'button'}
            accessible={true}>
            <View style={styles.crossIcon}>
              <Image source={Images.RED_CROSS_ICON} />
              <Text
                style={styles.textbtn1}
                accessible={false}
                numberOfLines={Value.CONSTANT_VALUE_1}>
                {Strings.donorPofile.Not_interested}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => onNavigationDetail()}>
          <Text style={styles.SeeProfile}>See Profile</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Chat_Request;
