import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../../../../components/Container';
import {CircleBtn} from '../../../../components/Header';
import Images from '../../../../constants/Images';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {getStates} from '../../../../redux/actions/Register';
import globalStyle from '../../../../styles/global';
import Strings from '../../../../constants/Strings';
import {Value} from '../../../../constants/FixedValues';
import Searchbar from './StateSearch';
import {Routes} from '../../../../constants/Constants';
import {hideAppLoader, showAppLoader} from '../../../../redux/actions/loader';
import Styles from './Styles';
const StateList = () => {
  const navigation = useNavigation();
  const loadingRef = useRef(false);
  const [state, setState] = useState([]);
  const [allstate, setAllState] = useState([]);
  // const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const dispatch = useDispatch();
  const {
    get_state_success,
    get_state_loading,
    get_state_error_msg,
    get_state_res,
  } = useSelector(st => st?.Register);

  //GET STATE
  useEffect(() => {
    if (loadingRef.current && !get_state_loading) {
      dispatch(showAppLoader());
      if (get_state_success) {
        dispatch(hideAppLoader());
        setState(
          get_state_res?.map(prev => ({
            ...prev,
            isActive: false,
          })),
        );
        setAllState(
          get_state_res?.map(prev => ({
            ...prev,
            isActive: false,
          })),
        );
      }
      if (get_state_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    loadingRef.current = get_state_loading;
  }, [
    get_state_success,
    get_state_loading,
    get_state_error_msg,
    get_state_res,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(getStates());
  }, [dispatch]);
  const onSearch = value => {
    if (value === '') {
      setSearch('');
      setSearching(false);
      return;
    }
    setSearching(true);
    setSearch(value);
  };
  // const onClear = () => {
  //   setSearching(false);
  //   setSearch('');
  // };
  const selectState = item => {
    if (count === 3 && item.isActive === false) {
      Alert.alert('Can select upto 3 state');
      return;
    }
    setState(oldData => {
      return oldData.map((old, index) => {
        if (item.id === old.id) {
          if (item.isActive !== true) {
            setCount(count + 1);
          } else {
            setCount(count - 1);
          }
          return {
            code: old.code,
            id: old.id,
            isActive: !old.isActive,
            name: old.name,
          };
        } else {
          return old;
        }
      });
    });
    setAllState(oldData => {
      return oldData.map((old, index) => {
        if (item.id === old.id) {
          return {
            code: old.code,
            id: old.id,
            isActive: !old.isActive,
            name: old.name,
          };
        } else {
          return old;
        }
      });
    });
    // if (selected !== null) {
    //   setDone(true);
    // }
  };
  const renderState = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={Styles.stateItem}
          onPress={() => selectState(item)}>
          <View style={Styles.stateItemContainer}>
            <Text style={[item.isActive !== true ? Styles.unSel : Styles.sel]}>
              {item.name}
            </Text>
            {item.isActive && (
              <Image style={Styles.imgSel} source={Images.path} />
            )}
          </View>
        </TouchableOpacity>
      </>
    );
  };
  const submit = async () => {
    let sl = [];
    allstate.map((item, index) => {
      if (item.isActive === true) {
        console.log('NAME---', item);
        sl.push(item.id);
      }
    });
    console.log('Sel', sl);
    navigation.navigate(Routes.SmDashboard, {data: sl});
  };
  const headerComp = () => (
    <>
      <CircleBtn
        icon={Images.iconBack}
        onPress={navigation.goBack}
        accessibilityLabel="Cross Button, Go back"
      />
      {count > 0 && (
        <TouchableOpacity onPress={submit}>
          <Text style={Styles.iconFont}>{Strings.stateList.iconText}</Text>
        </TouchableOpacity>
      )}
    </>
  );
  return (
    <Container
      scroller={false}
      showHeader={true}
      headerComp={headerComp}
      headerEnd={false}
      style={{
        paddingTop: Value.CONSTANT_VALUE_60,
      }}>
      <View style={globalStyle.mainContainer}>
        <Text style={[globalStyle.screenSubTitle, Styles.stateSubtitle]}>
          {Strings.stateList.Subtitle}
        </Text>
        <Searchbar
          value={search}
          onChangeText={onSearch}
          editing={true}
          state={state}
          setState={setState}
          allState={allstate}
          // onClear={onClear}
        />
        <View style={Styles.flexRow}>
          <FlatList
            contentContainerStyle={Styles.flatlist}
            data={state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderState}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Container>
  );
};

export default StateList;
