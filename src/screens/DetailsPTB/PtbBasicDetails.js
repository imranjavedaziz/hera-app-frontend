// PtbBasicDetails
import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Images from '../../constants/Images';
import {CircleBtn} from '../../components/Header';
import globalStyle from '../../styles/global';
import Strings from '../../constants/Strings';
import {smBasicSchema} from '../../constants/schemas';
import FloatingLabelInput from '../../components/inputs/FloatingLabelInput';
import {genders, Static,Routes} from '../../constants/Constants';
import Dropdown from '../../components/inputs/Dropdown';
import styles from '../../styles/auth/smdonor/basicDetailsScreen';

const PtbBasicDetails = ({route}) => {
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
    setValue,
  } = useForm({
    resolver: yupResolver(smBasicSchema),
  });
  const onSubmit = (data)=>{
    console.log(data);
    navigation.navigate(Routes.SetPreference,{...data,...route.params});
  }
  // const onSubmit = data => {
  //   navigation.navigate(Routes.SetAttributes, {...data, ...route.params});
  // };
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
        scroller={true}
        showHeader={true}
        headerEnd={true}
        headerComp={headerComp}>
        <View style={globalStyle.mainContainer}>
          <Text style={globalStyle.screenTitle}>{Strings.sm_basic.Title}</Text>
          <Text style={[globalStyle.screenSubTitle, {marginVertical: 20}]}>
            {Strings.sm_basic.Subtitle}
          </Text>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={styles.radioContainer}>
                {genders.map(gender => (
                  <TouchableOpacity
                    style={styles.radioBtn}
                    key={gender}
                    onPress={() => onChange(gender)}>
                    <Image
                      style={styles.radioImg}
                      source={
                        value === gender
                          ? Images.iconRadiosel
                          : Images.iconRadiounsel
                      }
                    />
                    <Text style={styles.radioLabel}>{gender}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            name="gender"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Dropdown
                label={Strings.sm_basic.Country}
                data={Static.countries}
                onSelect={selectedItem => {
                  onChange(selectedItem);
                }}
                required={true}
                error={errors && errors.country?.message}
              />
            )}
            name="country"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.sm_basic.State}
                value={value}
                onChangeText={v => onChange(v)}
                error={errors && errors.state?.message}
                required={true}
              />
            )}
            name="state"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.sm_basic.Zip}
                value={value}
                onChangeText={v => onChange(v)}
                error={errors && errors.zip?.message}
                required={true}
              />
            )}
            name="zip"
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
                  onChange(selectedItem);
                }}
                required={true}
                error={errors && errors.sexual?.message}
              />
            )}
            name="sexual"
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
export default PtbBasicDetails;
