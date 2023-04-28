import {View, Text} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Header} from '../../../components';
import styles from './styles';
import {Images} from '../../../constants';
import {IconHeader} from '../../../components/Header';
import {useSelector} from 'react-redux';

const MatchScreen = () => {
  const navigation = useNavigation();
  const {log_in_data} = useSelector(state => state.Auth);
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
          <Text style={styles.emptyText}>No Matches</Text>
          <Text style={styles.secondEmptyText}>
            {log_in_data?.role_id == 2
              ? 'After you have matched, You can send payments to them using HERA Pay.'
              : 'You can send money to your matches using HERA Pay.'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MatchScreen;
