import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {IconHeader} from '../../../components/Header';
import Images from '../../../constants/Images';
import Container from '../../../components/Container';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import ProfileImage from '../../../components/dashboard/PtbProfile/ProfileImage';
import Strings from '../../../constants/Strings';
import Subscribe from '../../../components/dashboard/PtbProfile/subscribe';
import PtbAccount from '../../../components/dashboard/PtbProfile/PtbAccount';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../../../redux/actions/Auth';
import {Routes} from '../../../constants/Constants';

const PtbProfile = () => {
  const navigation = useNavigation();
  const {registerUser,log_in_data} = useSelector(state => state.Auth);
  const dispatch = useDispatch();
  console.log('regi5sterUser', registerUser?.data?.data?.profile_pic);
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      style={styles.headerIcon}
      leftPress={() => navigation.goBack()}
    />
  );
  const logoutScreen = () => {
    dispatch(logOut());
    navigation.navigate(Routes.Landing);
  };
  return (
    <>
      <Container
        mainStyle={true}
        scroller={true}
        showHeader={true}
        showsVerticalScrollIndicator={true}
        headerComp={headerComp}>
        <View style={styles.mainContainer}>
          <ProfileImage
            Heading={Strings.smSetting.ptbProfile}
            Name={
              registerUser?.data?.data?.first_name
                ? registerUser?.data?.data?.first_name
                : log_in_data?.first_name
            }
            source={{
              uri: registerUser?.data?.data?.profile_pic
                ? registerUser?.data?.data?.profile_pic
                : log_in_data?.profile_pic
            }}
          />
          <Subscribe
            Icon={Images.STAR}
            MainText={Strings.subscribe.Subscribe_Now}
            InnerText={Strings.subscribe.Plans}
          />
          <PtbAccount
            leftIcon={Images.preferences}
            title={Strings.smSetting.EditPreferences}
            BlueDot
            onPress={() => navigation.navigate('SetPreference')}
          />
          <PtbAccount
            leftIcon={Images.video}
            title={Strings.smSetting.AddVideo}
            onPress={() => navigation.navigate('MyVideo')}
          />
          <PtbAccount
            leftIcon={Images.person}
            title={Strings.smSetting.EditProfile}
          />
          <PtbAccount
            leftIcon={Images.setting2}
            title={Strings.smSetting.Settings}
          />
          <PtbAccount
            leftIcon={Images.writing}
            title={Strings.smSetting.Inquiry}
          />
          <PtbAccount
            leftIcon={Images.information}
            title={Strings.smSetting.AboutUs}
          />
          <View style={styles.buttoncontainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => logoutScreen()}>
              <Text style={styles.buttonText}>{Strings.smSetting.Btn}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    </>
  );
};

export default PtbProfile;
