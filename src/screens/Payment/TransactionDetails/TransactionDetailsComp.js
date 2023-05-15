import {View, Image} from 'react-native';
import React from 'react';

import styles from './styles';
import {Images, Colors} from '../../../constants';

export const TransactionStatusCircle = React.memo(({status = 0}) => {
  switch (status.toString()) {
    case '2':
      return (
        <View style={[styles.statusContainer, {backgroundColor: Colors.BLUE}]}>
          <Image source={Images.path} style={styles.statusIcon} />
        </View>
      );
    case '3':
      return (
        <View style={[styles.statusContainer, {backgroundColor: Colors.RED}]}>
          <Image
            source={Images.WARNING_RED}
            style={[
              styles.statusIcon,
              {tintColor: Colors.RED, backgroundColor: Colors.WHITE},
            ]}
          />
        </View>
      );
    default:
      return (
        <View
          style={[
            styles.statusContainer,
            {backgroundColor: Colors.COLOR_747474},
          ]}>
          <Image source={Images.TIME} style={styles.statusIcon} />
        </View>
      );
  }
});

export const Seperator = React.memo(() => <View style={styles.seperator} />);
