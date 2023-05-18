import {View, Image} from 'react-native';
import React from 'react';

import styles from './styles';
import {Images, Colors} from '../../../constants';

export const TransactionStatusCircle = React.memo(({status = 0}) => {
  switch (status.toString()) {
    case '1':
      return (
        <View
          style={[
            styles.statusContainer,
            {backgroundColor: Colors.COLOR_747474},
          ]}>
          <Image source={Images.TIME} style={styles.statusIcon} />
        </View>
      );
    case '2':
      return (
        <View style={[styles.statusContainer, {backgroundColor: Colors.BLUE}]}>
          <Image source={Images.path} style={styles.statusIcon} />
        </View>
      );
    default:
      return (
        <View style={[styles.statusContainer, {backgroundColor: Colors.RED}]}>
          <Image
            source={Images.WARNING_RED}
            style={[
              styles.statusIcon,
              {
                tintColor: Colors.RED,
                width: '100%',
                height: '100%',
                backgroundColor: Colors.WHITE,
              },
            ]}
          />
        </View>
      );
  }
});

export const Seperator = React.memo(() => <View style={styles.seperator} />);
