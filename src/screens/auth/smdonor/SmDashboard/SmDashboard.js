import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Images from '../../../../constants/Images';
import Container from '../../../../components/Container';
import {IconHeader} from '../../../../components/Header';
import globalStyle from '../../../../styles/global';
import Strings from '../../../../constants/Strings';
import Searchbar from '../../../../components/Searchbar';
import {Static, Routes} from '../../../../constants/Constants';
import {Value} from '../../../../constants/FixedValues';
import Alignment from '../../../../constants/Alignment';
import styles from './Styles';
import LinearGradient from 'react-native-linear-gradient';
const SmDashboard = ({route}) => {
  const navigation = useNavigation();
  const profile = Static.Profile;
  console.log(profile);
  const [search, setSearch] = React.useState('');
  const [searching, setSearching] = React.useState(false);
  const onSearch = value => {
    if (value === '') {
     setSearch(''),
     setSearching(false)
     return;
    }
    setSearching(true) 
    setSearch(value);
  };
 const onClear = () => {
    setSearching(false);
    setSearch('');
  };

  const renderProfile = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(Routes.ProfileDetails)}>
        <View style={styles.conatiner}>
          <ImageBackground
            style={[styles.profileImgView]}
            source={{uri: item.image}}>
            <LinearGradient
              start={{x: 0.8, y: 0.25}}
              end={{x: 0.5, y: 1.0}}
              colors={['#181717', 'transparent']}
              style={{
                width: '100%',
                height: '100%',
                opacity: 0.2,
                borderRadius: Value.CONSTANT_VALUE_18,
              }}></LinearGradient>
          </ImageBackground>
          <View style={styles.locationContainer}>
            <Text style={styles.profileName}>{item.name}</Text>
            <View style={{flexDirection: Alignment.ROW}}>
              <Image source={Images.mapgraypin} />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const headerComp = () => (
    <>
     <IconHeader
      profileView={true}
      rightIcon={Images.iconChat}
      rightPress={console.log("Navigate to Chat")}
    />
    </>
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
            {profile.length > 0 ? (
              <View>
                <FlatList
                  columnWrapperStyle={{justifyContent: Alignment.SPACE_BETWEEN}}
                  data={profile}
                  // keyExtractor={item => item.index}
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
