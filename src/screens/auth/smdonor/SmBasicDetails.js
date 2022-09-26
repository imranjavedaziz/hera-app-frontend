// SmBasicDetails
import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import Images from '../../../constants/Images';
import {CircleBtn} from '../../../components/Header';
import globalStyle from '../../../styles/global';
import Strings from '../../../constants/Strings';
import {smBasicSchema} from '../../../constants/schemas';
import FloatingLabelInput from '../../../components/inputs/FloatingLabelInput';
import {genders, Static,Routes} from '../../../constants/Constants';
import Dropdown from '../../../components/inputs/Dropdown';
import styles from '../../../styles/auth/smdonor/basicDetailsScreen';
import User from '../../../services/User';
import Auth from '../../../services/Auth';

const SmBasicDetails = ({route}) => {
  const userService = User();
  const authService = Auth();
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
    setValue,
  } = useForm({
    resolver: yupResolver(smBasicSchema),
  });
  const onSubmit = data => {
    userService.saveBasicDetails(data);
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
        scroller={true}
        showHeader={true}
        headerEnd={true}
        headerComp={headerComp}>
        <View style={globalStyle.mainContainer}>
          <Text style={globalStyle.screenTitle}>{Strings.sm_basic.Title}</Text>
          <Text style={[globalStyle.screenSubTitle, {marginVertical: 20}]}>
            {Strings.sm_basic.Subtitle}
          </Text>
          <Text
          style={styles.label}
          accessible={true}
          accessibilityLabel={'Gender'}>
            Gender
            <Text style={[{color: 'red'}]}>*</Text>
          </Text>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={styles.radioContainer}>
                {genders.map(gender => (
                  <TouchableOpacity
                    style={styles.radioBtn}
                    key={gender.id}
                    onPress={() => onChange(gender.id)}>
                    <Image
                      style={styles.radioImg}
                      source={
                        value === gender.id
                          ? Images.iconRadiosel
                          : Images.iconRadiounsel
                      }
                    />
                    <Text style={styles.radioLabel}>{gender.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            name="gender_id"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Dropdown
                label={Strings.sm_basic.State}
                data={Static.countries}
                onSelect={selectedItem => {
                  onChange(selectedItem.id);
                }}
                required={true}
                error={errors && errors.state_id?.message}
              />
            )}
            name="state_id"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.sm_basic.Zip}
                value={value}
                onChangeText={v => onChange(v)}
                error={errors && errors.zipcode?.message}
                required={true}
                keyboardType="number-pad"
                maxLength={6}
              />
            )}
            name="zipcode"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.sm_basic.Occupation}
                value={value}
                onChangeText={v => onChange(v)}
                error={errors && errors.occupation?.message}
              />
            )}
            name="occupation"
          />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={Strings.sm_basic.SexualOrientation}
                data={Static.sexualOrient}
                onSelect={selectedItem => {
                  onChange(selectedItem.id);
                }}
                required={true}
                error={errors && errors.sexual_orientations_id?.message}
              />
            )}
            name="sexual_orientations_id"
          />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={Strings.sm_basic.RelationshipStatus}
                data={Static.relationship_status}
                onSelect={selectedItem => {
                  onChange(selectedItem.id);
                }}
                required={true}
                error={errors && errors.relationship_status_id?.message}
              />
            )}
            name="relationship_status_id"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.sm_basic.Bio}
                value={value}
                onChangeText={v => onChange(v)}
                error={errors && errors.bio?.message}
                required={true}
                fixed={true}
                multiline={true}
                numberOfLines={5}
                inputStyle={styles.textArea}
              />
            )}
            name="bio"
          />
          <Button
            label={Strings.sm_basic.Btn}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </Container>
    </>
  );
};
export default SmBasicDetails;
