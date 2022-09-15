import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useReducer} from 'react';

import Container from '../../components/Container';
import {CircleBtn} from '../../components/Header';
import Images from '../../constants/Images';
import globalStyle from '../../styles/global';
import Strings from '../../constants/Strings';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';


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
  const [sperm, setsperm] = useState(false);
  const [egg, setEgg] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  const SelectHair = (item, index) => {
    // console.log(item.title + ' ' + index);
    state.hair[index].flag = !state.hair[index].flag;
    console.log(state.hair);
    dispatch({
      type: 'ON_SELECT_HAIR',
      payload: state.hair,
    });
  };

  const SelectEye = (item, index) => {
    state.eye[index].flag = !state.eye[index].flag;
    console.log(state.eye);
    dispatch({
      type: 'ON_SELECT_EYE',
      payload: state.eye,
    });
  };

  const SelectAgeRange = (item, index) => {
    state.age_range[index].flag = !state.age_range[index].flag;
    console.log(state.age_range);
    dispatch({
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

  return (
    <Container
      scroller={true}
      showHeader={true}
      headerComp={headerComp}
      headerEnd={true}>
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
            flex: 0,
            width: '100%',
            // flexDirection: 'row',
            marginTop: 50,
          }}>
          <Text style={{marginBottom: 17}}>Who are you looking for?</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setSurrogate(cur => !cur)}>
              {surrogate ? (
                <Image source={Images.iconRadiounsel} />
              ) : (
                <Image source={Images.iconRadiosel} />
              )}
            </TouchableOpacity>
            <Text
              style={{
                alignSelf: 'center',
                marginLeft: 10,
                fontWeight: 'bold',
                fontSize: 16,
                marginBottom: 27,
              }}>
              Surrogate Mother
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setEgg(cur => !cur)}>
              {egg ? (
                <Image source={Images.iconRadiounsel} />
              ) : (
                <Image source={Images.iconRadiosel} />
              )}
            </TouchableOpacity>
            <Text
              style={{
                alignSelf: 'center',
                marginLeft: 10,
                fontWeight: 'bold',
                fontSize: 16,
                marginBottom: 29,
              }}>
              Egg Donor
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setsperm(cur => !cur)}>
              {sperm ? (
                <Image source={Images.iconRadiounsel} />
              ) : (
                <Image source={Images.iconRadiosel} />
              )}
            </TouchableOpacity>
            <Text
              style={{
                alignSelf: 'center',
                marginLeft: 10,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Sperm Donor
            </Text>
          </View>
          <Text style={{marginVertical: 5, fontSize: 14, marginTop: 50}}>
            Age Range
          </Text>
          <View
            style={{flexDirection: 'row', flexWrap: 'wrap', marginRight: -35}}>
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
          <Text style={{marginVertical: 5, fontSize: 14}}>Hair Color</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
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
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={{marginVertical: 5, fontSize: 14}}>Eye Color</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
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
                      backgroundColor: item.flag ? COLORS.blue : 'white',
                      justifyContent: 'center',
                      marginRight: 9,
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
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <Button label={Strings.preference.Save} onPress={() => {}} />
      </View>
    </Container>
  );
};

export default SetPreference;

// const styles = StyleSheet.create({});
