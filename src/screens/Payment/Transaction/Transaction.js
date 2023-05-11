import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles';
import {Images, Strings, Colors} from '../../../constants';
import {IconHeader} from '../../../components/Header';
import {Container} from '../../../components';
import {Fonts} from '../../../constants/Constants';
import {
  TransactionItem,
  ItemSeperator,
  ListHeader,
  EmptyList,
} from './TransactionComp';
import { getTransactionHistory } from '../../../redux/actions/Payment';

const DATA = [
  {
    name: 'Merly',
    amount: '300',
    card: '0039',
    bank: 'Bank Of America',
    profile_pic: '',
    id: 8687,
    date: 'Today 02:59 pm',
    status: 1,
  },
  {
    name: 'John',
    amount: '100',
    card: '1025',
    bank: 'Bank Of America',
    profile_pic: '',
    id: 8686,
    date: 'Yesterday 02:59 pm',
    status: 2,
  },
  {
    name: 'Emma',
    amount: '350',
    card: '2043',
    bank: 'Bank Of America',
    profile_pic: '',
    id: 8685,
    date: 'Yesterday 10:25 am',
    status: 3,
  },
];
const Transaction = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {log_in_data} = useSelector(state => state.Auth);
  const {payment_history_res} = useSelector(state => state.Payment);
  React.useEffect(()=>{
    dispatch(getTransactionHistory());
  },[]);
  React.useEffect(()=>{
    console.log('payment_history_res',JSON.stringify(payment_history_res));
  },[payment_history_res])
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
            data={DATA}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <TransactionItem item={{...item,role: log_in_data?.role_id}} />}
            ItemSeparatorComponent={() => <ItemSeperator />}
            ListHeaderComponent={() => <ListHeader isShow={DATA.length > 0} />}
            ListEmptyComponent={() => <EmptyList />}
          />
        </View>
      </View>
    </Container>
  );
};

export default Transaction;
