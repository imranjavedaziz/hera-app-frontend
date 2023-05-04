import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {
  Button,
  FloatingLabelInput,
  Header,
  ModalMiddle,
} from '../../../components';
import styles from './styles';
import {Alignment, Images, Strings} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import {IconHeader} from '../../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Input_Type, Routes, validationBank} from '../../../constants/Constants';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {
  DateFormats,
  dateToStringFormatter,
  getMediaFormatedForLibrary,
  getNumberFromString,
  isPositiveInteger,
  jsonToFormData,
  padLeadingZeros,
  validMobileNumber,
  validateName,
  validateZipCode,
} from '../../../utils/commonFunction';
import {ValidationMessages} from '../../../constants/Strings';
import DocumentPhoto from '../../../components/Document/DocumentPhotos';
import {kyc_update} from '../../../redux/actions/stripe.action';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../redux/actions/loader';
import {KYC_UPDATE} from '../../../redux/Type';
const KycScreen = () => {
  const navigation = useNavigation();
  const [datePicked, onDateChange] = React.useState();
  const [errors, setErrors] = React.useState({});
  const [inputs, setInputs] = React.useState({});
  const [selectedPhotos, setSelectedPhotos] = React.useState([]);
  const dispatch = useDispatch();
  const lastnameRef = useRef();
  const addressRef = useRef();
  const phonenumberRef = useRef();
  const zipcodedRef = useRef();
  const ssnRef = useRef();
  const countryRef = useRef();
  const stateRef = useRef();
  const cityRef = useRef();
  const TaxRef = useRef();
  const {log_in_data, bank_token} = useSelector(state => state.Auth);
  const [show, setShow] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const {kycResponse} = useSelector(store => store?.kyc);
  let scrollRef = React.createRef();
  const [date, setDate] = React.useState(new Date());
  console.log(bank_token, 'bank_token');
  const headerComp = () => (
    <IconHeader
      rightIcon={Images.iconcross}
      onPress={() => {
        Platform.OS === 'ios' ? backAction() : setShowModal(true);
      }}
      style={styles.androidHeaderIcons}
    />
  );
  useEffect(() => {
    let response = kycResponse;
    if (response?.status === KYC_UPDATE.SUCCESS) {
      dispatch(
        showAppToast(
          false,
          response?.info?.message ?? 'Request successfully completed.',
        ),
      );
      dispatch({type: KYC_UPDATE.END});
      dispatch(hideAppLoader());
      navigation.navigate(Routes.HeraPay);
    } else if (response?.status === KYC_UPDATE.FAIL) {
      let error =
        response?.info?.errors ??
        response?.info?.message ??
        'Something went wrong!';
      dispatch(showAppToast(true, error));
      dispatch(hideAppLoader());
      dispatch({type: KYC_UPDATE.END});
      // navigation.navigate(Routes.HeraPay);
    }
  }, [kycResponse]);
  const backAction = () => {
    Alert.alert(
      ValidationMessages.DISCARD_KYC,
      ValidationMessages.DISCARD_KYC_DESC,
      [
        {
          text: ValidationMessages.YES_DISCARD,
          onPress: () => {
            navigation.navigate(Routes.HeraPay);
          },
        },
        {
          text: ValidationMessages.NOT_NOW,
          onPress: () => null,
        },
      ],
    );
    return true;
  };
  const handleOnchange = (text, input) => {
    console.log(text, input, 'kkoktext, inputs');
    let prevoius = inputs[input];
    if (input === Input_Type.firstName || input === Input_Type.lastName) {
      const name = text?.trim();
      if (validateName(name) || name === '') {
        setInputs(prevState => ({...prevState, [input]: text}));
      } else {
        setInputs(prevState => ({...prevState, [input]: prevoius ?? ''}));
      }
    } else {
      if (
        input === Input_Type.ssn &&
        (isNaN(text) || !isPositiveInteger(text)) &&
        text !== ''
      ) {
        setInputs(prevState => ({...prevState, [input]: prevoius ?? ''}));
        return;
      }
      setInputs(prevState => ({...prevState, [input]: text}));
    }
    setErrors(prevState => ({...prevState, [input]: null}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  const CalenderOn = () => {
    handleError(null, Input_Type.dob);
    lastnameRef.current.blur();
    phonenumberRef.current.blur();
    setShow(true);
  };
  const validateData = () => {
    dispatch(showAppLoader());
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.firstName) {
      handleError(ValidationMessages.REQUIRED, Input_Type.firstName);
      isValid = false;
    } else if (!validateName(inputs.firstName)) {
      handleError(ValidationMessages.INVALID, Input_Type.firstName);
      isValid = false;
    }
    if (!inputs.lastName) {
      handleError(ValidationMessages.REQUIRED, Input_Type.lastName);
      isValid = false;
    } else if (!validateName(inputs.lastName)) {
      handleError(ValidationMessages.INVALID, Input_Type.lastName);
      isValid = false;
    }
    if (!inputs.dob) {
      handleError(ValidationMessages.REQUIRED, Input_Type.dob);
      isValid = false;
    } else if (inputs.dob) {
      handleOnchange(inputs?.dob, Input_Type.dob);
    }

    if (!inputs.phoneNumber) {
      handleError(ValidationMessages.REQUIRED, Input_Type.phoneNumber);
      isValid = false;
    } else if (!validMobileNumber(inputs.phoneNumber)) {
      handleError(ValidationMessages.INVALID, Input_Type.phoneNumber);
      isValid = false;
    }
    if (!inputs.zipCode) {
      handleError(ValidationMessages.REQUIRED, Input_Type.zipCode);
      isValid = false;
    } else if (
      !validateZipCode(inputs.zipCode) ||
      inputs.zipCode.length < validationBank.ZIP_CODE_MIN
    ) {
      handleError(ValidationMessages.INVALID, Input_Type.zipCode);
      isValid = false;
    }
    if (!inputs.ssn) {
      handleError(ValidationMessages.REQUIRED, Input_Type.ssn);
      isValid = false;
    } else if (isNaN(inputs.ssn) || inputs.ssn.length < validationBank.SSN) {
      handleError(ValidationMessages.INVALID, Input_Type.ssn);
      isValid = false;
    }
    if (inputs.address) {
      handleOnchange(inputs?.address.trim(), Input_Type.address);
    }
    if (!inputs.address?.trim()) {
      handleError(ValidationMessages.REQUIRED, Input_Type.address);
      isValid = false;
    }
    if (inputs.country) {
      handleOnchange(inputs?.country.trim(), Input_Type.country);
    }
    if (!inputs.country?.trim()) {
      handleError(ValidationMessages.REQUIRED, Input_Type.country);
      isValid = false;
    }
    if (inputs.state) {
      handleOnchange(inputs?.state.trim(), Input_Type.state);
    }
    if (!inputs.state?.trim()) {
      handleError(ValidationMessages.REQUIRED, Input_Type.state);
      isValid = false;
    }
    if (inputs.city) {
      handleOnchange(inputs?.city.trim(), Input_Type.city);
    }
    if (!inputs.city?.trim()) {
      handleError(ValidationMessages.REQUIRED, Input_Type.city);
      isValid = false;
    }
    if (selectedPhotos.length < 1) {
      handleError(ValidationMessages.REQUIRED, Input_Type.selectField);
      isValid = false;
    }
    return isValid;
  };
  function getDateStr() {
    return inputs.dob
      ? dateToStringFormatter(inputs.dob, DateFormats.YYYYMMDD)
      : '';
  }
  console.log(bank_token, 'bank_tokenbank_token');
  // You cannot
  const validate = async () => {
    Keyboard.dismiss();
    const dateString = inputs?.dob;
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    if (validateData()) {
      let media = selectedPhotos.map(img => getMediaFormatedForLibrary(img));
      const num = getNumberFromString(inputs.phoneNumber);
      const numWithPad = padLeadingZeros(num, validationBank.PhoneNumber - 4);
      let payload = {
        postal_code: inputs.zipCode,
        address: inputs.address,
        date_of_birth: getDateStr(),
        ssn_last_4: inputs.ssn,
        phone_no: numWithPad,
        last_name: inputs.lastName,
        first_name: inputs.firstName,
        country: inputs.country,
        state: inputs.state,
        city: inputs.city,
        bank_token_id: bank_token,
        dob_year: year,
        dob_month: month,
        dob_day: day,
      };
      if (media.length > 0) {
        let document_front = media[0];
        payload.document_front = document_front;
      }
      if (media.length > 1) {
        let document_back = media[1];
        payload.document_back = document_back;
      }
      console.log(payload, 'payloadpayload');
      let formDataPayload = jsonToFormData(payload);
      dispatch(kyc_update(formDataPayload));
    }
  };

  return (
    <View style={styles.flex}>
      <Header end={false}>{headerComp()}</Header>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={20}
        enableAutoAutomaticScroll={true}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}>
        <View style={styles.mainContainer}>
          <Text style={styles.mainText}>{Strings.ManageBank.ADD_Bank}</Text>
          <Text style={styles.mainTextADD}>
            {Strings.ManageBank.CompleteKyc}
          </Text>
          <View style={{paddingHorizontal: 40}}>
            <FloatingLabelInput
              label={Strings.ManageBank.FIRST_NAME}
              value={inputs.firstName}
              required={true}
              onChangeText={text => handleOnchange(text, Input_Type.firstName)}
              returnKeyType="next"
              onFocus={() => handleError(null, Input_Type.firstName)}
              maxLength={validationBank.FirstNameLimit}
              error={errors?.firstName}
              onSubmitEditing={() => {
                lastnameRef.current.focus();
              }}
            />
            <FloatingLabelInput
              label={Strings.ManageBank.LAST_NAME}
              value={inputs.lastName}
              onChangeText={text => handleOnchange(text, Input_Type.lastName)}
              required={true}
              returnKeyType="next"
              onFocus={() => handleError(null, Input_Type.lastName)}
              maxLength={validationBank.LastNameLimit}
              inputRef={lastnameRef}
              onSubmitEditing={() => {
                phonenumberRef.current.focus();
              }}
              error={errors.lastName}
            />
            <FloatingLabelInput
              label={Strings.sm_register.DOB}
              value={inputs.dob}
              dateUpdateHadler={date => handleOnchange(date, Input_Type.dob)}
              error={errors.dob}
              required={true}
              onFocus={() => handleError(null, Input_Type.dob)}
              endComponentPress={() => CalenderOn()}
              endComponent={() => (
                <TouchableOpacity onPress={() => CalenderOn()}>
                  <Image source={Images.calendar} />
                </TouchableOpacity>
              )}
              editable={false}
              onPressIn={() => CalenderOn()}
            />
            <FloatingLabelInput
              label={Strings.ManageBank.PhoneNumber}
              value={inputs.phoneNumber}
              required={true}
              returnKeyType="next"
              keyboardType={'numeric'}
              onChangeText={text =>
                handleOnchange(text, Input_Type.phoneNumber)
              }
              onFocus={() => handleError(null, Input_Type.phoneNumber)}
              maxLength={validationBank.PhoneNumber}
              inputRef={phonenumberRef}
              onSubmitEditing={() => {
                zipcodedRef.current.focus();
              }}
              error={errors.phoneNumber}
            />
            <FloatingLabelInput
              label={Strings.ManageBank.Country}
              value={inputs.country}
              onChangeText={text => handleOnchange(text, Input_Type.country)}
              required={true}
              returnKeyType="next"
              onFocus={() => handleError(null, Input_Type.country)}
              maxLength={validationBank.LastNameLimit}
              inputRef={countryRef}
              onSubmitEditing={() => {
                phonenumberRef.current.focus();
              }}
              error={errors.country}
            />
            <FloatingLabelInput
              label={Strings.ManageBank.STATE}
              value={inputs.state}
              onChangeText={text => handleOnchange(text, Input_Type.state)}
              required={true}
              returnKeyType="next"
              onFocus={() => handleError(null, Input_Type.state)}
              maxLength={validationBank.LastNameLimit}
              inputRef={stateRef}
              onSubmitEditing={() => {
                cityRef.current.focus();
              }}
              error={errors.state}
            />
            <FloatingLabelInput
              label={Strings.ManageBank.CITY}
              value={inputs.city}
              onChangeText={text => handleOnchange(text, Input_Type.city)}
              required={true}
              returnKeyType="next"
              onFocus={() => handleError(null, Input_Type.city)}
              maxLength={validationBank.LastNameLimit}
              inputRef={cityRef}
              onSubmitEditing={() => {
                addressRef.current.focus();
              }}
              error={errors.city}
            />
            <FloatingLabelInput
              required={true}
              maxLength={validationBank.LastNameLimit}
              value={inputs.address}
              onChangeText={text => handleOnchange(text, Input_Type.address)}
              onFocus={() => handleError(null, Input_Type.address)}
              label={Strings.ManageBank.ADDRESS}
              error={errors.address}
              returnKeyType="next"
              innerRef={addressRef}
              onSubmitEditing={() => {
                zipcodedRef.current.focus();
              }}
            />
            <FloatingLabelInput
              required={true}
              keyboardType={'numeric'}
              value={inputs.zipCode}
              maxLength={validationBank.ZIP_CODE_MAX}
              onChangeText={text => handleOnchange(text, Input_Type.zipCode)}
              onFocus={() => handleError(null, Input_Type.zipCode)}
              label={Strings.ManageBank.ZIP_CODE}
              error={errors.zipCode}
              returnKeyType="next"
              innerRef={zipcodedRef}
              onSubmitEditing={() => {
                ssnRef.current.focus();
              }}
            />
            <FloatingLabelInput
              keyboardType={'numeric'}
              required={true}
              value={inputs.ssn}
              maxLength={validationBank.SSN}
              onChangeText={text => handleOnchange(text, Input_Type.ssn)}
              onFocus={() => handleError(null, Input_Type.ssn)}
              label={Strings.ManageBank.SSN}
              error={errors.ssn}
              returnKeyType="go"
              innerRef={ssnRef}
              onSubmitEditing={() => {
                validate();
              }}
            />
            <FloatingLabelInput
              value={inputs.tax_ID}
              maxLength={validationBank.TAX}
              onChangeText={text => handleOnchange(text, Input_Type.tax_ID)}
              onFocus={() => handleError(null, Input_Type.tax_ID)}
              label={Strings.ManageBank.TaxID}
              error={errors.ssn}
              returnKeyType="go"
              innerRef={TaxRef}
              onSubmitEditing={() => {
                validate();
              }}
            />
          </View>
          <DocumentPhoto
            freecrop={true}
            selectedPhotos={selectedPhotos}
            setSelectedPhotos={setSelectedPhotos}
            handleError={handleError}
            error={errors.selectField}
            maxFilesCount={2}
            strictToCount={true}
          />
          <View
            style={{
              alignItems: Alignment.CENTER,
            }}>
            <Button
              label={Strings.ManageBank.SAVE}
              style={styles.saveBtn}
              onPress={() => validate()}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <DateTimePickerModal
        value={date}
        isVisible={show}
        mode={'date'}
        onConfirm={selectedDate => {
          console.log(
            moment(selectedDate).format('MMM DD, YYYY'),
            'selectedDateselectedDate',
          );
          setShow(false);
          setDate(selectedDate);
          setInputs(prevState => ({
            ...prevState,
            [Input_Type.dob]: moment(selectedDate).format('MMM DD, YYYY'),
          }));
          onDateChange(selectedDate);
        }}
        date={datePicked ? datePicked : moment().subtract(18, 'years')._d}
        maximumDate={
          log_in_data?.role_id === 3
            ? moment().subtract(21, 'years')._d
            : moment().subtract(18, 'years')._d
        }
        minimumDate={
          log_in_data?.role_id === 3
            ? moment().subtract(45, 'years')._d
            : moment().subtract(40, 'years')._d
        }
        onCancel={() => {
          setShow(false);
        }}
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        positiveButtonLabel="DONE"
      />
      <ModalMiddle
        showModal={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        String_1={ValidationMessages.DISCARD_KYC}
        String_2={ValidationMessages.DISCARD_KYC_DESC}
        String_3={ValidationMessages.YES_DISCARD}
        String_4={ValidationMessages.NOT_NOW}
        onPressNav={() => {
          setShowModal(false);
          navigation.navigate(Routes.HeraPay);
        }}
        onPressOff={() => {
          setShowModal(false);
        }}
      />
    </View>
  );
};

export default KycScreen;
