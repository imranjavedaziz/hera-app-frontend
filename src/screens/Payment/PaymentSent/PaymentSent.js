import {
  View,
  Text,
  TextInput,
  Image,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header, {IconHeader} from '../../../components/Header';
import {Images, Strings} from '../../../constants';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getRoleData} from '../../../utils/commonFunction';
import {showAppToast} from '../../../redux/actions/loader';
import {useDispatch} from 'react-redux';
import {Routes} from '../../../constants/Constants';

const PaymentSent = ({route}) => {
  const navigation = useNavigation();
  let scrollRef = React.createRef();
  const params = route.params;
  const inputRefs = useRef();
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    inputRefs.current.focus();
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      // inputRefs.current.blur();
      setKeyboardOpen(false);
    });
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
    });

    return () => {
      keyboardHideListener.remove();
      keyboardShowListener.remove();
    };
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
    // Allow only numeric and decimal input
    const numericRegex = /^\d*\.?\d*$/;

    // Remove any existing commas from the input
    const cleanedText = text.replace(/,/g, '');

    // Check if the input starts with a dot and add '0' in front
    if (cleanedText.startsWith('.') && cleanedText.length === 1) {
      setAmount('0.');
    } else if (numericRegex.test(cleanedText)) {
      // Add commas to the input value
      const formattedAmount = cleanedText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setAmount(formattedAmount);
    }
  };
  const onSubmit = () => {
    if (amount == '') {
      dispatch(showAppToast(true, 'Please enter a valid amount.'));
    } else {
      navigation.navigate(Routes.ConfirmPayment, {item: params, amount});
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
        extraScrollHeight={20}
        enableAutoAutomaticScroll={true}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
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
              style={styles.textInputStyle}
              onFocus={focusTextInput}
              keyboardType="numeric"
              value={amount}
              onChangeText={handleAmountChange}
            />
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.star}>*</Text>
            <Text style={styles.addProcess}>
              {Strings.PaymentSent.AdditionalCharges}
            </Text>
          </View>
        </View>
        <View style={!keyboardOpen && styles.bottonFloat}>
          <TouchableOpacity
            onPress={() => onSubmit()}
            style={styles.btnContainer}>
            <Text style={styles.btnText}>{Strings.PaymentSent.PROCEED}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default PaymentSent;
