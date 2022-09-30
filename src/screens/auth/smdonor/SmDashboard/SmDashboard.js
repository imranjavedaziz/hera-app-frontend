import {Pressable, StyleSheet, Text, View, Image,FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Images from '../../../../constants/Images';
import Container from '../../../../components/Container';
import {CircleBtn,} from '../../../../components/Header';
import globalStyle from '../../../../styles/global';
import Strings from '../../../../constants/Strings';
import Searchbar from '../../../../components/Searchbar';
import {Static,Routes} from '../../../../constants/Constants';
import {Value} from '../../../../constants/FixedValues';
import Alignment from '../../../../constants/Alignment';
import styles from './Styles'

const SmDashboard = ({route}) => {
  const navigation = useNavigation();

  const profile = Static.Profile;

  console.log(profile);

  const [search, setSearch] = React.useState('');
  const [searching, setSearching] = React.useState(false);

  const onSearch = value => {
    if (value === '') {
      return setSearch(''), setSearching(false);
    }

    setSearching(true), setSearch(value);
  };

  onClear = () => {
    setSearching(false);
    setSearch('');
  };

  const renderProfile = ({item, index}) => {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate(Routes.ProfileDetails)}>
        <View style={styles.conatiner}>
          <Image
            style={styles.profileImgView}
            source={{uri: item.image}}
          />
          <View style={styles.locationContainer}>
            <Text
              style={styles.profileName}>
              {item.name}
            </Text>
            <View style={{flexDirection: Alignment.ROW}}>
              <Image source={Images.mapgraypin}/>
              <Text
                style={styles.locationText}>
                {item.location}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // const IconStart = () => {
  //   <View style={styles.profileImgContainner}>
  //      <Image
  //       source={{uri: 'https://dindin-preprod-backend.s3.amazonaws.com/chefs/joan-bonilla/profile-logo.png'}}
  //       style={styles.profileImg}
  //     />
  //   </View>

  // }
  

  const headerComp = () => (
   
  <CircleBtn
      icon={Images.iconChat}
      accessibilityLabel="Left arrow Button, Press to go back"
    />
   
  );
  return (
    <>
    <Container
      scroller={false}
      showHeader={ searching ? false  : true}
      headerEnd={true}
      headerComp={headerComp}
      style={{marginTop:Value.CONSTANT_VALUE_60, marginBottom:Value.CONSTANT_VALUE_200}}
    >
       
      
      <View style={globalStyle.mainContainer}>
      
        {search === '' ? (
          <>
            <Text style={globalStyle.screenTitle}>
              {Strings.sm_dashboard.Title}
            </Text>

            <View
              style={[
                globalStyle.screenSubTitle,
                {marginBottom: Value.CONSTANT_VALUE_32,},
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
            ) : (
              null
            )}
          </View>
        </View>
       
      </View>
    </Container>
    </>
  );
};

export default SmDashboard;