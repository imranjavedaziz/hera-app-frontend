import {View, Text} from 'react-native';
import React from 'react';
import Container from '../components/Container';
import {IconHeader} from '../components/Header';
import {Images} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {dynamicSize} from '../utils/responsive';
import {Value} from '../constants/FixedValues';

const PushNotificationExample = () => {
  const navigation = useNavigation();
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      style={{
        paddingTop: dynamicSize(Value.CONSTANT_VALUE_4),
        paddingHorizontal: Value.CONSTANT_VALUE_30,
      }}
      leftPress={() => navigation.goBack()}
    />
  );
  return (
    <Container
      mainStyle={true}
      scroller={false}
      showHeader={true}
      headerComp={headerComp}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: '800', color: 'black'}}>
          You received push notification
        </Text>
      </View>
    </Container>
  );
};

export default PushNotificationExample;
