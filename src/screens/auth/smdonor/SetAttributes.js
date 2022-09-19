// SetAttributes
import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import Images from '../../../constants/Images';
import {CircleBtn} from '../../../components/Header';
import globalStyle from '../../../styles/global';
import Strings from '../../../constants/Strings';
import {smSetAttributesSchema} from '../../../constants/schemas';
import {Static} from '../../../constants/Constants';
import Dropdown from '../../../components/inputs/Dropdown';

const SetAttributes = ({route}) => {
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(smSetAttributesSchema),
  });
  const onSubmit = data => {
    console.log(data);
    navigation.navigate('CreateGallery',{...data,...route.params});
  };
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconSettings}
      onPress={navigation.goBack}
      accessibilityLabel="Left arrow Button, Press to go back"
    />
  );
  return (
    <>
      <Container
        showHeader={true}
        headerEnd={true}
        headerComp={headerComp}>
        <View style={globalStyle.mainContainer}>
          <Text style={globalStyle.screenTitle}>
            {Strings.sm_set_attributes.Title}
          </Text>
          <Text style={[globalStyle.screenSubTitle, {marginVertical: 20}]}>
            {Strings.sm_set_attributes.Subtitle}
          </Text>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Dropdown
                label={Strings.sm_set_attributes.Height}
                data={Static.height}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  onChange(selectedItem);
                }}
                required={true}
                error={errors && errors.height?.message}
              />
            )}
            name="height"
          />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={Strings.sm_set_attributes.Race}
                data={Static.race}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  onChange(selectedItem);
                }}
                required={true}
                error={errors && errors.race?.message}
              />
            )}
            name="race"
          />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={Strings.sm_set_attributes.MotherEthnicity}
                data={Static.ethnicity}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  onChange(selectedItem);
                }}
                required={true}
                error={errors && errors.motherEthnicity?.message}
              />
            )}
            name="motherEthnicity"
          />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={Strings.sm_set_attributes.FatheEthnicity}
                data={Static.ethnicity}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  onChange(selectedItem);
                }}
                required={true}
                error={errors && errors.fatheEthnicity?.message}
              />
            )}
            name="fatheEthnicity"
          />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={Strings.sm_set_attributes.Weight}
                data={Static.weight}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  onChange(selectedItem);
                }}
                required={true}
                error={errors && errors.weight?.message}
              />
            )}
            name="weight"
          />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={Strings.sm_set_attributes.EyeColor}
                data={Static.eyeColors}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  onChange(selectedItem);
                }}
                required={true}
                error={errors && errors.eye?.message}
              />
            )}
            name="eye"
          />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={Strings.sm_set_attributes.HairColor}
                data={Static.eyeColors}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  onChange(selectedItem);
                }}
                required={true}
                error={errors && errors.hair?.message}
              />
            )}
            name="hair"
          />
          <Button
            label={Strings.sm_register.Btn}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </Container>
    </>
  );
};
export default SetAttributes;
