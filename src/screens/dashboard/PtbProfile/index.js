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

const PtbProfile = () => {
  const navigation = useNavigation();
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      style={styles.headerIcon}
      leftPress={() => navigation.goBack()}
    />
  );

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
            Name={Strings.smSetting.ProfileName}
            source={Images.DASHBOARD_IMG}
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
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{Strings.smSetting.Btn}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    </>
  );
};

export default PtbProfile;
