import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import Header, {IconHeader} from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import Images from '../../constants/Images';
import {Alignment, Strings} from '../../constants';
import globalStyle from '../../styles/global';
import {useDispatch, useSelector} from 'react-redux';
import {DocumentGet} from '../../redux/actions/DocumentUpload';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../redux/actions/loader';
import ImageLoading from '../../components/ImageLoading';
import FastImage from 'react-native-fast-image';
import {Routes} from '../../constants/Constants';
import ImageView from 'react-native-image-viewing';
import _ from 'lodash';
const AllMedia = props => {
  const userId = props?.route?.params?.item?.recieverId;
  const dispatch = useDispatch();
  const loadingRef = useRef(null);
  const [Data, setData] = useState([]);
  const navigation = useNavigation();
  const [imgPreviewindex, setImgPreviewIndex] = useState(0);
  const [visible, setIsVisible] = useState(false);
  const [ViewImages, setViewImages] = useState([]);
  const {
    document_get_success,
    document_get_res,
    document_get_fail,
    document_get_error_msg,
    document_get_loading,
  } = useSelector(state => state.DocumentUpload);
  useEffect(() => {
    dispatch(showAppLoader());
    dispatch(DocumentGet(userId));
  }, [dispatch, userId]);
  useEffect(() => {
    if (loadingRef.current && !document_get_loading) {
      dispatch(showAppLoader());
      if (document_get_success) {
        dispatch(hideAppLoader());
        setData(document_get_res?.data?.data);
        updateGallery();
      }
      if (document_get_fail) {
        dispatch(hideAppLoader());
        dispatch(showAppToast(true, document_get_error_msg));
      }
    }
    loadingRef.current = document_get_loading;
  }, [
    document_get_success,
    document_get_loading,
    document_get_fail,
    document_get_res,
    dispatch,
    document_get_error_msg,
  ]);
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      onPress={() => {
        navigation.navigate(Routes.ChatDetail, {
          item: props?.route?.params?.item,
        });
      }}
      style={styles.androidHeaderIcons}
    />
  );
  const onPDF = img => {
    navigation.navigate(Routes.PdfView, {
      url: img.url,
    });
  };
  const onPressDoc = (img, index) => {
    if (
      img.url.endsWith('.jpg') ||
      img.url.endsWith('.jpeg') ||
      img.url.endsWith('.png')
    ) {
      ImageClick(index);
    } else {
      onPDF(img);
    }
  };

  const updateGallery = () => {
    const file =
      document_get_res?.data?.data?.length > 0 &&
      document_get_res?.data?.data.map((item, i) => {
        if (!ViewImages.includes(item)) {
          return item;
        } else {
          return null;
        }
      });
    for (let i = 0; i < file?.length; ++i) {
      if (_.isEmpty(document_get_res?.data?.data)) {
        return null;
      } else {
        setViewImages(
          [...file].map(e => {
            if (
              e.url.endsWith('.jpg') ||
              e.url.endsWith('.jpeg') ||
              e.url.endsWith('.png')
            ) {
              return {uri: e.url};
            }
          }),
        );
      }
    }
  };
  const ImageClick = index => {
    setImgPreviewIndex(index);
    setIsVisible(true);
  };
  return (
    <View style={styles.flex}>
      <Header end={false}>{headerComp()}</Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.mainContainer}>
          <Text style={globalStyle.screenTitle}>
            {Strings.allMedia.allMedia}
          </Text>
          <View style={styles.galleryImgContainer}>
            {Data.map((img, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => onPressDoc(img, index)}>
                  {img.url.endsWith('.jpg') ||
                  img.url.endsWith('.jpeg') ||
                  img.url.endsWith('.png') ? (
                    <ImageLoading
                      isFastImg={true}
                      key={index}
                      style={[styles.galleryImgView, styles.imageStyling]}
                      source={{
                        uri: img.url,
                        priority: FastImage.priority.normal,
                        cache: FastImage.cacheControl.immutable,
                      }}>
                      {img.loading && <ActivityIndicator />}
                    </ImageLoading>
                  ) : (
                    <View style={[styles.galleryImgView, styles.imageStyling]}>
                      <Image source={Images.PDF} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <ImageView
        images={ViewImages}
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
  );
};

export default AllMedia;
