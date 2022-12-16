// SetAttributes
import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import globalStyle from '../../../styles/global';
import Strings from '../../../constants/Strings';
import {smSetAttributesSchema} from '../../../constants/schemas';
import Dropdown from '../../../components/inputs/Dropdown';
const SetAttributes = ({route}) => {
  const EditAttributes = route.params?.EditAttributes;
  const {
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(smSetAttributesSchema),
  });
<<<<<<< HEAD
  const onSubmit = data => {
    const payload = {
      education_id: dirtyFields?.education_id
        ? data?.education_id
        : data?.education_id?.id,
      eye_colour_id: dirtyFields?.eye_colour_id
        ? data?.eye_colour_id
        : data?.eye_colour_id?.id,
      father_ethnicity_id: dirtyFields?.father_ethnicity_id
        ? data?.father_ethnicity_id
        : data?.father_ethnicity_id?.id,
      hair_colour_id: dirtyFields?.hair_colour_id
        ? data?.hair_colour_id
        : data?.hair_colour_id?.id,
      height_id: dirtyFields?.height_id ? data?.height_id : data?.height_id?.id,
      mother_ethnicity_id: dirtyFields?.mother_ethnicity_id
        ? data?.mother_ethnicity_id
        : data?.mother_ethnicity_id?.id,
      race_id: dirtyFields?.race_id ? data?.race_id : data?.race_id?.id,
      weight_id: dirtyFields?.weight_id ? data?.weight_id : data?.weight_id?.id,
    };
    dispatch(showAppLoader());
    EditAttributes === true
      ? dispatch(saveAttribute(payload))
      : dispatch(saveAttribute(data));
    EditAttributes !== true && dispatch(updateRegStep());
  };
  useFocusEffect(
    useCallback(() => {
      dispatch(getAttribute());
      dispatch(showEditAppLoader());
      EditAttributes === true && dispatch(getUserAttribute());
    }, [dispatch]),
  );
  const {log_out_success, log_out_loading, log_out_error_msg} = useSelector(
    state => state.Auth,
  );
  const {
    set_attribute_res,
    set_attribute_success,
    set_attribute_loading,
    set_attribute_error_msg,

    save_attribute_success,
    save_attribute_loading,
    save_attribute_error_msg,

    get_attribute_res,
    get_attribute_success,
    get_attribute_loading,
  } = useSelector(state => state.SetAttribute);
  const LoadingRef = useRef(false);
  const UserLoadingRef = useRef(false);
  const LogoutLoadingRef = useRef(false);
  const SubmitLoadingRef = useRef(false);
  useFocusEffect(
    useCallback(() => {
      return navigation.addListener('focus', () => {
        EditAttributes !== true && reset();
      });
    }, [navigation, reset]),
  );

  //GET User Attributes
  useEffect(() => {
    if (UserLoadingRef.current && !get_attribute_loading) {
      dispatch(showEditAppLoader());
      if (get_attribute_success) {
        dispatch(hideEditLoader());
        EditAttributes === true && handelChange();
      } else {
        dispatch(hideEditLoader());
      }
    }
    UserLoadingRef.current = get_attribute_loading;
  }, [
    get_attribute_res,
    get_attribute_loading,
    dispatch,
    get_attribute_success,
  ]);

  //GET PROFILE SETTER
  useEffect(() => {
    if (LoadingRef.current && !set_attribute_loading) {
      dispatch(showEditAppLoader());
      if (set_attribute_success) {
        dispatch(hideEditLoader());
        EditAttributes === true && handelChange();
        setAttributeData(set_attribute_res);
      } else {
        dispatch(hideEditLoader());
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

  //logout
  useEffect(() => {
    if (LogoutLoadingRef.current && !log_out_loading) {
      dispatch(showAppLoader());
      if (log_out_success) {
        dispatch(hideAppLoader());
        navigation.navigate(Routes.Landing);
      } else {
        dispatch(showAppToast(true, log_out_error_msg));
        dispatch(hideAppLoader());
      }
    }
    LogoutLoadingRef.current = log_out_loading;
  }, [log_out_success, log_out_loading]);
  //SAVE ATTRIBUTE DETAIL DATA
  useEffect(() => {
    if (SubmitLoadingRef.current && !save_attribute_loading) {
      dispatch(showAppLoader());
      if (save_attribute_success) {
        dispatch(showAppToast(false, save_attribute_error_msg));
        dispatch(hideAppLoader());
        setTimeout(() => {
          EditAttributes === true
            ? navigation.navigate(Routes.SmSetting)
            : navigation.navigate(Routes.CreateGallery);
        }, 1000);
      } else {
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
        openWebView(ABOUT_URL);
        break;
      case Strings.preference.Logout:
        logOutScreen();
        break;
      case Strings.Subscription.Cancel:
        break;
    }
  };
  const openActionSheet = () => {
    setThreeOption([
      Strings.smSetting.Inquiry,
      Strings.preference.About,
      Strings.preference.Logout,
      Strings.Subscription.Cancel,
    ]);
    setTimeout(() => {
      actionSheet.current.show();
    }, 300);
  };
  const backAction = () => {
    Alert.alert(
      Strings.EDITPROFILE.DiscardEdit,
      Strings.EDITPROFILE.DiscardEditDisc,
      [
        {
          text: Strings.profile.ModalOption1,
          onPress: () => {
            navigation.navigate(Routes.SmSetting);
          },
        },
        {
          text: Strings.profile.ModalOption2,
          onPress: () => null,
        },
      ],
    );
    return true;
  };
  //SETTER FIELDS
  const handelChange = async value => {
    const weight_id = set_attribute_res?.weight?.find(obj => {
      return obj.id === parseInt(get_attribute_res?.weight_id);
    });
    const eye_colour_id = set_attribute_res?.eye_colour?.find(obj => {
      return obj.id === parseInt(get_attribute_res?.eye_colour_id);
    });
    const height_id = set_attribute_res?.height.find(obj => {
      return obj.id === parseInt(get_attribute_res?.height_id);
    });
    const race_id = set_attribute_res?.race.find(obj => {
      return obj.id === parseInt(get_attribute_res?.race_id);
    });
    const mother_ethnicity_id = set_attribute_res?.ethnicity.find(obj => {
      return obj.id === parseInt(get_attribute_res?.mother_ethnicity_id);
    });
    const father_ethnicity_id = set_attribute_res?.ethnicity.find(obj => {
      return obj.id === parseInt(get_attribute_res?.father_ethnicity_id);
    });
    const hair_colour_id = set_attribute_res?.hair_colour.find(obj => {
      return obj.id === parseInt(get_attribute_res?.hair_colour_id);
    });
    const education_id = set_attribute_res?.education.find(obj => {
      return obj.id === parseInt(get_attribute_res?.education_id);
    });

    setValue('weight_id', weight_id);
    setValue('eye_colour_id', eye_colour_id);
    setValue('height_id', height_id);
    setValue('race_id', race_id);
    setValue('mother_ethnicity_id', mother_ethnicity_id);
    setValue('father_ethnicity_id', father_ethnicity_id);
    setValue('hair_colour_id', hair_colour_id);
    setValue('education_id', education_id);
  };
  const ternaryEXT = () =>
    Platform.OS === 'ios' ? backAction() : setShowModal(true);
  const headerComp = () => {
    if (EditAttributes) {
      return (
        <View style={globalStyle.cancelAndroidbtn}>
          <TouchableOpacity
            onPress={() => {
              isDirty === true
                ? ternaryEXT()
                : navigation.navigate(Routes.SmSetting);
            }}
            style={globalStyle.clearView}>
            <Text style={globalStyle.clearText}>
              {Strings.Subscription.Cancel}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <>
        <CircleBtn
          icon={Images.iconSettings}
          onPress={() => {
            Platform.OS === 'ios' ? openActionSheet() : setOpen(true);
          }}
          Fixedstyle={{
            marginRight: dynamicSize(Value.CONSTANT_VALUE_20),
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
  };

  const logOutScreen = () => {
    dispatch(logOut(Device_ID));
  };
  const StyleIOS = {
    marginTop: 30,
  };
  const Style = Platform.OS === 'ios' && StyleIOS;
=======
>>>>>>> e02f312e7c306daffa02950553263ffd05048da6
  return (
    <>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={globalStyle.screenTitle}>
              {EditAttributes === true
                ? Strings.sm_set_attributes.EditTitle
                : Strings.sm_set_attributes.Title}
            </Text>
            <Text style={[globalStyle.screenSubTitle]}>
              {Strings.sm_set_attributes.Subtitle}
            </Text>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <Dropdown
                  defaultValue={value}
                  label={Strings.sm_set_attributes.FatheEthnicity}
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
              render={({field: {onChange, value}}) => (
                <Dropdown
                  defaultValue={value}
                  label={Strings.sm_set_attributes.EyeColor}
                  onSelect={selectedItem => {
                    onChange(selectedItem.id);
                  }}
                  required={true}
                  error={errors && errors.eye_colour_id?.message}
                />
              )}
              name="eye_colour_id"
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default React.memo(SetAttributes);
