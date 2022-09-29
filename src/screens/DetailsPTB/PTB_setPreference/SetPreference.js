import {Text, View, Image, TouchableOpacity, Pressable} from 'react-native';
import React, {useState, useReducer} from 'react';

import Container from '../../../components/Container';
import {CircleBtn} from '../../../components/Header';
import Images from '../../../constants/Images';
import globalStyle from '../../../styles/global';
import {showAppToast} from '../../../redux/actions/loader';
import Colors from '../../../constants/Colors';
import Button from '../../../components/Button';
import {useDispatch} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { setPreferenceSchema} from "../../../constants/schemas";
import Range from '../../../components/RangeSlider';
import Strings, {ValidationMessages} from '../../../constants/Strings';
import Dropdown from '../../../components/inputs/Dropdown';
import {
  genders,
  Static,
  Routes,
  lookingFor,
} from '../../../constants/Constants';
import BottomSheetComp from '../../../components/BottomSheet';
import {Value} from '../../../constants/FixedValues';
import styles from './Styles';
import Alignment from '../../../constants/Alignment';

const onValueSelect = (data = '', value) => {
  const dataArr = data ? data.split(',') : [];
  const v = value.toString();
  if (dataArr.includes(v)) {
    dataArr.splice(
      dataArr.findIndex(d => d === v),
      1,
    );
  } else {
    dataArr.push(v);
  }
  console.log(dataArr);
  return dataArr.join(',');
};
const isSelected = (data, value) => {
  return data.split(',').includes(value.toString());
};
const SetPreference = ({navigation}) => {
  const [height, setHeight] = useState([58, 84]);
  const [isOpen, setOpen] = useState(false);
  const ageRange = Static.ageRange;
  const eyeColor = Static.eyeColors;
  const hairColor = Static.hairColors;
  const dispatch = useDispatch();


  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(setPreferenceSchema),
  });

  React.useEffect(() => {
    if (!isValid) {
      const e = errors;
      const messages = [];
      Object.keys(errors).forEach(k => messages.push(e[k].message || ''));
      const msg = messages.join('\n').trim();
      if(msg)dispatch(showAppToast(true,msg));
    }
  }, [errors, isValid]);


  const onSubmit = data => {
    setValue('height', height.toString())
    console.log(data);
    navigation.navigate(Routes.PtbDashboard)
    
  };

  const headerComp = () => (
    <Pressable onPress={() => setOpen(true)}>
      <Text style={styles.headerTxt}> Cancel</Text>
    </Pressable>
  );


  return (
    <>
      <Container
        scroller={true}
        showHeader={true}
        headerComp={headerComp}
        headerEnd={true}
        safeAreViewStyle={
          isOpen === true ? globalStyle.modalColor : globalStyle.safeViewStyle
        }
        style={{paddingBottom:Value.CONSTANT_VALUE_50}}>
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
            <Text style={{marginBottom: Value.CONSTANT_VALUE_17}}>
              {Strings.preference.lookingFor}
            </Text>

            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <View style={{}}>
                  {lookingFor.map(whom => (
                    <TouchableOpacity
                      style={styles.flexRow}
                      key={whom.id}
                      activeOpacity={1}
                      onPress={() => onChange(whom.id)}>
                      <Image
                        style={{}}
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
              name="looking"
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
                />
              )}
              name="location"
            />
            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <Dropdown
                  label={Strings.preference.Education}
                  data={Static.education}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    onChange(selectedItem);
                  }}
                  required={true}
                />
              )}
              name="education"
            />

            <Text style={styles.ageText}>{Strings.preference.AgeRange}</Text>

            <Controller
              control={control}
              render={({field: {onChange, value = ''}}) => (
                <View style={styles.ageContainer}>
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
                                : Colors.WHITE,
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
                </View>
              )}
              name="age_range"
            />

            <View style={{marginTop: Value.CONSTANT_VALUE_25}}>
              <View style={styles.heightContainer}>
                <Text>
                  {Strings.preference.Height}{' '}
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
              <Range value={height}   setValue={setHeight} 
               
               />
               
           
              )}
              name="height"
            />
            </View>

            {/* Drop Down */}

            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <Dropdown
                  label={Strings.preference.Race}
                  data={Static.race}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    onChange(selectedItem);
                  }}
                  required={true}
                  // error={errors && errors.race?.message}
                />
              )}
              name="race"
            />

            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <Dropdown
                  label={Strings.preference.Ethnicity}
                  data={Static.ethnicity}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    onChange(selectedItem);
                  }}
                  error={errors && errors.ethnicity?.message}
                />
              )}
              name="ethnicity"
            />

            <Text style={styles.chipText}>
              {Strings.preference.HairColor}
              <Text style={styles.chipsRequiredText}>*</Text>
            </Text>

            <Controller
              control={control}
              render={({field: {onChange, value = ''}}) => (
                <View style={styles.hairContainer}>
                  {hairColor.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        onChange(onValueSelect(value, item.id));
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
                              : Colors.WHITE,
                            borderWidth: isSelected(value, item.id.toString())
                              ? 0
                              : 1,
                          },
                        ]}>
                        <Text
                          style={[
                            {
                              alignSelf: Alignment.CENTER,
                              fontWeight: isSelected(value, item.id.toString())
                                ? Alignment.BOLD
                                : null,
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
              name="hair"
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
                {eyeColor.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      onChange(onValueSelect(value, item.id));
                    }}
                    key={item.id}>
                    <View
                      style={[
                        styles.chips,
                        {
                          backgroundColor: isSelected(value, item.id.toString())
                            ? Colors.COLOR_5ABCEC
                            : Colors.WHITE,
                          borderWidth: isSelected(value, item.id.toString())
                            ? 0
                            : 1,
                        },
                      ]}>
                      <Text
                        style={[
                          {
                            alignSelf: Alignment.CENTER,
                            fontWeight: isSelected(value, item.id.toString())
                              ? Alignment.BOLD
                              : null,
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
            name="eye"
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
          <TouchableOpacity style={globalStyle.logoutBtn}>
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