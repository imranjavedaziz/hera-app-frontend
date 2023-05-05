import {View, Text, Platform, Keyboard} from 'react-native';
import React, {useRef,useEffect} from 'react';
import {Button, FloatingLabelInput, Header} from '../../../components';
import styles from './styles';
import {Alignment, Images, Strings} from '../../../constants';
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
  ADD_CARD,
  ADD_CARD_TOKEN,
  addCard,
  addCardToken,
  updateCardToken,
} from '../../../redux/actions/stripe.action';
import ExtraBottomView from '../../../components/ExtraBottomView';
const ManageCard = () => {
  const navigation = useNavigation();
  const cardNumberRef = useRef();
  const expiryRef = useRef();
  const cvvRef = useRef();
  const cardNameRef = useRef();
  let scrollRef = React.createRef();
  const [inputs, setInputs] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const {tokenResponse} = useSelector(store => store.cardToken);
  const {addCards} = useSelector(store => store.addCard);
  const [cardInfos, setCardInfo] = React.useState();
  const {stripe_customer_id} = useSelector(state => state.Auth);
  console.log(stripe_customer_id,'stripe_customer_id');
  const dispatch = useDispatch();
  const saveCardToken = (token, fingerprint, country) => {
    let payload;
    payload = {
      card_token: token,
      fingerprint: fingerprint,
      country: country,
    };
    dispatch(updateCardToken(payload));
  };
  const cleanRecord = (clearToken = true) => {
    if (clearToken) {
      dispatch({type: ADD_CARD_TOKEN.CLEAN});
    }
  };

  useEffect(() => {
    if (tokenResponse?.status === ADD_CARD_TOKEN.START) {
      dispatch(showAppLoader());
    } else if (tokenResponse?.status === ADD_CARD_TOKEN.SUCCESS) {
      let info = tokenResponse?.info;
      saveCardToken(info.id, info.card.fingerprint, 'US');
      const token = info?.id;
      dispatch(addCard(stripe_customer_id, cardInfos, token));
      cleanRecord();
    } else if (tokenResponse?.status === ADD_CARD_TOKEN.FAIL) {
      dispatch(hideAppLoader());
      let error = tokenResponse?.info ?? 'Something went wrong!';
      dispatch(showAppToast(true, error));
      cleanRecord();
    }
  }, [tokenResponse]);

  useEffect(() => {
    if (addCards?.status === ADD_CARD.START) {
      dispatch(showAppLoader());
    } else if (addCards?.status === ADD_CARD.SUCCESS) {
      dispatch(hideAppLoader());
      //need to test
      dispatch(showAppToast(false, 'Card added to profile!'));
      navigation.navigate(Routes.HeraPay);
      dispatch({type: ADD_CARD.CLEAN});
    } else if (addCards?.status === ADD_CARD.FAIL) {
      dispatch(hideAppLoader());
      let error = addCards?.info ?? 'Something went wrong!';
      dispatch(showAppToast(true, error));
      cleanRecord();
    }
  }, [addCards]);

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
      dispatch(showAppLoader());
      let date = inputs.expiryDate.split('/');
      let cardInfo;
      cardInfo = {
        'card[number]': inputs.cardNumber,
        'card[exp_month]': date[0],
        'card[exp_year]': date[1],
        'card[cvc]': inputs.cvv,
        'card[name]': inputs.fullName,
      };
      setCardInfo(cardInfo);
      dispatch(addCardToken(cardInfo));
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
          <View
            style={{
              alignItems: Alignment.CENTER,
            }}>
            <Button
              label={Strings.ManageCard.SAVE_CARD}
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
