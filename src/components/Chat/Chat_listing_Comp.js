import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {Alignment, Images} from '../../constants';

const Chat_listing_Comp = props => {
  const {
    image,
    name,
    message,
    time,
    onPress,
    read,
    match,
    currentRole,
    roleId,
  } = props;
  return (
    <>
      {currentRole !== 1 && roleId === 2 &&
        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => onPress()}>
          <View style={styles.contain}>
            <View style={styles.ImgView}>
              <FastImage style={styles.userImg} source={{uri: image}} />
              {match === 2 && (
                <FastImage
                  style={styles.heartIcon}
                  source={Images.ICON_GREEN_HEART}
                />
              )}
            </View>
            <View style={styles.description}>
              <Text style={styles.userName}>{name}</Text>
              <Text
                numberOfLines={2}
                style={read === 0 ? styles.msg : styles.msgRead}>
                {message !== '' ? message :currentRole !== 1 ? "Hey! It's a Match":''}
              </Text>
            </View>
          </View>
          <View style={styles.timeView}>
            <Text style={styles.time}>{time}</Text>
            {read === 0 && <View style={styles.recentmsg} />}
          </View>
        </TouchableOpacity>
}
{
  roleId !== 2 &&
      <TouchableOpacity
      style={styles.innerContainer}
      onPress={() => onPress()}>
      <View style={styles.contain}>
        <View style={styles.ImgView}>
          <FastImage style={styles.userImg} source={currentRole === 1 ?Images.ADMIN_ICON:{uri: image}} />
          {match === 2 && (
            <FastImage
              style={styles.heartIcon}
              source={Images.ICON_GREEN_HEART}
            />
          )}
        </View>
        <View style={styles.description}>
          <Text style={styles.userName}>{name}</Text>
          <Text
            numberOfLines={2}
            style={read === 0 ? styles.msg : styles.msgRead}>
            {message !== '' ? message : "Hey! It's a Match"}
          </Text>
        </View>
      </View>
      <View style={styles.timeView}>
        <Text style={styles.time}>{time}</Text>
        {read === 0 && <View style={styles.recentmsg} />}
      </View>
    </TouchableOpacity>
}
  
     
    </>
  );
};

export default Chat_listing_Comp;
