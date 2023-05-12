import {
  View,
  Text,
  Platform,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {Button, FloatingLabelInput, Header} from '../../../components';
import styles from './styles';
import {Alignment, Images, Strings} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import {IconHeader} from '../../../components/Header';
import {validationBank, Input_Type, Routes} from '../../../constants/Constants';
import {
  calculateTotalStripeAmount,
  formatACNumber,
  validateExpiryDate,
  validateFullName,
} from '../../../utils/commonFunction';
import {ValidationMessages} from '../../../constants/Strings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {scaleHeight} from '../../../utils/responsive';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../redux/actions/loader';
import {useDispatch, useSelector} from 'react-redux';
import {
  ATTACH_PAYMENT_INTENT,
  PAYMENT_INTENT,
  attachPaymentIntent,
  createPaymentIntent,
} from '../../../redux/actions/stripe.action';
import ExtraBottomView from '../../../components/ExtraBottomView';
import {Value} from '../../../constants/FixedValues';
import {paymentTransfer} from '../../../redux/actions/Payment';
const ManageCard = ({route}) => {
  const navigation = useNavigation();
  const cardNumberRef = useRef();
  const expiryRef = useRef();
  const cvvRef = useRef();
  const cardNameRef = useRef();
  let scrollRef = React.createRef();
  const [inputs, setInputs] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const {attachPaymentIntentRes} = useSelector(
    store => store.attachPaymentIntent,
  );
  const params = route?.params;
  console.log(params?.params?.item, 'koko');
  const {paymentIntentRes} = useSelector(store => store.paymentIntent);
  const {stripe_customer_id, log_in_data} = useSelector(state => state.Auth);
  const dispatch = useDispatch();
  const [check, setCheck] = React.useState(true);

  const {
    payment_transfer_success,
    payment_transfer_loading,
    payment_transfer_error_msg,
    payment_transfer_res,
    payment_transfer_fail,
  } = useSelector(state => state.Payment);
  const loadingRef = useRef(null);
  function float2int(value) {
    return value | 0;
  }
  const Amount = params?.params?.amount?.replace(/,/g, '');
  const roundOff = float2int(Amount);
  useEffect(() => {
    if (paymentIntentRes?.status === PAYMENT_INTENT.START) {
      dispatch(showAppLoader());
    } else if (paymentIntentRes?.status === PAYMENT_INTENT.SUCCESS) {
      let info = paymentIntentRes?.info;
      const payload = {
        to_user_id: params?.params?.item?.id,
        amount: roundOff,
        net_amount: calculateTotalStripeAmount(roundOff),
        payment_method_id: info?.id,
        payment_request_id: null,
      };
      if (!check && params) {
        console.log('without save card for future', info);
        dispatch(paymentTransfer(payload));
      } else if (check && params) {
        console.log('check save card for future', info);
        dispatch(paymentTransfer(payload));
        dispatch(attachPaymentIntent(stripe_customer_id, info?.id));
      } else {
        dispatch(hideAppLoader());
        dispatch(attachPaymentIntent(stripe_customer_id, info?.id));
      }
    } else if (paymentIntentRes?.status === PAYMENT_INTENT.FAIL) {
      dispatch(hideAppLoader());
      let error = paymentIntentRes?.error ?? 'Something went wrong!';
      dispatch(showAppToast(true, error));
    }
  }, [paymentIntentRes]);
  useEffect(() => {
    if (loadingRef.current && !payment_transfer_loading) {
      dispatch(showAppLoader());
      if (payment_transfer_success) {
        dispatch(hideAppLoader());
        const payload = {
          ...route?.params,
          id: params?.params?.item?.id,
          payment_intent: payment_transfer_res?.payment_intent_id,
          amount: roundOff,
          net_amount: calculateTotalStripeAmount(roundOff),
          payment_status: 1,
          brand: paymentIntentRes?.info?.card?.brand,
          last4: paymentIntentRes?.info?.card?.last4,
          created_at: new Date().toString(),
          username: params?.params?.item?.username,
          profile_pic: params?.params?.item?.profile_pic,
          role: log_in_data.role_id,
          payment: true,
        };
        navigation.navigate(Routes.TransactionDetails, payload);
        dispatch({type: PAYMENT_INTENT.CLEAN});
        console.log(payment_transfer_res, 'payment_transfer_res');
      }
      if (payment_transfer_fail) {
        dispatch(hideAppLoader());
      }
      dispatch(hideAppLoader());
    }
    loadingRef.current = payment_transfer_loading;
  }, [
    payment_transfer_success,
    payment_transfer_loading,
    payment_transfer_error_msg,
    payment_transfer_res,
    payment_transfer_fail,
    dispatch,
  ]);
  useEffect(() => {
    if (attachPaymentIntentRes?.status === ATTACH_PAYMENT_INTENT.START) {
      dispatch(showAppLoader());
    } else if (
      attachPaymentIntentRes?.status === ATTACH_PAYMENT_INTENT.SUCCESS
    ) {
      if (check && params) {
        dispatch({type: ATTACH_PAYMENT_INTENT.CLEAN});
      } else {
        dispatch(hideAppLoader());
        dispatch(showAppToast(false, 'Card added to profile!'));
        dispatch({type: ATTACH_PAYMENT_INTENT.CLEAN});
        dispatch({type: PAYMENT_INTENT.CLEAN});
        navigation.navigate(Routes.HeraPay);
      }
    } else if (attachPaymentIntentRes?.status === ATTACH_PAYMENT_INTENT.FAIL) {
      dispatch(hideAppLoader());
      let error = attachPaymentIntentRes?.error ?? 'Something went wrong!';
      dispatch(showAppToast(true, error));
      dispatch({type: ATTACH_PAYMENT_INTENT.CLEAN});
      dispatch({type: PAYMENT_INTENT.CLEAN});
    }
  }, [attachPaymentIntentRes]);

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
    if (
      (input === Input_Type.fullName || input === Input_Type.name) &&
      !validateFullName(text)
    ) {
      setInputs(prevState => ({...prevState, [input]: prevoius ?? ''}));
      return;
    }
    if (
      (input === Input_Type.cardNumber || input === Input_Type.cvv) &&
      isNaN(parseInt(text))
    ) {
      setInputs(prevState => ({...prevState, [input]: ''}));
      return;
    }
    if (input === Input_Type.expiryDate) {
      // Remove any non-numeric characters from the input
      const numericInput = text.replace(/[^\d]/g, '');
      // Split the input into month and year components
      const month = numericInput.slice(0, 2);
      const year = numericInput.slice(2);

      // Format the input as "MM/YY" and update the state
      const formattedInput = `${month}${year ? `/${year}` : ''}`;
      setInputs(prevState => ({...prevState, [input]: formattedInput}));
    } else {
      setInputs(prevState => ({...prevState, [input]: text}));
    }
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  const validateData = () => {
    let isValid = true;
    if (!inputs.cardNumber) {
      handleError(ValidationMessages.CARD_REQUIRED, Input_Type.cardNumber);
      isValid = false;
    } else if (
      isNaN(parseInt(inputs.cardNumber)) ||
      inputs.cardNumber.length < validationBank.CardNumberMinLimit
    ) {
      handleError(ValidationMessages.CARD_INVALID, Input_Type.cardNumber);
      isValid = false;
    }
    if (!inputs.expiryDate) {
      handleError(ValidationMessages.EXP_REQUIRED, Input_Type.expiryDate);
      isValid = false;
    } else if (!validateExpiryDate(inputs.expiryDate)) {
      handleError(ValidationMessages.EXP_INVALID, Input_Type.expiryDate);
      isValid = false;
    }
    if (!inputs.cvv) {
      handleError(ValidationMessages.CVV_REQUIRED, Input_Type.cvv);
      isValid = false;
    } else if (isNaN(inputs.cvv) || inputs.cvv.length < validationBank.minCvv) {
      handleError(ValidationMessages.CVV_INVALID, Input_Type.cvv);
      isValid = false;
    }
    handleOnchange(inputs.fullName?.trim(), Input_Type.fullName);

    if (!inputs.fullName?.trim()) {
      handleError(ValidationMessages.NAME_REQUIRED, Input_Type.fullName);
      isValid = false;
    } else if (!validateFullName(inputs.fullName)) {
      handleError(ValidationMessages.NAME_INAVLID, Input_Type.fullName);
      isValid = false;
    }
    return isValid;
  };
  const validate = async () => {
    Keyboard.dismiss();
    if (validateData()) {
      // dispatch(showAppLoader());
      let date = inputs.expiryDate.split('/');
      let cardInfo;
      cardInfo = {
        'card[number]': inputs.cardNumber,
        'card[exp_month]': date[0],
        'card[exp_year]': date[1],
        'card[cvc]': inputs.cvv,
        'billing_details[name]': inputs.fullName,
      };
      dispatch(createPaymentIntent(cardInfo));
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
          <Text style={styles.mainText}>{Strings.ManageCard.ADD_CARD}</Text>
          <Text style={styles.cardDetails}>
            {Strings.ManageCard.CARD_DETAILS}
          </Text>
          <FloatingLabelInput
            label={Strings.ManageCard.CardNumber}
            value={formatACNumber(inputs.cardNumber)}
            onChangeText={text => handleOnchange(text, Input_Type.cardNumber)}
            onFocusHandle={() => handleError(null, Input_Type.cardNumber)}
            error={errors.cardNumber}
            required={true}
            inputRef={cardNumberRef}
            keyboardType={'numeric'}
            returnKeyType="next"
            maxLength={validationBank.CardNumberLimit}
            onSubmitEditing={() => {
              expiryRef.current.focus();
            }}
          />
          <FloatingLabelInput
            label={Strings.ManageCard.ValidThrough}
            value={inputs.expiryDate}
            maxLength={validationBank.ExpiryDate}
            onChangeText={text => handleOnchange(text, Input_Type.expiryDate)}
            onFocusHandle={() => handleError(null, Input_Type.expiryDate)}
            required={true}
            keyboardType={'numeric'}
            returnKeyType="next"
            error={errors.expiryDate}
            inputRef={expiryRef}
            onSubmitEditing={() => {
              cvvRef.current.focus();
            }}
          />
          <FloatingLabelInput
            label={Strings.ManageCard.CVV}
            value={inputs.cvv}
            onChangeText={text => handleOnchange(text, Input_Type.cvv)}
            onFocusHandle={() => handleError(null, Input_Type.cvv)}
            required={true}
            keyboardType={'numeric'}
            returnKeyType="next"
            maxLength={validationBank.Cvv}
            inputRef={cvvRef}
            error={errors.cvv}
            secureTextEntry={true}
            onSubmitEditing={() => {
              cardNameRef.current.focus();
            }}
          />
          <FloatingLabelInput
            label={Strings.ManageCard.cardHolderName}
            value={inputs.fullName}
            onChangeText={text => handleOnchange(text, Input_Type.fullName)}
            onFocusHandle={() => {
              handleError(null, Input_Type.fullName);
              if (Platform.OS === 'android') {
                scrollRef?.current.scrollToPosition(
                  (x = 0),
                  (y = scaleHeight(150)),
                  (animated = true),
                );
              }
            }}
            error={errors.fullName}
            required={true}
            maxLength={validationBank.fullNameLimit}
            returnKeyType="go"
            inputRef={cardNameRef}
            onSubmitEditing={() => {
              validate();
            }}
          />
          {params && (
            <View
              style={{
                flexDirection: Alignment.ROW,
                alignItems: Alignment.CENTER,
                marginTop: Value.CONSTANT_VALUE_26,
              }}>
              {!check ? (
                <TouchableOpacity
                  onPress={() => {
                    setCheck(cur => !cur);
                  }}>
                  <Image source={Images.rectangleCopy} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setCheck(cur => !cur);
                  }}>
                  <Image source={Images.iconCheck} />
                </TouchableOpacity>
              )}
              <Text style={styles.addFutureCard}>
                {Strings.ManageCard.saveForFuture}
              </Text>
            </View>
          )}
          <View
            style={{
              alignItems: Alignment.CENTER,
            }}>
            <Button
              label={
                params && params.params
                  ? `PAY $${calculateTotalStripeAmount(roundOff)}`
                  : Strings.ManageCard.SAVE_CARD
              }
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

export default ManageCard;
