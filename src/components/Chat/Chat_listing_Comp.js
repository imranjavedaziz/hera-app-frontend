import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {Alignment} from '../../constants';

const Chat_listing_Comp = ({image, name, message, time, latest = false,onPress}) => {
  return (
    <>
      <TouchableOpacity style={styles.innerContainer} onPress={()=>onPress()}>
        <View style={{flex:.8,flexDirection:'row'}}>
        <View style={styles.ImgView}>
          <FastImage
         style={styles.userImg} source={{uri:image}}
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
