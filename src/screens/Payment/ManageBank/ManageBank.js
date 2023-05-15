import {View, Text, Keyboard} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Button, FloatingLabelInput, Header} from '../../../components';
import styles from './styles';
import {Alignment, Images, Strings} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import {IconHeader} from '../../../components/Header';
import {validationBank, Input_Type, Routes} from '../../../constants/Constants';
import {
  formatACNumber,
  undoFormatACNumber,
  validateFullName,
} from '../../../utils/commonFunction';
import {ValidationMessages} from '../../../constants/Strings';
import {useDispatch, useSelector} from 'react-redux';
import {
  ADD_BANK_TOKEN,
  ADD_BANK,
  DELETE_BANK,
  addBankToken,
  addBank,
  deleteBank,
  bank_update,
} from '../../../redux/actions/stripe.action';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../redux/actions/loader';
import {replace} from '../../../utils/RootNavigation';
import {bankToken} from '../../../redux/actions/Auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ExtraBottomView from '../../../components/ExtraBottomView';
import _ from 'lodash';
import {getAccountStatus} from '../../../redux/actions/AccountStatus';
import getKycStatusFunction from '../../../utils/getkycStatusFunc';

const ManageBank = ({route}) => {
  const redirectTo = route?.params?.redirectTo || '';
  const navigation = useNavigation();
  const accountholderRef = useRef();
  const accountnumberRef = useRef();
  const routingnumberRef = useRef();
  const [errors, setErrors] = React.useState({});
  const [inputs, setInputs] = React.useState({});
  const [BankInfo, setBankInfo] = React.useState({});
  const dispatch = useDispatch();
  let scrollRef = React.createRef();
  const {addBanks} = useSelector(store => store.addBank);
  const {connected_acc_token} = useSelector(state => state.Auth);
  const {bankResponse} = useSelector(store => store.addBankTokenReducer);
  const {deleteBankResponse} = useSelector(store => store.deleteBank);
  const Item = route?.params?.Item;
  const loadingRef = useRef();
  const {
    account_status_success,
    account_status_loading,
    account_status_error_msg,
    account_status_fail,
    account_status_res,
  } = useSelector(state => state.AccountStatus);
  useEffect(() => {
    if (bankResponse?.status === ADD_BANK_TOKEN.SUCCESS) {
      const token = bankResponse.info.id;
      dispatch(bankToken(token));
      const payload = {
        bank_acc_token: token,
      };
      dispatch(bank_update(payload));
      dispatch(addBank(connected_acc_token, BankInfo, token));
      dispatch({type: ADD_BANK_TOKEN.END});
    } else if (bankResponse?.status === ADD_BANK_TOKEN.FAIL) {
      dispatch(hideAppLoader());
      dispatch(
        showAppToast(true, bankResponse?.info ?? 'Something went wrong'),
      );
      dispatch({type: ADD_BANK_TOKEN.END});
    }
  }, [bankResponse]);
  useEffect(() => {
    if (loadingRef.current && !account_status_loading) {
      dispatch(showAppLoader());
      if (account_status_success) {
        if (
          getKycStatusFunction(account_status_res?.kyc_status) ===
            Strings.Hera_Pay.KYC_INCOMPLETE ||
          getKycStatusFunction(account_status_res?.kyc_status) ===
            Strings.Hera_Pay.KYC_REJECTED
        ) {
          replace(Routes.KycScreen, {redirectTo});
        } else {
          navigation.navigate(redirectTo !== '' ? redirectTo : Routes.HeraPay);
        }
        dispatch(hideAppLoader());
      }
      if (account_status_fail) {
        dispatch(hideAppLoader());

        dispatch(showAppToast(true, account_status_error_msg));
      }
      dispatch(hideAppLoader());
    }
    loadingRef.current = account_status_loading;
  }, [account_status_success, account_status_loading, account_status_res]);
  //Delete Bank or Card
  useEffect(() => {
    if (deleteBankResponse?.status === DELETE_BANK.START) {
      dispatch(showAppLoader());
    } else if (deleteBankResponse?.status === DELETE_BANK.SUCCESS) {
      dispatch(hideAppLoader());
      dispatch({type: DELETE_BANK.CLEAN});
    } else if (deleteBankResponse?.status === DELETE_BANK.FAIL) {
      let error = deleteBankResponse?.info ?? 'Something went wrong';
      dispatch(hideAppLoader());
      dispatch(showAppToast(true, error));
      dispatch({type: DELETE_BANK.CLEAN});
    } else {
      dispatch(hideAppLoader());
    }
  }, [deleteBankResponse]);

  useEffect(() => {
    if (addBanks?.status === ADD_BANK.START) {
    } else if (addBanks?.status === ADD_BANK.SUCCESS) {
      dispatch(getAccountStatus());
      if (Item && Item !== undefined && !_.isEmpty(Item)) {
        dispatch(deleteBank(Item));
      } else {
        dispatch(hideAppLoader());
      }
      dispatch(hideAppLoader());
      dispatch({type: ADD_BANK.CLEAN});
    } else if (addBanks?.status === ADD_BANK.FAIL) {
      dispatch(hideAppLoader());
      let error = addBanks?.info ?? 'Something went wrong!';
      dispatch(showAppToast(true, error));
      cleanRecord();
    }
  }, [addBanks]);
  const cleanRecord = (clearToken = true) => {
    if (clearToken) {
      dispatch({type: ADD_BANK_TOKEN.CLEAN});
    }
  };

  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      onPress={() => {
        navigation.goBack();
      }}
      style={styles.androidHeaderIcons}
    />
  );
  const handleOnchange = (text, input) => {
    let prevoius = inputs[input];
    if (input === Input_Type.accountholder && !validateFullName(text)) {
      setInputs(prevState => ({...prevState, [input]: prevoius ?? ''}));
      return;
    }
    if (input === Input_Type.accountnumber && isNaN(parseInt(text))) {
      setInputs(prevState => ({...prevState, [input]: ''}));
      return;
    }
    if (input === Input_Type.routingnumber && isNaN(parseInt(text))) {
      setInputs(prevState => ({...prevState, [input]: ''}));
      return;
    }

    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  const validateData = () => {
    let isValid = true;
    if (inputs.accountholder) {
      handleOnchange(inputs?.accountholder.trim(), Input_Type.accountholder);
    }
    if (!inputs.accountnumber) {
      handleError(
        ValidationMessages.ACCOUNT_REQUIRED,
        Input_Type.accountnumber,
      );
      isValid = false;
    } else {
      const accountNumber = undoFormatACNumber(inputs.accountnumber);
      if (
        isNaN(accountNumber) ||
        accountNumber.length < validationBank.MIN_ACCOUNT_NUM
      ) {
        handleError(
          ValidationMessages.ACCOUNT_INVALID,
          Input_Type.accountnumber,
        );
        isValid = false;
      }
    }
    if (!inputs.accountholder?.trim()) {
      handleError(Input_Type.accountholder);
      isValid = true;
    } else if (!validateFullName(inputs.accountholder)) {
      handleError(
        ValidationMessages.ACCOUNTHOLDER_REQUIRED,
        Input_Type.accountholder,
      );
      isValid = false;
    }
    if (!inputs.routingnumber) {
      handleError(ValidationMessages.ROUTE_REQUIRED, Input_Type.routingnumber);
      isValid = false;
    } else if (
      isNaN(inputs.routingnumber) ||
      inputs.routingnumber.length < validationBank.routingLimit
    ) {
      handleError(ValidationMessages.ROUTE_INVALID, Input_Type.routingnumber);
      isValid = false;
    }
    return isValid;
  };
  const validate = async () => {
    Keyboard.dismiss();
    if (validateData()) {
      let bankInfo = {
        'bank_account[country]': 'US',
        'bank_account[currency]': 'USD',
        'bank_account[account_holder_name]': inputs.accountholder,
        'bank_account[account_holder_type]': 'individual',
        'bank_account[routing_number]': inputs.routingnumber,
        'bank_account[account_number]': undoFormatACNumber(
          inputs.accountnumber,
        ),
      };
      dispatch(showAppLoader());
      setBankInfo(bankInfo);
      dispatch(addBankToken(bankInfo));
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
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}>
        <View style={styles.mainContainer}>
          <Text style={styles.mainText}>{Strings.ManageBank.ADD_Bank}</Text>
          <Text style={styles.mainTextADD}>
            {Strings.ManageBank.ADD_BANK_DETAIL}
          </Text>
          <FloatingLabelInput
            label={Strings.ManageBank.AccountNumber}
            value={formatACNumber(inputs.accountnumber)}
            onChangeText={text =>
              handleOnchange(text, Input_Type.accountnumber)
            }
            required={true}
            keyboardType={'numeric'}
            returnKeyType="next"
            onFocusHandle={() => handleError(null, Input_Type.accountnumber)}
            maxLength={validationBank.accountNumberLimit}
            inputRef={accountnumberRef}
            error={errors.accountnumber}
            onSubmitEditing={() => {
              accountholderRef.current.focus();
            }}
          />
          <FloatingLabelInput
            label={Strings.ManageBank.AccountName}
            value={inputs.accountholder}
            onFocusHandle={() => handleError(null, Input_Type.accountholder)}
            onChangeText={text =>
              handleOnchange(text, Input_Type.accountholder)
            }
            error={errors.accountholder}
            required={false}
            maxLength={30}
            returnKeyType="next"
            inputRef={accountholderRef}
            onSubmitEditing={() => {
              routingnumberRef.current.focus();
            }}
          />
          <FloatingLabelInput
            label={Strings.ManageBank.RoutingNumber}
            value={inputs.routingnumber}
            keyboardType={'numeric'}
            onChangeText={text =>
              handleOnchange(text, Input_Type.routingnumber)
            }
            onFocusHandle={() => handleError(null, Input_Type.routingnumber)}
            error={errors.routingnumber}
            required={true}
            returnKeyType="go"
            innerRef={routingnumberRef}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            maxLength={validationBank.routingLimit}
          />
          <FloatingLabelInput
            label={Strings.ManageBank.Currency}
            value={'USD'}
            required={true}
            editable={false}
            edited={false}
          />
          <FloatingLabelInput
            label={Strings.ManageBank.Country}
            value={'United States'}
            required={true}
            maxLength={30}
            editable={false}
            edited={false}
          />
          <View
            style={{
              alignItems: Alignment.CENTER,
            }}>
            <Button
              label={Strings.ManageBank.Add}
              style={styles.addBtn}
              onPress={() => validate()}
            />
          </View>
        </View>
        <ExtraBottomView />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ManageBank;
