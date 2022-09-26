import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
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
import {setPreferenceSchema} from '../../../constants/schemas';
import Range from '../../../components/RangeSlider';
import Strings, {ValidationMessages} from '../../../constants/Strings';
import Dropdown from '../../../components/inputs/Dropdown';
import {genders, Static, Routes} from '../../../constants/Constants';
import style from '../Stylepreference';
import BottomSheetComp from '../../../components/BottomSheet';
import {Value} from '../../../constants/FixedValues';
import styles from './Styles';

const initialState = {
  hair: [
    {title: 'Black', flag: false},
    {title: 'Brown', flag: false},
    {title: 'Brunette', flag: false},
    {title: 'Blonde', flag: false},
    {title: 'Ginger', flag: false},
  ],
  eye: [
    {title: 'Amber', flag: false},
    {title: 'Blue', flag: false},
    {title: 'Green', flag: false},
    {title: 'Hazel', flag: false},
    {title: 'Brown', flag: false},
  ],
  age_range: [
    {title: '21-28', flag: false},
    {title: '28-35', flag: false},
    {title: '35-40', flag: false},
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ON_SELECT_HAIR':
      return {...state, ...action.payload};

    case 'ON_SELECT_EYE':
      return {...state, ...action.payload};

    case 'ON_SELECT_AGE':
      return {...state, ...action.payload};

    default:
      return state;
  }
}

