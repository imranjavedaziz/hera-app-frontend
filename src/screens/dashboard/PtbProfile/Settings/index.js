import {View, Text} from 'react-native';
import React from 'react';
import Header, {IconHeader} from '../../../../components/Header';
import styles from './style';
import {Images, Strings} from '../../../../constants';
import {useNavigation} from '@react-navigation/native';
import AccountSetting from '../../../../components/dashboard/PtbProfile/AccountSettings';

const Settings = () => {
  const navigation = useNavigation();
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      style={styles.headerIcon}
      leftPress={() => navigation.goBack()}
    />
  );
  return (
    <View style={styles.mainContainer}>
      <Header end={false}>{headerComp()}</Header>
      <View style={styles.headingContainer}>
        <Text style={styles.Settings}>{Strings.Settings.SETTINGS}</Text>
      </View>
      <View style={styles.innerHeading}>
        <Text style={styles.account}>{Strings.Settings.Account_Settings}</Text>
      </View>
      <View style={styles.changePsswrd}>
        <AccountSetting
          Icon={Images.lock}
          Heading={Strings.Settings.Change_Password}
          line
          onPress={() => {
            navigation.navigate('ChangePassword');
          }}
        />
        <View style={styles.deactivate}>
          <AccountSetting
            Icon={Images.blockUser}
            Heading={Strings.Settings.Deactivate_Account}
            Content={Strings.Settings.Deactivate_Content}
            line
            red
          />
        </View>
        <View style={styles.delete}>
          <AccountSetting
            Icon={Images.blockUser}
            Heading={Strings.Settings.Delete_Account}
            Content={Strings.Settings.Delete_Content}
            line
            red
          />
        </View>
      </View>
    </View>
  );
};

export default Settings;
