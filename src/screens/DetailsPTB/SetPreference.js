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
import {Static} from '../../constants/Constants';



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

  const SelectHair = (item, index) => {
    // console.log(item.title + ' ' + index);
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
      onPress={() => alert('Navigate settings')}
      accessibilityLabel="Cross Button, Go back"
    />
  );

  const ethnicity = [
    {
      label: 'Ethnicity',
    },
    {
      label: 'Alaska Native',
    },
    {
      label: 'Ethnicity-1',
    },
    {
      label: 'Ethnicity-2',
    },
    {
      label: 'Ethnicity-2',
    },
  ];

  const race = [
    {
      label: 'White',
    },
    {
      label: 'Black or African American',
    },
    {
      label: 'American Indian or Alaska Native',
    },
    {
      label: 'Asian',
    },
    {
      label: 'Native Hawaiian or Other Pacific Islander',
    },
    {
      label: 'Mixed Or Other Race',
    },
  ];

  const location = [
    {
      label: 'India',
    },
    {
      label: 'Alaska',
    },
    {
      label: 'America',
    },
    {
      label: 'Europe',
    },
  ];

  // useEffect(() => {

  // }, [errors, isValid]);
  const dispatch = useDispatch();

  const mySubmit = data => {
    const race =  getValues('race')
    console.log(race);
    if(surrogate == false && donor == false && egg== false ){
      dispatch(showAppToast(true,ValidationMessages.SELECT_LOOKING ));
      return;
    }
    if(race == undefined){
      dispatch(showAppToast(true,ValidationMessages.RACE ));
      return;
    }
    let hc = 0;
    state.hair.map(i=>{
      if(i.flag === false){
        hc++;
        console.log(hc)
      }
      if(hc === 5){
        dispatch(showAppToast(true,ValidationMessages.SELECT_HAIR ));
      return;
      }
    })
    let ec = 0;
    state.eye.map(i=>{
      if(i.flag === false){
        ec++;
        console.log(ec)
      }
      if(ec === 5){
        dispatch(showAppToast(true,ValidationMessages.SELECT_EYE ));
      return;
      }
    })
    navigation.navigate('Landing');
  
  };
  return (
    <Container
      scroller={true}
      showHeader={true}
      headerComp={headerComp}
      headerEnd={true}
      // style={{ borderWidth:1}}
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
          <View >

            <TouchableOpacity style={{flexDirection:'row',}}
              activeOpacity={1}
              onPress={() => setSurrogate(cur => !cur)}>
              {surrogate ? (
                <Image source={Images.iconRadiosel}/>
              ) : (
                <Image source={Images.iconRadiounsel}/>
                 
              )}
               <Text
              style={{
                alignItems:'center',
                marginLeft: 10,
                fontWeight: 'bold',
                fontSize: 16,
                marginBottom: 27,
              }}>
              Surrogate Mother
            </Text>
            </TouchableOpacity>
           
          </View>
          <View >
            <TouchableOpacity style={{flexDirection: 'row', }}
              activeOpacity={1}
              onPress={() => setEgg(cur => !cur)}>
              {egg ? (
                <Image source={Images.iconRadiosel} />
              ) : (
                <Image source={Images.iconRadiounsel} />
                
              )}
              <Text
              style={{
                marginLeft: 10,
                fontWeight: 'bold',
                fontSize: 16,
                marginBottom: 29,
              }}>
              Egg Donor
              </Text>
            </TouchableOpacity>
            
           
          </View>
          <View >
            <TouchableOpacity style={{flexDirection: 'row', alignItems:'center'}}
              activeOpacity={1}
              onPress={() => setDonor(cur => !cur)}>
              {donor ? (
                <Image source={Images.iconRadiosel} />
              ) : (
                <Image source={Images.iconRadiounsel} />
                
              )}
               <Text
              style={{
                marginLeft: 10,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Sperm Donor
            </Text>
            </TouchableOpacity>
          </View>

          {/* <Example
            options={location}
            label={Strings.preference.Location}
            control={control}
            name={'location'}
            setValue={setValue}
          /> */}

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
                // required={true}
                error={errors && errors.motherEthnicity?.message}
              />
            )}
            name="location"
          />







          <Text style={{marginVertical: 5, fontSize: 14, marginTop: 10}}>
            Age Range
          </Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {state.age_range.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => SelectAgeRange(item, index)}
                  activeOpacity={0.8}
                  key={index}>
                  <View
                    style={{
                      height: 41,
                      width: 104,
                      borderRadius: 21,
                      backgroundColor: item.flag
                        ? Colors.COLOR_5ABCEC
                        : 'white',
                      justifyContent: 'center',
                      marginRight: 10,
                      marginVertical: 10,
                      padding: 0,
                      borderWidth: item.flag ? 0 : 1,
                    }}>
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

          <Example
            options={race}
            label={Strings.preference.Race}
            control={control}
            name={'race'}
            setValue={setValue}
          />
          <Example
            options={ethnicity}
            label={Strings.preference.Ethnicity}
            control={control}
            name={'Ethnicity'}
            setValue={setValue}
          />

          <Text style={{marginVertical: 15, fontSize: 14}}>Hair Color</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginVertical:5}}>
            {state.hair.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => SelectHair(item, index)}
                  key={index}>
                  <View
                    style={{
                      height: 41,
                      width: 91,
                      borderRadius: 21,
                      backgroundColor: item.flag
                        ? Colors.COLOR_5ABCEC
                        : 'white',
                      justifyContent: 'center',
                      marginRight: 9,
                      marginVertical: 5,
                      padding: 0,
                      borderWidth: item.flag ? 0 : 1,
                    }}>
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
          <Text style={{marginVertical:15, fontSize: 14}}>Eye Color</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginVerticle:5, marginBottom:20}}>
            {state.eye.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => SelectEye(item, index)}
                  key={index}>
                  <View
                    style={{
                      height: 41,
                      width: 91,
                      borderRadius: 21,
                      backgroundColor: item.flag
                        ? Colors.COLOR_5ABCEC
                        : 'white',
                      justifyContent: 'center',
                      marginRight: 9,
                      marginVertical: 5,
                      padding: 0,
                      borderWidth: item.flag ? 0 : 1,
                    }}>
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
