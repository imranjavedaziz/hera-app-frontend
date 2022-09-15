import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';
import {showAppToast} from '../../redux/actions/loader';
import DatePicker from 'react-native-date-picker';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Container from '../../components/Container';
import {CircleBtn} from '../../components/Header';
import Images from '../../constants/Images';
import globalStyle from '../../styles/global';
import Strings from '../../constants/Strings';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';
import {parentRegisterSchema} from '../../constants/schemas';

const Profile = ({navigation}) => {
  const [date, setDate] = useState();

  const [check, setCheck] = useState(true);
  const [upload, setUpload] = useState({});
  const [image, setImage] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
    getValues,
  } = useForm({
    resolver: yupResolver(parentRegisterSchema),
  });

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
      console.log(image.path)
        setUpload(image);
        setImage(true);
      })
  };

  const getDate = () => {
    let tempDate = date.toString().split(' ');
    return date !== '' ? ` ${tempDate[1]} ${tempDate[2]}, ${tempDate[3]}` : '';
  };

  useEffect(() => {
    if (!isValid) {
      const e = errors;
      console.log('errors-', errors);
      const messages = [];
      Object.keys(errors).forEach(k => messages.push(e[k].message || ''));
      const msg = messages.join('\n').trim();
      if (msg) dispatch(showAppToast(true, msg));
    }
  }, [errors, isValid]);
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      onPress={navigation.goBack}
      accessibilityLabel="Cross Button, Go back"
    />
  );
  const onSubmit = (data) => {
    console.log(data)
    if(!image){
      dispatch(showAppToast(true,"Please Upload Images"))
      return 
    }
    if(check){
      dispatch(showAppToast(true,"Please Accept Terms And Conditions"))
      return 
    }
    navigation.navigate('SetPreference');
  
  };

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
          {Strings.profile.makeAccountFor}
        </Text>
        <View
          style={{marginVertical: 20,}}
          accessible={true}
          accessibilityLabel={`${Strings.profile.parentToBe}`}>
          <Text
            style={globalStyle.screenSubTitle}
            numberOfLines={2}
            accessible={false}>
            {Strings.profile.parentToBe}
          </Text>

          {/* IMage Upload */}

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 25,
              // borderWidth:1
            }}>
            {image ? (
              <TouchableOpacity onPress={selectImage}>
                <Image
                
                  source={{uri: upload.path}}
                  resizeMode={'cover'}
                  style={styles.profileImg}
                />
                <Image source={Images.iconcam} style={styles.profileCamIcon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.profileImg}
                activeOpacity={0.7}
                onPress={selectImage}>
                <Image style={{}} source={Images.iconcam} />
              </TouchableOpacity>
            )}

            <Text style={{marginTop: 11, fontSize: 16, lineHeight: 21}}>
              Upload Display Picture<Text style={{color: 'red'}}>*</Text>
            </Text>
          </View>
        </View>

        {/* Image Upload End  */}

        <View
          style={{
            flex: 0,
            width: '100%',
            // flexDirection: 'row',
          }}>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.profile.FirstName}
                value={value}
                onChangeText={v => onChange(v)}
                fontWeight={'bold'}
                required={true}
                error={errors && errors.first_name?.message}
                //  keyboardType="number-pad"
                containerStyle={{
                  flex: 1,
                }}
                // fixed={true}
              />
            )}
            name="first_name"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.profile.MiddleName}
                value={value}
                onChangeText={v => onChange(v)}
                fontWeight={'bold'}
                // error={'this is'}
                //  keyboardType="number-pad"
                containerStyle={{
                  flex: 1,
                }}
                // fixed={true}
              />
            )}
            name="middle_name"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.profile.LastName}
                value={value}
                onChangeText={v => onChange(v)}
                fontWeight={'bold'}
                required={true}
                //  keyboardType="number-pad"
                containerStyle={{
                  flex: 1,
                }}
                error={errors && errors.last_name?.message}
                // fixed={true}
              />
            )}
            name="last_name"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.profile.DateOfBirth}
                value={value}
                fontWeight={'bold'}
                required={true}
                containerStyle={{
                  flex: 1,
                }}
                endComponent={() => (
                  <TouchableOpacity onPress={() => setOpen(true)}>
                    <Image source={Images.calendar} />
                  </TouchableOpacity>
                )}
                error={errors && errors.date_of_birth?.message}
                //   fixed={true}
              />
            )}
            name="date_of_birth"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.profile.EmailAddress}
                value={value}
                onChangeText={v => onChange(v)}
                fontWeight={'bold'}
                required={true}
                error={errors && errors.email?.message}
                //  keyboardType="number-pad"
                containerStyle={{
                  flex: 1,
                }}
                // fixed={true}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <View
                style={{
                  width: '100%',
                  marginVertical: 20,
                }}>
                <FloatingLabelInput
                  label={Strings.profile.setPassword}
                  value={value}
                  onChangeText={v => onChange(v)}
                  required={true}
                  secureTextEntry={true}
                  //  keyboardType="number-pad"
                  containerStyle={{
                    marginVertical: 0,
                  }}
                  error={errors && errors.set_password?.message}
                  // required={true}
                  // fixed={true}
                />
                <Text>Must have minimum 8 characters</Text>
                {/* {(errors.set_password )
                  <Image source={Images.path} />
                 } */}
                <Text>Must be Alphanumeric</Text>
                <Text>Must have atleast 1 special character</Text>
              </View>
            )}
            name="set_password"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FloatingLabelInput
                label={Strings.profile.confirmPassword}
                value={value}
                onChangeText={v => onChange(v)}
                required={true}
                secureTextEntry={true}
                error={errors && errors.confirm_password?.message}
                containerStyle={{
                  flex: 1,
                }}
                // fixed={true}
              />
            )}
            name="confirm_password"
          />
          <View
          style={{
            flexDirection: 'row',
            // marginLeft: 5,
            marginVertical: 21,
            // marginRight:-20,
          }}>
          <View style={{alignSelf: 'center'}}>
            {check ? (
              <Pressable
                onPress={() => {
                  setCheck(cur => !cur);
                }}>
                <Image source={Images.rectangleCopy} />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  setCheck(cur => !cur);
                }}>
                <Image source={Images.iconCheck} />
              </Pressable>
            )}
          </View>
          <Text style={{marginHorizontal:10, fontSize:13}}>
            By continuing, you agree to HERA's<Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>Terms of Use</Text>
            and
            <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
            Privacy Policy
            </Text>
          </Text>
        </View>
        </View>
        {/* Terms Acceptance */}
        
        {/* Term Acceptance closure */}

        <Button
          label={Strings.profile.Register}
          onPress={handleSubmit(onSubmit)}
        />
        <Pressable onPress={()=>{}}>
        <Text
          style={{
            fontWeight: 'bold',
            alignSelf: 'center',
            textDecorationLine: 'underline',
            fontSize: 15,
            marginTop: 25,
          }}>
          Register as Surrogate Mother or a Donor
        </Text></Pressable>
      </View>
      {/* <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          console.log(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      /> */}
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileImg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 138,
    width: 138,
    borderRadius: 68,
    backgroundColor: Colors.GREEN,
  },
  profileCamIcon: {
    position: 'absolute',
    left: 100,
    bottom: 2,
  },
  icon: {
    position: 'absolute',
    right: 20,
    bottom: 40,
  },
});
