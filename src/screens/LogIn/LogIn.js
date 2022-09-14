import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Btn from '../../components/Btn'
import TextInput from '../../components/TextInput'

const LogIn = () => {
  return (
    <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
        <View>
            <TextInput title="Mobile Number" />
            
            <TextInput title="Password" secureTextEntry={true} />
        </View>

        <Btn title={"Log in"}/>
        
        <View style={{alignSelf:'center', marginTop:20}}>
        <Text style={styles.txt}>FORGOT YOUR PASSWORD?</Text>
        <Text style={styles.txt}>NEW USER? REGISTER NOW</Text>
      </View>
      
    </View>
  )
}

export default LogIn

const styles = StyleSheet.create({
    txt:{
        textDecorationLine: 'underline',
        margin:15,
        fontWeight:'bold',
        opacity:0.8,
        fontSize:13
        
      }
})