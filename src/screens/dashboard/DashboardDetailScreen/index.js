import {View, ImageBackground, Text, Image} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import Images from '../../../constants/Images';
import Container from '../../../components/Container';
import {IconHeader} from '../../../components/Header';
import DetailComp from '../../../components/dashboard/DetailScreen/DetailComp/ImageComp';
import BioComponent from '../../../components/dashboard/DetailScreen/BioComponent/ImageComp';
import styles from './style';
import Strings from '../../../constants/Strings';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Value} from '../../../constants/FixedValues';

const DashboardDetailScreen = () => {
  const navigation = useNavigation();

  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      leftPress={() => navigation.goBack()}
      style={styles.headerIcon}
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
          <DetailComp
            Place={Strings.donorPofile.place}
            Code={Strings.donorPofile.code}
            DonerType={Strings.donorPofile.donerType}
          />
          <View style={styles.bioContainer}>
            <BioComponent
              Name={Strings.donorPofile.Age}
              Detail={Strings.donorPofile.ageDetail}
            />
            <BioComponent
              Name={Strings.donorPofile.Height}
              Detail={Strings.donorPofile.heightDetail}
            />
            <BioComponent
              Name={Strings.donorPofile.Weight}
              Detail={Strings.donorPofile.weightDetail}
            />
            <BioComponent
              Name={Strings.donorPofile.Education}
              Detail={Strings.donorPofile.educationDetail}
            />
            <BioComponent
              Name={Strings.donorPofile.Occupation}
              Detail={Strings.donorPofile.ocupationDetail}
            />
          </View>
          <ImageBackground
            imageStyle={styles.backgroundImage}
            source={Images.iconComma}>
            <Text style={styles.Description}>
              {Strings.donorPofile.donerDescription}
            </Text>
          </ImageBackground>
          <View style={styles.nativeMainContainer}>
            <View style={styles.nativePlace}>
              <Text style={styles.nativeText}>
                {Strings.donorPofile.nativePlace}
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
                {Strings.donorPofile.hairColor}
              </Text>
            </View>
          </View>
          <View style={styles.eyeColorContainer}>
            <Text style={styles.eyeColorText}>
              {Strings.donorPofile.eyeColor}
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
          <Text style={styles.middleText}>{Strings.donorPofile.shortClip}</Text>
          <Image style={styles.imageDemo2} source={Images.Demo2} />
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
