import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {Alignment, Images} from '../../constants';

const Chat_listing_Comp = props => {
  const {image, name, message, time, latest = false, onPress} = props;
  return (
    <>
      <TouchableOpacity style={styles.innerContainer} onPress={() => onPress()}>
        <View style={styles.contain}>
          <View style={styles.ImgView}>
            <FastImage style={styles.userImg} source={{uri: image}} />
            <FastImage
              style={styles.heartIcon}
              source={Images.ICON_GREEN_HEART}
            />
          </View>
          <View style={styles.description}>
            <Text style={styles.userName}>{name}</Text>
            <Text numberOfLines={2} style={styles.msg}>
              {message}
            </Text>
          </View>
        </View>
        <View style={styles.timeView}>
          <Text style={styles.time}>{time}</Text>
          {latest && <View style={styles.recentmsg} />}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Chat_listing_Comp;
