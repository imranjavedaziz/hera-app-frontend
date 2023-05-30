import {View, Text, Keyboard, BackHandler} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
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
  bank_update_Clean,
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
import {
  getAccountStatus,
  cleanAccountStatus,
} from '../../../redux/actions/AccountStatus';

const ManageBank = ({route}) => {
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
  const {bank_update_success, bank_update_loading, bank_update_fail} =
    useSelector(state => state.kyc);
  const {deleteBankResponse} = useSelector(store => store.deleteBank);
  const [disable, setDisable] = React.useState(false);
  const Item = route?.params?.Item;
  const loadingRef = useRef();
  const loadingStatusRef = useRef();
  const {
    account_status_success,
    account_status_loading,
    account_status_error_msg,
    account_status_fail,
    account_status_res,
  } = useSelector(state => state.AccountStatus);
  const handleBackButtonClick = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    dispatch(cleanAccountStatus());
    dispatch(bank_update_Clean());
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  useEffect(() => {
    if (bankResponse?.status === ADD_BANK_TOKEN.SUCCESS) {
      const token = bankResponse.info.id;
      dispatch(addBank(connected_acc_token, BankInfo, token));
    } else if (bankResponse?.status === ADD_BANK_TOKEN.FAIL) {
      dispatch(hideAppLoader());
      setDisable(false);
      dispatch(
        showAppToast(true, bankResponse?.info ?? 'Something went wrong'),
      );
      dispatch({type: ADD_BANK_TOKEN.END});
    }
  }, [bankResponse]);

  useEffect(() => {
    if (loadingStatusRef.current && !bank_update_loading) {
      dispatch(showAppLoader());
      if (bank_update_success) {
        dispatch(getAccountStatus());
      }
      if (bank_update_fail) {
        setDisable(false);
        dispatch(hideAppLoader());
      }
    }
    loadingStatusRef.current = bank_update_loading;
  }, [bank_update_success, bank_update_loading, bank_update_fail]);
  useEffect(() => {
    if (loadingRef.current && !account_status_loading) {
      if (account_status_fail) {
        setDisable(false);
        dispatch(hideAppLoader());
        dispatch(showAppToast(true, account_status_error_msg));
      }
    }
    loadingRef.current = account_status_loading;
  }, [account_status_success, account_status_loading, account_status_res]);
  //Delete Bank or Card
  useEffect(() => {
    if (deleteBankResponse?.status === DELETE_BANK.START) {
      dispatch(showAppLoader());
    } else if (deleteBankResponse?.status === DELETE_BANK.SUCCESS) {
      // dispatch({type: DELETE_BANK.CLEAN});
    } else if (deleteBankResponse?.status === DELETE_BANK.FAIL) {
      setDisable(false);
      let error = deleteBankResponse?.info ?? 'Something went wrong';
      dispatch(hideAppLoader());
      dispatch(showAppToast(true, error));
      dispatch({type: DELETE_BANK.CLEAN});
    } else {
      dispatch(hideAppLoader());
    }
  }, [deleteBankResponse]);

  useEffect(() => {
    if (
      bankResponse?.status === ADD_BANK_TOKEN.SUCCESS &&
      addBanks?.status === ADD_BANK.SUCCESS &&
      bank_update_success &&
      account_status_success
    ) {
      if (
        account_status_res?.bank_account !== null &&
        (account_status_res?.kyc_status === 'incomplete' ||
          account_status_res?.kyc_status === 'unverified')
      ) {
        cleanRecord();
        dispatch({type: ADD_BANK.CLEAN});
        dispatch({type: DELETE_BANK.CLEAN});
        dispatch({type: ADD_BANK_TOKEN.END});
        dispatch(hideAppLoader());
        replace(Routes.KycScreen);
        setDisable(false);
      } else {
        cleanRecord();
        dispatch({type: ADD_BANK.CLEAN});
        dispatch({type: DELETE_BANK.CLEAN});
        dispatch({type: ADD_BANK_TOKEN.END});
        dispatch(hideAppLoader());
        navigation.navigate(Routes.HeraPay);
        setDisable(false);
      }
    }
  }, [
    bankResponse,
    addBanks,
    bank_update_success,
    account_status_res,
    account_status_success,
  ]);
  useEffect(() => {
    if (addBanks?.status === ADD_BANK.START) {
      dispatch(showAppLoader());
    } else if (addBanks?.status === ADD_BANK.SUCCESS) {
      const token = addBanks.info.id;
      const payload = {
        bank_acc_token: token,
      };
      dispatch(bankToken(token));
      dispatch(bank_update(payload));
      if (Item && Item !== undefined && !_.isEmpty(Item)) {
        dispatch(deleteBank(Item));
      }
    } else if (addBanks?.status === ADD_BANK.FAIL) {
      setDisable(false);
      dispatch(hideAppLoader());
      let error = addBanks?.info ?? 'Something went wrong!';
      dispatch(showAppToast(true, error));
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
  const validate = useCallback(() => {
    Keyboard.dismiss();
    if (validateData()) {
      setDisable(true);
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
      if (account_status_fail) {
        dispatch(getAccountStatus());
      } else if (addBanks?.status === ADD_BANK.FAIL) {
        const token = bankResponse.info.id;
        dispatch(addBank(connected_acc_token, BankInfo, token));
      } else if (bank_update_fail) {
        const token = addBanks.info.id;
        const payload = {
          bank_acc_token: token,
        };
        dispatch(bankToken(token));
        dispatch(bank_update(payload));
      } else {
        dispatch(addBankToken(bankInfo));
      }
    }
  }, [inputs, bank_update_fail, addBanks, account_status_fail]);

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
            inputRef={routingnumberRef}
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
              disabled={disable}
            />
          </View>
        </View>
        <ExtraBottomView />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ManageBank;
