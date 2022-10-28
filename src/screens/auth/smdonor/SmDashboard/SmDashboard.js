import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Images from '../../../../constants/Images';
import Container from '../../../../components/Container';
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

const SmDashboard = ({route}) => {
  // let selectedState = route.params?.data;
  console.log('ROUTES', route.params?.data);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const LoadingRef = useRef(false);
  const profileImg = useSelector(state => state?.Auth?.user?.profile_pic);
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const dashboardApi=(value,page,limit)=>{
    let payload = {
      keyword: value,
      state_ids:'',
      page: page,
      limit: limit
    }
    dispatch(getDonorDashboard(payload));
  }
  const onSearch = value => {
    if (value === ''&&value.length<3) {
      dashboardApi('',1,10)
      setSearch('');
      setSearching(false);
      return;
    }
    dashboardApi(value,1,10)
    setSearching(true);
    setSearch(value);
  };
  const onClear = () => {
    dashboardApi('',1,10)
    setSearching(false);
    setSearch('');
  };
  const {
    get_donor_dashboard_success,
    get_donor_dashboard_loading,
    get_donor_dashboard_error_msg,
    get_donor_dashboard_res,
  } = useSelector(state => state.DonorDashBoard);
  useEffect(() => {
    dashboardApi('', 1, 10);
  }, [dispatch]);

  //DONOR DASHBOARD CARD
  useEffect(() => {
    if (LoadingRef.current && !get_donor_dashboard_loading) {
      dispatch(showAppLoader());
      if (get_donor_dashboard_success) {

        setCards(get_donor_dashboard_res.data);
        dispatch(hideAppLoader());
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
    dispatch,
  ]);




  const renderProfile = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(Routes.ProfileDetails, {userid: item.id})
        }
        style={styles.mainContainer}>
        <View style={styles.conatiner}>
          <ImageBackground
            style={[styles.profileImgView]}
            imageStyle={{borderRadius: Value.CONSTANT_VALUE_18}}
            source={{uri: item.profile_pic}}>
            <LinearGradient
              start={{x: 0.0, y: 0.28}}
              end={{x: 0.011, y: 1.15}}
              colors={['rgba(0, 0, 0, 0)', 'rgb(0, 0, 0)']}
              style={styles.gradient}
            />
          </ImageBackground>
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

  return (
    <Container
    mainStyle={true}
    scroller={false}
    showHeader={searching ? false : true}
    headerComp={headerComp}
      >
      <View style={[globalStyle.mainContainer, {paddingTop: Value.CONSTANT_VALUE_60}]}>
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
            />
          </View>
          <View>
            <FlatList
              contentContainerStyle={Styles.flatlist}
              columnWrapperStyle={{justifyContent: Alignment.SPACE_BETWEEN}}
              data={cards?.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderProfile}
              numColumns={2}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};
export default SmDashboard;
