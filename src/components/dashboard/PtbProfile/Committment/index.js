import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';

const Commitment = ({MainText, Months, Icon, Style, onPress,isSelected=false}) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={[styles.mainContainer, Style]}>
        <View style={styles.innerView}>
          <Text style={[styles.mainText,isSelected?{opacity: 0.4,}:null]}>{MainText}</Text>
          {/* <Text style={styles.innerText}>{Months}</Text> */}
        </View>
        {!isSelected && <View style={styles.iconContainer}>
          <Image style={styles.Icon} source={Icon} />
        </View>}
        {isSelected && <View style={styles.subscribeBtn}>
          <Text style={styles.subscribeTxt}>
            Current Plan
          </Text>
        </View>}
      </TouchableOpacity>
    </>
  );
};

export default Commitment;
