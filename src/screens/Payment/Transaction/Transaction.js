import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles';
import {Images, Colors} from '../../../constants';
import {IconHeader} from '../../../components/Header';
import {Container} from '../../../components';
import {
  TransactionItem,
  ItemSeperator,
  ListHeader,
  EmptyList,
} from './TransactionComp';
import {getTransactionHistory} from '../../../redux/actions/Payment';

const Transaction = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [paymentHistory, setHistory] = useState([]);
  const {log_in_data} = useSelector(state => state.Auth);

  const {payment_history_res, payment_history_success} = useSelector(
    state => state.Payment,
  );
  React.useEffect(() => {
    dispatch(getTransactionHistory());
  }, []);
  React.useEffect(() => {
    console.log('payment_history_res', JSON.stringify(payment_history_res));
    if (payment_history_success) {
      setHistory(payment_history_res.data);
    }
  }, [payment_history_res, payment_history_success]);
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
    <Container
      mainStyle={false}
      scroller={false}
      showHeader={true}
      fixedHeader={true}
      headerComp={headerComp}
      safeAreViewStyle={{backgroundColor: Colors.BACKGROUND}}>
      <View style={styles.flex}>
        {paymentHistory.length > 0 ? (
          <View style={styles.mainContainer}>
            <FlatList
              data={paymentHistory}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <TransactionItem item={{...item, role: log_in_data?.role_id}} />
              )}
              ItemSeparatorComponent={() => <ItemSeperator />}
              ListHeaderComponent={() => (
                <ListHeader isShow={paymentHistory.length > 0} />
              )}
              ListFooterComponent={() => <View style={{marginBottom: 40}} />}
            />
          </View>
        ) : (
          <EmptyList />
        )}
      </View>
    </Container>
  );
};

export default Transaction;
