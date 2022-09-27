import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Container from '../../../../components/Container';
import {CircleBtn} from '../../../../components/Header';
import Images from '../../../../constants/Images';
import globalStyle from '../../../../styles/global';
import Strings from '../../../../constants/Strings';
import {showAppToast} from '../../../../redux/actions/loader';
import Colors from '../../../../constants/Colors';
import Button from '../../../../components/Button';
import Styles from './Styles';

const SmDonorSettings = () => {
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconBack}
      onPress={() => setOpen(true)}
      accessibilityLabel="Cross Button, Go back"
    />
  );
  return (
    <Container
      scroller={true}
      showHeader={true}
      headerComp={headerComp}
      headerEnd={false}>
      <View style={[globalStyle.mainContainer, {borderWidth: 2}]}>
        <View style={Styles.profileImgContainner}>
          <Image
            style={Styles.profileImg}
            source={{
              uri: 'https://dindin-preprod-backend.s3.amazonaws.com/chefs/kelsey-kane/profile-screen_2x.jpg',
            }}
          />
        </View>
        <Text style={globalStyle.screenTitle}>
            {Strings.smSetting.profile}
          </Text>
          <Text style={[globalStyle.screenSubTitle,]}>
            {Strings.smSetting.ProfileName}
          </Text>

      </View>
    </Container>
  );
};

export default SmDonorSettings;

const styles = StyleSheet.create({});
