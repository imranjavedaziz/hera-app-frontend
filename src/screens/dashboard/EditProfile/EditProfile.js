import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  Image,
  Modal,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  FloatingLabelInput,
  Header,
  MultiTextInput,
} from '../../../components';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {Routes, FormKey, Static} from '../../../constants/Constants';
import {Alignment, Colors, Images, Strings} from '../../../constants';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {parentRegisterSchema} from '../../../constants/schemas';
import {useDispatch, useSelector} from 'react-redux';
import {
  getProfileSetterDetail,
  getStates,
} from '../../../redux/actions/Register';
import {hideAppLoader, showAppLoader} from '../../../redux/actions/loader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Dropdown from '../../../components/inputs/Dropdown';
import {
  getEditProfile,
  updateEditProfile,
} from '../../../redux/actions/Edit_profile';

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [profileRes, setProfileRes] = useState();
  const [stateRes, setStateRes] = useState();
  const [date, setDate] = useState();
  const [show, setShow] = useState(false);
  const loadingRef = useRef(false);
  const LoadingRef = useRef(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(getStates());
    dispatch(getProfileSetterDetail());
  }, []);
  const {
    get_state_res,
    get_profile_setter_res,
    get_profile_setter_success,
    get_profile_setter_loading,
    get_profile_setter_error_msg,
    get_state_success,
    get_state_loading,
    get_state_error_msg,
  } = useSelector(state => state.Register);
  //   const user = useSelector(state => state.Auth.user);

  //GET STATE
  useEffect(() => {
    if (loadingRef.current && !get_state_loading) {
      dispatch(showAppLoader());
      if (get_state_success) {
        dispatch(hideAppLoader());
        setStateRes(get_state_res);
      }
      if (get_state_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    loadingRef.current = get_state_loading;
  }, [get_state_success, get_state_loading]);
  //GET PROFILE SETTER
  useEffect(() => {
    if (LoadingRef.current && !get_profile_setter_loading) {
      dispatch(showAppLoader());
      if (get_profile_setter_success) {
        // console.log("GETSETTER",get_profile_setter_res)
        dispatch(hideAppLoader());
        setProfileRes(get_profile_setter_res);
      }
      if (get_profile_setter_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    LoadingRef.current = get_profile_setter_loading;
  }, [get_profile_setter_success, get_profile_setter_loading]);
  const getDate = selectedDate => {
    let tempDate = selectedDate.toString().split(' ');
    return date !== '' ? ` ${tempDate[1]} ${tempDate[2]}, ${tempDate[3]}` : '';
  };
  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(parentRegisterSchema),
  });
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
  const headerComp = () => (
    <TouchableOpacity
      style={styles.header}
      onPress={() => {
        Platform.OS === 'ios' ? backAction() : setShowModal(true);
      }}>
      <Text style={styles.headerText}>{Strings.Subscription.Cancel}</Text>
    </TouchableOpacity>
  );
  const onSubmit = () => {};
  return (
    <View style={styles.flex}>
      <Header end={true}>{headerComp()}</Header>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mainContainer}>
              <View style={styles.headingStyle}>
                <Text style={styles.MainheadingStyle}>
                  {Strings.EDITPROFILE.EDIT_PROFILE}
                </Text>
                <Text style={styles.InnerheadingStyle}>
                  {Strings.EDITPROFILE.Profile_Title}
                </Text>
              </View>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    label={Strings.profile.FirstName}
                    value={value}
                    onChangeText={v => onChange(v)}
                    required={true}
                    error={errors && errors.first_name?.message}
                  />
                )}
                name={FormKey.first_name}
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    label={Strings.profile.MiddleName}
                    value={value}
                    onChangeText={v => onChange(v)}
                    fontWeight={Alignment.BOLD}
                    error={errors && errors.middle_name?.message}
                  />
                )}
                name={FormKey.middle_name}
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    label={Strings.profile.LastName}
                    value={value}
                    onChangeText={v => onChange(v)}
                    fontWeight={Alignment.BOLD}
                    required={true}
                    error={errors && errors.last_name?.message}
                  />
                )}
                name={FormKey.last_name}
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    label={Strings.profile.EmailAddress}
                    value={value}
                    onChangeText={v => onChange(v)}
                    fontWeight={Alignment.BOLD}
                    required={true}
                    error={errors && errors.email?.message}
                  />
                )}
                name={FormKey.email}
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    label={Strings.profile.phone_no}
                    value={'+1 9696969696'}
                    onChangeText={v => onChange(v)}
                    fontWeight={Alignment.BOLD}
                    required={true}
                    editable={false}
                    error={errors && errors.phone_no?.phone_no}
                  />
                )}
                name={FormKey.phone_no}
              />
              <Text style={styles.label}>
                Gender
                <Text style={[{color: Colors.RED}]}>*</Text>
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <View style={styles.radioContainer}>
                    {profileRes?.gender.map(gender => (
                      <TouchableOpacity
                        style={styles.radioBtn}
                        key={gender.id}
                        onPress={() => onChange(gender.id)}>
                        <Image
                          style={styles.radioImg}
                          source={
                            value === gender.id
                              ? Images.iconRadiosel
                              : Images.iconRadiounsel
                          }
                        />
                        <Text style={styles.radioLabel}>{gender.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                name="gender_id"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    label={Strings.profile.DateOfBirth}
                    value={value}
                    onChangeText={v => onChange(v)}
                    endComponentPress={() => setShow(true)}
                    error={errors && errors.date_of_birth?.message}
                    required={true}
                    endComponent={() => (
                      <TouchableOpacity onPress={() => setShow(true)}>
                        <Image
                          source={Images.calendar}
                          style={styles.calender}
                        />
                      </TouchableOpacity>
                    )}
                    editable={false}
                    onPressIn={() => setShow(true)}
                  />
                )}
                name={FormKey.date_of_birth}
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <Dropdown
                    containerStyle={{marginTop: 30}}
                    label={Strings.sm_basic.Country}
                    data={Static.countries}
                    onSelect={selectedItem => {
                      onChange(selectedItem);
                    }}
                    required={true}
                    error={errors && errors.country?.message}
                  />
                )}
                name="country"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <Dropdown
                    containerStyle={{marginTop: 30}}
                    label={Strings.sm_basic.State}
                    data={stateRes}
                    onSelect={selectedItem => {
                      onChange(selectedItem.id);
                    }}
                    required={true}
                    error={errors && errors.state_id?.message}
                  />
                )}
                name="state_id"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    label={Strings.sm_basic.Zip}
                    value={value}
                    onChangeText={v => onChange(v)}
                    error={errors && errors.zipcode?.message}
                    required={true}
                    keyboardType="number-pad"
                    maxLength={5}
                  />
                )}
                name="zipcode"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    label={Strings.sm_basic.Occupation}
                    value={value}
                    onChangeText={v => onChange(v)}
                    error={errors && errors.occupation?.message}
                  />
                )}
                name="occupation"
              />
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Dropdown
                    containerStyle={{marginTop: 30}}
                    label={Strings.sm_basic.SexualOrientation}
                    data={profileRes?.sexual_orientation}
                    onSelect={selectedItem => {
                      onChange(selectedItem.id);
                    }}
                    required={true}
                    error={errors && errors.sexual_orientations_id?.message}
                  />
                )}
                name="sexual_orientations_id"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <MultiTextInput
                    containerStyle={{marginTop: 30}}
                    title={Strings.sm_basic.Bio}
                    required={true}
                    value={value}
                    maxLength={250}
                    onChangeText={v => {
                      onChange(v);
                    }}
                    error={errors && errors.bio?.message}
                  />
                )}
                name="bio"
              />
              <View style={styles.btnView}>
                <Button
                  style={styles.Btn}
                  label={Strings.sm_basic.Save}
                  onPress={handleSubmit(onSubmit)}
                />
              </View>
            </View>
            <DateTimePickerModal
              value={date}
              isVisible={show}
              mode={'date'}
              onConfirm={selectedDate => {
                setShow(false);
                setValue(FormKey.date_of_birth, getDate(selectedDate));
                setDate(getDate(selectedDate));
              }}
              onCancel={() => {
                setShow(false);
              }}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              positiveButtonLabel="DONE"
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={[styles.centeredView]}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>
              {Strings.EDITPROFILE.DiscardEdit}
            </Text>
            <Text style={styles.modalSubHeader}>
              {Strings.EDITPROFILE.DiscardEditDisc}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                navigation.navigate(Routes.PtbProfile);
              }}>
              <Text style={styles.modalOption1}>
                {Strings.profile.ModalOption1}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}>
              <Text style={styles.modalOption2}>
                {Strings.profile.ModalOption2}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditProfile;
