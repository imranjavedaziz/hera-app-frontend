// SmRegister
import React, {useState,useEffect} from 'react';
import {Text, TouchableOpacity, View, Image,Platform, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import Images from '../../../constants/Images';
import {CircleBtn} from '../../../components/Header';
import globalStyle from '../../../styles/global';
import Strings, {ValidationMessages} from '../../../constants/Strings';
import {smRegisterSchema,Regx} from '../../../constants/schemas';
import Colors from '../../../constants/Colors';
import FloatingLabelInput from '../../../components/FloatingLabelInput';
import { Fonts, smRoles } from '../../../constants/Constants';
import openCamera from '../../../utils/openCamera';
import { askCameraPermission } from '../../../utils/permissionManager';

const validationType = {
    LEN: 'LEN',
    ALPHA_NUM: 'ALPHA_NUM',
    SPECIAL: 'SPECIAL',
}
const pwdErrMsg = [
    {
        type: validationType.LEN,
        msg: ValidationMessages.PASSWORD_MIN,
    },
    {
        type: validationType.ALPHA_NUM,
        msg: ValidationMessages.ALPHA_NUM,
    },
    {
        type: validationType.SPECIAL,
        msg: ValidationMessages.SPECIAL_CHAR,
    },
]
const validatePassword = (value,type)=>{
    if(value){
        switch (type) {
            case validationType.LEN:
                return value.length>=8;
            case validationType.ALPHA_NUM:
                return Regx.ALPHA.test(value) && Regx.NUM.test(value);
            case validationType.SPECIAL:
                return Regx.SPECIAL_CHAR.test(value);
            default:
                break;
        }
    }
    return null;
}
const SmRegister = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [userImage,setUserImage] = useState('');
  
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
    setValue
  } = useForm({
    resolver: yupResolver(smRegisterSchema),
  });
  const cb = (image)=>{
    console.log('image',image);
    setUserImage(image.sourceURL);
  }
  useEffect(()=>askCameraPermission(),[])
  const onSubmit = data => {
    console.log(data);
    // if(!userImage){
        // TOAST
        // return;
    // }

  };
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      onPress={navigation.goBack}
      accessibilityLabel="Left arrow Button, Press to go back"
    />
  );
  return (
    <>
    <Container scroller={true} showHeader={true} headerEnd={true} headerComp={headerComp}>
      <View style={globalStyle.mainContainer}>
        <Text style={[globalStyle.screenTitle,{textAlign: 'left',width: '100%',marginBottom: 20}]}>{Strings.sm_register.Title}</Text>
        <Controller
            control={control}
            render={({field: {onChange, value}}) => (
                <>
                {
                    smRoles.map(role=>(
                        <TouchableOpacity style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10,
                            justifyContent: 'flex-start',
                            width: '100%',
                        }} key={role.id} onPress={()=>onChange(role.id)}>
                            <Image style={{width: 30, resizeMode: 'cover',height: 30}} source={value===role.id?Images.iconRadiosel:Images.iconRadiounsel}/>
                            <Text style={{marginLeft: 10,fontSize: 23,color: Colors.BLACK,fontFamily: Fonts.OpenSansBold}}>{role.name}</Text>
                        </TouchableOpacity>
                    ))
                }
                </>
            )}
            name="role"
        />
        <View style={{alignItems: 'flex-start',width: '100%',marginTop: 20}}>
                <ImageBackground
                    source={userImage?{uri: userImage}:null}
                    style={{
                        width: 140,
                        height: 140,
                        borderRadius: 70,
                        backgroundColor: Colors.GREEN,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    imageStyle={{
                        borderRadius: 70,
                        overflow: 'hidden',
                        resizeMode: 'cover',
                    }}
                >
                    <TouchableOpacity style={[{
                        width: 35,
                        height: 35,
                        borderRadius: 18,
                        backgroundColor: Colors.GREEN,
                        alignItems: 'center',
                        justifyContent: 'center',
                    },userImage?{
                        position: 'absolute',
                        bottom: 0,
                        right: 20,
                    }:null]} onPress={()=>openCamera(1,cb)}>
                        <Image source={Images.camera} style={{width: 20,height: 20,resizeMode: 'contain'}}/>
                    </TouchableOpacity>
                </ImageBackground>
        </View>
        <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.sm_register.FirstName}
                value={value}
                onChangeText={(v) => onChange(v)}
                error={errors && errors.first_name?.message}
                required={true}
              />
            )}
            name="first_name"
        />
        <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.sm_register.MiddleName}
                value={value}
                onChangeText={(v) => onChange(v)}
                error={errors && errors.middle_name?.message}
              />
            )}
            name="middle_name"
        />
        <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.sm_register.LastName}
                value={value}
                onChangeText={(v) => onChange(v)}
                error={errors && errors.last_name?.message}
                required={true}
              />
            )}
            name="last_name"
        />
        <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.sm_register.DOB}
                value={value}
                onChangeText={(v) => onChange(v)}
                error={errors && errors.dob?.message}
                required={true}
                endComponent={()=>(
                    <TouchableOpacity onPress={()=>setShow(true)}>
                      <Image source={Images.calendar}/>
                    </TouchableOpacity>
                )}
                editable={false}
                onPressIn={()=>setShow(true)}
              />
            )}
            name="dob"
        />
        <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.sm_register.email}
                value={value}
                onChangeText={(v) => onChange(v)}
                error={errors && errors.email?.message}
                required={true}
              />
            )}
            name="email"
        />
        <Controller
            control={control}
            render={({field: {onChange, value}}) => (
            <View style={{
                width: '100%',
                marginVertical: 20,
            }}>
                <FloatingLabelInput
                    label={Strings.sm_register.Password}
                    value={value}
                    onChangeText={(v) => onChange(v)}
                    error={errors && errors.password?.message}
                    required={true}
                    containerStyle={{
                        marginVertical: 0,
                        marginBottom: 5,
                    }}
                />
                {
                    pwdErrMsg.map(msg=>(
                        <View style={{flexDirection: 'row',alignItems: 'center'}} key={msg.type}>
                            <Text style={{fontSize: 13,fontFamily: Fonts.OpenSansBold,color: (validatePassword(value,msg.type) || validatePassword(value,msg.type)===null)?Colors.BLACK:'red'}}>{msg.msg}</Text>
                            {
                                validatePassword(value,msg.type)!==null && <Image style={{tintColor: validatePassword(value,msg.type)?Colors.BLACK:'red',marginLeft: 5}} source={validatePassword(value,msg.type)?Images.path:Images.information}/>
                            }
                        </View>
                    ))
                }
            </View>
            )}
            name="password"
        />
        <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.sm_register.Confirm}
                value={value}
                onChangeText={(v) => onChange(v)}
                error={errors && errors.confirm_password?.message}
                required={true}
              />
            )}
            name="confirm_password"
        />
        <Button
          label={Strings.sm_register.Btn}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Container>
    <DateTimePickerModal
        value={date}
        isVisible={show}
        mode={'date'}
        onConfirm={(selectedDate)=>{
            setShow(false);
            setValue('dob',moment(selectedDate).calendar());
            setDate(selectedDate);
        }}
        onCancel={()=>{
            setShow(false);
        }}
        display={Platform.OS==='ios'?'spinner':'default'}
        positiveButtonLabel='DONE'
    />
    </>
  );
};
export default SmRegister;
