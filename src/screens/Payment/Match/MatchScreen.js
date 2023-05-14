import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Header} from '../../../components';
import styles from './styles';
import {Images, Strings} from '../../../constants';
import {IconHeader} from '../../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import Searchbar from '../../../components/MatchSearch';
import MatchComp from './MatchComp';
import {getMatchList} from '../../../redux/actions/Payment';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../redux/actions/loader';
import _ from 'lodash';
import {Routes} from '../../../constants/Constants';

const MatchScreen = () => {
  const navigation = useNavigation();
  const {log_in_data} = useSelector(state => state.Auth);
  const [search, setSearch] = React.useState('');
  const [allUser, setallUser] = React.useState([]);
  const [Data, setData] = React.useState([]);
  const LoadingRef = useRef(null);
  const {
    get_match_list_success,
    get_match_list_loading,
    get_match_list_error_msg,
    get_match_list_res,
    get_match_list_fail,
  } = useSelector(state => state.Payment);
  const dispatch = useDispatch();
  useEffect(() => {
    let payload = {
      keyword: search ? search : '',
    };
    dispatch(showAppLoader());
    dispatch(getMatchList(payload));
  }, [dispatch]);

  useEffect(() => {
    if (LoadingRef.current && !get_match_list_loading) {
      if (get_match_list_success) {
        dispatch(hideAppLoader());
        setData(get_match_list_res?.data?.data);
        setallUser(get_match_list_res?.data?.data);
      }
      if (get_match_list_fail) {
        dispatch(hideAppLoader());
        dispatch(showAppToast(true, get_match_list_error_msg));
      }
    }
    LoadingRef.current = get_match_list_loading;
  }, [
    get_match_list_success,
    get_match_list_loading,
    get_match_list_error_msg,
    get_match_list_res,
    get_match_list_fail,
  ]);
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      onPress={() => {
        navigation.goBack();
      }}
      style={styles.androidHeaderIcons}
    />
  );
  const onSearch = value => {
    if (value === '') {
      setSearch('');
      return;
    }
    const trimmedValue = value.startsWith('#') ? value.substring(1) : value;
    setSearch(trimmedValue);
    if (log_in_data.role_id === 2) {
      if (trimmedValue.startsWith('#')) {
        setallUser(
          Data.filter(item =>
            item.username.includes(trimmedValue.substring(1)),
          ),
        );
      } else {
        setallUser(Data.filter(item => item.username.match(trimmedValue)));
      }
    } else {
      setallUser(Data.filter(item => item?.first_name.match(trimmedValue)));
    }
  };

  const renderItemData = ({item}) => {
    return (
      <MatchComp
        Img={item.profile_pic}
        name={
          log_in_data.role_id === 2 ? `#${item?.username}` : item?.first_name
        }
        type={item.role_id}
        noBank={log_in_data?.role_id === 2 ? item?.connected_acc_status : true}
        onPress={() =>
          navigation.navigate(
            log_in_data.role_id === 2 ? Routes.PaymentSent : Routes.SendRequest,
            item,
          )
        }
      />
    );
  };
  const onClear = () => {
    setallUser(Data);
    setSearch('');
  };
  return (
    <View style={styles.flex}>
      <Header end={false}>{headerComp()}</Header>
      {get_match_list_res?.record > 0 ? (
        <View style={styles.container}>
          <Text style={styles.heraPay}>{Strings.Hera_Pay.HERA_PAY}</Text>
          <Text style={styles.sendPayment}>
            {Strings.Match_Screen.Send_Payment}
          </Text>
          <View style={styles.searchContainer}>
            <Searchbar
              value={search}
              onChangeText={onSearch}
              onClear={onClear}
              editing={true}
            />
          </View>
          {!_.isEmpty(allUser) && !get_match_list_loading && (
            <FlatList
              data={allUser}
              renderItem={renderItemData}
              showsVerticalScrollIndicator={false}
            />
          )}
          {_.isEmpty(allUser) && !get_match_list_loading && (
            <View style={styles.margin}>
              <Text style={styles.NoResult}>No Results Found!</Text>
              <Text style={styles.NoResultDes}>
                Try using a different name or keyword
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <Text style={styles.emptyText}>No Matches</Text>
          <Text style={styles.secondEmptyText}>
            {log_in_data?.role_id === 2
              ? Strings.Hera_Pay.PTB_NO_MATCH
              : Strings.Hera_Pay.SM_NO_MATCH}
          </Text>
        </View>
      )}
    </View>
  );
};

export default MatchScreen;
