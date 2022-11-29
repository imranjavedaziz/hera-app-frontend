// SetAttributes
import React, {useEffect, useRef, useState} from 'react';
import {Text, View, TouchableOpacity, Platform, ScrollView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Button from '../../../components/Button';
import Images from '../../../constants/Images';
import Header, {CircleBtn} from '../../../components/Header';
import globalStyle from '../../../styles/global';
import Strings from '../../../constants/Strings';
import {smSetAttributesSchema} from '../../../constants/schemas';
import Dropdown from '../../../components/inputs/Dropdown';
import {Value} from '../../../constants/FixedValues';
import {useDispatch, useSelector} from 'react-redux';
import {hideAppLoader, showAppLoader} from '../../../redux/actions/loader';
import {getAttribute, saveAttribute} from '../../../redux/actions/SetAttribute';
import {logOut} from '../../../redux/actions/Auth';
import {Routes} from '../../../constants/Constants';
import {useNavigation} from '@react-navigation/native';
import ActionSheet from 'react-native-actionsheet';
import {BottomSheetComp} from '../../../components';
import {Alignment} from '../../../constants';

const SetAttributes = ({route}) => {
  const navigation = useNavigation();
  const [isOpen, setOpen] = useState(false);
  const [attributeData, setAttributeData] = useState();
  const [threeOption, setThreeOption] = useState([]);

  let actionSheet = useRef();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(smSetAttributesSchema),
  });
  const onSubmit = data => {
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
  useEffect(() => {
    return navigation.addListener('focus', () => {
      reset();
    });
  }, [navigation, reset]);

  //GET PROFILE SETTER
  useEffect(() => {
    if (LoadingRef.current && !set_attribute_loading) {
      dispatch(showAppLoader());
      if (set_attribute_success) {
        dispatch(hideAppLoader());
        setAttributeData(set_attribute_res);
      } else {
        dispatch(hideAppLoader());
      }
    }
    LoadingRef.current = set_attribute_loading;
  }, [
    set_attribute_success,
    set_attribute_loading,
    dispatch,
    set_attribute_res,
    set_attribute_error_msg,
  ]);

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
  }, [
    save_attribute_loading,
    save_attribute_success,
    save_attribute_error_msg,
    navigation,
    dispatch,
  ]);

  const navigateSupport = () => {
    navigation.navigate(Routes.Support);
  };
  const handleThreeOption = async option => {
    switch (option) {
      case Strings.smSetting.Inquiry:
        navigateSupport();
        break;
      case Strings.preference.About:
        break;
      case Strings.preference.Logout:
        logOutScreen();
        break;
    }
  };
  const openActionSheet = () => {
    setThreeOption([
      Strings.smSetting.Inquiry,
      Strings.preference.About,
      Strings.preference.Logout,
    ]);
    setTimeout(() => {
      actionSheet.current.show();
    }, 300);
  };

  const headerComp = () => (
    <>
      <CircleBtn
        icon={Images.iconSettings}
        onPress={() => {
          Platform.OS === 'ios' ? openActionSheet() : setOpen(true);
        }}
        Fixedstyle={{
          marginTop: Value.CONSTANT_VALUE_54,
          marginRight: Value.CONSTANT_VALUE_20,
        }}
      />
      <ActionSheet
        ref={actionSheet}
        options={threeOption}
        destructiveButtonIndex={2}
        cancelButtonIndex={2}
        onPress={index => {
          handleThreeOption(threeOption[index]);
        }}
      />
    </>
  );

  const logOutScreen = () => {
    dispatch(logOut());
    navigation.navigate(Routes.Landing);
  };

  return (
    <>
      <View
        style={
          isOpen === true ? globalStyle.modalColor : globalStyle.safeViewStyle
        }>
        <Header end={true}>{headerComp()}</Header>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              paddingHorizontal: Value.CONSTANT_VALUE_40,
              marginTop: Value.CONSTANT_VALUE_105,
            }}>
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
                  data={attributeData?.height}
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
                    return `${parseInt(item.name / 12)} ft ${
                      item.name % 12
                    } in`;
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
                  data={attributeData?.race}
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
                  data={attributeData?.ethnicity}
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
                  data={attributeData?.ethnicity}
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
                  data={attributeData?.weight}
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
                  data={attributeData?.eye_colour}
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
                  label={Strings.preference.HairColor}
                  data={attributeData?.hair_colour}
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
                  data={attributeData?.education}
                  onSelect={selectedItem => {
                    onChange(selectedItem.id);
                  }}
                  required={true}
                  error={errors && errors.education_id?.message}
                />
              )}
              name="education_id"
            />
            <View
              style={{
                alignItems: Alignment.CENTER,
                justifyContent: Alignment.CENTER,
              }}>
              <Button
                style={{
                  height: Value.CONSTANT_VALUE_80,
                  width: Value.CONSTANT_VALUE_197,
                  marginTop: Value.CONSTANT_VALUE_46,
                  marginBottom: Value.CONSTANT_VALUE_50,
                }}
                label={Strings.sm_set_attributes.Btn}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
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
