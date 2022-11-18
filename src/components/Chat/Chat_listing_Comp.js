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
  console.log(currentRole,'currentRole')
  console.log(roleId,'roleId::::::')
  console.log(message,'message:::::::')
  return (
    <>
      {currentRole !== 1 && roleId === 2 &&
        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => onPress()}>
          <View style={styles.contain}>
            <View style={match===2||read === 0 ?styles.ImgView:styles.unReadImgView}>
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
              {
            currentRole !== 1 ?
            <Text
            numberOfLines={2}
            style={read === 0 ? styles.msg : styles.msgRead}>
             {message !== '' ? message :'Hey, It’s a match!'}
          </Text>:<Text
            numberOfLines={2}
            style={read === 0 ? styles.msg : styles.msgRead}>
             {message !== '' ? message :''}
          </Text>
          }
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
      <View style={match===2||read === 0 ?styles.ImgView:styles.unReadImgView}>
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
          {
            currentRole !== 1 ?
            <Text
            numberOfLines={2}
            style={read === 0 ? styles.msg : styles.msgRead}>
             {message !== '' ? message :'Hey, It’s a match!'}
          </Text>:<Text
            numberOfLines={2}
            style={read === 0 ? styles.msg : styles.msgRead}>
             {message !== '' ? message :''}
          </Text>
          }
         
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
