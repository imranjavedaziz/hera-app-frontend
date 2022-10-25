import {
  View,
  ImageBackground,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useCallback, useState} from 'react';

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
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
import {showAppLoader, hideAppLoader} from '../../../redux/actions/loader';

const DashboardDetailScreen = () => {
  const navigation = useNavigation();
  const [smDetailRes, setSmDetailRes] = useState([]);
  const dispatch = useDispatch();
  const loadingRef = useRef();
  const {
    get_sm_donor_success,
    get_sm_donor_loading,
    get_sm_donor_error_msg,
    get_sm_donor_res,
  } = useSelector(state => state.SmDonorDetail);

  const {
    params: {userId},
  } = useRoute();

  useEffect(() => {
    dispatch(SmDonerDetail(userId));
  }, [dispatch, userId]);

  useFocusEffect(
    useCallback(() => {
      if (loadingRef.current && !get_sm_donor_loading) {
        dispatch(showAppLoader());
        if (get_sm_donor_success) {
          dispatch(hideAppLoader());
          console.log(get_sm_donor_res, 'get_sm_donor_res:::::::');
          setSmDetailRes(get_sm_donor_res);
        }
        if (get_sm_donor_error_msg) {
          dispatch(hideAppLoader());
        }
      }
      loadingRef.current = get_sm_donor_loading;
    }, [get_sm_donor_success, get_sm_donor_loading]),
  );
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      onPress={navigation.goBack}
      style={styles.headerIcon}
    />
  );
  const renderItemData = item => {
    return (
      <>
        <TouchableOpacity>
          <Image
            resizeMode="cover"
            source={{uri: item?.item?.file_url}}
            style={styles.imageBox}
          />
        </TouchableOpacity>
      </>
    );
  };
  console.log('smDetailRes,', smDetailRes)
  return (
    <>
      <Container
        mainStyle={true}
        scroller={true}
        showHeader={true}
        showsVerticalScrollIndicator={true}
        headerComp={headerComp}>
        <View style={styles.mainContainer}>
          <DetailComp
            Place={smDetailRes?.location?.name}
            Code={smDetailRes?.username}
            DonerType={smDetailRes?.role}
            image={{uri: smDetailRes?.profile_pic}}
          />
          <View style={styles.bioContainer}>
            <BioComponent
              Name={Strings.donorPofile.Age}
              Detail={`${smDetailRes?.age} yrs`}
            />
            <BioComponent
              Name={Strings.donorPofile.Height}
              Detail={Math.floor(smDetailRes?.doner_attribute?.height / 12)}
            />
            <BioComponent
              Name={Strings.donorPofile.Weight}
              Detail={`${smDetailRes?.doner_attribute?.weight} pounds`}
            />
            <BioComponent
              Name={Strings.donorPofile.Education}
              Detail={smDetailRes?.doner_attribute?.education}
            />
            <BioComponent
              Name={Strings.donorPofile.Occupation}
              Detail={smDetailRes?.user_profile?.occupation}
            />
          </View>
          <ImageBackground
            imageStyle={styles.backgroundImage}
            source={Images.iconComma}>
            <Text style={styles.Description}>
              {smDetailRes?.user_profile?.bio}
            </Text>
          </ImageBackground>
          <View style={styles.nativeMainContainer}>
            {smDetailRes?.location?.name ? (
              <View style={styles.nativePlace}>
                <Text style={styles.nativeText}>
                  {smDetailRes?.location?.name}
                </Text>
              </View>
            ) : null}
            {smDetailRes?.doner_attribute?.race ? (
              <View style={styles.fatherPlace}>
                <Text style={styles.fatherPlaceText} numberOfLines={2}>
                  {`${Strings.donorPofile.fatherPlace} ${smDetailRes?.doner_attribute?.race}`}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={styles.hairContainer}>
            {smDetailRes?.doner_attribute?.race ? (
              <View style={styles.motherPlace}>
                <Text style={styles.motherPlaceText} numberOfLines={2}>
                  {`${Strings.donorPofile.motherPlace} ${smDetailRes?.doner_attribute?.race}`}
                </Text>
              </View>
            ) : null}
            {smDetailRes?.doner_attribute?.hair_colour ? (
              <View style={styles.hairColor}>
                <Text style={styles.hairColorText}>
                  {`${smDetailRes?.doner_attribute?.hair_colour} ${Strings.donorPofile.hairColor}`}
                </Text>
              </View>
            ) : null}
          </View>
          {smDetailRes?.doner_attribute?.eye_colour ? (
            <View style={styles.eyeColorContainer}>
              <Text style={styles.eyeColorText}>
                {`${smDetailRes?.doner_attribute?.eye_colour} ${Strings.donorPofile.eyeColor}`}
              </Text>
            </View>
          ) : null}
          <View style={styles.imageMainContainer}>
            <FlatList
              data={smDetailRes?.doner_photo_gallery}
              renderItem={renderItemData}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          {smDetailRes?.doner_video_gallery != null ? (
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
          ) : null}

          <View style={styles.heartIconContainer}>
            <TouchableOpacity
              activeOpacity={Value.CONSTANT_VALUE_FRAC80}
              style={styles.btn}
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
              activeOpacity={Value.CONSTANT_VALUE_FRAC80}
              style={styles.btn2}
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
        </View>
      </Container>
    </>
  );
};
export default DashboardDetailScreen;
