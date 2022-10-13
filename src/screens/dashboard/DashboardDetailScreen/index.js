import {View, ImageBackground, Text, Image} from 'react-native';
import React, {useEffect} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';
import Images from '../../../constants/Images';
import Container from '../../../components/Container';
import {IconHeader} from '../../../components/Header';
import DetailComp from '../../../components/dashboard/DetailScreen/DetailComp/ImageComp';
import BioComponent from '../../../components/dashboard/DetailScreen/BioComponent/ImageComp';
import styles from './style';
import Strings from '../../../constants/Strings';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Value} from '../../../constants/FixedValues';
import SetterData from '../../../services/SetterData';
import Video from 'react-native-video';
const DashboardDetailScreen = () => {
  const navigation = useNavigation();
  const data = SetterData();
  const {
    params: {userId},
  } = useRoute();
  console.log('userId', userId);
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      onPress={navigation.goBack}
      style={styles.headerIcon}
    />
  );

  useEffect(() => {
    data.smDonorProfileDetail(userId);
  }, []);
  console.log(data.smDonorDetails, 'data>>>pop');
  return (
    <>
      <Container
        mainStyle={true}
        scroller={true}
        showHeader={true}
        showsVerticalScrollIndicator={true}
        headerComp={headerComp}>
        <View style={styles.mainContainer}>
          <DetailComp
            Place={data?.smDonorDetails?.location?.name}
            Code={data?.smDonorDetails?.username}
            DonerType={data?.smDonorDetails?.role}
            image={{uri: data?.smDonorDetails?.profile_pic}}
          />
          <View style={styles.bioContainer}>
            <BioComponent
              Name={Strings.donorPofile.Age}
              Detail={`${data?.smDonorDetails?.age} yrs`}
            />
            <BioComponent
              Name={Strings.donorPofile.Height}
              Detail={data?.smDonorDetails?.doner_attribute?.height}
            />
            <BioComponent
              Name={Strings.donorPofile.Weight}
              Detail={data?.smDonorDetails?.doner_attribute?.weight}
            />
            <BioComponent
              Name={Strings.donorPofile.Education}
              Detail={data?.smDonorDetails?.doner_attribute?.education}
            />
            <BioComponent
              Name={Strings.donorPofile.Occupation}
              Detail={data?.smDonorDetails?.user_profile?.occupation}
            />
          </View>
          <ImageBackground
            imageStyle={styles.backgroundImage}
            source={Images.iconComma}>
            <Text style={styles.Description}>
              {data?.smDonorDetails?.user_profile?.bio}
            </Text>
          </ImageBackground>
          <View style={styles.nativeMainContainer}>
            <View style={styles.nativePlace}>
              <Text style={styles.nativeText}>
                {data?.smDonorDetails?.location?.name}
              </Text>
            </View>
            <View style={styles.fatherPlace}>
              <Text style={styles.fatherPlaceText}>
                {Strings.donorPofile.fatherPlace}
              </Text>
            </View>
          </View>
          <View style={styles.hairContainer}>
            <View style={styles.motherPlace}>
              <Text style={styles.motherPlaceText}>
                {Strings.donorPofile.motherPlace}
              </Text>
            </View>
            <View style={styles.hairColor}>
              <Text style={styles.hairColorText}>
                {`${data?.smDonorDetails?.doner_attribute?.hair_colour} ${Strings.donorPofile.hairColor}`}
              </Text>
            </View>
          </View>
          <View style={styles.eyeColorContainer}>
            <Text style={styles.eyeColorText}>
              {`${data?.smDonorDetails?.doner_attribute?.eye_colour} ${Strings.donorPofile.eyeColor}`}
            </Text>
          </View>
          <View style={styles.imageMainContainer}>
            <TouchableOpacity>
              <Image source={Images.DASHBOARD_IMG} style={styles.imageBox} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={Images.DASHBOARD_IMG} style={styles.imageBox} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={Images.DASHBOARD_IMG} style={styles.imageBox} />
            </TouchableOpacity>
          </View>
          <View style={styles.imageInnerContainer}>
            <TouchableOpacity>
              <Image source={Images.DASHBOARD_IMG} style={styles.imageBox} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={Images.DASHBOARD_IMG} style={styles.imageBox} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={Images.DASHBOARD_IMG} style={styles.imageBox} />
            </TouchableOpacity>
          </View>
          {data?.smDonorDetails?.doner_video_gallery != null ? (
            <View>
              <Text style={styles.middleText}>
                {Strings.donorPofile.shortClip}
              </Text>
              <Video
                controls={true}
                source={{uri: data?.smDonorDetails?.doner_video_gallery}}
                onError={err => console.log(err)}
                // style={styles.videoContainer}
                paused={true}
              />
            </View>
          ) : (
            <View>
              <Text style={styles.middleText}>
                {Strings.donorPofile.shortClip}
              </Text>
              <Image style={styles.imageDemo2} source={Images.Demo2} />
            </View>
          )}

          <View style={styles.heartIconContainer}>
            <TouchableOpacity
              activeOpacity={Value.CONSTANT_VALUE_FRAC80}
              style={styles.btn}
              accessibilityRole={'button'}
              accessible={true}>
              <View style={styles.heartIcon}>
                <Image source={Images.HEARTH_ICON} />
                <Text
                  style={styles.textbtn1}
                  accessible={false}
                  numberOfLines={Value.CONSTANT_VALUE_1}>
                  {Strings.donorPofile.like_this_profile}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.crossIconContainer}>
            <TouchableOpacity
              activeOpacity={Value.CONSTANT_VALUE_FRAC80}
              style={styles.btn2}
              accessibilityRole={'button'}
              accessible={true}>
              <View style={styles.crossIcon}>
                <Image source={Images.RED_CROSS_ICON} />
                <Text
                  style={styles.textbtn1}
                  accessible={false}
                  numberOfLines={Value.CONSTANT_VALUE_1}>
                  {Strings.donorPofile.Not_interested}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    </>
  );
};
export default DashboardDetailScreen;
