import React from 'react';
import {
  View,
  Image,
  Text,
  Platform,
  Linking,
} from 'react-native';
import {Colors, Images, Strings} from '../../constants';
import {Button} from '../../components';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';

const appLink = Platform.select({
  android: 'https://play.google.com/store/apps/details?id=',
  ios: 'http://itunes.apple.com/lookup?bundleId=',
});
const UpgradeApp = ({route}) => {
  console.log(route.params.data);
  const handleUpgrade = () => {
    const bundleId = DeviceInfo.getBundleId();
    Linking.openURL(`${appLink}${bundleId}`);
  };
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={Images.LOGO} style={styles.img} />
      </View>
      <Text style={styles.txt1}>{Strings.UpgradeApp.title}</Text>
      <Text style={styles.txt2}>
        {`${Strings.UpgradeApp.version}${route.params.data}`}:
      </Text>
      <Text style={styles.para}>{Strings.UpgradeApp.para}</Text>
      <Button label={Strings.UpgradeApp.btn} onPress={handleUpgrade} />
    </View>
  );
};
export default UpgradeApp;
