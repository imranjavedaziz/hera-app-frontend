import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Pressable,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';

import COLORS from '../../styles/colors';
import {IMAGES} from '../../utils/Images';
import HeaderComp from '../../components/HeaderComp';
import TextInputComp from '../../components/TextInput';
import Btn from '../../components/Btn';

const Profile = ({navigation}) => {
  const [check, setCheck] = useState(true);
  const [upload, setUpload] = useState({});
  const [image, setImage] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setUpload(image);
        setImage(true);
      })
      .then(console.log(upload));
    console.log('Worked');
  };

  const getDate = () => {
    let tempDate = date.toString().split(' ');
    return date !== '' ? ` ${tempDate[1]} ${tempDate[2]}, ${tempDate[3]}` : '';
  };

  const validate=()=>{
    if(true){
      return  navigation.navigate('SetPreference')
    }
    alert('validate your conditions')
  }

  return (
    <ScrollView style={{marginBottom: 0}} keyboardShouldPersistTaps="handled">
      <HeaderComp
        header="make account for"
        subHeader="Parent To Be"
        isRight={true}
        onRight={() => alert('close')}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 50,
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
            <Image source={IMAGES.CAM_ICON} style={styles.profileCamIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.profileImg}
            activeOpacity={0.7}
            onPress={selectImage}>
            <Image style={{}} source={IMAGES.CAM_ICON} />
          </TouchableOpacity>
        )}

        <Text style={{marginTop: 11, fontSize: 16, lineHeight: 21,}}>
          Upload Display Picture<Text style={{color: 'red'}}>*</Text>
        </Text>
      </View>

      <View>
        <TextInputComp title="First Name" must={true} />
        <TextInputComp title="Middle Name (Optional)" />
        <TextInputComp title="Last Name" must={true} />
        <TextInputComp
          title="Date of Birth"
          must={true}
          icon={IMAGES.CALENDAR}
          onIconPress={() => setOpen(true)}
          input={getDate()}
          value={true}
        />
        <TextInputComp title="Email Address" must={true} />
        <TextInputComp
          title="Set Password"
          isPassword={true}
          setPassword={true}
          must={true}
        />
        <TextInputComp title="Confirm Password" isPassword={true} must={true} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 40,
          marginTop: -24,
        }}>
        <View style={{alignSelf: 'center'}}>
          {check ? (
            <Pressable
              onPress={() => {
                setCheck(cur => !cur);
              }}>
              <Image
                source={require('../../../assets/images/group/group.png')}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                setCheck(cur => !cur);
              }}>
              <Image source={IMAGES.CHECKBOX_UNCHECK} />
            </Pressable>
          )}
        </View>
        <Text style={{marginHorizontal: 10}}>
          By continuing, you agreeto HERA's Tems of use and Privacy Policy
        </Text>
      </View>

      <Btn
        title="register"
        onClick={validate}
        styleContainer={{marginTop: 46}}
      />

      <Text
        style={{
          fontWeight: 'bold',
          alignSelf: 'center',
          textDecorationLine: 'underline',
          fontSize: 15,
          marginTop: 40,
          // opacity: 0.7,
          marginBottom: 108,
        }}>
        Register as Surrogate Mother or a Donor
      </Text>

      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          // console.log(date);
          setOpen(false);
        }}
      />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileImg: {
    // alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 138,
    width: 138,
    borderRadius: 68,
    backgroundColor: COLORS.green,
    // opacity: 0.7,
  },
  profileCamIcon: {
    // height: 35,
    // width: 35,
    position:'absolute',
    left: 100,
    // top:40,
    // right:30,
    bottom: 2,
    // borderWidth:2,
    
  },
});
