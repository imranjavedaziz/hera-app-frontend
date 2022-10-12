import {Text, View, Image, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';
import Container from '../../../../components/Container';
import {CircleBtn} from '../../../../components/Header';
import Images from '../../../../constants/Images';
import { useSelector } from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import globalStyle from '../../../../styles/global';
import Strings from '../../../../constants/Strings';
import Colors from '../../../../constants/Colors';
import Button from '../../../../components/Button';
import Styles from './Styles';
import {Value} from '../../../../constants/FixedValues';
import { Routes } from '../../../../constants/Constants';
import Auth from '../../../../services/Auth';
const SmDonorSettings = () => {
  const navigation =useNavigation();
  const authService = Auth();
  const profileImg = useSelector((state)=> state.auth.user.profile_pic)

  const headerComp = () => (
    <CircleBtn
      icon={Images.iconBack}
      onPress={navigation.goBack}
      accessibilityLabel="Cross Button, Go back"
    />
  );
  return (
    <Container
      scroller={true}
      showHeader={true}
      headerComp={headerComp}
      headerEnd={false}>
      <View style={Styles.headerContainer}>
        <View style={[Styles.profileImgContainner]}>
          <Image
            style={Styles.profileImg}
            source={{
              uri:profileImg,
            }}
          />
        </View>
        <View>
          <View style={[Styles.camBtn, Styles.camSelectedBtn]}>
            <Image source={Images.camera} style={Styles.camImg} />
          </View>
        </View>
      </View>
      <Text style={[globalStyle.screenTitle, Styles.tittle]}>
        {Strings.smSetting.profile}
      </Text>
      <Text
        style={[
          globalStyle.screenSubTitle,
          {marginBottom: Value.CONSTANT_VALUE_10},
        ]}>
        {Strings.smSetting.ProfileName}
      </Text>

      <View style={Styles.highlightContainer}>
        <View style={Styles.flexRow}>
          <Image source={Images.preferences} />
          <Text style={Styles.text}>{Strings.smSetting.EditAttribute}</Text>
        </View>

        <View style={Styles.dot}></View>
      </View>

      <TouchableOpacity style={Styles.contain} onPress={()=> navigation.navigate(Routes.donorGallery)}>
        <Image source={Images.galleryimage} />
        <Text style={Styles.text}>{Strings.smSetting.Gallery}</Text>
      </TouchableOpacity>

      <View style={Styles.highlightContainer}>
        <View style={Styles.flexRow}>
          <Image source={Images.person} />
          <Text style={Styles.text}>{Strings.smSetting.EditProfile}</Text>
        </View>
        <View style={Styles.dot}></View>
      </View>
      <View style={Styles.contain}>
        <Image source={Images.setting2} />
        <Text style={Styles.text}>{Strings.smSetting.Settings}</Text>
      </View>
      <View style={Styles.contain}>
        <Image source={Images.writing} />
        <Text style={Styles.text}>{Strings.smSetting.Inquiry}</Text>
      </View>
      <View style={Styles.contain}>
        <Image source={Images.information} />
        <Text style={Styles.text}>{Strings.smSetting.AboutUs}</Text>
      </View>

      <View style={Styles.BtnContainer}>
        <Button
          style={Styles.Btn}
          label={Strings.smSetting.Btn}
          color={Colors.COLOR_F18D93}
          onPress={authService.logout}
        />
        <Text style={Styles.greyText}>{Strings.smSetting.AppVersion}</Text>
      </View>
    </Container>
  );
};

export default SmDonorSettings;
