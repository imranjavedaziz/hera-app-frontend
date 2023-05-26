import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import Header, {IconHeader} from '../../components/Header';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Images from '../../constants/Images';
import {Alignment, Strings} from '../../constants';
import globalStyle from '../../styles/global';
import {useDispatch, useSelector} from 'react-redux';
import {
  DocumentGet,
  DocumentGetPages,
} from '../../redux/actions/DocumentUpload';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../redux/actions/loader';
import FastImage from 'react-native-fast-image';
import {Routes, monthNames} from '../../constants/Constants';
import ImageView from 'react-native-image-viewing';
import _ from 'lodash';
import {Value} from '../../constants/FixedValues';
import AllMediaImg from './AllMediaImg';
import {useCallback} from 'react';

const AllMedia = props => {
  const userId = props?.route?.params?.item?.recieverId;
  const dispatch = useDispatch();
  const loadingRef = useRef(null);
  const [Data, setData] = useState([]);
  const navigation = useNavigation();
  const [imgPreviewindex, setImgPreviewIndex] = useState(0);
  const [visible, setIsVisible] = useState(false);
  const [ViewImages, setViewImages] = useState([]);
  const [pages, setPage] = useState(1);
  const {
    document_get_success,
    document_get_res,
    document_get_fail,
    document_get_error_msg,
    document_get_loading,
  } = useSelector(state => state.DocumentUpload);

  useEffect(() => {
    dispatch(showAppLoader());
    const payload = {
      data: userId,
      page: pages,
      limit: 15,
    };
    dispatch(DocumentGet(payload));
  }, [dispatch, userId]);
  const flatListRef = useRef(null);
  const handleBackButtonClick = () => {
    navigation.navigate(Routes.ChatDetail, {
      item: props?.route?.params?.item,
    });
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
  useFocusEffect(
    useCallback(() => {
      dispatch(showAppLoader());
      if (document_get_success) {
        dispatch(hideAppLoader());
        updateGallery();
        console.log(document_get_res?.data, 'document_get_res?.data?.data');
        const groupedData = document_get_res?.data?.data.reduce(
          (result, item) => {
            const createdAt = new Date(item.created_at);
            const monthYear = `${
              monthNames[createdAt.getMonth()]
            } ${createdAt.getFullYear()}`;
            if (!result[monthYear]) {
              result[monthYear] = [];
            }

            result[monthYear].push(item);
            return result;
          },
          {},
        );
        setData(groupedData);
      }
      if (document_get_fail) {
        dispatch(hideAppLoader());
        dispatch(showAppToast(true, document_get_error_msg));
      }

      loadingRef.current = document_get_loading;
    }, [
      document_get_success,
      document_get_loading,
      document_get_fail,
      document_get_res,
      dispatch,
      document_get_error_msg,
    ]),
  );
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
      ImageClick(img);
      console.log(index);
    } else {
      onPDF(img);
    }
  };
  const updateGallery = () => {
    const images = document_get_res?.data?.data
      ?.filter(img => img.url.match(/\.(jpg|jpeg|png)$/i))
      .map(img => ({uri: img.url}));
    setViewImages(images);
  };
  console.log(ViewImages, '');
  const ImageClick = img => {
    const indexFinal = ViewImages.findIndex(i => i.uri === img.url);
    console.log(
      ViewImages.findIndex(i => i.url === img.url),
      'idexhuu',
    );
    console.log(img.url, 'img.url');
    setImgPreviewIndex(indexFinal);
    setIsVisible(true);
  };
  const renderItem = ({item, index}) => {
    const numColumns = 3;
    const isFirstOrThird =
      (index + 1) % numColumns === 1 || (index + 1) % numColumns === 0;
    return (
      <View
        style={[
          styles.paddingView,
          !isFirstOrThird && {paddingHorizontal: Value.CONSTANT_VALUE_1},
        ]}>
        <TouchableOpacity
          key={index}
          style={{justifyContent: Alignment.CENTER}}
          onPress={() => onPressDoc(item, index)}>
          {item.url.endsWith('.jpg') ||
          item.url.endsWith('.jpeg') ||
          item.url.endsWith('.png') ? (
            <AllMediaImg
              key={index}
              style={[styles.galleryImgView, styles.imageStyling]}
              source={{
                uri: item.url,
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.immutable,
              }}
            />
          ) : (
            <View style={[styles.galleryImgView, styles.imageStyling]}>
              <Image source={Images.PDF} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.flex}>
      <Header end={false}>{headerComp()}</Header>
      <View style={styles.flex} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <Text style={globalStyle.screenTitle}>
            {Strings.allMedia.allMedia}
          </Text>
          {!_.isEmpty(Data) &&
            Object.keys(Data).map(key => {
              return (
                <>
                  <FlatList
                    ref={flatListRef}
                    data={Data[key]}
                    numColumns={3}
                    contentContainerStyle={{flexGrow: 1}}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    ListFooterComponent={() => (
                      <View
                        style={{
                          marginBottom: 40,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      />
                    )}
                    ListHeaderComponent={() => (
                      <Text style={styles.month}>{key}</Text>
                    )}
                    horizontal={false}
                  />
                </>
              );
            })}
        </View>
      </View>
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
