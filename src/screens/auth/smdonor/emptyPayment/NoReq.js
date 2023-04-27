import React from 'react';
import {View, Text} from 'react-native';
import {Container} from '../../../../components';
import {IconHeader} from '../../../../components/Header';
import {Images, Strings} from '../../../../constants';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const NoReq = () => {
  const navigation = useNavigation();
  const {log_in_data} = useSelector(state => state.Auth);

  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      leftPress={() => navigation.goBack()}
      style={styles.headerIcon}
    />
  );

  return (
    <>
      <Container
        scroller={false}
        showHeader={true}
        headerComp={headerComp}
        mainStyle={true}>
        <View style={styles.container}>
          {log_in_data?.role_id == 2 ? (
            <View style={styles.heading}>
              <Text style={styles.matches}>
                {Strings.Empty_Pament.No_New_Request}
              </Text>
              <Text style={styles.matchesDes}>
                {Strings.Empty_Pament.Ptb_Req_Description}
              </Text>
            </View>
          ) : (
            <View style={styles.heading}>
              <Text style={styles.matches}>
                {Strings.Empty_Pament.No_Request_Sent}
              </Text>
              <Text style={styles.matchesDes}>
                {Strings.Empty_Pament.Sm_Request_Description}
              </Text>
            </View>
          )}
        </View>
      </Container>
    </>
  );
};

export default React.memo(NoReq);
