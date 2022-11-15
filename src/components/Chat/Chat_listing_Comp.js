import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './styles';

const Chat_listing_Comp = ({image, name, message, time, latest = false}) => {
  return (
    <>
      <TouchableOpacity style={styles.innerContainer}>
        <View style={styles.ImgView}>
          <Image style={styles.userImg} source={image} />
        </View>
        <View style={styles.description}>
          <Text style={styles.userName}>{name}</Text>
          <Text numberOfLines={2} style={styles.msg}>
            {message}
          </Text>
        </View>
        <View style={styles.lastContainer}>
          <Text style={styles.time}>{time}</Text>
          {latest && <View style={styles.recentmsg} />}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Chat_listing_Comp;
