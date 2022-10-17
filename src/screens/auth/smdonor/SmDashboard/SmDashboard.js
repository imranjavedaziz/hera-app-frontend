import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
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
import SetterData from '../../../../services/SetterData';
const SmDashboard = () => {
  const navigation = useNavigation();
  const data = SetterData();
  const stateData = useSelector(state => state.auth.user);
  console.log('PROFILE', stateData);
  const profileImg = useSelector(state => state.auth.user.profile_pic);
  const [search, setSearch] = React.useState('');
  const [searching, setSearching] = React.useState(false);
  const onSearch = value => {
    if (value === '') {
      setSearch('');
      setSearching(false);
      return;
    } else {
      setSearching(true);
      setSearch(value);
    }
  };
  const onClear = () => {
    setSearching(false);
    setSearch('');
  };
  useEffect(() => {
    let endPoint = `?state_ids%5B%5D=1&page=1&limit=${10}`;
    data.smDororDashBoard(endPoint);
  }, [data]);
  const renderProfile = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(Routes.ProfileDetails, {userid: item.id})
        }
        // onPress={()=>console.log(item.id)}
        style={styles.mainContainer}>
        <View style={styles.conatiner}>
          <ImageBackground
            style={[styles.profileImgView]}
            imageStyle={{borderRadius: 18}}
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
            <View style={styles.footer}>
              <Image source={Images.mapgraypin} />
              <Text style={styles.locationText}>{item.location?.name}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const headerComp = () => (
    <IconHeader
      profileImg={profileImg}
      profileView={true}
      rightIcon={Images.iconChat}
      leftPress={() => navigation.navigate(Routes.SmSetting)}
      // rightPress={authService.logout}
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
        marginBottom: Value.CONSTANT_VALUE_200,
      }}>
      <View style={globalStyle.mainContainer}>
        {search === '' ? (
          <>
            <Text style={globalStyle.screenTitle}>
              {Strings.sm_dashboard.Title}
            </Text>

            <View
              style={[
                globalStyle.screenSubTitle,
                {marginBottom: Value.CONSTANT_VALUE_32},
              ]}
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
          <Searchbar
            value={search}
            onChangeText={onSearch}
            editing={search === ''}
            onClear={onClear}
          />
          <View>
            {data.donorDashboard.length > 0 ? (
              <View>
                <FlatList
                  columnWrapperStyle={{justifyContent: Alignment.SPACE_BETWEEN}}
                  data={data.donorDashboard}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderProfile}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </Container>
  );
};

export default SmDashboard;
