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
  console.log('ROUTES', route.params);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const LoadingRef = useRef(false);
  const profileImg = useSelector(state => state?.Auth?.user?.profile_pic);
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const onSearch = value => {
    if (value === '') {
      setSearch('');
      setSearching(false);
      return;
    }
    setSearching(true);
    setSearch(value);
  };
  const onClear = () => {
    setSearching(false);
    setSearch('');
  };
  const {
    get_donor_dashboard_success,
    get_donor_dashboard_loading,
    get_donor_dashboard_error_msg,
    get_donor_dashboard_res,
  } = useSelector(state => state.DonorDashBoard);
  console.log('CARDS', cards);

  useEffect(() => {
    dispatch(getDonorDashboard());
  }, [dispatch]);

  //DONOR DASHBOARD CARD
  useEffect(() => {
    console.log(
      'donor Dashboard comp',
      get_donor_dashboard_success,
      LoadingRef.current,
      get_donor_dashboard_loading,
      get_donor_dashboard_res,
    );
    if (LoadingRef.current && !get_donor_dashboard_loading) {
      dispatch(showAppLoader());
      if (get_donor_dashboard_success) {
        dispatch(hideAppLoader());
        setCards(get_donor_dashboard_res.data);
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
      profileImg={profileImg}
      profileView={true}
      leftPress={() => navigation.navigate(Routes.SmSetting)}
      rightIcon={Images.iconChat}
      rightPress={() => logoutScreen()}
      style={styles.iconHead}
    />
  );
  return (
    <Container
      scroller={false}
      showHeader={searching ? false : true}
      headerComp={headerComp}
      headerEnd={true}
      style={{
        paddingTop: Value.CONSTANT_VALUE_60,
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
