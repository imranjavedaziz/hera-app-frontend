import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Strings} from '../../../constants';
import styles from './styles';
import {useSelector} from 'react-redux';
import {getRoleData} from '../../../utils/commonFunction';

const MatchComp = ({Img, name, type, noBank = false, onPress}) => {
  const {log_in_data} = useSelector(state => state.Auth);
  return (
    <View style={styles.compMaincontainer}>
      <View style={styles.compInnerRow}>
        <Image source={{uri: Img}} style={styles.compImg} />
        <View style={styles.compColoumContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.type}>{getRoleData(type)}</Text>
        </View>
      </View>
      <View style={styles.btnMainContainer}>
        {noBank ? (
          <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
            <Text style={styles.pay}>
              {log_in_data?.role_id === 2
                ? Strings.Match_Screen.Pay
                : Strings.Match_Screen.Request}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.noBank} numberOfLines={2}>
            {`${Strings.Match_Screen.noBank}${getRoleData(type)}!`}
          </Text>
        )}
      </View>
    </View>
  );
};

export default MatchComp;
