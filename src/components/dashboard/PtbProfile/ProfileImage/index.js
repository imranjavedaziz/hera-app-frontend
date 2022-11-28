import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Images from '../../../../constants/Images';
import styles from './style';

const ProfileImage = ({
  Heading,
  Name,
  source,
  LastName,
  onPressImg,
  smProfile,
}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={smProfile ? styles.smmainContainer : styles.mainContainer}>
        <Image style={styles.Image} source={source} />
        <TouchableOpacity
          style={styles.cameraContainer}
          activeOpacity={1}
          onPress={onPressImg}>
          <Image source={Images.camera} style={styles.cameraIcon} />
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.Heading}>{Heading}</Text> */}
      <Text style={styles.Name}>
        {Name} {LastName}
      </Text>
    </View>
  );
};

export default ProfileImage;
