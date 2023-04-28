import {View, Text} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Header} from '../../../components';
import styles from './styles';
import {Images} from '../../../constants';
import {IconHeader} from '../../../components/Header';

const Transaction = () => {
  const navigation = useNavigation();
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      onPress={() => {
        navigation.goBack();
      }}
      style={styles.androidHeaderIcons}
    />
  );
  return (
    <View style={styles.flex}>
      <Header end={false}>{headerComp()}</Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.mainContainer}>
          <Text style={styles.emptyText}>No Transactions Yet!</Text>
          <Text style={styles.secondEmptyText}>
            You have made no transactions on the platform.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Transaction;
