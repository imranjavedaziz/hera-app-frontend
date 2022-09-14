import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
//   import IMAGES from '../utils/Images';

import HeaderComp from '../../components/HeaderComp';
import Btn from '../../components/Btn';
import TextInput from '../../components/TextInput';

const AccountVerification = ({navigation}) => {
  const [bgMobile, setbgMobile] = React.useState(false);
  const [bgCode, setbgCode] = React.useState(false);

  return (
    // <View style={{marginTop:50}}>
    //     <TextInput title='Mobile Number'/>
    // </View>
    <View style={{marginTop: 0}}>
      <View style={{marginBottom: 40}}>
        <HeaderComp
          header="account verification"
          subHeader="Before we proceed, please verify your number"
          subHeaderStyle={{paddingHorizontal: 25}}
          isRight="true"
          onRight={() => alert('close')}
        />
      </View>

      <View
        style={{
          //   padding: 10,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          //   paddingHorizontal: 40,
          //   marginTop: 40,
          borderWidth: 1,
        }}>
        <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', height: 50, width: 60,}}>
          <Text>Code</Text>
          <TextInput
            style={[
              bgCode && {borderBottomWidth: 2, borderColor: 'cyan'},
              {
                height: 50,
                width: 60,
                borderBottomWidth: 2,
                fontWeight: 'bold',
                fontSize: 15,
                opacity: 0.4,
              },
            ]}
            value={'+1'}
            onFocus={() => setbgCode(true)}
            onBlur={() => setbgCode(false)}
          /></View>
          
          <View style={{flexDirection: 'row',}}>
            <TextInput title="Mobile Number" />
          </View>
        </View>


      </View>

      <Btn title="verify" onClick={()=>navigation.navigate('Profile')}/>
    </View>
  );
};

export default AccountVerification;

const styles = StyleSheet.create({
  header: {
    marginTop: 100,
    // borderWidth:1,
  },
  hdrTxt: {
    alignSelf: 'center',
    fontSize: 20,
    textAlignVertical: 'center',
  },
  btn: {
    height: 75,
    width: 200,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    backgroundColor: '#98c8c2',
    margin: 15,
  },
  btnText: {
    alignSelf: 'center',
    fontSize: 17,
  },
});
