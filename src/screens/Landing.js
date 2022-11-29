// Landing
import React, {useEffect} from 'react';
import {View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import Images from '../constants/Images';
import styles from '../styles/landingScreen';
import Strings from '../constants/Strings';
import {Routes,ABOUT_URL} from '../constants/Constants';
import {deviceHandler} from '../utils/commonFunction';
import openWebView from '../utils/openWebView';

const type = 1;
const Landing = () => {
  const navigation = useNavigation();
  useEffect(() => {
    deviceHandler(navigation, 'exit');
  }, [navigation]);
  return (
    <View style={styles.flex}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bgContainer}>
          <Image source={Images.LANDING_BG} style={styles.bgImg} />
        </View>
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
              style={styles.widthText}
              label={Strings.landing.LOG_IN}
              onPress={() => navigation.navigate(Routes.Login)}
            />
            <Button
              style={styles.widthText}
              label={Strings.landing.REGISTER}
              onPress={() => navigation.navigate(Routes.MobileNumber,{type})}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          accessible={true}
          onPress={()=>openWebView(ABOUT_URL)}
          accessibilityLabel={Strings.landing.AboutUs}>
          <Text style={styles.footerBtn} accessible={false}>
            {Strings.landing.AboutUs}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessible={true}
          onPress={() => navigation.navigate(Routes.Support)}
          accessibilityLabel={Strings.landing.InquiryForm}>
          <Text style={styles.footerBtn} accessible={false}>
            {Strings.landing.InquiryForm}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default React.memo(Landing);
