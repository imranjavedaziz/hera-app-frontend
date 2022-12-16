import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {Images} from '../../constants';

const Chat_listing_Comp = props => {
  const {
    image,
    onPress,
    read,
    match,
    currentRole,
    roleId,
    chatStart,
    status_id,
    recieverSubscription,
  } = props;
  return (
    <>
      {currentRole !== 1 && roleId === 2 && (
        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => onPress()}>
          <View
            style={
              (match === 2 && chatStart !== 1) || read === 0
                ? styles.ImgView
                : styles.unReadImgView
            }>
            {status_id !== 1 ||
            (recieverSubscription === 0 && currentRole === 2) ? (
              <FastImage
                style={styles.userImg}
                source={Images.defaultProfile}
              />
            ) : (
              <FastImage style={styles.userImg} source={{uri: image}} />
            )}
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};
export default React.memo(Chat_listing_Comp);
