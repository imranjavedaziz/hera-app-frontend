import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';

import Container from '../../components/Container';
import {CircleBtn} from '../../components/Header';
import Images from '../../constants/Images';
import globalStyle from '../../styles/global';
import Strings from '../../constants/Strings';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';


const Profile = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [midName, setMidName] = useState('');
  const [lastName, setLastName] = useState('');
  //   const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [date, setDate] = useState(new Date());

  const [check, setCheck] = useState(true);
  const [upload, setUpload] = useState({});
  const [image, setImage] = useState(false);
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

  const validate = () => {
    return true;
  };

  const handleSubmit=()=>{
    if(validate()){
        navigation.navigate('SetPreference');
    }
  }
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconcross}
      onPress={navigation.goBack}
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
          {Strings.profile.makeAccountFor}
        </Text>
        <View
          style={{marginVertical: 20}}
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
          <FloatingLabelInput
            label={Strings.profile.FirstName}
            value={firstName}
            onChangeText={num => setFirstName(num)}
            fontWeight={'bold'}
            //  keyboardType="number-pad"
            containerStyle={{
              flex: 1,
            }}
            // fixed={true}
          />
          <FloatingLabelInput
            label={Strings.profile.MiddleName}
            value={midName}
            onChangeText={num => setMidName(num)}
            fontWeight={'bold'}
            //  keyboardType="number-pad"
            containerStyle={{
              flex: 1,
            }}
            // fixed={true}
          />
          <FloatingLabelInput
            label={Strings.profile.LastName}
            value={lastName}
            onChangeText={num => setLastName(num)}
            fontWeight={'bold'}
            //  keyboardType="number-pad"
            containerStyle={{
              flex: 1,
            }}
            // fixed={true}
          />
          <FloatingLabelInput
            label={Strings.profile.DateOfBirth}
            value={getDate()}
            fontWeight={'bold'}
            containerStyle={{
              flex: 1,
            }}
            //   fixed={true}
          />
          <View>
            <TouchableOpacity style={styles.icon} onPress={() => setOpen(true)}>
              <Image source={Images.calendar} />
            </TouchableOpacity>
          </View>
          <FloatingLabelInput
            label={Strings.profile.EmailAddress}
            value={email}
            onChangeText={num => setEmail(num)}
            fontWeight={'bold'}
            //  keyboardType="number-pad"
            containerStyle={{
              flex: 1,
            }}
            // fixed={true}
          />
          <FloatingLabelInput
            label={Strings.profile.setPassword}
            value={password}
            onChangeText={num => setPassword(num)}
            secureTextEntry={true}
            //  keyboardType="number-pad"
            containerStyle={{
              flex: 1,
            }}
            // fixed={true}
          />
          <FloatingLabelInput
            label={Strings.profile.confirmPassword}
            value={confirmPassword}
            onChangeText={num => setConfirmPassword(num)}
            secureTextEntry={true}
            containerStyle={{
              flex: 1,
            }}
            // fixed={true}
          />
        </View>
        {/* Terms Acceptance */}
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            marginVertical: 21,
          }}>
          <View style={{alignSelf: 'center'}}>
            {check ? (
              <Pressable
                onPress={() => {
                  setCheck(cur => !cur);
                }}>
                <Image source={Images.iconCheck} />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  setCheck(cur => !cur);
                }}>
                <Image source={Images.rectangleCopy} />
              </Pressable>
            )}
          </View>
          <Text style={{marginHorizontal: 10}}>
            By continuing, you agreeto HERA's Tems of use and Privacy Policy
          </Text>
        </View>
        {/* Term Acceptance closure */}

        <Button label={Strings.profile.Register} onPress={handleSubmit}/>
        <Text
          style={{
            fontWeight: 'bold',
            alignSelf: 'center',
            textDecorationLine: 'underline',
            fontSize: 15,
            marginTop: 25,
          }}>
          Register as Surrogate Mother or a Donor
        </Text>
      </View>
      <DatePicker
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
      />
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