const SetPreference = ({navigation}) => {
  const [surrogate, setSurrogate] = useState(false);
  const [donor, setDonor] = useState(false);
  const [egg, setEgg] = useState(false);
  const [state, dis] = useReducer(reducer, initialState);
  const [height, setHeight] = useState([58, 84]);
  const [isOpen, setOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(setPreferenceSchema),
  });

  // React.useEffect(() => {
  //   // if (!isValid) {
  //   //   const e = errors;
  //   //   console.log('errors-',errors);
  //   //   const messages = [];
  //   //   Object.keys(errors).forEach(k => messages.push(e[k].message || ''));
  //   //   const msg = messages.join('\n').trim();
  //   //   if(msg){
  //   //     console.log("----->",messages.length)
  //   //   dispatch(showAppToast(false,"Please provide all the mandatory details."));
  //   //   }

  //   // }
  // }, [errors, isValid]);

  const onSubmit = data => {
    console.log(data);
    if (surrogate == false && donor == false && egg == false) {
      dispatch(showAppToast(true, ValidationMessages.SELECT_LOOKING));
      return;
    }
    let hc = 0;
    state.hair.map(i => {
      if (i.flag === false) {
        hc++;
        console.log(hc);
      }
      if (hc === 5) {
        dispatch(showAppToast(true, ValidationMessages.SELECT_HAIR));
        return;
      }
    });
    let ec = 0;
    state.eye.map(i => {
      if (i.flag === false) {
        ec++;
      }
      if (ec === 5) {
        dispatch(showAppToast(true, ValidationMessages.SELECT_EYE));
        return;
      }
      if (hc !== 5 && ec !== 5) {
        navigation.navigate(Routes.Landing);
      }
    });
  };

  const SelectHair = (item, index) => {
    state.hair[index].flag = !state.hair[index].flag;
    console.log(state.hair);
    dis({
      type: 'ON_SELECT_HAIR',
      payload: state.hair,
    });
  };

  const SelectEye = (item, index) => {
    state.eye[index].flag = !state.eye[index].flag;
    console.log(state.eye);
    dis({
      type: 'ON_SELECT_EYE',
      payload: state.eye,
    });
  };

  const SelectAgeRange = (item, index) => {
    state.age_range[index].flag = !state.age_range[index].flag;
    console.log(state.age_range);
    dis({
      type: 'ON_SELECT_AGE',
      payload: state.age_range,
    });
  };

  const headerComp = () => (
    <CircleBtn
      icon={Images.iconSettings}
      onPress={() => setOpen(true)}
      accessibilityLabel="Cross Button, Go back"
    />
  );

  const dispatch = useDispatch();

  return (
    <>
      <Container
        scroller={true}
        showHeader={true}
        headerComp={headerComp}
        headerEnd={true}
        safeAreViewStyle={
          isOpen === true ? globalStyle.modalColor : globalStyle.safeViewStyle
        }>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Text style={globalStyle.screenTitle}>
            {Strings.preference.setPreference}
          </Text>
          <View
            style={{marginVertical: Value.CONSTANT_VALUE_20}}
            accessible={true}
            accessibilityLabel={`${Strings.preference.filter}`}>
            <Text
              style={globalStyle.screenSubTitle}
              numberOfLines={2}
              accessible={false}>
              {Strings.preference.filter}
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              marginTop: Value.CONSTANT_VALUE_50,
            }}>
            <Text style={{marginBottom: Value.CONSTANT_VALUE_17}}>
              Who are you looking for?
              <Text style={{color: 'red', fontSize: Value.CONSTANT_VALUE_18}}>
                *
              </Text>
            </Text>
            {/* <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={style.radioContainer}>
                {genders.map(gender => (
                  <TouchableOpacity
                    style={style.radioBtn}
                    key={gender}
                    onPress={() => onChange(gender)}>
                    <Image
                      style={style.radioImg}
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
          /> */}
            <View>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                activeOpacity={1}
                onPress={() => setSurrogate(cur => !cur)}>
                {surrogate ? (
                  <Image source={Images.iconRadiosel} />
                ) : (
                  <Image source={Images.iconRadiounsel} />
                )}
                <Text style={styles.lookingsm}>Surrogate Mother</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                activeOpacity={1}
                onPress={() => setEgg(cur => !cur)}>
                {egg ? (
                  <Image source={Images.iconRadiosel} />
                ) : (
                  <Image source={Images.iconRadiounsel} />
                )}
                <Text style={styles.lookingDonor}>Egg Donor</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.SDonorContainer}
                activeOpacity={1}
                onPress={() => setDonor(cur => !cur)}>
                {donor ? (
                  <Image source={Images.iconRadiosel} />
                ) : (
                  <Image source={Images.iconRadiounsel} />
                )}
                <Text style={styles.lookingsDonor}>Sperm Donor</Text>
              </TouchableOpacity>
            </View>

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
                  // error={errors && errors.location?.message}
                />
              )}
              name="location"
            />

            <Text style={styles.ageText}>{Strings.preference.AgeRange}</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {state.age_range.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => SelectAgeRange(item, index)}
                    activeOpacity={0.8}
                    key={index}>
                    <View
                      style={[
                        styles.ageRangeChip,
                        {
                          backgroundColor: item.flag
                            ? Colors.COLOR_5ABCEC
                            : 'white',
                          borderWidth: item.flag ? 0 : 1,
                        },
                      ]}>
                      <Text
                        style={[
                          {
                            alignSelf: 'center',
                            fontWeight: item.flag ? 'bold' : null,
                            color: item.flag ? 'white' : null,
                          },
                        ]}>
                        {item.title} yrs
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={{marginTop: Value.CONSTANT_VALUE_30}}>
              <View style={styles.heightContainer}>
                <Text>
                  {Strings.preference.Height}{' '}
                  <Text style={styles.heightText}>*</Text>
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                  <Text>
                    {parseInt(height[0] / 12)}'{parseInt(height[0] % 12)}" -{' '}
                  </Text>
                  <Text>
                    {parseInt(height[1] / 12)}'{parseInt(height[1] % 12)}"
                  </Text>
                </Text>
              </View>
              <Range value={height} setValue={setHeight} />
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
                  required={true}
                  error={errors && errors.ethnicity?.message}
                />
              )}
              name="ethnicity"
            />

            <Text style={styles.chipText}>
              {Strings.preference.HairColor}
              <Text style={styles.chipsRequiredText}>*</Text>
            </Text>
            <View style={styles.hairContainer}>
              {state.hair.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => SelectHair(item, index)}
                    key={index}>
                    <View
                      style={[
                        styles.chips,
                        {
                          backgroundColor: item.flag
                            ? Colors.COLOR_5ABCEC
                            : 'white',
                          borderWidth: item.flag ? 0 : 1,
                        },
                      ]}>
                      <Text
                        style={[
                          {
                            alignSelf: 'center',
                            fontWeight: item.flag ? 'bold' : null,
                            color: item.flag ? 'white' : null,
                          },
                        ]}>
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={styles.chipText}>
              Eye Color<Text style={styles.chipsRequiredText}>*</Text>
            </Text>
            <View style={styles.eyeContainer}>
              {state.eye.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => SelectEye(item, index)}
                    key={index}>
                    <View
                      style={[
                        styles.chips,
                        {
                          backgroundColor: item.flag
                            ? Colors.COLOR_5ABCEC
                            : 'white',
                          borderWidth: item.flag ? 0 : 1,
                        },
                      ]}>
                      <Text
                        style={[
                          {
                            alignSelf: 'center',
                            fontWeight: item.flag ? 'bold' : null,
                            color: item.flag ? 'white' : null,
                          },
                        ]}>
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <Button
            label={Strings.preference.Save}
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
