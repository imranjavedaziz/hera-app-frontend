import {
  View,
  ImageBackground,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Images from '../../../constants/Images';
import Container from '../../../components/Container';
import {IconHeader} from '../../../components/Header';
import DetailComp from '../../../components/dashboard/DetailScreen/DetailComp/ImageComp';
import BioComponent from '../../../components/dashboard/DetailScreen/BioComponent/ImageComp';
import styles from './style';
import Strings from '../../../constants/Strings';
import {Value} from '../../../constants/FixedValues';
import Video from 'react-native-video';
import {SmDonerDetail} from '../../../redux/actions/SmDonerDetail';
import {useDispatch, useSelector} from 'react-redux';
import {
  showAppLoader,
  hideAppLoader,
  showAppToast,
} from '../../../redux/actions/loader';
import RNSDWebImage from 'react-native-sdwebimage';
import global from '../../../styles/global';
import Colors from '../../../constants/Colors';
import {profileMatch} from '../../../redux/actions/Profile_Match';
import {Routes} from '../../../constants/Constants';
import {MaterialIndicator} from 'react-native-indicators';
import {height} from '../../../utils/responsive';
import {Alignment} from '../../../constants';

const DashboardDetailScreen = () => {
  const navigation = useNavigation();
  const [smDetailRes, setSmDetailRes] = useState([]);
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const loadingMatchRef = useRef(false);

  const {
    get_sm_donor_success,
    get_sm_donor_loading,
    get_sm_donor_error_msg,
    get_sm_donor_res,
  } = useSelector(state => state.SmDonorDetail);
  const {
    profile_match_success,
    profile_match_loading,
    profile_match_error_msg,
  } = useSelector(state => state.Profile_Match);
  const {
    params: {userId},
  } = useRoute();
  useEffect(() => {
    dispatch(SmDonerDetail(userId));
  }, [dispatch, userId]);
  useEffect(() => {
    if (loadingRef.current && !get_sm_donor_loading) {
      dispatch(showAppLoader());
      if (get_sm_donor_success) {
        dispatch(hideAppLoader());
        setSmDetailRes(get_sm_donor_res);
      }
      if (get_sm_donor_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    loadingRef.current = get_sm_donor_loading;
  }, [
    get_sm_donor_success,
    get_sm_donor_loading,
    get_sm_donor_error_msg,
    dispatch,
    get_sm_donor_res,
  ]);
  useEffect(() => {
    if (loadingMatchRef.current && !profile_match_loading) {
      dispatch(showAppLoader());
      if (profile_match_success) {
        dispatch(hideAppLoader());
        dispatch(showAppToast(false, profile_match_error_msg));
        navigation.navigate(Routes.PtbDashboard);
      } else {
        dispatch(hideAppLoader());
      }
    }
    loadingMatchRef.current = profile_match_loading;
  }, [
    profile_match_success,
    profile_match_loading,
    profile_match_error_msg,
    dispatch,
    navigation,
  ]);

  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      onPress={navigation.goBack}
      style={styles.headerIcon}
    />
  );
  const onPressLike = () => {
    const payload = {
      to_user_id: smDetailRes?.id,
      status: 1,
    };
    dispatch(profileMatch(payload));
  };
  const onPressDislike = () => {
    const payload = {
      to_user_id: smDetailRes?.id,
      status: 3,
    };
    dispatch(profileMatch(payload));
  };
  const renderItemData = item => {
    return (
      <>
        <TouchableOpacity>
          <RNSDWebImage
            resizeMode="cover"
            source={{uri: item?.item?.file_url}}
            style={styles.imageBox}
          />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <Container
        mainStyle={true}
        scroller={true}
        showHeader={true}
        headerComp={headerComp}
        style={{marginHorizontal: 0}}>
        {get_sm_donor_loading === false ? (
          <View style={styles.mainContainer}>
            <DetailComp
              Place={smDetailRes?.location?.name}
              Code={smDetailRes?.username}
              DonerType={smDetailRes?.role}
              image={{uri: smDetailRes?.profile_pic}}
            />
            <View style={styles.bioContainer}>
              {smDetailRes?.age && (
                <BioComponent
                  Name={Strings.donorPofile.Age}
                  Detail={`${smDetailRes?.age} yrs`}
                />
              )}
              {smDetailRes?.doner_attribute?.height && (
                <BioComponent
                  Name={Strings.donorPofile.Height}
                  Detail={Math.floor(smDetailRes?.doner_attribute?.height / 12)}
                />
              )}
              {smDetailRes?.doner_attribute?.weight && (
                <BioComponent
                  Name={Strings.donorPofile.Weight}
                  Detail={`${smDetailRes?.doner_attribute?.weight} pounds`}
                />
              )}
              {smDetailRes?.doner_attribute?.education && (
                <BioComponent
                  Name={Strings.donorPofile.Education}
                  Detail={smDetailRes?.doner_attribute?.education}
                />
              )}
              {smDetailRes?.user_profile?.occupation && (
                <BioComponent
                  Name={Strings.donorPofile.Occupation}
                  Detail={smDetailRes?.user_profile?.occupation}
                />
              )}
            </View>
            <View style={global.dynamicMarginBottom(8)}>
              <ImageBackground
                imageStyle={styles.backgroundImage}
                source={Images.iconComma}>
                <Text style={styles.Description}>
                  {smDetailRes?.user_profile?.bio}
                </Text>
              </ImageBackground>
            </View>
            <View style={styles.nativeMainContainer}>
              {smDetailRes?.location?.name ? (
                <View style={styles.nativePlace}>
                  <Text style={global?.tagText}>
                    {smDetailRes?.location?.name}
                  </Text>
                </View>
              ) : null}
              {smDetailRes?.doner_attribute?.race ? (
                <View style={styles.fatherPlace}>
                  <Text style={global?.tagText}>
                    {`${Strings.donorPofile.fatherPlace} ${smDetailRes?.doner_attribute?.race}`}
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={styles.nativeMainContainer}>
              {smDetailRes?.doner_attribute?.hair_colour && (
                <View style={styles.motherPlace}>
                  <Text style={global?.tagText}>
                    {`${smDetailRes?.doner_attribute?.hair_colour} ${Strings.preference.HairColor}`}
                  </Text>
                </View>
              )}
              {smDetailRes?.doner_attribute?.race && (
                <View style={styles.hairColor}>
                  <Text style={global?.tagText}>
                    {`${Strings.donorPofile.motherPlace} ${smDetailRes?.doner_attribute?.race}`}
                  </Text>
                </View>
              )}
            </View>
            {smDetailRes?.doner_attribute?.eye_colour && (
              <View style={styles.eyeColorContainer}>
                <Text style={global?.tagText}>
                  {`${smDetailRes?.doner_attribute?.eye_colour} ${Strings.donorPofile.eyeColor}`}
                </Text>
              </View>
            )}
            {smDetailRes?.doner_photo_gallery?.length > 0 && (
              <View style={styles.imageMainContainer}>
                <FlatList
                  data={smDetailRes?.doner_photo_gallery}
                  renderItem={renderItemData}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )}
            {smDetailRes?.doner_video_gallery != null && (
              <View>
                <Text style={styles.middleText}>
                  {Strings.donorPofile.shortClip}
                </Text>
                <Video
                  controls={true}
                  source={{uri: smDetailRes?.doner_video_gallery?.file_url}}
                  onError={err => console.log(err)}
                  style={styles.imageDemo2}
                  paused={true}
                />
              </View>
            )}

            <View style={styles.heartIconContainer}>
              <TouchableOpacity
                onPress={onPressLike}
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
                onPress={onPressDislike}
                style={styles.btn(Colors.RED)}
                accessibilityRole={'button'}
                accessible={true}>
                <View style={styles.crossIcon}>
                  <Image source={Images.RED_CROSS_ICON} />
                  <Text
                    style={styles.textbtn2}
                    accessible={false}
                    numberOfLines={Value.CONSTANT_VALUE_1}>
                    {Strings.donorPofile.Not_interested}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <MaterialIndicator
            color={Colors.COLOR_A3C6C4}
            style={{
              justifyContent: Alignment.CENTER,
              alignItems: Alignment.CENTER,
              marginTop: height / 2,
            }}
          />
        )}
      </Container>
    </>
  );
};
export default DashboardDetailScreen;
