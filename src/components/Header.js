// Header
import React from 'react';
import {View, TouchableOpacity, Image, Platform, Text} from 'react-native';
import Colors from '../constants/Colors';
import {Value, Prencentage} from '../constants/FixedValues';
import Alignment from '../constants/Alignment';
import {dynamicSize} from '../utils/responsive';
import {Fonts} from '../constants/Constants';
import {getStatusBarHeight} from 'react-native-safearea-height';

const MaxValueHeader = Math.abs(getStatusBarHeight() - 54); // Android working fine  // IOS we need ios 54 Fail
const styles = {
  container: {
    width: Prencentage.PRECENTAGE_100,
    marginTop: MaxValueHeader,
    flexDirection: Alignment.ROW,
    backgroundColor: Colors.CLEAR,
    position: Alignment.ABSOLUTE,
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
    resizeMode: Alignment.COVER,
    maxHeight: Value.CONSTANT_VALUE_50,
    flex: Value.CONSTANT_VALUE_0,
  },
  profileImgContainner: {
    borderWidth: Value.CONSTANT_VALUE_2,
    borderColor: Colors.GREEN,
    borderRadius: Value.CONSTANT_VALUE_40,
    backgroundColor: '#E2E1D8',
  },
  profileImg: {
    width: Value.CONSTANT_VALUE_35,
    height: Value.CONSTANT_VALUE_35,
    borderRadius: Value.CONSTANT_VALUE_20,
    borderWidth: Value.CONSTANT_VALUE_2,
    borderColor: Colors.WHITE,
  },
  innerProfileimg: {
    width: Value.CONSTANT_VALUE_30,
    height: Value.CONSTANT_VALUE_30,
    borderRadius: Value.CONSTANT_VALUE_20,
    borderWidth: Value.CONSTANT_VALUE_2,
    borderColor: Colors.WHITE,
  },
  profileIconConatiner: {
    marginRight: Value.CONSTANT_VALUE_290,
  },
  androidIconCon: {
    marginRight: dynamicSize(Value.CONSTANT_VALUE_290),
  },
  headerText: {
    textDecorationLine: Alignment.UNDERLINE,
    color: Colors.BLACK,
    fontFamily: Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
  },
  blankContainer: {
    width: Value.CONSTANT_VALUE_12,
    height: Value.CONSTANT_VALUE_12,
    backgroundColor: Colors.COLOR_RED,
    borderRadius: Value.CONSTANT_VALUE_6,
    position: Alignment.ABSOLUTE,
    right: -2,
    zIndex: 9999,
    borderStyle: Alignment.SOLID,
    borderWidth: Value.CONSTANT_VALUE_1,
    borderColor: Colors.WHITE,
    top: -2,
    marginRight: Value.CONSTANT_VALUE_30,
  },
  blankContainerptb: {
    width: Value.CONSTANT_VALUE_12,
    height: Value.CONSTANT_VALUE_12,
    backgroundColor: Colors.COLOR_RED,
    borderRadius: Value.CONSTANT_VALUE_6,
    position: Alignment.ABSOLUTE,
    right: -2,
    zIndex: 9999,
    borderStyle: Alignment.SOLID,
    borderWidth: Value.CONSTANT_VALUE_1,
    borderColor: Colors.WHITE,
    top: -2,
  },
};
export const CircleBtn = ({icon, onPress, Fixedstyle, ...otherProps}) => (
  <TouchableOpacity
    style={[styles.circle, Fixedstyle]}
    onPress={onPress}
    {...otherProps}
    accessible={true}
    accessibilityRole="button">
    <Image accessible={false} source={icon} style={styles.img} />
  </TouchableOpacity>
);
export const IconHeader = props => {
  const {
    rightIcon,
    leftIcon,
    leftPress,
    rightPress,
    profileView,
    profileImg,
    ApiImage = false,
    rightPrevPress,
    rightPrevIcon,
    rightImg,
    txt,
    txtPress,
    chat,
    chatptb,
    iIcon,
    leftIicon,
    ...otherProps
  } = props;
  const STYLE_ONE =
    Platform.OS === 'ios' ? styles.profileIconConatiner : styles.androidIconCon;
  return (
    <>
      {profileView ? (
        <TouchableOpacity style={STYLE_ONE} onPress={leftPress}>
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
          {ApiImage ? (
            <View style={[styles.profileImgContainner]}>
              <Image source={leftIcon} style={styles.innerProfileimg} />
            </View>
          ) : (
            <Image
              accessible={false}
              source={leftIcon}
              style={[styles.img, leftIicon]}
            />
          )}
        </TouchableOpacity>
      )}
      <View
        style={{flexDirection: Alignment.ROW, alignItems: Alignment.CENTER}}>
        <TouchableOpacity
          style={styles.circle}
          onPress={rightPrevPress}
          {...otherProps}
          accessible={true}
          accessibilityRole="button">
          <Image
            accessible={false}
            source={rightPrevIcon}
            style={[styles.img, rightImg]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={txtPress}>
          <Text style={styles.headerText}>{txt}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.circle}
          onPress={rightPress}
          {...otherProps}
          accessible={true}
          accessibilityRole="button">
          {chat === true && <View style={styles.blankContainer} />}
          {chatptb === true && <View style={styles.blankContainerptb} />}
          <Image
            accessible={false}
            source={rightIcon}
            style={[styles.img, iIcon]}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
const Header = ({end = false, children}) => {
  return (
    <View style={[styles.container, end ? styles.end : styles.start]}>
      {children}
    </View>
  );
};
export const ProfileIcon = () => (
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

export default React.memo(Header);
