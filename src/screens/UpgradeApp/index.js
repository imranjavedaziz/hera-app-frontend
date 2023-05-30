import React from 'react';
import {
  View,
  Image,
  Text,
  Platform,
  Linking,
} from 'react-native';
import {Images, Strings} from '../../constants';
import {Button} from '../../components';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';

const bundleId = DeviceInfo.getBundleId();
const appLink = Platform.select({
  android: `https://play.google.com/store/apps/details?id=${bundleId}`,
  ios: 'https://apps.apple.com/us/app/hera-family-planning/id6444359675',
});
const UpgradeApp = ({route}) => {
  const handleUpgrade = () => {
    Linking.openURL(appLink);
  };
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={Images.LOGO} style={styles.img} />
      </View>
      <Text style={styles.txt1}>{Strings.UpgradeApp.title}</Text>
      <Text style={styles.para}>{Strings.UpgradeApp.para.replace('{VERSION}',route.params.data)}</Text>
      <Text style={styles.para2}>{Strings.UpgradeApp.para2.replace('{STORE}',Platform.select({ios: 'Appstore',android: 'Playstore'}))}</Text>
      <Button label={Strings.UpgradeApp.btn} onPress={handleUpgrade} />
    </View>
  );
};
export default UpgradeApp;
