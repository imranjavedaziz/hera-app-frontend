import {View, Text, ScrollView, Keyboard} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Button, FloatingLabelInput, Header} from '../../../components';
import styles from './styles';
import {Alignment, Images, Strings} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import {IconHeader} from '../../../components/Header';
import {validationBank, Input_Type, Routes} from '../../../constants/Constants';
import {formatACNumber, validateFullName} from '../../../utils/commonFunction';
import {ValidationMessages} from '../../../constants/Strings';
import {useDispatch, useSelector} from 'react-redux';
import {
  ADD_BANK_TOKEN,
  ADD_CARD,
  addBankToken,
  addCard,
} from '../../../redux/actions/stripe.action';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../redux/actions/loader';
import {replace} from '../../../utils/RootNavigation';
import {bankToken} from '../../../redux/actions/Auth';

const ManageBank = () => {
  const navigation = useNavigation();
  const accountholderRef = useRef();
  const accountnumberRef = useRef();
  const routingnumberRef = useRef();
  const [errors, setErrors] = React.useState({});
  const [inputs, setInputs] = React.useState({});
  const [BankInfo, setBankInfo] = React.useState({});
  const dispatch = useDispatch();
  const {addCards} = useSelector(store => store.addCard);
  const {connected_acc_token} = useSelector(state => state.Auth);
  const {bankResponse} = useSelector(store => store.addBankTokenReducer);

  useEffect(() => {
    if (bankResponse?.status === ADD_BANK_TOKEN.SUCCESS) {
      const token = bankResponse.info.id;
      dispatch(bankToken(token));
      replace(Routes.KycScreen);
      dispatch(hideAppLoader());
      dispatch(addCard(connected_acc_token, BankInfo, token));
      dispatch({type: ADD_BANK_TOKEN.END});
    } else if (bankResponse?.status === ADD_BANK_TOKEN.FAIL) {
      dispatch(hideAppLoader());
      dispatch(
        showAppToast(false, bankResponse?.info ?? 'Something went wrong'),
      );
      dispatch({type: ADD_BANK_TOKEN.END});
    }
  }, [bankResponse]);

  useEffect(() => {
    if (addCards?.status === ADD_CARD.START) {
    } else if (addCards?.status === ADD_CARD.SUCCESS) {
      dispatch(hideAppLoader());
      dispatch({type: ADD_CARD.CLEAN});
    } else if (addCards?.status === ADD_CARD.FAIL) {
      dispatch(hideAppLoader());
      let error = addCards?.info ?? 'Something went wrong!';
      dispatch(showAppToast(true, error));
      cleanRecord();
    }
  }, [addCards]);
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
      handleError(ValidationMessages.REQUIRED, Input_Type.accountnumber);
      isValid = false;
    } else if (
      isNaN(inputs.accountnumber) ||
      inputs.accountnumber.length < validationBank.MIN_ACCOUNT_NUM
    ) {
      handleError(ValidationMessages.INVALID, Input_Type.accountnumber);
      isValid = false;
    }

    if (!inputs.accountholder?.trim()) {
      handleError(Input_Type.accountholder);
      isValid = true;
    } else if (!validateFullName(inputs.accountholder)) {
      handleError(ValidationMessages.INVALID, Input_Type.accountholder);
      isValid = false;
    }

    if (!inputs.routingnumber) {
      handleError(ValidationMessages.REQUIRED, Input_Type.routingnumber);
      isValid = false;
    } else if (
      isNaN(inputs.routingnumber) ||
      inputs.routingnumber.length < validationBank.routingLimit
    ) {
      handleError(ValidationMessages.INVALID, Input_Type.routingnumber);
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
        'bank_account[account_number]': inputs.accountnumber,
      };
      dispatch(showAppLoader());
      setBankInfo(bankInfo);
      dispatch(addBankToken(bankInfo));
    }
  };

  return (
    <View style={styles.flex}>
      <Header end={false}>{headerComp()}</Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
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
            onFocus={() => handleError(null, Input_Type.accountnumber)}
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
            onFocus={() => handleError(null, Input_Type.accountholder)}
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
            edited={false}
          />
          <FloatingLabelInput
            label={Strings.ManageBank.Country}
            value={'United States'}
            required={true}
            maxLength={30}
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
      </ScrollView>
    </View>
  );
};

export default ManageBank;
