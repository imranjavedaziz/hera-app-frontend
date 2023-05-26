import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  TouchableOpacity,
  Keyboard,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  FloatingLabelInput,
  Header,
  ModalMiddle,
  MultiTextInput,
} from '../../../components';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../../constants/Constants';
import {Alignment, Colors, Images, Strings} from '../../../constants';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {editProfileSchema} from '../../../constants/schemas';
import {useDispatch} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {sendVerificationMail} from '../../../redux/actions/VerificationMail';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const EditProfile = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [date, setDate] = useState();
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [datePicked, onDateChange] = useState();
  const {
    control,
    setValue,
    formState: {errors, isDirty},
  } = useForm({
    resolver: yupResolver(editProfileSchema),
  });
  const getDate = selectedDate => {
    let tempDate = selectedDate.toString().split(' ');
    return date !== '' ? `${tempDate[1]} ${tempDate[2]}, ${tempDate[3]}` : '';
  };

  const backAction = () => {
    Alert.alert(
      Strings.EDITPROFILE.DiscardEdit,
      Strings.EDITPROFILE.DiscardEditDisc,
      [
        {
          text: Strings.profile.ModalOption1,
          onPress: () => {
            navCondition();
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
  const platform = () => {
    Platform.OS === 'ios' ? backAction() : setShowModal(true);
  };
  const navCondition = () => {
    props.route?.params?.smProfile
      ? navigation.navigate(Routes.SmSetting)
      : navigation.navigate(Routes.PtbProfile);
  };
  const headerComp = () => (
    <View style={styles.cancelAndroidsbtn}>
      <TouchableOpacity
        onPress={() => {
          isDirty === true ? platform() : navCondition();
        }}
        style={styles.clearView}>
        <Text style={styles.clearText}>{Strings.Subscription.Cancel}</Text>
      </TouchableOpacity>
    </View>
  );
  const onPressVerify = () => {
    dispatch(sendVerificationMail());
  };
  const StyleIOS = {
    marginTop: 30,
  };
  const Style = Platform.OS === 'ios' && StyleIOS;
  return (
    <View style={styles.flex}>
      <Header end={true}>{headerComp()}</Header>
      <KeyboardAwareScrollView
        keyboardOpeningTime={0}
        scrollEnabled={true}
        extraHeight={180}
        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={styles.mainAndroidContainer}>
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
                    onChangeText={v => onChange(v.trim())}
                    required={true}
                    maxLength={30}
                    error={errors && errors.first_name?.message}
                  />
                )}
                name="first_name"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    label={Strings.profile.MiddleName}
                    value={value}
                    maxLength={30}
                    onChangeText={v => onChange(v.trim())}
                    fontWeight={Alignment.BOLD}
                    error={errors && errors.middle_name?.message}
                  />
                )}
                name="middle_name"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    label={Strings.profile.LastName}
                    value={value}
                    maxLength={30}
                    onChangeText={v => onChange(v.trim())}
                    fontWeight={Alignment.BOLD}
                    required={true}
                    error={errors && errors.last_name?.message}
                  />
                )}
                name="last_name"
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
                    editable={false}
                    edited={false}
                    error={errors && errors.email?.message}
                    onPressVerify={onPressVerify}
                  />
                )}
                name="email"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    label={Strings.profile.phone_no}
                    onChangeText={v => onChange(v)}
                    fontWeight={Alignment.BOLD}
                    required={true}
                    editable={false}
                    edited={false}
                    error={errors && errors.phone?.message}
                  />
                )}
                name="phone"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    label={Strings.profile.DateOfBirth}
                    value={value}
                    onChangeText={v => onChange(v)}
                    endComponentPress={() => setShow(true)}
                    error={errors && errors.dob?.message}
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
                name="dob"
              />
              <Text style={styles.label}>
                Gender
                <Text style={[{color: Colors.RED}]}>*</Text>
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <FloatingLabelInput
                    containerStyle={Style}
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
                render={({field: {onChange, value}}) => (
                  <MultiTextInput
                    title={Strings.sm_basic.Bio}
                    required={true}
                    value={value}
                    maxLength={251}
                    onChangeText={v => {
                      onChange(v);
                    }}
                    error={
                      (value?.length > 250 &&
                        'You have reached 250 characters limit.') ||
                      (errors && errors.bio?.message)
                    }
                  />
                )}
                name="bio"
              />
              <View style={styles.btnView}>
                <Button
                  style={styles.Btn}
                  label={Strings.sm_basic.SAVE_PROFILE}
                />
              </View>
            </View>
            <DateTimePickerModal
              value={date}
              isVisible={show}
              mode={'date'}
              date={datePicked ?? new Date()}
              onConfirm={selectedDate => {
                setShow(false);
                setValue('dob', getDate(selectedDate));
                setDate(getDate(selectedDate));
                onDateChange(selectedDate);
              }}
              onCancel={() => {
                setShow(false);
              }}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              positiveButtonLabel="DONE"
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
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
          props.route?.params?.smProfile
            ? navigation.navigate(Routes.SmSetting)
            : navigation.navigate(Routes.PtbProfile);
        }}
        onPressOff={() => {
          setShowModal(false);
        }}
      />
    </View>
  );
};

export default EditProfile;
