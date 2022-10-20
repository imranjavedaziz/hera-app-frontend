// SetAttributes
import React, {useEffect, useRef, useState} from 'react';
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
import Auth from '../../../services/Auth';
import {Value} from '../../../constants/FixedValues';
import {useDispatch, useSelector} from 'react-redux';
import SetterData from '../../../services/SetterData';
import {getStates} from '../../../redux/actions/Register';
import {hideAppLoader, showAppLoader} from '../../../redux/actions/loader';
import {getAttribute, saveAttribute} from '../../../redux/actions/SetAttribute';
import SetAttribute from '../../../redux/reducers/SetAttribute';
import {logOut} from '../../../redux/actions/Auth';
import {Routes} from '../../../constants/Constants';
import {useNavigation} from '@react-navigation/native';

const SetAttributes = ({route}) => {
  const initialState = useSelector(state => state.Auth);
  console.log(initialState);
  const navigation = useNavigation();
  const [isOpen, setOpen] = useState(false);
  const [attributeData, setAttributeData] = useState();
  const authService = Auth();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(smSetAttributesSchema),
  });
  const onSubmit = data => {
    console.log('SUBMIT', data);
    dispatch(saveAttribute(data));
  };
  React.useEffect(() => {
    dispatch(getAttribute());
  }, [dispatch]);
  const {
    set_attribute_res,
    set_attribute_success,
    set_attribute_loading,
    set_attribute_error_msg,

    save_attribute_success,
    save_attribute_loading,
    save_attribute_error_msg,
  } = useSelector(state => state.SetAttribute);
  const LoadingRef = useRef(false);
  const SubmitLoadingRef = useRef(false);
  //GET PROFILE SETTER
  useEffect(() => {
    if (LoadingRef.current && !set_attribute_loading) {
      dispatch(showAppLoader());
      if (set_attribute_success) {
        dispatch(hideAppLoader());
        setAttributeData(set_attribute_res);
      }
      if (set_attribute_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    LoadingRef.current = set_attribute_loading;
  }, [set_attribute_success, set_attribute_loading]);

  //SAVE ATTRIBUTE DETAIL DATA
  useEffect(() => {
    if (!SubmitLoadingRef.current && !save_attribute_loading) {
      dispatch(showAppLoader());
      if (save_attribute_success) {
        dispatch(hideAppLoader());
        navigation.navigate(Routes.CreateGallery);
      }
      if (save_attribute_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    SubmitLoadingRef.current = save_attribute_loading;
  }, [save_attribute_loading, save_attribute_success]);
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconSettings}
      onPress={() => {
        setOpen(true);
      }}
    />
  );

  const logOutScreen = () => {
    dispatch(logOut());
    navigation.navigate(Routes.Landing);
  };

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
          <Text style={[globalStyle.screenSubTitle]}>
            {Strings.sm_set_attributes.Subtitle}
          </Text>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Dropdown
                label={Strings.sm_set_attributes.Height}
                data={set_attribute_res?.height}
                onSelect={selectedItem => {
                  onChange(selectedItem.id);
                }}
                required={true}
                error={errors && errors.height_id?.message}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return `${parseInt(selectedItem.name / 12)} ft ${
                    selectedItem.name % 12
                  } in`;
                }}
                rowTextForSelection={(item, index) => {
                  return `${parseInt(item.name / 12)} ft ${item.name % 12} in`;
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
                data={set_attribute_res?.race}
                onSelect={selectedItem => {
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
                data={set_attribute_res?.ethnicity}
                onSelect={selectedItem => {
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
                data={set_attribute_res?.ethnicity}
                onSelect={selectedItem => {
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
                data={set_attribute_res?.weight}
                onSelect={selectedItem => {
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
                data={set_attribute_res?.eye_colour}
                onSelect={selectedItem => {
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
                data={set_attribute_res?.hair_colour}
                onSelect={selectedItem => {
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
                data={set_attribute_res?.education}
                onSelect={selectedItem => {
                  onChange(selectedItem.id);
                }}
                required={true}
                error={errors && errors.education_id?.message}
              />
            )}
            name="education_id"
          />
          <Button
            style={{
              height: Value.CONSTANT_VALUE_80,
              width: Value.CONSTANT_VALUE_197,
            }}
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
        <View style={globalStyle.basicSheetContainer}>
          <TouchableOpacity style={globalStyle.formBtn}>
            <Text style={globalStyle.formText}>
              {Strings.bottomSheet.Inquiry_Form}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyle.heraBtn}>
            <Text style={globalStyle.heraText}>
              {Strings.bottomSheet.About_HERA}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyle.logoutBtn}
            onPress={() => logOutScreen()}>
            <Text style={globalStyle.logoutText}>
              {Strings.bottomSheet.Log_Out}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetComp>
    </>
  );
};
export default SetAttributes;
