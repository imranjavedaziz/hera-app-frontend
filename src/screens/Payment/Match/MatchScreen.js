import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Header} from '../../../components';
import styles from './styles';
import {Images, Strings} from '../../../constants';
import {IconHeader} from '../../../components/Header';
import {useSelector} from 'react-redux';
import Searchbar from '../../auth/smdonor/SmDashboard/StateSearch';
import MatchComp from './MatchComp';
const MatchScreen = () => {
  const navigation = useNavigation();
  const {log_in_data} = useSelector(state => state.Auth);
  const [search, setSearch] = React.useState('');
  const [state, setState] = React.useState([]);
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
    setSearch(value);
  };
  const DATA = [
    {
      id: 1,
      Img: Images.ADMIN_ICON,
      name: Strings.Match_Screen.code,
      type: Strings.Match_Screen.type,
    },
    {
      id: 2,
      Img: Images.WALKTHROUGH1,
      name: Strings.Match_Screen.code,
      type: Strings.Match_Screen.type,
    },
  ];

  const renderItemData = ({item}) => {
    return (
      <MatchComp
        Img={item.Img}
        name={item.name}
        type={item.type}
        noBank={true}
      />
    );
  };
  if (log_in_data.role_id === 2) {
    return (
      <View style={styles.flex}>
        <Header end={false}>{headerComp()}</Header>
        <View style={styles.container}>
          <Text style={styles.heraPay}>{Strings.Hera_Pay.HERA_PAY}</Text>
          <Text style={styles.sendPayment}>
            {Strings.Match_Screen.Send_Payment}
          </Text>
          <View style={styles.searchContainer}>
            <Searchbar
              value={search}
              onChangeText={onSearch}
              editing={true}
              sm={false}
              state={state}
              setState={setState}
            />
          </View>
          <FlatList
            data={DATA}
            renderItem={renderItemData}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.flex}>
        <Header end={false}>{headerComp()}</Header>
        <View style={styles.mainContainer}>
          <Text style={styles.emptyText}>No Matches</Text>
          <Text style={styles.secondEmptyText}>
            {log_in_data?.role_id === 2
              ? 'After you have matched, You can send payments to them using HERA Pay.'
              : 'You can send money to your matches using HERA Pay.'}
          </Text>
        </View>
      </View>
    );
  }
};

export default MatchScreen;
