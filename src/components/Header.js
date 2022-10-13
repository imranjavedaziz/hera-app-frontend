// Header
import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Colors from '../constants/Colors';
import {Value, Prencentage} from '../constants/FixedValues';
import Alignment from '../constants/Alignment';

const styles = {
  container: {
    width: Prencentage.PRECENTAGE_100,
    paddingVertical: Value.CONSTANT_VALUE_10,
    flexDirection: Alignment.ROW,
    backgroundColor: Colors.CLEAR,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
  },
  start: {
    justifyContent: Alignment.SPACE_BETWEEN,
  },
  end: {
    justifyContent: Alignment.FLEXEND,
  },
  circle: {
    flex: Value.CONSTANT_VALUE_0,
  },
  img: {
    maxWidth: Value.CONSTANT_VALUE_50,
    resizeMode: 'cover',
    maxHeight: Value.CONSTANT_VALUE_50,
    flex: Value.CONSTANT_VALUE_0,
  },
  profileImgContainner: {
    borderWidth: Value.CONSTANT_VALUE_2,
    borderColor: Colors.GREEN,
    borderRadius: Value.CONSTANT_VALUE_40,
  },
  profileImg: {
    width: Value.CONSTANT_VALUE_35,
    height: Value.CONSTANT_VALUE_35,
    borderRadius: Value.CONSTANT_VALUE_20,
    borderWidth: Value.CONSTANT_VALUE_2,
    borderColor: Colors.WHITE,
  },
};
export const CircleBtn = ({icon, onPress, ...otherProps}) => (
  <TouchableOpacity
    style={styles.circle}
    onPress={onPress}
    {...otherProps}
    accessible={true}
    accessibilityRole="button">
    <Image accessible={false} source={icon} style={styles.img} />
  </TouchableOpacity>
);
export const IconHeader = ({
  rightIcon,
  leftIcon,
  leftPress,
  rightPress,
  profileView,
  profileImg,
  ...otherProps
}) => (
  <>
    {profileView ? (
      <TouchableOpacity style={{marginRight: 270}} onPress={leftPress}>
        <View
          style={[styles.circle, styles.start, styles.profileImgContainner]}>
          <Image source={{uri: profileImg}} style={styles.profileImg} />
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={styles.circle}
        onPress={leftPress}
        {...otherProps}
        accessible={true}
        accessibilityRole="button">
        <Image accessible={false} source={leftIcon} style={styles.img} />
      </TouchableOpacity>
    )}

    <TouchableOpacity
      style={styles.circle}
      onPress={rightPress}
      {...otherProps}
      accessible={true}
      accessibilityRole="button">
      <Image accessible={false} source={rightIcon} style={styles.img} />
    </TouchableOpacity>
  </>
);
const Header = ({end = false, children}) => {
  return (
    <View style={[styles.container, end ? styles.end : styles.start]}>
      {children}
    </View>
  );
};
export const ProfileIcon = ({}) => (
  <View style={[styles.container, styles.start]}>
    <View style={styles.profileImgContainner}>
      <Image
        source={{
          uri: 'https://dindin-preprod-backend.s3.amazonaws.com/chefs/joan-bonilla/profile-logo.png',
        }}
        style={styles.profileImg}
      />
    </View>
  </View>
);
export default Header;
