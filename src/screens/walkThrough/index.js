import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';
import Header, {CircleBtn} from '../../components/Header';
import {Colors, Images, Strings} from '../../constants';
import styles from './style';
import {Routes} from '../../constants/Constants';

const WalkThrough = () => {
  const onboardingRef = useRef();
  const navigation = useNavigation();

  const headerComp = () => (
    <CircleBtn
      icon={Images.BACK_PLAN_ARROW}
      onPress={() => {
        onboardingRef.current.goToPage(0, true);
      }}
      accessibilityLabel="Cross Button, Go back"
      style={styles.headerIcon2}
    />
  );
  const headerComp2 = () => (
    <CircleBtn
      icon={Images.BACK_PLAN_ARROW}
      onPress={() => {
        onboardingRef.current.goToPage(1, true);
      }}
      accessibilityLabel="Cross Button, Go back"
      style={styles.headerIcon2}
    />
  );
  return (
    <View style={styles.mainContainer}>
      <Onboarding
        verticalSwipe={false}
        showPagination={false}
        pages={[
          {
            backgroundColor: Colors.COLOR_A3C6C4,
            image: (
              <View style={styles.firstMainContainer}>
                <Image source={Images.WALKTHROUGH1} resizeMode={'contain'} />
                <View style={styles.textContainer}>
                  <Text style={styles.select}>
                    {Strings.WALKTHROUGH.SELECT}
                  </Text>
                  <Image
                    source={Images.HEART}
                    style={styles.smallHeart}
                    resizeMode={'cover'}
                  />
                  <Text style={styles.textOne}>
                    {Strings.WALKTHROUGH.HEART_LIKE}
                  </Text>
                </View>
                <Text style={styles.textTwo}>
                  {Strings.WALKTHROUGH.REJECT_NEXT}
                </Text>
                <View style={styles.matchContainer}>
                  <Text style={styles.match}>
                    {Strings.WALKTHROUGH.FIND_MATCH}
                  </Text>
                </View>
                <View style={styles.contentContainer}>
                  <Text style={styles.matchContent}>
                    {Strings.WALKTHROUGH.MATCH_CONTENT}
                  </Text>
                </View>
                <View style={styles.buttoncontainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      onboardingRef.current.goNext();
                    }}>
                    <Text style={styles.buttonText}>
                      {Strings.WALKTHROUGH.NEXT}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ),
          },
          {
            backgroundColor: Colors.COLOR_A3C6C4,
            image: (
              <>
                <Header end={false}>{headerComp()}</Header>
                <View style={styles.subscriptionContainerNew}>
                  <Text style={styles.lookingSmNew}>
                    {Strings.WALKTHROUGH.LOOKING_SM}
                  </Text>
                  <Image
                    source={Images.WALKTHROUGH2}
                    resizeMode={'contain'}
                    style={styles.walkThrough}
                  />
                  <Text style={styles.match}>
                    {Strings.WALKTHROUGH.YOUR_PREFERENCE}
                  </Text>
                  <Text style={styles.matchContent}>
                    {Strings.WALKTHROUGH.PREFERENCE_CONTENT}
                  </Text>
                  <View style={styles.buttoncontainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        onboardingRef.current.goNext();
                      }}>
                      <Text style={styles.buttonText}>
                        {Strings.WALKTHROUGH.NEXT}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ),
          },
          {
            backgroundColor: Colors.COLOR_A3C6C4,
            image: (
              <>
                <Header end={false}>{headerComp2()}</Header>
                <View style={styles.subscriptionContainerNew}>
                  <Text style={styles.lookingSmNew}>
                    {Strings.WALKTHROUGH.SUBSCRIPTION}
                  </Text>

                  <Image
                    source={Images.WALKTHROUGH3}
                    resizeMode={'contain'}
                    style={styles.walkThrough}
                  />
                  <Text style={styles.match}>
                    {Strings.WALKTHROUGH.CONNECT}
                  </Text>
                  <Text style={styles.matchContent}>
                    {Strings.WALKTHROUGH.CONNECT_CONTENT}
                  </Text>
                  <View style={styles.buttoncontainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        navigation.navigate(Routes.Landing);
                      }}>
                      <Text style={styles.buttonText}>
                        {Strings.WALKTHROUGH.DONE}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ),
          },
        ]}
        ref={onboardingRef}
      />
    </View>
  );
};

export default WalkThrough;
