// SmBasicDetails
import React, { useState } from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector } from "react-redux";
import {yupResolver} from '@hookform/resolvers/yup';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import Images from '../../../constants/Images';
import {CircleBtn} from '../../../components/Header';
import globalStyle from '../../../styles/global';
import Strings, { ValidationMessages } from '../../../constants/Strings';
import {smBasicSchema} from '../../../constants/schemas';
import FloatingLabelInput from '../../../components/inputs/FloatingLabelInput';
import {genders} from '../../../constants/Constants';
import Dropdown from '../../../components/inputs/Dropdown';
import styles from '../../../styles/auth/smdonor/basicDetailsScreen';
import BottomSheetComp from '../../../components/BottomSheet';
import User from '../../../services/User';
import Auth from '../../../services/Auth';
import { Value } from '../../../constants/FixedValues';
import {showAppToast} from '../../../redux/actions/loader';
import SetterData from '../../../services/SetterData';

const SmBasicDetails = ({route}) => {
  const state = useSelector(state=>state.Auth);
  console.log(state)
  console.log('Props Data Basic ==',route.params);
  const userService = User();
  const authService = Auth();
  const data = SetterData();
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(smBasicSchema),
  });
  const onSubmit = (data)=>{
    console.log(data);
    userService.saveBasicDetails(data);
  }
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconSettings}
      onPress={()=>{setOpen(true)}}
    />
  );
  React.useEffect(() => {
    data.state()
    data.sexsualOrientation()
    if (!isValid) {
      const e = errors;
      if (e.gender_id) {
        dispatch(showAppToast(true, ValidationMessages.ENTER_GENDER));
      }
    }
  }, [errors, isValid]);
  return (
    <>
      <Container
        scroller={true}
        showHeader={true}
        headerEnd={true}
        headerComp={headerComp}
        safeAreViewStyle={
          isOpen === true ? globalStyle.modalColor : globalStyle.safeViewStyle
        }>
        <View style={globalStyle.mainContainer}>
          <Text style={globalStyle.screenTitle}>{Strings.sm_basic.Title}</Text>
          <Text style={[globalStyle.screenSubTitle, {marginBottom:Value.CONSTANT_VALUE_45 }]}>
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
                data={data.myState}
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
            render={({field: {onChange}}) => (
              <Dropdown
                label={Strings.sm_basic.SexualOrientation}
                data={data.sexsualOrient}
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
                data={data.relationship}
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
            style={styles.Btn}
            label={Strings.sm_basic.Btn}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </Container>
      <BottomSheetComp
        wrapperStyle={globalStyle.wrapperStyle}
        lineStyle={globalStyle.lineStyle}
        isOpen={isOpen}
        setOpen={setOpen}>
        <View
          style={globalStyle.basicSheetContainer}>
          <TouchableOpacity
            style={globalStyle.formBtn}>
            <Text
              style={globalStyle.formText}>
            {Strings.bottomSheet.Inquiry_Form}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyle.heraBtn}>
            <Text
              style={globalStyle.heraText}>
              {Strings.bottomSheet.About_HERA}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyle.logoutBtn} onPress={authService.logout}>
            <Text
              style={globalStyle.logoutText}>
              {Strings.bottomSheet.Log_Out}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetComp>
    </>
  );
};
export default SmBasicDetails;
