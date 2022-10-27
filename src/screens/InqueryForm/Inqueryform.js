import {View, Text} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import {CircleBtn} from '../../components/Header';
import Images from '../../constants/Images';
import Styles from '../../styles/auth/smdonor/InqueryForm';
import {useNavigation} from '@react-navigation/native';
import Strings from '../../constants/Strings';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {inqueryFormSchema} from '../../constants/schemas';
import styles from '../../styles/auth/smdonor/basicDetailsScreen';
import FloatingLabelInput from '../../components/inputs/FloatingLabelInput';
import Dropdown from '../../components/inputs/Dropdown';
import Button from '../../components/Button';
import {FormKey} from '../../constants/Constants';
export default function Inqueryform() {
  const dataone = [
    {label: 'One', value: '1'},
    {label: 'Two', value: '2'},
  ];
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(inqueryFormSchema),
  });
  const navigation = useNavigation();
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      onPress={() => navigation.goBack()}
      accessibilityLabel={Strings.inqueryForm.LEFT_ARROW_BUTTON}
    />
  );
  const onSubmit = data => {
    const reqData = new FormData();
    reqData.append(FormKey.name, data.name);
    reqData.append(FormKey.user_type, data.user_type);
    reqData.append(FormKey.emailAddress, data.emailAddress);
    reqData.append(FormKey.mobileNumber, data.mobileNumber);
    reqData.append(FormKey.message, data.message);
  };
  return (
    <Container
      scroller={true}
      showHeader={true}
      headerEnd={true}
      headerComp={headerComp}>
      <View style={Styles.mainContainer}>
        <Text style={Styles.title}>{Strings.inqueryForm.Title}</Text>
        <Text style={Styles.title1}>{Strings.inqueryForm.Subtitle}</Text>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <FloatingLabelInput
              label={Strings.inqueryForm.Name}
              value={value}
              onChangeText={v => onChange(v)}
              error={errors && errors.name?.message}
              required={true}
            />
          )}
          name={FormKey.name}
        />
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <Dropdown
              label={Strings.inqueryForm.USER_TYPE}
              data={dataone}
              onSelect={(selectedItem, index) => {
                onChange(selectedItem, index);
              }}
              required={true}
              error={errors && errors.user_type?.message}
            />
          )}
          name={FormKey.user_type}
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <FloatingLabelInput
              label={Strings.profile.EmailAddress}
              value={value}
              onChangeText={v => onChange(v)}
              error={errors && errors.emailAddress?.message}
              required={true}
            />
          )}
          name={FormKey.emailAddress}
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <FloatingLabelInput
              label={Strings.inqueryForm.MobileNumber}
              value={value}
              onChangeText={v => onChange(v)}
              error={errors && errors.emailAddress?.message}
              required={true}
            />
          )}
          name={FormKey.mobileNumber}
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <FloatingLabelInput
              messageStyle={true}
              label={Strings.inqueryForm.Message}
              value={value}
              onChangeText={v => onChange(v)}
              error={errors && errors.message?.message}
              required={true}
              fixed={true}
              multiline={true}
              numberOfLines={5}
              inputStyle={Styles.textArea}
            />
          )}
          name={FormKey.message}
        />
        <Button
          label={Strings.inqueryForm.SendInquiry}
          onPress={handleSubmit(onSubmit)}
          style={styles.Btn}
        />
      </View>
    </Container>
  );
}
