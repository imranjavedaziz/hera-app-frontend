import {View, FlatList} from 'react-native';
import React from 'react';
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
  const {log_in_data} = useSelector(state => state.Auth);
  const {payment_history_res} = useSelector(state => state.Payment);
  React.useEffect(() => {
    dispatch(getTransactionHistory());
  }, []);
  React.useEffect(() => {
    console.log('payment_history_res', JSON.stringify(payment_history_res));
  }, [payment_history_res]);
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
        <View style={styles.mainContainer}>
          <FlatList
            data={payment_history_res?.data}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TransactionItem item={{...item, role: log_in_data?.role_id}} />
            )}
            ItemSeparatorComponent={() => <ItemSeperator />}
            ListHeaderComponent={() => (
              <ListHeader isShow={payment_history_res?.data.length > 0} />
            )}
            ListEmptyComponent={() => <EmptyList />}
          />
        </View>
      </View>
    </Container>
  );
};

export default Transaction;
