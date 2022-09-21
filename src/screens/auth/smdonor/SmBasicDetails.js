// SmBasicDetails
import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import Images from '../../../constants/Images';
import {CircleBtn} from '../../../components/Header';
import globalStyle from '../../../styles/global';
import Strings from '../../../constants/Strings';
import {smBasicSchema} from '../../../constants/schemas';
import Colors from '../../../constants/Colors';
import FloatingLabelInput from '../../../components/inputs/FloatingLabelInput';
import { Fonts, genders, Static } from '../../../constants/Constants';
import Dropdown from '../../../components/inputs/Dropdown';

const SmBasicDetails = ({route}) => {
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
    setValue
  } = useForm({
    resolver: yupResolver(smBasicSchema),
  });
  const onSubmit = (data)=>{
    console.log(data);
    navigation.navigate('SetPreference',{...data,...route.params});
  }
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconSettings}
      onPress={navigation.goBack}
      accessibilityLabel="Left arrow Button, Press to go back"
    />
  );
  return (
    <>
    <Container scroller={true} showHeader={true} headerEnd={true} headerComp={headerComp}>
      <View style={globalStyle.mainContainer}>
        <Text style={globalStyle.screenTitle}>{Strings.sm_basic.Title}</Text>
        <Text style={[globalStyle.screenSubTitle,{marginVertical: 20}]}>
            {Strings.sm_basic.Subtitle}
        </Text>
        <Controller
            control={control}
            render={({field: {onChange, value}}) => (
                <View style={{flexDirection: 'row',width: '100%'}}>
                {
                    genders.map(gender=>(
                        <TouchableOpacity style={{
                            flex: 0,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10,
                            justifyContent: 'flex-start',
                            marginRight: 15,
                        }} key={gender} onPress={()=>onChange(gender)}>
                            <Image style={{width: 30, resizeMode: 'cover',height: 30}} source={value===gender?Images.iconRadiosel:Images.iconRadiounsel}/>
                            <Text style={{marginLeft: 10,fontSize: 18,color: Colors.BLACK,fontFamily: Fonts.OpenSansBold}}>{gender}</Text>
                        </TouchableOpacity>
                    ))
                }
                </View>
            )}
            name="gender"
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Dropdown
                label={Strings.sm_basic.Country}
                data={Static.countries}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                    onChange(selectedItem);
                }}
                required={true}
                error={errors && errors.country?.message}
            />
            )}
            name="country"
        />
        <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.sm_basic.State}
                value={value}
                onChangeText={(v) => onChange(v)}
                error={errors && errors.state?.message}
                required={true}
              />
            )}
            name="state"
        />
        <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.sm_basic.Zip}
                value={value}
                onChangeText={(v) => onChange(v)}
                error={errors && errors.zip?.message}
                required={true}
              />
            )}
            name="zip"
        />
        <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.sm_basic.Occupation}
                value={value}
                onChangeText={(v) => onChange(v)}
                error={errors && errors.occupation?.message}
              />
            )}
            name="occupation"
        />
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <Dropdown
                label={Strings.sm_basic.SexualOrientation}
                data={Static.sexualOrient}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                    onChange(selectedItem);
                }}
                required={true}
                error={errors && errors.sexual?.message}
            />
            )}
            name="sexual"
        />
        <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.sm_basic.Bio}
                value={value}
                onChangeText={(v) => onChange(v)}
                error={errors && errors.bio?.message}
                required={true}
                fixed={true}
                multiline={true}
                numberOfLines={3}
                inputStyle={{
                    borderWidth: 1,
                    marginTop: 10,
                    borderRadius: 10,
                    padding: 10,
                    minHeight: 80,
                    textAlignVertical: 'top',
                }}
              />
            )}
            name="bio"
        />
        <Button
          label={Strings.sm_register.Btn}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Container>
    </>
  );
};
export default SmBasicDetails;
