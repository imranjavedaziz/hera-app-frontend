import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useCallback} from 'react';
import Btn from '../../components/Btn';

const Preferences = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 0.3}}></View>

      <View style={{flex: 0.6}}>
        <View>
          <Image
            style={{
              height: 150,
              width: 300,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
            source={require('../../assets//Images/splashLogo.png')}
          />
        </View>
        <Text style={styles.text}>Like, Match & Connect!</Text>
        <View style={{alignSelf: 'center',}}>
          <Btn title="log in" onClick={()=>navigation.navigate('LogIn')} />
          <Btn title="register"  onClick={()=>navigation.navigate('Verify')}/>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 35,
          flex: 0.1,
        }}>
        <Text
          style={{
            textDecorationLine: 'underline',
            fontWeight: 'bold',
            opacity: 0.7,
            fontSize: 17,
          }}>
          About Us
        </Text>
        <Text
          style={{
            textDecorationLine: 'underline',
            fontWeight: 'bold',
            opacity: 0.7,
            fontSize: 17,
          }}>
          Inquiry Form
        </Text>
      </View>
    </View>
  );
};

export default Preferences;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#f7f5f0',
  },
  text: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    // marginTop:-10,
    // paddingTop:-20
    marginBottom: 10,
    opacity: 0.7,
  },
  btn: {
    // flex:0.1,
    height: 75,
    width: 200,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    backgroundColor: '#98c8c2',
    margin: 15,
  },
  btnText: {
    alignSelf: 'center',
    // paddingVertical: 50,
    fontSize: 17,
  },
});
