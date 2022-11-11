import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Images from '../../../../constants/Images';
import Container from '../../../../components/Container';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {IconHeader} from '../../../../components/Header';
import globalStyle from '../../../../styles/global';
import Strings from '../../../../constants/Strings';
import Searchbar from '../../../../components/Searchbar';
import {Routes} from '../../../../constants/Constants';
import {Value} from '../../../../constants/FixedValues';
import Alignment from '../../../../constants/Alignment';
import styles from './Styles';
import LinearGradient from 'react-native-linear-gradient';
import {getDonorDashboard} from '../../../../redux/actions/DonorDashboard';
import {hideAppLoader, showAppLoader} from '../../../../redux/actions/loader';
import {logOut} from '../../../../redux/actions/Auth';
import Styles from '../smSettings/Styles';
import {deviceHandler} from '../../../../utils/commonFunction';
import FastImage from 'react-native-fast-image';
import {MaterialIndicator} from 'react-native-indicators';
import {Colors} from '../../../../constants';
const SmDashboard = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const LoadingRef = useRef(false);
  const profileImg = useSelector(state => state?.Auth?.user?.profile_pic);
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const {
    get_donor_dashboard_success,
    get_donor_dashboard_loading,
    get_donor_dashboard_error_msg,
    get_donor_dashboard_res,
  } = useSelector(state => state.DonorDashBoard);
  const loaderState = useSelector(state => state.loader);
  const [loadMore, setLoadMore] = useState(false);
  const unsubscribe = navigation.addListener('focus', () => {
    _getDonorDashboard(1, '');
  });
  useEffect(() => {
    if (route?.name === 'SmDashboard') {
      deviceHandler(navigation, 'exit');
    }
  }, []);
  useFocusEffect(
    useCallback(() => {
      dispatch(showAppLoader());
      _getDonorDashboard(1, '');
      return () => {
        unsubscribe();
      };
    }, []),
  );
  //  DONOR DASHBOARD CARD
  useFocusEffect(
    useCallback(() => {
      if (LoadingRef.current && !get_donor_dashboard_loading) {
        dispatch(showAppLoader());
        if (get_donor_dashboard_success) {
          dispatch(hideAppLoader());
          console.log(get_donor_dashboard_res, 'get_donor_dashboard_res');
          const {current_page, last_page, data} = get_donor_dashboard_res.data;
          if (current_page > 1) {
            data.length > 0 && setLoadMore(false);
            setCards([...cards, ...data]);
          } else {
            setCards(data);
          }
          setPage(current_page);
          setLastPage(last_page);
          setRefreshing(false);
        }
        if (get_donor_dashboard_error_msg) {
          dispatch(hideAppLoader());
        }
      }
      LoadingRef.current = get_donor_dashboard_loading;
    }, [
      get_donor_dashboard_success,
      get_donor_dashboard_loading,
      get_donor_dashboard_res,
      get_donor_dashboard_error_msg,
      // dispatch,
    ]),
  );

  const _getDonorDashboard = (page, value) => {
    let payload = {
      keyword: value ? value : '',
      state_ids:
        route.params?.informationDetail != undefined
          ? route.params?.informationDetail.join()
          : '',
      page: page,
      limit: 10,
    };
    console.log(payload, 'payload::::::');
    dispatch(getDonorDashboard(payload));
  };

  const onSearch = value => {
    if (value === '' && value.length < 3) {
      _getDonorDashboard(1, '');
      setSearch('');
      setSearching(false);
      return;
    }
    _getDonorDashboard(1, value);
    setSearching(true);
    setSearch(value);
  };
  const onEndReached = () => {
    if (lastPage > page) {
      setLoadMore(true);
      _getDonorDashboard(page + 1, search);
    } else {
      setLoadMore(false);
    }
  };
  const onClear = () => {
    setSearching(false);
    setSearch('');
    _getDonorDashboard(1, '');
  };
  const renderProfile = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(Routes.ProfileDetails, {userid: item.id})
        }
        style={styles.mainContainer}>
        <View style={styles.conatiner}>
          <FastImage
            style={[
              styles.profileImgView,
              {borderRadius: Value.CONSTANT_VALUE_18},
            ]}
            source={{
              uri: item.profile_pic,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}>
            <LinearGradient
              start={{x: 0.0, y: 0.28}}
              end={{x: 0.011, y: 1.15}}
              colors={['rgba(0, 0, 0, 0)', 'rgb(0, 0, 0)']}
              style={styles.gradient}
            />
          </FastImage>
          <View style={styles.locationContainer}>
            <Text style={styles.profileName}>{item.first_name}</Text>
            <View style={styles.profileFooter}>
              <Image source={Images.mapgraypin} />
              <Text style={styles.locationText}>
                {item.location?.name.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const logoutScreen = () => {
    dispatch(logOut());
    navigation.navigate(Routes.Landing);
  };
  const headerComp = () => (
    <IconHeader
      leftIcon={{uri: profileImg}}
      leftPress={() => navigation.navigate(Routes.SmSetting)}
      rightIcon={Images.iconChat}
      rightPress={() => logoutScreen()}
      style={styles.headerIcon}
      ApiImage={true}
    />
  );
  const onRefresh = () => {
    setRefreshing(true);
    _getDonorDashboard(1, search);
  };

  const renderEmptyCell = () => {
    if (!loaderState.loading) {
      return (
        <View>
          <Text>No RESULT FOUND</Text>
        </View>
      );
    }
  };

  const renderFooterCell = () => {
    if (loadMore && cards.length > 0) {
      return (
        <View style={styles.loaderContainer}>
          <MaterialIndicator
            size={Value.CONSTANT_VALUE_40}
            color={Colors.COLOR_A3C6C4}
          />
        </View>
      );
    }
  };
  return (
    <Container
      mainStyle={true}
      scroller={false}
      showHeader={searching ? false : true}
      headerComp={headerComp}
      style={{
        paddingTop: searching
          ? Value.CONSTANT_VALUE_10
          : Value.CONSTANT_VALUE_60,
      }}>
      <View style={globalStyle.mainContainer}>
        {search === '' ? (
          <>
            <Text style={[globalStyle.screenTitle]}>
              {Strings.landing.Like_Match_Connect}
            </Text>
            <View
              style={[globalStyle.screenSubTitle, styles.subTitle]}
              accessible={true}
              accessibilityLabel={`${Strings.sm_dashboard.Subtitle1} ${Strings.sm_dashboard.Subtitle2}`}>
              <Text
                style={globalStyle.screenSubTitle}
                numberOfLines={2}
                accessible={false}>
                {Strings.sm_dashboard.Subtitle1}
              </Text>
              <Text
                style={globalStyle.screenSubTitle}
                accessible={false}
                numberOfLines={1}>
                {Strings.sm_dashboard.Subtitle2}
              </Text>
            </View>
          </>
        ) : null}
        <View>
          <View style={styles.search}>
            <Searchbar
              value={search}
              onChangeText={onSearch}
              editing={search === ''}
              onClear={onClear}
              selectedStates={route.params?.informationDetail}
            />
          </View>
          <View>
            <FlatList
              contentContainerStyle={Styles.flatlist}
              columnWrapperStyle={{justifyContent: Alignment.SPACE_BETWEEN}}
              data={cards}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderProfile}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              onEndReached={() => {
                route.params?.informationDetail !== undefined && onEndReached();
                searching && onEndReached();
              }}
              ListEmptyComponent={renderEmptyCell}
              ListFooterComponent={renderFooterCell}
              refreshing={refreshing}
              onRefresh={onRefresh}
              testID="flat-list"
            />
          </View>
        </View>
      </View>
    </Container>
  );
};
export default SmDashboard;
