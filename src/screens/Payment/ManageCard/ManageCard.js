import {View, Text, ScrollView} from 'react-native';
import React, {useRef} from 'react';
import {Button, FloatingLabelInput, Header, InputLabel} from '../../../components';
import styles from './styles';
import {Alignment, Images, Strings} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import {IconHeader} from '../../../components/Header';
import {validationBank, Input_Type} from '../../../constants/Constants';
import {formatACNumber, validateFullName} from '../../../utils/commonFunction';
import {ValidationMessages} from '../../../constants/Strings';

const ManageCard = () => {
  const navigation = useNavigation();
  const accountholderRef = useRef();
  const accountnumberRef = useRef();
  const [inputs, setInputs] = React.useState({});
  const [errors, setErrors] = React.useState({});
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
    console.log(text, input);
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

  return (
    <View style={styles.flex}>
      <Header end={false}>{headerComp()}</Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.mainContainer}>
          <Text style={styles.mainText}>{Strings.ManageCard.ADD_CARD}</Text>
          <Text style={styles.cardDetails}>
            {Strings.ManageCard.CARD_DETAILS}
          </Text>
          <View style={{marginTop: 20}}>
            <FloatingLabelInput
              label={Strings.ManageCard.CardNumber}
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
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <FloatingLabelInput
              label={Strings.ManageCard.ValidThrough}
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
              label={Strings.ManageCard.CVV}
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
            </View>
            <FloatingLabelInput
            label={Strings.ManageCard.cardHolderName}
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
          </View>
          <View
            style={{
              alignItems: Alignment.CENTER,
              marginTop:45,
            }}>
            <Button
              label={Strings.ManageCard.SAVE_CARD}
              style={styles.addBtn}
              // onPress={() => validate()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ManageCard;
