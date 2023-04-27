import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Images from '../../../constants/Images';
import globalStyle from '../../../styles/global';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
  showEditAppLoader,
  hideEditLoader,
} from '../../../redux/actions/loader';
import Colors from '../../../constants/Colors';
import Header, {IconHeader} from '../../../components/Header';
import Button from '../../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {setPreferenceSchema} from '../../../constants/schemas';
import Range from '../../../components/RangeSlider';
import Strings from '../../../constants/Strings';
import Dropdown from '../../../components/inputs/Dropdown';
import {
  Static,
  Routes,
  FormKey,
  Fonts,
  ABOUT_URL,
} from '../../../constants/Constants';
import {Value} from '../../../constants/FixedValues';
import styles from './Styles';
import Alignment from '../../../constants/Alignment';
import {logOut, signoutUser, updateRegStep} from '../../../redux/actions/Auth';
import ActionSheet from 'react-native-actionsheet';
import {
  SetPreferenceRes,
  SavePreference,
  GetPreferenceRes,
} from '../../../redux/actions/SetPreference';
import {BottomSheetComp, ModalMiddle} from '../../../components';
import {getStates} from '../../../redux/actions/Register';
import openWebView from '../../../utils/openWebView';
import {useFocusEffect} from '@react-navigation/native';
import _ from 'lodash';
import {empty} from '../../../redux/actions/Chat';
import {NotificationContext} from '../../../context/NotificationContextManager';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomModal from '../../../components/CustomModal/CustomModal';
import SensoryMatch from '../../../components/SensoryCharacteristics/SensoryMatch';
import {Rotate} from 'hammerjs';
import {navigate} from '../../../utils/RootNavigation';
const onValueSelect = (data, value = '') => {
  const dataArr = data ? data.split(',') : [];
  const v = value;
  if (dataArr.includes(v)) {
    dataArr.splice(
      dataArr.findIndex(d => d === v),
      1,
    );
  } else {
    dataArr.push(v);
  }
  return dataArr.join(',');
};
const isSelected = (data, value) => {
  return data.split(',').includes(value.toString());
};
const SetPreference = ({route, navigation}) => {
  const [height, setHeight] = useState([58, 84]);
  const [isOpen, setOpen] = useState(false);
  const EditPreferences = route.params?.EditPreferences;
  const [preferencesData, setPreferencesData] = useState([]);
  const ageRange = Static.ageRange;
  const [stateRess, setStateRes] = useState();
  const dispatch = useDispatch();
  const SubmitLoadingRef = useRef(false);
  const [threeOption, setThreeOption] = useState([]);
  let actionSheet = useRef();
  const LogoutLoadingRef = useRef(false);
  const {log_out_success, log_out_loading, log_out_error_msg} = useSelector(
    state => state.Auth,
  );
  const SetloadingRef = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const {Device_ID} = useContext(NotificationContext);
  const {
    set_preference_success,
    set_preference_loading,
    set_preference_error_msg,
    set_preference_res,

    save_preference_success,
    save_preference_loading,
    save_preference_error_msg,
    get_preference_success,
    get_preference_loading,
    get_preference_error_msg,
    get_preference_res,
  } = useSelector(state => state.SetPreference);
  const {
    get_state_res,
    get_state_success,
    get_state_loading,
    get_state_error_msg,
  } = useSelector(state => state.Register);
  const subscriptionStatus = useSelector(
    state => state.Subscription?.subscription_status_res,
  );
  const loadingRef = useRef(false);
  const stateLoadingRef = useRef(false);
  const [modalVisible, setModalVisible] = useState(false);
  useFocusEffect(
    useCallback(() => {
      if (EditPreferences === true) {
        dispatch(showEditAppLoader());
        dispatch(GetPreferenceRes());
      }
      dispatch(getStates());
      dispatch(SetPreferenceRes());
    }, [dispatch]),
  );
  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors, isValid, dirtyFields},
  } = useForm({
    resolver: yupResolver(setPreferenceSchema),
  });

  useEffect(() => {
    if (!isValid) {
      const e = errors;
      const messages = [];
      Object.keys(errors).forEach(k => messages.push(e[k].message || ''));
    }
  }, [errors, isValid, dispatch]);

  //GET STATE
  useEffect(() => {
    if (stateLoadingRef.current && !get_state_loading) {
      dispatch(showAppLoader());
      if (get_state_success) {
        dispatch(hideAppLoader());
        setStateRes(get_state_res);
      }
      if (get_state_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    stateLoadingRef.current = get_state_loading;
  }, [get_state_loading, get_state_success]);
  //GET PREFERENCE
  useFocusEffect(
    useCallback(() => {
      if (SetloadingRef.current && !get_preference_loading) {
        dispatch(showEditAppLoader());
        if (get_preference_success) {
          dispatch(hideEditLoader());
          EditPreferences === true && handelChange();
        }
        if (get_preference_error_msg) {
          dispatch(hideEditLoader());
        }
      }
      SetloadingRef.current = get_preference_loading;
    }, [get_preference_success, get_preference_loading, get_preference_res]),
  );
  //SETTER FIELDS
  const handelChange = async value => {
    const HeightArr = get_preference_res?.height?.split('-');
    const education = set_preference_res?.education?.find(obj => {
      return obj.id === parseInt(get_preference_res?.education);
    });
    const raceJson =
      get_preference_res?.race !== undefined &&
      JSON.parse(get_preference_res?.race);
    const location = get_state_res?.find(obj => {
      return obj.id === parseInt(get_preference_res?.state);
    });
    const race = set_preference_res?.race?.find(obj => {
      return obj.id === parseInt(raceJson);
    });
    setValue(FormKey.looking, get_preference_res?.role_id_looking_for);
    setValue(FormKey.location, location);
    setValue(FormKey.education, education);
    setValue(FormKey.age_range, get_preference_res?.age);
    setHeight(HeightArr);
    setValue(FormKey.race, race);
    setValue(FormKey.hair, get_preference_res?.hair_colour);
    setValue(FormKey.eye, get_preference_res?.eye_colour);
  };

  //logout
  useEffect(() => {
    if (LogoutLoadingRef.current && !log_out_loading) {
      dispatch(showAppLoader());
      if (log_out_success) {
        dispatch(empty());
        dispatch(hideAppLoader());
        dispatch(signoutUser());
        navigation.navigate(Routes.Landing);
      } else {
        dispatch(empty());
        dispatch(showAppToast(true, log_out_error_msg));
        dispatch(hideAppLoader());
      }
    }
    LogoutLoadingRef.current = log_out_loading;
  }, [log_out_success, log_out_loading]);
  //GET PREFERENCE
  useFocusEffect(
    useCallback(() => {
      if (loadingRef.current && !set_preference_loading) {
        dispatch(showAppLoader());
        if (set_preference_success) {
          dispatch(hideAppLoader());
          EditPreferences === true && handelChange();
          setPreferencesData(set_preference_res);
        }
        if (set_preference_error_msg) {
          dispatch(hideAppLoader());
        }
      }
      loadingRef.current = set_preference_loading;
    }, [set_preference_success, set_preference_loading]),
  );
  // SAVE PREFERENCE
  useEffect(() => {
    if (SubmitLoadingRef.current && !save_preference_loading) {
      dispatch(showAppLoader());
      if (save_preference_success) {
        dispatch(hideAppLoader());
        EditPreferences === true
          ? navigation.navigate(Routes.PtbProfile)
          : navigation.reset({
              index: 0,
              routes: [{name: Routes.PtbDashboard}],
            });
      }
      if (save_preference_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    SubmitLoadingRef.current = save_preference_loading;
  }, [save_preference_loading, save_preference_success]);

  const onSubmit = data => {
    let value = {
      role_id_looking_for: data.looking,
      age: data.age_range,
      height:
        data?.height !== undefined ? data?.height.join('-') : height.join('-'),
      race: data.race?.id,
      education: data.education.id.toString(),
      hair_colour: data.hair,
      eye_colour: data.eye,
      ethnicity: '2,3',
      state: data.location?.id,
    };
    dispatch(showAppLoader());
    dispatch(SavePreference(value));
    EditPreferences !== true && dispatch(updateRegStep());
  };

  const logOutScreen = () => {
    dispatch(showAppLoader());
    dispatch(logOut(Device_ID));
    dispatch(empty());
  };
  const navigateSupport = () => {
    navigation.navigate(Routes.Support);
  };
  const navigateAbout = () => {
    navigation.navigate(Routes.WebViewUrl, {
      url: ABOUT_URL,
    });
  };
  const handleThreeOption = async option => {
    switch (option) {
      case Strings.smSetting.Inquiry:
        navigateSupport();
        break;
      case Strings.preference.About:
        navigateAbout();
        break;
      case Strings.preference.Logout:
        debounce(logOutScreen(), 1000);
        break;
      case Strings.Subscription.Cancel:
        break;
    }
  };
  const openActionSheet = () => {
    setThreeOption([
      Strings.smSetting.Inquiry,
      Strings.preference.About,
      Strings.preference.Logout,
      Strings.Subscription.Cancel,
    ]);
    setTimeout(() => {
      actionSheet.current.show();
    }, 300);
  };
  const backAction = () => {
    Alert.alert(
      Strings.EDITPROFILE.DiscardEdit,
      Strings.EDITPROFILE.DiscardEditDisc,
      [
        {
          text: Strings.profile.ModalOption1,
          onPress: () => {
            navigation.navigate(Routes.PtbProfile);
          },
        },
        {
          text: Strings.profile.ModalOption2,
          onPress: () => null,
        },
      ],
    );
    return true;
  };
  const nav = () => {
    if (_.isEmpty(dirtyFields)) {
      navigation.navigate(Routes.PtbProfile);
    } else {
      Platform.OS === 'ios' ? backAction() : setShowModal(true);
    }
  };
  const headerComp = () => (
    <>
      {EditPreferences === true ? (
        <View style={[globalStyle.cancelbtn, styles.ageContainer]}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={globalStyle.clearView}>
            <Image source={Images.I_BUTTON} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              nav();
            }}
            style={globalStyle.clearView}>
            <Text style={globalStyle.clearText}>
              {Strings.Subscription.Cancel}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <IconHeader
            style={{paddingHorizontal: 20}}
            leftIcon={Images.I_BUTTON}
            leftPress={() => setModalVisible(!modalVisible)}
            rightIcon={Images.iconSettings}
            rightPress={() =>
              Platform.OS === 'ios' ? openActionSheet() : setOpen(true)
            }
          />
          <ActionSheet
            ref={actionSheet}
            options={threeOption}
            destructiveButtonIndex={2}
            cancelButtonIndex={2}
            onPress={index => {
              handleThreeOption(threeOption[index]);
            }}
          />
        </>
      )}
    </>
  );
  const StyleIOS = {
    marginTop: 30,
  };
  const Style = Platform.OS === 'ios' && StyleIOS;
  return (
    <View style={styles.flex}>
      <Header end={EditPreferences === true ? true : false}>
        {headerComp()}
      </Header>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        keyboardOpeningTime={0}
        scrollEnabled={true}
        extraHeight={180}
        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={[styles.containerView]}>
              {EditPreferences === true ? (
                <Text style={globalStyle.screenTitle}>
                  {Strings.preference.editPreference}
                </Text>
              ) : (
                <Text style={globalStyle.screenTitle}>
                  {Strings.preference.setPreference}
                </Text>
              )}
              <View
                accessible={true}
                accessibilityLabel={`${Strings.preference.filter}`}>
                <Text style={globalStyle.screenSubTitle} accessible={false}>
                  {Strings.preference.SearchPrioritize}
                </Text>
              </View>
              {!subscriptionStatus?.data?.is_trial &&
                subscriptionStatus?.data?.status > 0 && (
                  <TouchableOpacity
                    style={styles.changePlan}
                    onPress={() => navigation.navigate(Routes.Subscription)}>
                    <Text style={styles.changePlanTxt} numberOfLines={1}>
                      Change Plan to find other User Type
                    </Text>
                    <Image
                      source={Images.arrowDown}
                      style={{
                        transform: [{rotate: '270deg'}],
                        marginLeft: 5,
                      }}
                    />
                  </TouchableOpacity>
                )}
              <View style={styles.lookingFor}>
                <Text
                  style={[
                    styles.lookingForText,
                    {
                      color: Colors.BLACK_KEY,
                    },
                  ]}>
                  {Strings.preference.lookingFor}
                  <Text style={styles.chipsRequiredText}>*</Text>
                </Text>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <View style={{}}>
                      {Strings?.STATIC_ROLE.map(whom => (
                        <TouchableOpacity
                          style={styles.flexRow}
                          key={whom.id}
                          disabled={
                            !(
                              subscriptionStatus?.data?.is_trial ||
                              EditPreferences
                            ) && EditPreferences
                          }
                          activeOpacity={1}
                          onPress={() => onChange(whom.id)}>
                          <Image
                            style={{resizeMode: 'contain'}}
                            source={
                              value === whom.id
                                ? Images.iconRadiosel
                                : Images.iconRadiounsel
                            }
                          />
                          <Text
                            style={
                              value === whom.id ||
                              subscriptionStatus?.data?.is_trial ||
                              !EditPreferences
                                ? styles.lookingsm
                                : styles.lookingsmDisabled
                            }>
                            {whom.name}
                          </Text>
                          {value === whom.id &&
                            !subscriptionStatus?.data?.is_trial &&
                            subscriptionStatus?.data?.status > 0 && (
                              <View style={styles.subscribeBtn}>
                                <Text style={styles.subscribeTxt}>
                                  Subscribed
                                </Text>
                              </View>
                            )}
                        </TouchableOpacity>
                      ))}
                      <Text style={styles.errLooking}>
                        {errors && errors.looking?.message}
                      </Text>
                    </View>
                  )}
                  name={FormKey.looking}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Dropdown
                      dropDownStyle={{marginTop: Value.CONSTANT_VALUE_0}}
                      defaultValue={value}
                      label={Strings.preference.Location}
                      data={stateRess}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        onChange(selectedItem);
                      }}
                      required={true}
                      error={errors && errors.location?.message}
                    />
                  )}
                  name={FormKey.location}
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Dropdown
                      containerStyleDrop={Style}
                      defaultValue={value}
                      label={Strings.preference.Education}
                      data={preferencesData?.education}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        onChange(selectedItem);
                      }}
                      educationStyle={true}
                      required={true}
                      error={errors && errors.education?.message}
                    />
                  )}
                  name={FormKey.education}
                />
                <Text style={styles.ageText}>
                  {Strings.preference.AgeRange}
                  <Text style={styles.chipsRequiredText}>*</Text>
                </Text>
                <Controller
                  control={control}
                  render={({field: {onChange, value = ''}}) => (
                    <View style={styles.ageContainer}>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {ageRange.map((item, index) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                onChange(onValueSelect(value, item.name));
                              }}
                              activeOpacity={0.8}
                              key={item.id}>
                              <View
                                style={[
                                  styles.ageRangeChip,
                                  {
                                    backgroundColor: isSelected(
                                      value,
                                      item.name,
                                    )
                                      ? Colors.COLOR_5ABCEC
                                      : Colors.BACKGROUND,
                                    borderWidth: isSelected(value, item.name)
                                      ? 0
                                      : 1,
                                  },
                                ]}>
                                <Text
                                  style={[
                                    styles.chipInsideText,
                                    {
                                      color: isSelected(value, item.name)
                                        ? Colors.WHITE
                                        : Colors.BLACK_0,
                                      fontFamily: isSelected(value, item.name)
                                        ? Fonts.OpenSansBold
                                        : Fonts.OpenSansRegular,
                                    },
                                  ]}>
                                  {item.name} {Strings.preference.yrs}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                      </ScrollView>
                      <Text style={styles.errMessage}>
                        {errors && errors.age_range?.message}
                      </Text>
                    </View>
                  )}
                  name={FormKey.age_range}
                />
                <View style={{marginTop: Value.CONSTANT_VALUE_25}}>
                  <View style={styles.heightContainer}>
                    <Text style={styles.heightTextInner}>
                      {Strings.preference.Height}
                      <Text style={styles.heightText}>*</Text>
                    </Text>
                    <Text style={styles.heightTextView}>
                      <Text>
                        {height && parseInt(height[0] / 12)}'
                        {height && parseInt(height[0] % 12)}" -{' '}
                      </Text>
                      <Text>
                        {height && parseInt(height[1] / 12)}'
                        {height && parseInt(height[1] % 12)}"
                      </Text>
                    </Text>
                  </View>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      <Range
                        value={height}
                        setValue={setHeight}
                        onValueChange={value => {
                          onChange(value);
                        }}
                      />
                    )}
                    name={FormKey.height}
                  />
                </View>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Dropdown
                      defaultValue={value}
                      dropDownStyle={{marginTop: 30}}
                      label={Strings.preference.Race}
                      data={preferencesData?.race}
                      onSelect={(selectedItem, index) => {
                        onChange(selectedItem);
                      }}
                      required={true}
                      error={errors && errors.race?.message}
                    />
                  )}
                  name={FormKey.race}
                />
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.chipText}>
                    {Strings.preference.HairColor}
                  </Text>
                  <Text
                    style={{
                      color: Colors.RED,
                      fontSize: 18,
                      marginTop: 30,
                    }}>
                    *
                  </Text>
                </View>
                <Controller
                  control={control}
                  render={({field: {onChange, value = ''}}) => (
                    <View style={styles.hairContainer}>
                      {preferencesData?.hair_colour?.length > 0 &&
                        preferencesData?.hair_colour.map((item, index) => (
                          <TouchableOpacity
                            onPress={() => {
                              onChange(
                                onValueSelect(value, item.id.toString()),
                              );
                            }}
                            key={item.id}>
                            <View
                              style={[
                                styles.chips,
                                {
                                  backgroundColor: isSelected(
                                    value,
                                    item.id.toString(),
                                  )
                                    ? Colors.COLOR_5ABCEC
                                    : Colors.BACKGROUND,
                                  borderWidth: isSelected(
                                    value,
                                    item.id.toString(),
                                  )
                                    ? 0
                                    : 1,
                                },
                              ]}>
                              <Text
                                style={[
                                  {
                                    alignSelf: Alignment.CENTER,
                                    fontFamily: isSelected(
                                      value,
                                      item.id.toString(),
                                    )
                                      ? Fonts.OpenSansBold
                                      : Fonts.OpenSansRegular,
                                    color: isSelected(value, item.id.toString())
                                      ? Colors.WHITE
                                      : Colors.BLACK_0,
                                  },
                                ]}>
                                {item.name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                      <Text style={styles.errMessage}>
                        {errors && errors.hair?.message}
                      </Text>
                    </View>
                  )}
                  name={FormKey.hair}
                />
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.chipText}>
                    {Strings.preference.EyeColor}
                  </Text>
                  <Text
                    style={{
                      color: Colors.RED,
                      fontSize: 18,
                      marginTop: 30,
                    }}>
                    *
                  </Text>
                </View>
              </View>
              <Controller
                control={control}
                render={({field: {onChange, value = ''}}) => (
                  <View style={styles.eyeContainer}>
                    {preferencesData?.eye_colour?.length > 0 &&
                      preferencesData?.eye_colour.map((item, index) => (
                        <TouchableOpacity
                          onPress={() => {
                            onChange(onValueSelect(value, item.id.toString()));
                          }}
                          key={item.id}>
                          <View
                            style={[
                              styles.chips,
                              {
                                backgroundColor: isSelected(
                                  value,
                                  item.id.toString(),
                                )
                                  ? Colors.COLOR_5ABCEC
                                  : Colors.BACKGROUND,
                                borderWidth: isSelected(
                                  value,
                                  item.id.toString(),
                                )
                                  ? 0
                                  : 1,
                              },
                            ]}>
                            <Text
                              style={[
                                {
                                  alignSelf: Alignment.CENTER,
                                  fontFamily: isSelected(
                                    value,
                                    item.id.toString(),
                                  )
                                    ? Fonts.OpenSansBold
                                    : Fonts.OpenSansRegular,
                                  color: isSelected(value, item.id.toString())
                                    ? Colors.WHITE
                                    : Colors.BLACK_0,
                                },
                              ]}>
                              {item.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    <Text style={styles.errMessage}>
                      {errors && errors.eye?.message}
                    </Text>
                  </View>
                )}
                name={FormKey.eye}
              />
              <Button
                label={Strings.preference.SAVE_PREFERENCES}
                style={styles.Btn2}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
            {modalVisible && (
              <CustomModal>
                <SensoryMatch onPress={() => setModalVisible(!modalVisible)} />
              </CustomModal>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      {isOpen && (
        <View style={{flex: 1}}>
          <BottomSheetComp
            wrapperStyle={globalStyle.wrapperStyle}
            lineStyle={globalStyle.lineStyle}
            isOpen={isOpen}
            isComing={true}
            setOpen={setOpen}>
            <View style={globalStyle.basicSheetContainer}>
              <TouchableOpacity style={globalStyle.formBtn}>
                <Text style={globalStyle.formText}>
                  {Strings.preference.InquiryForm}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={globalStyle.heraBtn}
                onPress={() => navigateAbout()}>
                <Text style={globalStyle.heraText}>
                  {Strings.preference.About}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={globalStyle.logoutBtn}
                onPress={() => {
                  debounce(logOutScreen(), 1000);
                }}>
                <Text style={globalStyle.logoutText}>
                  {Strings.preference.Logout}
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetComp>
        </View>
      )}
      <ModalMiddle
        showModal={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        String_1={Strings.EDITPROFILE.DiscardEdit}
        String_2={Strings.EDITPROFILE.DiscardEditDisc}
        String_3={Strings.profile.ModalOption1}
        String_4={Strings.profile.ModalOption2}
        onPressNav={() => {
          setShowModal(false);
          navigation.navigate(Routes.PtbProfile);
        }}
        onPressOff={() => {
          setShowModal(false);
        }}
      />
    </View>
  );
};

export default SetPreference;
