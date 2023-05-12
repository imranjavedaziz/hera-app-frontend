
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles';
import {Images, Strings, Colors} from '../../../constants';
import {IconHeader} from '../../../components/Header';
import {Container} from '../../../components';
import {Fonts} from '../../../constants/Constants';

export const TransactionStatusCircle = React.memo(({status = 0}) => {
    switch (status.toString()) {
      case '1':
        return (
            <View
              style={[styles.statusContainer,{backgroundColor: Colors.BLUE,}]}>
              <Image
                source={Images.path}
                style={styles.statusIcon}
              />
            </View>
        );
      case '0':
        return (
            <View
              style={[styles.statusContainer,{backgroundColor: Colors.RED,}]}>
              <Image
                source={Images.WARNING_RED}
                style={[styles.statusIcon,{tintColor: Colors.RED,backgroundColor: Colors.WHITE}]}
              />
            </View>
        );
      default:
        return (
            <View
              style={[styles.statusContainer,{backgroundColor: Colors.COLOR_747474,}]}>
              <Image
                source={Images.TIME}
                style={styles.statusIcon}
              />
            </View>
        );
    }
});

export const Seperator = React.memo(() => (
    <View style={styles.seperator} />
));