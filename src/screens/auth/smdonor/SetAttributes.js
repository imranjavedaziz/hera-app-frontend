// SetAttributes
import React, {useState}from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import Images from '../../../constants/Images';
import {CircleBtn} from '../../../components/Header';
import globalStyle from '../../../styles/global';
import Strings from '../../../constants/Strings';
import {smSetAttributesSchema} from '../../../constants/schemas';
import BottomSheetComp from '../../../components/BottomSheet';
import Dropdown from '../../../components/inputs/Dropdown';
import User from '../../../services/User';
import Auth from '../../../services/Auth';
import { Value } from '../../../constants/FixedValues';
import { useSelector } from 'react-redux';
import SetterData from '../../../services/SetterData';

const SetAttributes = ({route}) => {
  const initialState = useSelector(state => state.auth)
  console.log(initialState)
  const [isOpen, setOpen] = useState(false);
  const userService = User();
  const authService = Auth();
  const dropdownValue = SetterData();
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(smSetAttributesSchema),
  });
  const onSubmit = data => {
    console.log(data);
    userService.setAttributes(data);
  };
  React.useEffect(() => {
    dropdownValue.state()
    dropdownValue.sexsualOrientation()
    dropdownValue.attribute()
  }, []);
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconSettings}
      onPress={()=>{setOpen(true)}}
    />
  );
  return (
    <>
      <Container
        showHeader={true}
        headerEnd={true}
        headerComp={headerComp}
        safeAreViewStyle={
          isOpen === true ? globalStyle.modalColor : globalStyle.safeViewStyle
        }>
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
                data={dropdownValue.donorHeight}
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
                data={dropdownValue.donorRace}
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
                data={dropdownValue.donorEthinicity}
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
                data={dropdownValue.donorEthinicity}
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
                data={dropdownValue.donorWeight}
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
                data={dropdownValue.donoreye}
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
                data={dropdownValue.donorhair}
                onSelect={(selectedItem) => {
                  onChange(selectedItem.id);
                }}
                required={true}
                error={errors && errors.hair_colour_id?.message}
              />
            )}
            name="hair_colour_id"
          />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={Strings.sm_set_attributes.Education}
                data={dropdownValue.donorEducation}
                onSelect={(selectedItem) => {
                  onChange(selectedItem.id);
                }}
                required={true}
                error={errors && errors.education_id?.message}
              />
            )}
            name="education_id"
          />
          <Button
           style={{height:Value.CONSTANT_VALUE_80,width:Value.CONSTANT_VALUE_197,}}
            label={Strings.sm_set_attributes.Btn}
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
export default SetAttributes;
