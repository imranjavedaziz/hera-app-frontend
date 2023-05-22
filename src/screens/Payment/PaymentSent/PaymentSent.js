import {
  View,
  Text,
  TextInput,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header, {IconHeader} from '../../../components/Header';
import {Images, Strings} from '../../../constants';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {digitBeforeDecimal, getRoleData} from '../../../utils/commonFunction';
import {showAppToast} from '../../../redux/actions/loader';
import {useDispatch} from 'react-redux';
import {Routes} from '../../../constants/Constants';
import numeral from 'numeral';

const PaymentSent = ({route}) => {
  const navigation = useNavigation();
  let scrollRef = React.createRef();
  const [params, setParams] = useState(null);
  const [amount, setAmount] = useState('');
  const [requestId, setRequestId] = useState(null);
  const [valueDot, setValueDot] = React.useState('');
  useEffect(() => {
    const updatedParams = route?.params?.amount
      ? route.params.donar
      : route.params;
    setParams(updatedParams);
    if (route?.params?.amount) {
      setRequestId(route?.params?.id);
      setAmount(digitBeforeDecimal(route.params.amount.toString()));
    }
  }, [route?.params?.amount, route?.params?.donar, route.params]);
  const inputRefs = useRef();

  const dispatch = useDispatch();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const handleBackButtonClick = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  useEffect(() => {
    if (route?.params?.amount) {
      console.log('route?.params?.amount');
    } else {
      const keyboardHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardOpen(false);
        },
      );

      const keyboardShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardOpen(true);
        },
      );

      // Focus the input field
      inputRefs.current.focus();

      return () => {
        keyboardHideListener.remove();
        keyboardShowListener.remove();
      };
    }
  }, []);

  const headerComp = () => (
    <IconHeader
      rightIcon={Images.iconcross}
      onPress={() => {
        navigation.goBack();
      }}
      style={styles.androidHeaderIcons}
    />
  );
  const handleAmountChange = text => {
    setValueDot(text);
    let txt = text.replace(/\s/g, '');
    if (text?.length === 0 || Number(text) === 0 || text === ',') {
      setAmount('');
    } else {
      if (txt?.includes(',')) {
        txt = txt?.replace(/,/g, '');
      }
      if (isNaN(txt)) {
        setAmount(amount ?? '');
        return;
      }
      if (txt.includes('.')) {
        txt = conTwoDecDigit(txt);
        setAmount(txt);
      } else {
        setAmount(digitBeforeDecimal(txt));
      }
    }
  };
  const conTwoDecDigit = digit => {
    let splits = digit.split('.');
    if (splits[0] == '') {
      return '0' + digit;
    } else {
      return splits.length >= 2
        ? digitBeforeDecimal(splits[0]) + '.' + splits[1].substring(-1, 2)
        : digit;
    }
  };

  const onSubmit = () => {
    if (valueDot.endsWith('.')) {
      dispatch(showAppToast(true, 'Please enter valid amount'));
    } else {
      const updatedTxt = amount?.replace(/,/g, '');
      let Amount;

      if (Platform.OS === 'android') {
        const parsedAmount = parseFloat(updatedTxt);
        if (isNaN(parsedAmount)) {
          Amount = ''; // Invalid input, return an empty string or handle it as desired
        } else {
          const decimalPart = (parsedAmount % 1).toFixed(2).substring(1);
          Amount = numeral(parsedAmount).format('0,0') + decimalPart;
        }
      } else {
        Amount = parseFloat(updatedTxt)?.toLocaleString('en-US', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        });
      }
      if (amount == '') {
        dispatch(showAppToast(true, 'Please enter a valid amount.'));
      } else {
        navigation.navigate(Routes.ConfirmPayment, {
          item: params,
          amount: Amount,
          requestId: requestId,
          ...route.params,
        });
      }
    }
  };
  const focusTextInput = () => {
    inputRefs.current.focus();
  };
  return (
    <View style={styles.flex}>
      <Header end={false}>{headerComp()}</Header>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        enableAutoAutomaticScroll={true}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        contentContainerStyle={styles.flex}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}>
        <View style={styles.mainContainer}>
          <Text style={styles.mainText}>{Strings.PaymentSent.SendTo}</Text>
          <Image
            style={styles.profileImg}
            source={{uri: params?.profile_pic}}
          />
          <Text style={styles.userName}>#{params?.username}</Text>
          <Text style={styles.type}>{getRoleData(params?.role_id)}</Text>
          <View style={styles.rowView}>
            <Text style={styles.dollar}>{Strings.PaymentSent.dollar}</Text>
            <TextInput
              ref={inputRefs}
              autoFocus={false}
              style={styles.textInputStyle}
              onFocus={focusTextInput}
              keyboardType="numeric"
              value={amount}
              onChangeText={handleAmountChange}
              maxLength={7}
              editable={!route?.params?.amount ? true : false}
            />
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.star}>*</Text>
            <Text style={styles.addProcess}>
              {Strings.PaymentSent.AdditionalCharges}
            </Text>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.bottonView}
          keyboardVerticalOffset={40}>
          <View style={styles.bottonFloat}>
            <TouchableOpacity
              onPress={() => onSubmit()}
              style={styles.btnContainer}>
              <Text style={styles.btnText}>{Strings.PaymentSent.PROCEED}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default PaymentSent;
