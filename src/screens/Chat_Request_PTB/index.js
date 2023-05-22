import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';
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
import {getAccountStatus} from '../../redux/actions/AccountStatus';
const Chat_Request = props => {
  console.log(props?.route?.params?.user, ':::::user');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loadingMatchRef = useRef(false);
  const [disable, setDisable] = useState(false);
  const {
    profile_match_response_success,
    profile_match_response_loading,
    profile_match_response_error_msg,
    profile_match_response_res,
    profile_match_data_status,
  } = useSelector(state => state.Profile_Match);
  const {account_status_success, account_status_res, account_status_fail} =
    useSelector(state => state.AccountStatus);
  const handleBackButtonClick = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  useEffect(() => {
    if (account_status_success) {
      setDisable(false);
    }
    if (account_status_fail) {
      setDisable(false);
    }
  }, [account_status_success, account_status_res, account_status_fail]);
  useEffect(() => {
    dispatch(getAccountStatus());
  }, []);

  useEffect(() => {
    if (loadingMatchRef.current && !profile_match_response_loading) {
      dispatch(showAppLoader());
      if (profile_match_response_success) {
        dispatch(hideAppLoader());
        dispatch(showAppToast(false, profile_match_response_res));
        setDisable(false);
        if (parseInt(profile_match_data_status.status) === 2) {
          navigation.navigate(Routes.ChatDetail, {
            item: props?.route?.params?.item,
            isComingFrom: true,
            account_status_res: account_status_res || '',
          });
        } else {
          navigation.navigate(Routes.Chat_Listing);
        }
      } else {
        setDisable(false);
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
      id: parseInt(props?.route?.params?.user?.id),
      status: 2,
    };
    setDisable(true);
    dispatch(profileMatchResponse(payload));
  };
  const onPressDislike = () => {
    const payload = {
      id: parseInt(props?.route?.params?.user?.id),
      status: 4,
    };
    dispatch(profileMatchResponse(payload));
  };
  const onNavigationDetail = () => {
    navigation.navigate(Routes.ProfileDetails, {
      userid: parseInt(props?.route?.params?.item?.recieverId),
      id: parseInt(props?.route?.params?.item?.match_request?.id),
      seeAll: true,
      coming: true,
      account_status_res: account_status_res || '',
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
    <View style={{backgroundColor: Colors.BACKGROUND, flex: 1}}>
      <View style={{alignSelf: 'flex-end'}}>{headerComp()}</View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.mainContainer}>
          <ChatImagComp source={props?.route?.params?.item?.recieverImage} />
          <User_detail
            Name={props?.route?.params?.item?.recieverName}
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
              disabled={disable}
              accessible={true}
              style={styles.btn(Colors.GREEN)}
              accessibilityRole={'button'}>
              <View style={styles.heartIcon}>
                <Image source={Images.HEARTH_ICON} />
                <Text
                  accessible={false}
                  style={styles.textbtn1}
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
      </ScrollView>
    </View>
  );
};

export default Chat_Request;
