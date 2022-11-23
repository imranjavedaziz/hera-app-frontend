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
              <FastImage style={styles.userImg} source={{uri: image}} />
              {match === 2 && chatStart !== 1 && (
                <FastImage
                  style={styles.heartIcon}
                  source={Images.ICON_GREEN_HEART}
                />
              )}
            </View>
            <View style={styles.description}>
              <Text style={styles.userName}>{name}</Text>
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
                (currentRole !== 1 &&
                  match === 2 &&
                  chatStart !== 1) ||
                read === 0
                  ? styles.ImgView
                  : styles.unReadImgView
              }>
              <FastImage
                style={styles.userImg}
                source={currentRole === 1 ? Images.ADMIN_ICON : {uri: image}}
              />
              {match === 2 && currentRole !== 1 && chatStart !== 1 && (
                <FastImage
                  style={styles.heartIcon}
                  source={Images.ICON_GREEN_HEART}
                />
              )}
            </View>
            <View style={styles.description}>
              <Text style={styles.userName}>{name}</Text>
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
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};
export default React.memo(Chat_listing_Comp);
