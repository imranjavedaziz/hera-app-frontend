import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useReducer} from 'react';

import Container from '../../components/Container';
import {CircleBtn} from '../../components/Header';
import Images from '../../constants/Images';
import globalStyle from '../../styles/global';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import {showAppToast} from '../../redux/actions/loader';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';
import {useDispatch} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {setPreferenceSchema} from '../../constants/schemas';
import Example from './Example';
import Range from '../DetailsPTB/Range';
import Strings, {ValidationMessages} from '../../constants/Strings';
import Dropdown from '../../components/inputs/Dropdown';
import {Static, smRoles} from '../../constants/Constants';



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
    ,
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
const onValueSelect = (data='',value)=>{
  const dataArr = data?data.split(','):[];
  const v = value.toString();
  if(dataArr.includes(v)){
    dataArr.splice(dataArr.findIndex(d=>d===v), 1);
  }
  else{
    dataArr.push(v);
  }
  console.log(dataArr);
  return dataArr.join(',');
}
const isSelected = (data,value)=>{
  return data.split(',').includes(value.toString())
}
const SetPreference = ({navigation}) => {
  const [surrogate, setSurrogate] = useState(false);
  const [donor, setDonor] = useState(false);
  const [egg, setEgg] = useState(false);
  const [state, dis] = useReducer(reducer, initialState);
  const [height, setHeight] = useState([48,84]);
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(setPreferenceSchema),
  });

  const headerComp = () => (
    <CircleBtn
      icon={Images.iconSettings}
      onPress={() => alert('Navigate settings')}
      accessibilityLabel="Cross Button, Go back"
    />
  );
  const dispatch = useDispatch();

  const mySubmit = data => {
    navigation.navigate('Landing');
  };
  return (
    <Container
      scroller={true}
      showHeader={true}
      headerComp={headerComp}
      headerEnd={true}
      >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Text style={globalStyle.screenTitle}>
          {Strings.preference.setPreference}
        </Text>
        <View
          style={{marginVertical: 20}}
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
            marginTop: 50,
          }}>
          <Text style={{marginBottom: 17}}>Who are you looking for?</Text>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <>
                {smRoles.map(role => (
                  <TouchableOpacity
                    style={{flexDirection:'row',alignItems: 'center',marginBottom: 15}}
                    key={role.id}
                    onPress={() => onChange(role.id)}>
                    <Image
                      source={
                        value === role.id
                          ? Images.iconRadiosel
                          : Images.iconRadiounsel
                      }
                    />
                    <Text style={{
                      alignItems:'center',
                      marginLeft: 10,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>{role.name}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
            name="role"
          />

        <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={Strings.preference.Location}
                data={Static.countries}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  onChange(selectedItem);
                }}
                error={errors && errors.motherEthnicity?.message}
              />
            )}
            name="location"
          />

          <Text style={{marginVertical: 5, fontSize: 14, marginTop: 10}}>
            Age Range
          </Text>
          <Controller
            control={control}
            render={({field: {onChange, value=''}}) => (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {state.age_range.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      onChange(onValueSelect(value, item.title));
                    }}
                    activeOpacity={0.8}
                    key={index}>
                    <View
                      style={{
                        height: 41,
                        width: 104,
                        borderRadius: 21,
                        backgroundColor: isSelected(value,item.title)
                          ? Colors.COLOR_5ABCEC
                          : 'white',
                        justifyContent: 'center',
                        marginRight: 10,
                        marginVertical: 10,
                        padding: 0,
                        borderWidth: isSelected(value,item.title) ? 0 : 1,
                      }}>
                      <Text
                        style={[
                          {
                            alignSelf: 'center',
                            fontWeight: isSelected(value,item.title) ? 'bold' : null,
                            color: isSelected(value,item.title) ? 'white' : null,
                          },
                        ]}>
                        {item.title} yrs
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            )}
            name="age_range"
          />
          <View style={{marginTop: 30}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 10,
              }}>
              <Text>Height</Text>
              <Text style={{fontWeight: 'bold'}}>
              <Text>
                {parseInt(height[0] / 12)}'{parseInt(height[0] % 12)}" - </Text>
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
                label={Strings.sm_set_attributes.Race}
                data={Static.race}
                onSelect={(selectedItem) => {
                  onChange(selectedItem.id);
                }}
                error={errors && errors.race_id?.message}
              />
            )}
            name="race_id"
          />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Dropdown
                label={Strings.preference.Ethnicity}
                data={Static.ethnicity}
                onSelect={(selectedItem) => {
                  onChange(selectedItem.id);
                }}
                error={errors && errors.mother_ethnicity_id?.message}
              />
            )}
            name="ethnicity_id"
          />

          <Text style={{marginVertical: 15, fontSize: 14}}>Hair Color</Text>
          <Controller
            control={control}
            render={({field: {onChange, value=''}}) => (
              <View style={{flexDirection: 'row', flexWrap: 'wrap', marginVertical:5}}>
                {Static.hairColors.map((item, index) => (
                  <TouchableOpacity
                  onPress={() => {
                    onChange(onValueSelect(value, item.id));
                  }}
                  key={index}>
                  <View
                    style={{
                      height: 41,
                      width: 91,
                      borderRadius: 21,
                      backgroundColor: isSelected(value,item.id.toString())
                        ? Colors.COLOR_5ABCEC
                        : 'white',
                      justifyContent: 'center',
                      marginRight: 9,
                      marginVertical: 5,
                      padding: 0,
                      borderWidth: isSelected(value,item.id.toString()) ? 0 : 1,
                    }}>
                    <Text
                      style={[
                        {
                          alignSelf: 'center',
                          fontWeight: isSelected(value,item.id.toString()) ? 'bold' : null,
                          color: isSelected(value,item.id.toString()) ? 'white' : null,
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
          <Text style={{marginVertical:15, fontSize: 14}}>Eye Color</Text>
          <Controller
            control={control}
            render={({field: {onChange, value=''}}) => (
              <View style={{flexDirection: 'row', flexWrap: 'wrap', marginVerticle:5, marginBottom:20}}>
                {Static.eyeColors.map((item, index) => (
                  <TouchableOpacity
                  onPress={() => {
                    onChange(onValueSelect(value, item.id));
                  }}
                  key={index}>
                  <View
                    style={{
                      height: 41,
                      width: 91,
                      borderRadius: 21,
                      backgroundColor: isSelected(value,item.id.toString())
                        ? Colors.COLOR_5ABCEC
                        : 'white',
                      justifyContent: 'center',
                      marginRight: 9,
                      marginVertical: 5,
                      padding: 0,
                      borderWidth: isSelected(value,item.id.toString()) ? 0 : 1,
                    }}>
                    <Text
                      style={[
                        {
                          alignSelf: 'center',
                          fontWeight: isSelected(value,item.id.toString()) ? 'bold' : null,
                          color: isSelected(value,item.id.toString()) ? 'white' : null,
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

          {/* <Button
            label={'get data'}
            onPress={() => {
              console.log(getValues());
            }}
          /> */}
        </View>

        <Button
          label={Strings.preference.Save}
          onPress={mySubmit}
        />
      </View>
      {/* <Button
          label={"get data"}
          onPress={console.log(getValues())}
        /> */}
    </Container>
  );
};

export default SetPreference;

// const styles = StyleSheet.create({});
