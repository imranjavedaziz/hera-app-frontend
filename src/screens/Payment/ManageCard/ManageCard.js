import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {Header} from '../../../components';
import styles from './styles';
import {Images, Strings} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import {IconHeader} from '../../../components/Header';
const ManageCard = () => {
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
          <Text style={styles.mainText}>{Strings.ManageCard.ADD_CARD}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ManageCard;
