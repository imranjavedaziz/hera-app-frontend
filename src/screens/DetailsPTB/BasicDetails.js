// import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
// import React from 'react';
// import CheckBox from '@react-native-community/checkbox';

// import HeaderComp from '../../components/HeaderComp';
// import TextInputComp from '../../components/TextInput';
// import Btn from '../../components/Btn';

// const BasicDetails = ({navigation}) => {
//   const [male, setMale] = React.useState(false);
//   const [female, setFemale] = React.useState(false);
//   const [other, setOther] = React.useState(false);

//   return (
//     <ScrollView style={{}}>
//       <HeaderComp header="basic details" subHeader="Complete Your Profile" />
//       <View >
//         <View style={{marginHorizontal:40}}>
//         <Text>Gender</Text>

//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             marginVertical: 20,
//             paddingBottom: 30,
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <CheckBox
//               lineWidth={3}
//               disabled={false}
//               value={male}
//               onFillColor={'#15bff1'}
//               onCheckColor={'white'}
//               onTintColor={'white'}
//               onValueChange={newValue => setMale(newValue)}
//             />
//             <Text style={{fontWeight: 'bold', paddingLeft: 10, fontSize: 17}}>
//               Male
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <CheckBox
//               lineWidth={3}
//               disabled={false}
//               value={female}
//               onFillColor={'#15bff1'}
//               onCheckColor={'white'}
//               onTintColor={'white'}
//               onValueChange={newValue => setFemale(newValue)}
//             />
//             <Text style={{fontWeight: 'bold', paddingLeft: 10, fontSize: 17}}>
//               Female
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <CheckBox
//               lineWidth={3}
//               disabled={false}
//               value={other}
//               onFillColor={'#15bff1'}
//               onCheckColor={'white'}
//               onTintColor={'white'}
//               onValueChange={newValue => setOther(newValue)}
//             />
//             <Text style={{fontWeight: 'bold', paddingLeft: 10, fontSize: 17}}>
//               Other
//             </Text>
//           </View>
//         </View>
//         </View>

//         <TextInputComp title="Country" />
//         <TextInputComp title="State" />
//         <TextInputComp title="ZIP Code" />
//         <TextInputComp title="Occuation (Optional)" />
//         <TextInputComp title="Sexsual Orientation" />
//         {/* <TextInput numberOfLines={24} style={{borderWidth:1, height:60, width:60}}/> */}
//       </View>
//       <Text style={{marginLeft: 30, marginBottom: 5}}>
//         Add a Short Bio (Max 250 Char)
//       </Text>
//       <TextInput
//         numberOfLines={24}
//         style={{
//           borderWidth: 2,
//           height: 160,
//           marginHorizontal: 30,
//           borderRadius: 20,
//           opacity: 0.1,
//           marginTop: 5,
//         }}
//       />

//       <Btn title="save profile" onClick={()=>navigation.navigate('SetPreference')} />
//       <View style={{marginBottom:80}}/>
//     </ScrollView>
//   );
// };

// export default BasicDetails;

// const styles = StyleSheet.create({});
