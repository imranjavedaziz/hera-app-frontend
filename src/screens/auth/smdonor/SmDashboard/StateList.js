import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import Header, {CircleBtn} from '../../../../components/Header';
import Images from '../../../../constants/Images';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {getStates} from '../../../../redux/actions/Register';
import globalStyle from '../../../../styles/global';
import Strings from '../../../../constants/Strings';
import {Value} from '../../../../constants/FixedValues';
import Searchbar from './StateSearch';
import {Routes} from '../../../../constants/Constants';
import {hideAppLoader, showAppLoader} from '../../../../redux/actions/loader';
import Styles from './Styles';
import {Button} from '../../../../components';
const StateList = props => {
  const {selectedStateList} = props.route.params;
  const navigation = useNavigation();
  const loadingRef = useRef(false);
  const [state, setState] = useState([]);
  const [allstate, setAllState] = useState([]);
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
  useFocusEffect(
    useCallback(() => {
      if (loadingRef.current && !get_state_loading) {
        dispatch(showAppLoader());
        if (get_state_success) {
          setTimeout(() => {
            dispatch(hideAppLoader());
          }, 200);
          existingCountrySelection();
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
    ]),
  );
  const existingCountrySelection = () => {
    const data = get_state_res?.map(item => {
      item.isActive = false;
      selectedStateList?.map((_item1, index1) => {
        if (item.id === selectedStateList[index1]) {
          setCount(prevCount => prevCount + 1);
          item.isActive = true;
        }
      });
      return item;
    });
    setState(data);
    setAllState(data);
  };
  useEffect(() => {
    dispatch(showAppLoader());
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
    console.log(searching, 'searching');
  };
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
      return oldData.map(old => {
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
  };

  const renderState = ({item, index}) => {
    return (
      <View style={{paddingHorizontal: Value.CONSTANT_VALUE_40}}>
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
      </View>
    );
  };
  const submit = async () => {
    let sl = [];
    allstate.map((item, index) => {
      if (item.isActive === true) {
        sl.push(item.id);
      }
    });
    navigation.navigate(Routes.SmDashboard, {informationDetail: sl});
  };
  const BackControl = () => {
    navigation.navigate(Routes.SmDashboard);
  };
  const OnClear = () => {
    setState(oldData => {
      return oldData.map(old => {
        return {code: old.code, id: old.id, isActive: false, name: old.name};
      });
    });
    setAllState(oldData => {
      return oldData.map(old => {
        return {code: old.code, id: old.id, isActive: false, name: old.name};
      });
    });
    selectState('');
    setCount(0);
  };

  const headerComp = () => (
    <>
      <CircleBtn
        icon={Images.iconBack}
        onPress={BackControl}
        accessibilityLabel="Cross Button, Go back"
        style={Styles.headerIconBack}
      />
      {count > 0 && (
        <TouchableOpacity
          onPress={() => {
            OnClear();
          }}
          style={Styles.CancelBack}>
          <Text style={Styles.iconFont}>{Strings.stateList.iconText}</Text>
        </TouchableOpacity>
      )}
    </>
  );
  return (
    <View style={Styles.containrMain}>
      <Header end={false}>{headerComp()}</Header>
      <View style={Styles.con}>
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
          sm={false}
        />
        <View style={Styles.flexRow}>
          <FlatList
            data={state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderState}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={Styles.footerCon} />}
          />
        </View>
        <View style={Styles.btnView}>
          {count > 0 && (
            <Button
              style={Styles.Btn}
              label={Strings.sm_basic.Apply}
              onPress={submit}
            />
          )}
        </View>
      </View>
    </View>
  );
};
export default React.memo(StateList);
