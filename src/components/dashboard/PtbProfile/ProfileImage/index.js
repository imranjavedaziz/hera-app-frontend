import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Images from '../../../../constants/Images';
import styles from './style';
import {Alignment} from '../../../../constants';

const ProfileImage = ({
  Heading,
  Name,
  source,
  LastName,
  onPressImg,
  smProfile,
}) => {
  return (
    <View
      style={{justifyContent: Alignment.CENTER, alignItems: Alignment.CENTER}}>
      <View style={smProfile ? styles.smmainContainer : styles.mainContainer}>
        <Image
          style={smProfile ? styles.SmImage : styles.Image}
          source={source}
        />
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
