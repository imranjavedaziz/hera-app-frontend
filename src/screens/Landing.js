// Landing
import React from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import Container from '../components/Container';
import Images from '../constants/Images';
import styles from '../styles/landingScreen';
import Strings from '../constants/Strings';
import {Routes} from '../constants/Constants';

const Landing = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <View style={styles.bgContainer}>
        <Image source={Images.LANDING_BG} style={styles.bgImg} />
      </View>
      <Container
        scroller={true}
        // style={{paddingTop: 10, marginTop: -10}}
      >
        <View style={styles.mainContainer}>
          <Image
            source={Images.LOGO}
            style={styles.logo}
            accessible={true}
            accessibilityLabel="This is app logo"
          />
          <Text style={styles.title}>{Strings.landing.Like_Match_Connect}</Text>
          <View style={styles.btnContainer}>
            <Button
              label={Strings.landing.LOG_IN}
              onPress={() => navigation.navigate(Routes.Login)}
            />
            <Button
              label={Strings.landing.REGISTER}
              onPress={() => navigation.navigate(Routes.MobileNumber)}
            />
          </View>
        </View>
      </Container>
      <View style={styles.footer}>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel={Strings.landing.AboutUs}>
          <Text style={styles.footerBtn} accessible={false}>
            {Strings.landing.AboutUs}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessible={true}
          onPress={() => navigation.navigate(Routes.inqueryForm)}
          accessibilityLabel={Strings.landing.InquiryForm}>
          <Text style={styles.footerBtn} accessible={false}>
            {Strings.landing.InquiryForm}
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar hidden={Platform.OS === 'android'} animated={true} />
    </View>
  );
};
export default Landing;
