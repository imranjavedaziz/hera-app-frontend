// SetAttributes
import React from 'react';
import {Text, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import Images from '../../../constants/Images';
import {CircleBtn} from '../../../components/Header';
import globalStyle from '../../../styles/global';
import Strings from '../../../constants/Strings';
import {smSetAttributesSchema} from '../../../constants/schemas';
import {Static,} from '../../../constants/Constants';
import Dropdown from '../../../components/inputs/Dropdown';
import User from '../../../services/User';
import Auth from '../../../services/Auth';
import { Value } from '../../../constants/FixedValues';

const SetAttributes = ({route}) => {
  const userService = User();
  const authService = Auth();
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(smSetAttributesSchema),
  });
  const onSubmit = data => {
    userService.setAttributes(data);
  };
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconSettings}
      onPress={authService.logout}
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
          <Text style={[globalStyle.screenSubTitle,]}>
            {Strings.sm_set_attributes.Subtitle}
          </Text>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Dropdown
                label={Strings.sm_set_attributes.Height}
                data={Static.height}
                onSelect={(selectedItem) => {
                  onChange(selectedItem.id);
                }}
                required={true}
                error={errors && errors.height_id?.message}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return `${parseInt(selectedItem.name/12)} ft ${selectedItem.name%12} in`;
                }}
                rowTextForSelection={(item, index) => {
                  return `${parseInt(item.name/12)} ft ${item.name%12} in`;
                }}
              />
            )}
            name="height_id"
          />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={Strings.sm_set_attributes.Race}
                data={Static.race}
                onSelect={(selectedItem) => {
                  onChange(selectedItem.id);
                }}
                required={true}
                error={errors && errors.race_id?.message}
              />
            )}
            name="race_id"
          />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={Strings.sm_set_attributes.MotherEthnicity}
                data={Static.ethnicity}
                onSelect={(selectedItem) => {
                  onChange(selectedItem.id);
                }}
                required={true}
                error={errors && errors.mother_ethnicity_id?.message}
              />
            )}
            name="mother_ethnicity_id"
          />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={Strings.sm_set_attributes.FatheEthnicity}
                data={Static.ethnicity}
                onSelect={(selectedItem) => {
                  onChange(selectedItem.id);
                }}
                required={true}
                error={errors && errors.father_ethnicity_id?.message}
              />
            )}
            name="father_ethnicity_id"
          />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={Strings.sm_set_attributes.Weight}
                data={Static.weight}
                onSelect={(selectedItem) => {
                  onChange(selectedItem.id);
                }}
                required={true}
                error={errors && errors.weight_id?.message}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name + ' pounds';
                }}
                rowTextForSelection={(item, index) => {
                  return item.name + ' pounds';
                }}
              />
            )}
            name="weight_id"
          />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={Strings.sm_set_attributes.EyeColor}
                data={Static.eyeColors}
                onSelect={(selectedItem) => {
                  onChange(selectedItem.id);
                }}
                required={true}
                error={errors && errors.eye_colour_id?.message}
              />
            )}
            name="eye_colour_id"
          />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={Strings.sm_set_attributes.HairColor}
                data={Static.hairColors}
                onSelect={(selectedItem) => {
                  onChange(selectedItem.id);
                }}
                required={true}
                error={errors && errors.hair_colour_id?.message}
              />
            )}
            name="hair_colour_id"
          />
          <Button
           style={{height:Value.CONSTANT_VALUE_80,width:Value.CONSTANT_VALUE_197,}}
            label={Strings.sm_set_attributes.Btn}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </Container>
    </>
  );
};
export default SetAttributes;
