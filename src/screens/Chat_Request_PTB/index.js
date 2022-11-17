import React from 'react';
import {View, Text, Image, TouchableOpacity, Platform} from 'react-native';
import {Container} from '../../components';
import {IconHeader} from '../../components/Header';
import {Colors, Images, Strings} from '../../constants';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {Value} from '../../constants/FixedValues';
import ChatImagComp from '../../components/Chat_Request_Ptb/ChatImagComp';
import User_detail from '../../components/Chat_Request_Ptb/User_detail';
import LikeProfileDetail from '../../components/Chat_Request_Ptb/LikeProfileDetail';

const Chat_Resquest = props => {
  const navigation = useNavigation();
  const headerComp = () => (
    <IconHeader
      rightIcon={Images.iconcross}
      rightPress={() => navigation.goBack()}
      style={styles.header}
    />
  );
  return (
    <Container
      mainStyle={true}
      scroller={false}
      showHeader={true}
      headerComp={headerComp}>
      <View style={styles.mainContainer}>
        <ChatImagComp source={props.route.params.item.recieverImage} />
        <User_detail
          Name={props.route.params.item.recieverName}
          Type={Strings.Type}
        />
        <LikeProfileDetail
          likeProfile={Strings.Liked_your_profile}
          Start_Converstation={Strings.Start_Converstation}
        />
        <View style={styles.heartIconContainer}>
          <TouchableOpacity
            onPress={() => {
              console.log('liked');
            }}
            style={styles.btn(Colors.GREEN)}
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
            onPress={() => {
              console.log('disLiked');
            }}
            style={styles.btn(Colors.RED)}
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
        <TouchableOpacity>
          <Text style={styles.SeeProfile}>See Profile</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Chat_Resquest;
