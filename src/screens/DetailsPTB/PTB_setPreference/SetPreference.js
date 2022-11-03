import {Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../../../components/Container';
import Images from '../../../constants/Images';
import globalStyle from '../../../styles/global';
import {
  hideAppLoader,
  showAppLoader,
  showAppToast,
} from '../../../redux/actions/loader';
import Colors from '../../../constants/Colors';
import {CircleBtn} from '../../../components/Header';
import Button from '../../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {setPreferenceSchema} from '../../../constants/schemas';
import Range from '../../../components/RangeSlider';
import Strings from '../../../constants/Strings';
import Dropdown from '../../../components/inputs/Dropdown';
import {Static, Routes, FormKey, Fonts} from '../../../constants/Constants';
import BottomSheetComp from '../../../components/BottomSheet';
import {Value} from '../../../constants/FixedValues';
import styles from './Styles';
import Alignment from '../../../constants/Alignment';
import {logOut} from '../../../redux/actions/Auth';
import {
  SetPreferenceRes,
  SavePreference,
} from '../../../redux/actions/SetPreference';
import { scaleWidth } from '../../../utils/responsive';
import { ScrollView } from 'react-native-gesture-handler';
const onValueSelect = (data, value = '') => {
  const dataArr = data ? data.split(',') : [];
  const v = value;
  if (dataArr.includes(v)) {
    dataArr.splice(
      dataArr.findIndex(d => d === v),
      1,
    );
  } else {
    dataArr.push(v);
  }
  return dataArr.join(',');
};
const isSelected = (data, value) => {
  return data.split(',').includes(value.toString());
};
const SetPreference = ({route, navigation}) => {
  const [height, setHeight] = useState([58, 84]);
  const [isOpen, setOpen] = useState(false);
  const [preferencesData, setPreferencesData] = useState([]);
  const ageRange = Static.ageRange;
  const dispatch = useDispatch();
  const SubmitLoadingRef = useRef(false);
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(setPreferenceSchema),
  });
  const {
    set_preference_success,
    set_preference_loading,
    set_preference_error_msg,
    set_preference_res,

    save_preference_success,
    save_preference_loading,
    save_preference_error_msg,
  } = useSelector(state => state.SetPreference);

  const loadingRef = useRef(false);

  //GET PREFERENCE
  useEffect(() => {
    if (loadingRef.current && !set_preference_loading) {
      dispatch(showAppLoader());
      if (set_preference_success) {
        dispatch(hideAppLoader());
        setPreferencesData(set_preference_res);
      }
      if (set_preference_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    loadingRef.current = set_preference_loading;
  }, [set_preference_success, set_preference_loading]);

  // SAVE PREFERENCE

  useEffect(() => {
    if (SubmitLoadingRef.current && !save_preference_loading) {
      dispatch(showAppLoader());
      console.log(save_preference_success, 'save_preference_success');
      if (save_preference_success) {
        dispatch(hideAppLoader());
        navigation.navigate(Routes.PtbDashboard);
      }
      if (save_preference_error_msg) {
        dispatch(hideAppLoader());
      }
    }
    SubmitLoadingRef.current = save_preference_loading;
  }, [save_preference_loading, save_preference_success]);
  useEffect(() => {
    dispatch(SetPreferenceRes());
    if (!isValid) {
      const e = errors;
      const messages = [];
      Object.keys(errors).forEach(k => messages.push(e[k].message || ''));
      const msg = messages.join('\n').trim();
      if (msg) {
        dispatch(showAppToast(true, msg));
      }
    }
  }, [errors, isValid]);

  const onSubmit = data => {
    let value = {
      role_id_looking_for: data.looking,
      age: data.age_range,
      height: data.height.join('-'),
      race: data.race,
      education: data.education.id.toString(),
      hair_colour: data.hair,
      eye_colour: data.eye,
      ethnicity: data.ethnicity,
      state: '1,2',
    };
    console.log(value, 'Value');
    dispatch(showAppLoader());
    dispatch(SavePreference(value));
  };

  const logoutScreen = () => {
    dispatch(logOut());
    navigation.navigate(Routes.Landing);
  };

  const headerComp = () => (
    <CircleBtn
      Fixedstyle={styles.fixedheaderStyle}
      icon={Images.iconSettings}
      onPress={() => {
        setOpen(true);
      }}
    />
  );
  return (
    <>
      <Container
        scroller={true}
        fixedHeader={true}
        showHeader={true}
        headerComp={headerComp}
        headerEnd={true}
        safeAreViewStyle={
          isOpen === true ? globalStyle.modalColor : globalStyle.safeViewStyle
        }
        style={{paddingBottom: Value.CONSTANT_VALUE_50,marginHorizontal:scaleWidth(35)}}>
        <View style={styles.mainContainer}>
          <Text style={globalStyle.screenTitle}>
            {Strings.preference.setPreference}
          </Text>
          <View
            accessible={true}
            accessibilityLabel={`${Strings.preference.filter}`}>
            <Text
              style={globalStyle.screenSubTitle}
              numberOfLines={2}
              accessible={false}>
              {Strings.preference.filter}
            </Text>
          </View>
          <View style={styles.lookingFor}>
            <Text style={styles.lookingForText}>
              {Strings.preference.lookingFor}
            </Text>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <View style={{}}>
                  {preferencesData?.role?.length > 0 &&
                    preferencesData?.role.map(whom => (
                      <TouchableOpacity
                        style={styles.flexRow}
                        key={whom.id}
                        activeOpacity={1}
                        onPress={() => onChange(whom.id)}>
                        <Image
                          style={{resizeMode:"contain"}}
                          source={
                            value === whom.id
                              ? Images.iconRadiosel
                              : Images.iconRadiounsel
                          }
                        />
                        <Text style={styles.lookingsm}>{whom.name}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              )}
              name={FormKey.looking}
            />
            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <Dropdown
                  label={Strings.preference.Location}
                  data={Static.location}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    onChange(selectedItem);
                  }}
                  required={true}
                  error={errors && errors.location?.message}
                />
              )}
              name={FormKey.location}
            />
            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <Dropdown
                  label={Strings.preference.Education}
                  data={preferencesData?.education}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    onChange(selectedItem);
                  }}
                  required={true}
                  error={errors && errors.education?.message}
                />
              )}
              name={FormKey.education}
            />
            <Text style={styles.ageText}>
              {Strings.preference.AgeRange}
              <Text style={styles.chipsRequiredText}>*</Text>
            </Text>
            <Controller
              control={control}
              render={({field: {onChange, value = ''}}) => (
                <View style={styles.ageContainer}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {ageRange.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          onChange(onValueSelect(value, item.name));
                        }}
                        activeOpacity={0.8}
                        key={item.id}>
                        <View
                          style={[
                            styles.ageRangeChip,
                            {
                              backgroundColor: isSelected(value, item.name)
                                ? Colors.COLOR_5ABCEC
                                : Colors.BACKGROUND,
                              borderWidth: isSelected(value, item.name) ? 0 : 1,
                            },
                          ]}>
                          <Text
                            style={[
                              styles.chipInsideText,
                              {
                                color: isSelected(value, item.name)
                                  ? Colors.WHITE
                                  : null,
                                fontWeight: isSelected(value, item.name)
                                  ? Alignment.BOLD
                                  : null,
                              },
                            ]}>
                            {item.name} {Strings.preference.yrs}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                  </ScrollView>
                </View>
              )}
              name={FormKey.age_range}
            />
            <View style={{marginTop: Value.CONSTANT_VALUE_25}}>
              <View style={styles.heightContainer}>
                <Text style={styles.heightTextInner}>
                  {Strings.preference.Height}
                  <Text style={styles.heightText}>*</Text>
                </Text>
                <Text style={{fontWeight: Alignment.BOLD}}>
                  <Text>
                    {parseInt(height[0] / 12)}'{parseInt(height[0] % 12)}" -{' '}
                  </Text>
                  <Text>
                    {parseInt(height[1] / 12)}'{parseInt(height[1] % 12)}"
                  </Text>
                </Text>
              </View>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <Range
                    value={height}
                    setValue={setHeight}
                    onValueChange={value => {
                      onChange(value);
                    }}
                  />
                )}
                name={FormKey.height}
              />
            </View>
            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <Dropdown
                  label={Strings.preference.Race}
                  data={preferencesData?.race}
                  onSelect={(selectedItem, index) => {
                    onChange(selectedItem.id);
                  }}
                  required={true}
                  error={errors && errors.race?.message}
                />
              )}
              name={FormKey.race}
            />
            {/* <Controller
              control={control}
              render={({field: {onChange}}) => (
                <Dropdown
                  label={Strings.preference.Ethnicity}
                  data={preferencesData?.ethnicity}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    onChange(selectedItem.id);
                  }}
                  required={true}
                  error={errors && errors.ethnicity?.message}
                />
              )}
              name={FormKey.ethnicity}
            /> */}
            <Text style={styles.chipText}>
              {Strings.preference.HairColor}
              <Text style={styles.chipsRequiredText}>*</Text>
            </Text>
            <Controller
              control={control}
              render={({field: {onChange, value = ''}}) => (
                <View style={styles.hairContainer}>
                  {preferencesData?.hair_colour?.length > 0 &&
                    preferencesData?.hair_colour.map((item, index) => (
                      <TouchableOpacity
                        onPress={() => {
                          onChange(onValueSelect(value, item.id.toString()));
                        }}
                        key={item.id}>
                        <View
                          style={[
                            styles.chips,
                            {
                              backgroundColor: isSelected(
                                value,
                                item.id.toString(),
                              )
                                ? Colors.COLOR_5ABCEC
                                : Colors.BACKGROUND,
                              borderWidth: isSelected(value, item.id.toString())
                                ? 0
                                : 1,
                            },
                          ]}>
                          <Text
                            style={[
                              {
                                alignSelf: Alignment.CENTER,
                                fontFamily: isSelected(
                                  value,
                                  item.id.toString(),
                                )
                                  ? Fonts.OpenSansBold
                                  : Fonts.OpenSansRegular,
                                color: isSelected(value, item.id.toString())
                                  ? Colors.WHITE
                                  : null,
                              },
                            ]}>
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                </View>
              )}
              name={FormKey.hair}
            />
            <Text style={styles.chipText}>
              {Strings.preference.EyeColor}
              <Text style={styles.chipsRequiredText}>*</Text>
            </Text>
          </View>
          <Controller
            control={control}
            render={({field: {onChange, value = ''}}) => (
              <View style={styles.eyeContainer}>
                {preferencesData?.eye_colour?.length > 0 &&
                  preferencesData?.eye_colour.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        onChange(onValueSelect(value, item.id.toString()));
                      }}
                      key={item.id}>
                      <View
                        style={[
                          styles.chips,
                          {
                            backgroundColor: isSelected(
                              value,
                              item.id.toString(),
                            )
                              ? Colors.COLOR_5ABCEC
                              : Colors.BACKGROUND,
                            borderWidth: isSelected(value, item.id.toString())
                              ? 0
                              : 1,
                          },
                        ]}>
                        <Text
                          style={[
                            {
                              alignSelf: Alignment.CENTER,
                              fontFamily: isSelected(value, item.id.toString())
                                ? Fonts.OpenSansBold
                                : Fonts.OpenSansRegular,
                              color: isSelected(value, item.id.toString())
                                ? Colors.WHITE
                                : null,
                            },
                          ]}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            )}
            name={FormKey.eye}
          />
          <Button
            label={Strings.preference.Save}
            style={styles.Btn}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </Container>

      <BottomSheetComp
        wrapperStyle={globalStyle.wrapperStyle}
        lineStyle={{width: Value.CONSTANT_VALUE_20, backgroundColor: '#494947'}}
        isOpen={isOpen}
        setOpen={setOpen}>
        <View style={globalStyle.basicSheetContainer}>
          <TouchableOpacity style={globalStyle.formBtn}>
            <Text style={globalStyle.formText}>
              {Strings.preference.InquiryForm}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyle.heraBtn}>
            <Text style={globalStyle.heraText}>{Strings.preference.About}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyle.logoutBtn}
            onPress={() => logoutScreen()}>
            <Text style={globalStyle.logoutText}>
              {Strings.preference.Logout}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetComp>
    </>
  );
};

export default SetPreference;
