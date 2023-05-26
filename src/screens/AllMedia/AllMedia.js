import {
  View,
  Text,
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
import {Alignment, Colors, Strings} from '../../constants';
import globalStyle from '../../styles/global';
import {useDispatch, useSelector} from 'react-redux';
import {DocumentGet} from '../../redux/actions/DocumentUpload';
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
import {MaterialIndicator} from 'react-native-indicators';
import {dynamicSize} from '../../utils/responsive';
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
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [ExtraData, setExtraData] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const {
    document_get_success,
    document_get_res,
    document_get_fail,
    document_get_error_msg,
    document_get_loading,
  } = useSelector(state => state.DocumentUpload);

  useFocusEffect(
    useCallback(() => {
      const payload = {
        data: userId,
        page: page,
        limit: 15,
      };
      dispatch(DocumentGet(payload));
    }, [dispatch, userId, page]),
  );
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
      updateGallery();
      const groupedData = ExtraData.reduce((result, item) => {
        const createdAt = new Date(item.created_at);
        const monthYear = `${
          monthNames[createdAt.getMonth()]
        } ${createdAt.getFullYear()}`;
        if (!result[monthYear]) {
          result[monthYear] = [];
        }
        result[monthYear].push(item);
        return result;
      }, {});
      setData(groupedData);
    }, [ExtraData]),
  );
  useFocusEffect(
    useCallback(() => {
      dispatch(showAppLoader());
      if (document_get_success) {
        console.log(document_get_res?.data, 'ocument_get_res?.data');
        const current_page = document_get_res?.data?.current_page;
        const data = document_get_res?.data.data;
        const last_page = document_get_res?.data?.last_page;
        if (current_page > 1) {
          if (document_get_res?.data.data.length > 0) {
            setLoadMore(false);
            setExtraData([...ExtraData, ...data]);
          }
        } else {
          setExtraData(data);
        }

        setLastPage(last_page);
        dispatch(hideAppLoader());
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
    const images = ExtraData.filter(img =>
      img.url.match(/\.(jpg|jpeg|png)$/i),
    ).map(img => ({uri: img.url}));
    setViewImages(images);
  };
  console.log(ViewImages, '');
  const ImageClick = img => {
    const indexFinal = ViewImages.findIndex(i => i.uri === img.url);
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
  const onEndReached = () => {
    console.log(lastPage, 'lastPage');
    console.log(page, 'page');
    if (lastPage > page) {
      setLoadMore(true);
      setPage(page + 1);
    } else {
      setLoadMore(false);
    }
  };
  const renderFooterCell = () => {
    if (loadMore && ExtraData.length > 0) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator style={{marginTop: Value.CONSTANT_VALUE_40}} />
        </View>
      );
    } else {
      return <View style={styles.loaderContainer} />;
    }
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
                    
                    ListFooterComponent={renderFooterCell}
                    ListHeaderComponent={() => (
                      <Text style={styles.month}>{key}</Text>
                    )}
                    horizontal={false}
                    onEndReached={() => {
                      onEndReached();
                    }}
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
