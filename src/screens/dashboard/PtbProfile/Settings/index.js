import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Images from '../../../../constants/Images';
import {IconHeader} from '../../../../components/Header';
import Container from '../../../../components/Container';
import styles from './style';
import Strings from '../../../../constants/Strings';
import SettingComp from '../../../../components/dashboard/SettingComp/SettingComp';
import {Fonts} from '../../../../constants/Constants';
const Setting = () => {
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
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>
              {Strings.profileSetting.SETTINGS}
            </Text>
          </View>
          <View style={styles.innerHeadingContainer}>
            <Text style={styles.innerHeading}>
              {Strings.profileSetting.Account_Settings}
            </Text>
          </View>
          <View style={styles.iconView}>
            <TouchableOpacity style={styles.passwordContainer}>
              <View style={styles.row}>
                <Image source={Images.lock} />
                <Text style={styles.passwordText}>
                  {Strings.profileSetting.Change_Password}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.deactivateContainer} />
            <SettingComp
              icon={Images.blockUser}
              Heading={Strings.profileSetting.Deactivate_Account}
              Description={Strings.profileSetting.Deactivate_Desc}
            />
            <View style={styles.deleteContainer} />
            <SettingComp
              icon={Images.blockUser}
              Heading={Strings.profileSetting.Delete_Account}
              Description={Strings.profileSetting.Delete_Desc}
            />
          </View>
        </View>
      </Container>
    </>
  );
};

export default Setting;
