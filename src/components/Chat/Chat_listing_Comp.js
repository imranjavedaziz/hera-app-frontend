import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {Images, Strings} from '../../constants';

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
    chatStart,
    status_id
  } = props;
  const styleMatchOne = message !== '' ? message : Strings.Chat.HEY_ITS_MATCH;
  const styleMatchTwo = message !== '' ? message : '';
  const styleMatchThree = read === 0 ? styles.msg : styles.msgRead;
  const smMatch =
    match === 1 && message === ''
      ? Strings.Chat.PARENT_TO_BE_SEND_REQUEST
      : message;
  return (
    <>
      {currentRole !== 1 && roleId === 2 && (
        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => onPress()}>
          <View style={styles.contain}>
            <View
              style={
                (match === 2 && chatStart !== 1) || read === 0
                  ? styles.ImgView
                  : styles.unReadImgView
              }>
                {
                  status_id!==1&&
                  <FastImage style={styles.userImg} source={Images.defaultProfile} />
                 
                }
                {
                  status_id===1&&  <FastImage style={styles.userImg} source={{uri: image}} />}
             
              {match === 2 && chatStart !== 1 && (
                <FastImage
                  style={styles.heartIcon}
                  source={Images.WHITE_GREEN_HEART}
                />
              )}
            </View>
            <View style={styles.description}>
           
            {status_id !== 1?
                  <Text style={styles.userName}>
                    {Strings.Chat.INACTIVE_USER}
                  </Text>:
              <Text numberOfLines={1} style={styles.userName}>
                {name}
              </Text>}
              {currentRole !== 1 ? (
                <Text numberOfLines={2} style={styleMatchThree}>
                  {styleMatchOne}
                </Text>
              ) : (
                <Text numberOfLines={2} style={styleMatchThree}>
                  {styleMatchTwo}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.timeView}>
            <Text style={styles.time}>{time}</Text>
            {read === 0 && <View style={styles.recentmsg} />}
          </View>
        </TouchableOpacity>
      )}
      {roleId !== 2 && (
        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => onPress()}>
          <View style={styles.contain}>
            <View
              style={
                (match === 2 && chatStart !== 1) ||
                read === 0
                  ? styles.ImgView
                  : styles.unReadImgView
              }>
                 {
                  status_id!==1&&
                  <FastImage style={styles.userImg} source={Images.defaultProfile} />
                 
                }
                {
                  status_id===1&&   <FastImage
                  style={styles.userImg}
                  source={currentRole === 1 ? Images.ADMIN_ICON : {uri: image}}
                />}
             
              {match === 2 && currentRole !== 1 && chatStart !== 1 && (
                <FastImage
                  style={styles.heartIcon}
                  source={Images.WHITE_GREEN_HEART}
                />
              )}
            </View>
            <View style={styles.description}>
            {status_id !== 1?
                  <Text style={styles.userName}>
                    {Strings.Chat.INACTIVE_USER}
                  </Text>:
              <Text numberOfLines={1} style={styles.userName}>
                {name}
              </Text>}
              {currentRole !== 1 ? (
                <Text
                  numberOfLines={2}
                  style={read === 0 ? styles.msg : styles.msgRead}>
                  {smMatch}
                </Text>
              ) : (
                <Text
                  numberOfLines={2}
                  style={read === 0 ? styles.msg : styles.msgRead}>
                  {styleMatchTwo}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.timeView}>
            <Text style={styles.time}>{time}</Text>
            {read === 0 && <View style={styles.recentmsg} />}
            {read !== 0 && <View style={{marginTop: 20}} />}
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};
export default React.memo(Chat_listing_Comp);
