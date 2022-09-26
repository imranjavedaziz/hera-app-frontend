// Header
import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Colors from '../constants/Colors';
import {Value, Prencentage} from '../constants/FixedValues';
import Alignment from '../constants/Alignment';

const styles = {
  container: {
    // flex: Value.CONSTANT_VALUE_0,
    width: Prencentage.PRECENTAGE_100,
    paddingVertical: Value.CONSTANT_VALUE_10,
    paddingHorizontal: Value.CONSTANT_VALUE_20,
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
  profileImgContainner:
{
  borderWidth: Value.CONSTANT_VALUE_2,
  borderColor: Colors.GREEN,
  borderRadius: Value.CONSTANT_VALUE_40,
  // marginBottom: Value.CONSTANT_VALUE_15,
  
},
profileImg: {
  width: Value.CONSTANT_VALUE_40,
  height: Value.CONSTANT_VALUE_40,
  borderRadius: Value.CONSTANT_VALUE_20,
  borderWidth: Value.CONSTANT_VALUE_2,
  borderColor: Colors.CLEAR,
},
};
export const CircleBtn = ({icon, onPress,...otherProps}) => (
  <TouchableOpacity style={styles.circle} onPress={onPress} {...otherProps} accessible={true} accessibilityRole="button">
    <Image accessible={false} source={icon} style={styles.img} />
  </TouchableOpacity>
);
const Header = ({end = false, children}) => {
  return (
    <View style={[styles.container, end ? styles.end : styles.start]}>
      {children}
    </View>
  );
};

// export const IconStart = ({end=true,children}) => {
  
//     <View style={[styles.container, end ? styles.end : styles.start]}>
//        <View style={styles.profileImgContainner}>
//         <Image
//          source={{uri: 'https://dindin-preprod-backend.s3.amazonaws.com/chefs/joan-bonilla/profile-logo.png'}}
//          style={styles.profileImg}
//        />
//      </View>
//      </View>
  
//  };
 

export default Header;
// const style = StyleSheet.create({
// profileImgContainner:
// {
//   borderWidth: Value.CONSTANT_VALUE_2,
//   borderColor: Colors.GREEN,
//   borderRadius: Value.CONSTANT_VALUE_40,
//   // marginBottom: Value.CONSTANT_VALUE_15,
  
// },
// profileImg: {
//   width: Value.CONSTANT_VALUE_40,
//   height: Value.CONSTANT_VALUE_40,
//   borderRadius: Value.CONSTANT_VALUE_20,
//   borderWidth: Value.CONSTANT_VALUE_2,
//   borderColor: Colors.CLEAR,
// },
// });
