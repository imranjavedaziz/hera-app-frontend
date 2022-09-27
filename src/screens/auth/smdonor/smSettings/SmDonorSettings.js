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
import { Fonts } from '../../../../constants/Constants';

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
        <View style={[Styles.profileImgContainner,{marginBottom:14}]}>
          <Image
            style={Styles.profileImg}
            source={{
              uri: 'https://dindin-preprod-backend.s3.amazonaws.com/chefs/kelsey-kane/profile-screen_2x.jpg',
            }}
          />
        </View>
        <Text style={[globalStyle.screenTitle,{fontSize:11, margtinTop:8}]}>
            {Strings.smSetting.profile}
          </Text>
          <Text style={[globalStyle.screenSubTitle,{marginBottom:10}]}>
            {Strings.smSetting.ProfileName}
          </Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', marginTop:35}}>
            <Image source={Images.preferences}/>
            <Text style={{marginLeft:18, fontSize:16,fontFamily:Fonts.OpenSansBold}}>{Strings.smSetting.EditAttribute}</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', marginTop:35}}>
          <Image source={Images.galleryimage}/>
            <Text style={{marginLeft:18, fontSize:16,fontFamily:Fonts.OpenSansBold}}>{Strings.smSetting.Gallery}</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', marginTop:35}}>
          <Image source={Images.person}/>
            <Text style={{marginLeft:18, fontSize:16,fontFamily:Fonts.OpenSansBold}}>{Strings.smSetting.EditProfile}</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', marginTop:35}}>
          <Image source={Images.person}/>
            <Text style={{marginLeft:18, fontSize:16,fontFamily:Fonts.OpenSansBold}}>{Strings.smSetting.EditProfile}</Text>
          </View>
          
          
      
    </Container>
  );
};

export default SmDonorSettings;

const styles = StyleSheet.create({});
