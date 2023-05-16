import {
  View,
  Text,
  Platform,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {Button, FloatingLabelInput, Header} from '../../../components';
import styles from '../ManageCard/styles';
import {Alignment, Images, Strings, Colors} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import {IconHeader} from '../../../components/Header';
import {validationBank, Input_Type, Routes} from '../../../constants/Constants';
import {
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
import {createSubscription} from '../../../redux/actions/Subsctiption';
import {getSubscriptionStatus} from '../../../redux/actions/Subsctiption';

const SubscriptionCard = ({route}) => {
  const params = route?.params;
  const navigation = useNavigation();
  const cardNumberRef = useRef();
  const expiryRef = useRef();
  const cvvRef = useRef();
  const cardNameRef = useRef();
  let scrollRef = React.createRef();
  const [isCallApi, setCallApi] = useState(false);
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const {attachPaymentIntentRes} = useSelector(
    store => store.attachPaymentIntent,
  );
  const {
    create_subscription_success,
    create_subscription_loading,
    create_subscription_res,
  } = useSelector(state => state.Subscription);
  const {subscription_status_success} = useSelector(
    state => state.Subscription,
  );
  console.log(params, 'koko');
  const {paymentIntentRes} = useSelector(store => store.paymentIntent);
  const {stripe_customer_id} = useSelector(state => state.Auth);
  const dispatch = useDispatch();
  const [check, setCheck] = useState(true);
  useEffect(() => {
    if (paymentIntentRes?.status === PAYMENT_INTENT.START) {
      dispatch(showAppLoader());
    } else if (paymentIntentRes?.status === PAYMENT_INTENT.SUCCESS) {
      const info = paymentIntentRes?.info;
      if (check) {
        dispatch(attachPaymentIntent(stripe_customer_id, info?.id));
      }

      const payload = {
        device_type: Platform.OS,
        product_id: params.android_product,
        payment_method_id: info?.id,
        purchase_token: 'null',
      };
      console.log('payload',payload);
      setCallApi(true);
      dispatch(showAppLoader());
      alert('createSubscription');
      dispatch(createSubscription(payload));
    } else if (paymentIntentRes?.status === PAYMENT_INTENT.FAIL) {
      dispatch(hideAppLoader());
      let error = paymentIntentRes?.error ?? 'Something went wrong!';
      dispatch(showAppToast(true, error));
    }
  }, [paymentIntentRes]);

  useEffect(() => {
    console.log('CHECKING CREATE SUB LINE NO 74');
    if (
      create_subscription_success &&
      isCallApi &&
      subscription_status_success
    ) {
      dispatch(getSubscriptionStatus());
      if (subscription_status_success) {
        setCallApi(false);
        dispatch(hideAppLoader());
        dispatch({type: ATTACH_PAYMENT_INTENT.CLEAN});
        dispatch({type: PAYMENT_INTENT.CLEAN});
        navigation.navigate(Routes.PtbProfile);
      }
    }
  }, [
    create_subscription_success,
    create_subscription_loading,
    create_subscription_res,
    subscription_status_success,
    isCallApi,
  ]);
  useEffect(() => {
    if (
      attachPaymentIntentRes?.status === ATTACH_PAYMENT_INTENT.SUCCESS
    ) {
      dispatch({type: ATTACH_PAYMENT_INTENT.CLEAN});
      dispatch({type: PAYMENT_INTENT.CLEAN});
    } else if (attachPaymentIntentRes?.status === ATTACH_PAYMENT_INTENT.FAIL) {
      let error = attachPaymentIntentRes?.error ?? 'Something went wrong!';
      dispatch(showAppToast(true, error));
      dispatch({type: ATTACH_PAYMENT_INTENT.CLEAN});
      dispatch({type: PAYMENT_INTENT.CLEAN});
    }
  }, [attachPaymentIntentRes]);
  useEffect(()=>{
    console.log('check-',check);
  },[check])
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
                scrollRef?.current.scrollToPosition(0, scaleHeight(150), true);
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
          
          <Text style={styles.bottomPara}>
              <Text style={{color: Colors.RED}}>*</Text>{Strings.confirmPassword.BottomPara}
            </Text>
          <View
            style={{
              alignItems: Alignment.CENTER,
            }}>
            <Button
              label={`PAY $${params.price.toFixed(2)}`}
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

export default SubscriptionCard;
