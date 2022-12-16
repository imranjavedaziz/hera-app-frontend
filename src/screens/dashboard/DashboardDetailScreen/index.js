import {
  View,
  ImageBackground,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Images from '../../../constants/Images';
import Header, {IconHeader} from '../../../components/Header';
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
import {dynamicSize, width} from '../../../utils/responsive';
import ImageView from 'react-native-image-viewing';
import moment from 'moment';
import {Alignment} from '../../../constants';

const images = [];
const DashboardDetailScreen = () => {
  const navigation = useNavigation();
  const [smDetailRes, setSmDetailRes] = useState([]);
  const [imgPreviewindex, setImgPreviewIndex] = useState(0);
  const [visible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const loadingRef = useRef(false);
  const loadingMatchRef = useRef(false);
  const [islikedLogo, setIslikedLogo] = useState('');
  const [isVisibleLogo, setIsVisibleLogo] = useState(false);
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
  useFocusEffect(
    useCallback(() => {
      return navigation.addListener('focus', () => {
        images.length = 0;
      });
    }, []),
  );
  useFocusEffect(
    useCallback(() => {
      if (loadingRef.current && !get_sm_donor_loading) {
        dispatch(showAppLoader());
        if (get_sm_donor_success) {
          dispatch(hideAppLoader());
          setSmDetailRes(get_sm_donor_res);
          updateGallery();
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
    ]),
  );
  const updateGallery = () => {
    const url =
      get_sm_donor_res?.doner_photo_gallery?.length > 0 &&
      get_sm_donor_res?.doner_photo_gallery.map((item, i) => {
        return item;
      });
    for (let i = 0; i < url?.length; ++i) {
      images.push({uri: url[i]?.file_url});
    }
  };
  useEffect(() => {
    if (loadingMatchRef.current && !profile_match_loading) {
      dispatch(showAppLoader());
      if (profile_match_success) {
        dispatch(hideAppLoader());
        setIsVisibleLogo(false);
        setIslikedLogo('');
        if (smDetailRes?.profile_match_request?.status === 2) {
          dispatch(
            showAppToast(false, Strings.Chat.PLEASE_SEND_MESSAGE_INITIATE),
          );
        } else {
          dispatch(showAppToast(false, Strings.Chat.MATCH_SEND_SUCCESSFULLY));
          navigation.navigate(Routes.PtbDashboard);
        }
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
          flex: 1,
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: width,
          zIndex: 99999,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{height: 250, width: 250, resizeMode: 'contain'}}
          source={IMG_CONDI}
        />
      </Animated.View>
    );
  };
  const IMG_CONDI =
    islikedLogo === 'liked' ? Images.iconbigheart : Images.iconbigcross;

  const onPressLike = () => {
    const payload = {
      to_user_id: smDetailRes?.id,
      status: 1,
    };
    dispatch(profileMatch(payload));
    setIsVisibleLogo(true);
    setIslikedLogo('liked');
  };
  const onPressDislike = () => {
    const payload = {
      to_user_id: smDetailRes?.id,
      status: 3,
    };
    dispatch(profileMatch(payload));
    setIsVisibleLogo(true);
    setIslikedLogo('disliked');
  };
  const ImageClick = index => {
    setImgPreviewIndex(index);
    setIsVisible(true);
  };
  const renderItemData = item => {
    return (
      <>
        <TouchableOpacity
          onPress={() => ImageClick(item?.index)}
          key={item?.id}
          style={styles.imagePlaceholder}>
          <RNSDWebImage
            resizeMode="cover"
            source={{uri: item?.item?.file_url}}
            style={styles.imageBox}
          />
        </TouchableOpacity>
      </>
    );
  };
  let VIEW_PASS = (
    <View style={styles.nativeLong}>
      {smDetailRes?.doner_attribute?.mother_ethnicity && (
        <Text
          style={[
            global?.tagText,
            {
              backgroundColor: Colors.RGBA_229_172_177,
              marginTop: dynamicSize(Value.CONSTANT_VALUE_8),
            },
          ]}>
          {`${Strings.donorPofile.motherPlace} ${smDetailRes?.doner_attribute?.mother_ethnicity}`}
        </Text>
      )}
      {`${smDetailRes?.doner_attribute?.hair_colour} ${Strings.preference.HairColor}`
        .length < 20 ? (
        <View style={styles.nativeMainContainer}>
          {smDetailRes?.doner_attribute?.hair_colour && (
            <Text
              style={[
                global?.tagText,
                {
                  backgroundColor: Colors.RGBA_229_172_177,
                  marginTop: dynamicSize(Value.CONSTANT_VALUE_8),
                },
              ]}>
              {`${smDetailRes?.doner_attribute?.hair_colour} ${Strings.preference.HairColor}`}
            </Text>
          )}
          {smDetailRes?.doner_attribute?.eye_colour && (
            <View
              style={[styles.nativeLong, {marginLeft: Value.CONSTANT_VALUE_8}]}>
              <Text
                style={[
                  global?.tagText,
                  {
                    backgroundColor: Colors.RGBA_229_172_177,
                    marginTop: dynamicSize(Value.CONSTANT_VALUE_8),
                  },
                ]}>
                {`${smDetailRes?.doner_attribute?.eye_colour} ${Strings.donorPofile.eyeColor}`}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <>
          {smDetailRes?.doner_attribute?.hair_colour && (
            <Text
              style={[
                global?.tagText,
                {
                  backgroundColor: Colors.RGBA_229_172_177,
                  marginTop: dynamicSize(Value.CONSTANT_VALUE_8),
                },
              ]}>
              {`${smDetailRes?.doner_attribute?.hair_colour} ${Strings.preference.HairColor}`}
            </Text>
          )}
          {smDetailRes?.doner_attribute?.eye_colour && (
            <View style={styles.nativeLong}>
              <Text
                style={[
                  global?.tagText,
                  {
                    backgroundColor: Colors.RGBA_229_172_177,
                    marginTop: dynamicSize(Value.CONSTANT_VALUE_8),
                  },
                ]}>
                {`${smDetailRes?.doner_attribute?.eye_colour} ${Strings.donorPofile.eyeColor}`}
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
  return (
    <>
      <View style={styles.flex}>
        <Header end={false}>{headerComp()}</Header>
        {get_sm_donor_loading === false ? (
          <ScrollView showsVerticalScrollIndicator={false}>
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
                    Detail={`${parseInt(
                      smDetailRes?.doner_attribute?.height / 12,
                    )} ft ${smDetailRes?.doner_attribute?.height % 12} in`}
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
              <View style={{width: width - Value.CONSTANT_VALUE_60}}>
                {`${Strings.donorPofile.fatherPlace} ${smDetailRes?.doner_attribute?.father_ethnicity}`
                  .length < 20 ? (
                  <View style={styles.nativeMainContainer}>
                    {smDetailRes?.doner_attribute?.race && (
                      <View style={styles.nativePlace}>
                        <Text style={global?.tagText}>
                          {`${Strings.donorPofile.Race} ${smDetailRes?.doner_attribute?.race}`}
                        </Text>
                      </View>
                    )}
                    {smDetailRes?.doner_attribute?.father_ethnicity && (
                      <View style={styles.fatherPlace}>
                        <Text style={global?.tagText}>
                          {`${Strings.donorPofile.fatherPlace} ${smDetailRes?.doner_attribute?.father_ethnicity}`}
                        </Text>
                      </View>
                    )}
                  </View>
                ) : (
                  <View style={styles.nativeLong}>
                    {smDetailRes?.doner_attribute?.race && (
                      <Text
                        style={[
                          global?.tagText,
                          {
                            backgroundColor: Colors.RGBA_229_172_177,
                            marginTop: dynamicSize(Value.CONSTANT_VALUE_8),
                          },
                        ]}>
                        {`${Strings.donorPofile.Race} ${smDetailRes?.doner_attribute?.race}`}
                      </Text>
                    )}
                    {smDetailRes?.doner_attribute?.father_ethnicity && (
                      <Text
                        style={[
                          global?.tagText,
                          {
                            backgroundColor: Colors.RGBA_229_172_177,
                            marginTop: dynamicSize(Value.CONSTANT_VALUE_8),
                          },
                        ]}>
                        {`${Strings.donorPofile.fatherPlace} ${smDetailRes?.doner_attribute?.father_ethnicity}`}
                      </Text>
                    )}
                  </View>
                )}
                {`${Strings.donorPofile.motherPlace} ${smDetailRes?.doner_attribute?.mother_ethnicity}`
                  .length < 20 ? (
                  <View style={styles.nativeMainContainer}>
                    {smDetailRes?.doner_attribute?.mother_ethnicity && (
                      <View style={styles.motherPlace}>
                        <Text style={global?.tagText}>
                          {`${Strings.donorPofile.motherPlace} ${smDetailRes?.doner_attribute?.mother_ethnicity}`}
                        </Text>
                      </View>
                    )}
                    {smDetailRes?.doner_attribute?.hair_colour && (
                      <View style={styles.hairColor}>
                        <Text style={global?.tagText}>
                          {`${smDetailRes?.doner_attribute?.hair_colour} ${Strings.preference.HairColor}`}
                        </Text>
                      </View>
                    )}
                  </View>
                ) : (
                  VIEW_PASS
                )}
              </View>
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
                    source={{
                      uri: smDetailRes?.doner_video_gallery?.file_url,
                    }}
                    style={styles.videoContainer}
                    paused={true}
                  />
                </View>
              )}
              {smDetailRes?.profile_match_request?.status === 2 && (
                <View style={styles.dateTextView}>
                  <Image source={Images.HEARTH_ICON} />
                  <Text style={styles.dateText}>
                    {Strings.PTB_Profile.YouMatched}{' '}
                    {moment(
                      smDetailRes?.profile_match_request?.updated_at,
                    ).format('MMM DD,YYYY')}
                  </Text>
                </View>
              )}
              {smDetailRes?.profile_match_request?.status !== 2 && (
                <>
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
                </>
              )}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.loaderContainer}>
            <MaterialIndicator
              color={Colors.COLOR_A3C6C4}
              size={dynamicSize(25)}
            />
          </View>
        )}
        {isVisibleLogo && <FadeInView />}
        <ImageView
          images={images}
          imageIndex={imgPreviewindex}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
          isPinchZoomEnabled={true}
          swipeToCloseEnabled={false}
          style={{
            alignItems: Alignment.CENTER,
            justifyContent: Alignment.CENTER,
          }}
        />
      </View>
    </>
  );
};
export default React.memo(DashboardDetailScreen);
