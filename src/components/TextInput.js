import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputComponent,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const TextInputComp = ({
  title = '',
  keyboardType = '',
  isPassword=false,
  setPassword=false,
  must=false,
  icon='',
  input,
  onIconPress=()=>{},
  

}) => {
  const [txtFocus, setTxtFocus] = React.useState(false);
  const [value, setValue] = React.useState(false);

  const turnValue = () => {
    setTxtFocus(true);
    setValue(true);
  };
  return (
    <View style={[styles.container,{ marginBottom: setPassword ? 0 : 0  }]}>
      <View style={ icon ? { flexDirection:'row',justifyContent:'space-between'}:null}>
      <Text
        style={[
          styles.text,
          {transform: value ? [{translateY: -20}] : icon ? [{translateY: -20}]:[{translateY: 0}]},
          
        ]}>
        {title}{ must ?<Text style={{color:'red'}}>*</Text>: null}
      </Text>
      <TouchableOpacity onPress={onIconPress}>
      {icon ? <Image source={icon} style={styles.icon}/>:null}
      </TouchableOpacity>
      </View>
      <TextInput
        secureTextEntry={isPassword}
        onFocus={() => turnValue()}
        onBlur={() => setTxtFocus(false)}
        keyboardType={keyboardType}
        // {...value ? value={value}:null}
        value={input}
        
        style={[
          styles.input,
          {
            borderColor: txtFocus ? 'skyblue' : 'lightgrey',
          },
        ]}>
        </TextInput>
        
        { setPassword ? 
         <View style={styles.setPwd}>
         <Text style={{fontWeight:'bold', paddingBottom:5}}>Minimum 8 character</Text>
         <Text style={{fontWeight:'bold',paddingBottom:5}}>Must be Alphanumeric</Text>
         <Text style={{fontWeight:'bold',paddingBottom:5}}>Must have atleast one special character</Text>
         </View>
         :null}
    </View>
  );
};

export default TextInputComp;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:40,
    paddingBottom:55,
    // borderWidth:1,
    // marginBottom: 10,
    // alignSelf:'center'
    
  },
  text: {
    fontSize: 15,
    marginBottom: -14,
    
  },
  input: {
    fontWeight:'bold',
    borderBottomWidth: 2,
    paddingBottom: 14,
  },
  setPwd:{
    opacity:0.5,
    // marginTop:10,
    // marginBottom:20
    marginVertical:10
  },
  icon:{
    // flexDirection:'row',
    // justifyContent:'flex-end'
    // borderWidth:1
  }
});
