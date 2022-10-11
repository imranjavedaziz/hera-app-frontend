import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Images from '../../../../constants/Images';
import styles from './style';

const ProfileImage = ({Heading, Name, source}) => {
  return (
    <View style={styles.mainContainer}>
      <Image style={styles.Image} source={source} />
      <TouchableOpacity style={styles.cameraContainer} activeOpacity={0.5}>
        <Image source={Images.camera} style={styles.cameraIcon} />
      </TouchableOpacity>
      <Text style={styles.Heading}>{Heading}</Text>
      <Text style={styles.Name}>{Name}</Text>
    </View>
  );
};

export default ProfileImage;
