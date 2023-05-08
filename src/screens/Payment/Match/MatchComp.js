import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Strings} from '../../../constants';
import styles from './styles';

const MatchComp = ({Img, name, type, noBank = false, onPress}) => {
  return (
    <View style={styles.compMaincontainer}>
      <View style={styles.compInnerRow}>
        <Image source={Img} style={styles.compImg} />
        <View style={styles.compColoumContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.type}>{type}</Text>
        </View>
      </View>
      <View style={styles.btnMainContainer}>
        {noBank ? (
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.pay}>{Strings.Match_Screen.Pay}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.noBank} numberOfLines={2}>
            {Strings.Match_Screen.noBank}
          </Text>
        )}
      </View>
    </View>
  );
};

export default MatchComp;
