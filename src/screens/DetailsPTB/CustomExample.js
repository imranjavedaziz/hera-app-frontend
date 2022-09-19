// import * as React from 'react'
// import { Alert, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
// import { CustomPicker } from 'react-native-custom-picker'
// import Button from '../../components/Button';
// import {useForm, Controller} from 'react-hook-form';
// import {yupResolver} from '@hookform/resolvers/yup';
// import FloatingLabelInput from '../../components/FloatingLabelInput';
// import {smRegisterSchema} from '../../constants/schemas';

// export default class CustomExample extends React.Component {

// // export default CustomExample = ()=> {

  
//   render() {

//     const {
//       handleSubmit,
//       control,
//       formState: {errors, isValid},
//       setValue,
//     } = useForm({
//       resolver: yupResolver(smRegisterSchema),
//     });
  

//     let picker;
//     const options = [
//       {
//         color: '#2660A4',
//         label: 'Item 1',
//         value: 1
//       },
//       {
//         color: '#FF6B35',
//         label: 'Item 2',
//         value: 2
//       },
//       {
//         color: '#FFBC42',
//         label: 'Item 3',
//         value: 3
//       },
//       {
//         color: '#AD343E',
//         label: 'Item 4',
//         value: 4
//       },
//       {
//         color: '#051C2B',
//         label: 'Item 5',
//         value: 5
//       }
//     ]
//     return (
//       <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
//          <Controller
//               control={control}
//               render={({field: {onChange, value}}) => (
//                 <FloatingLabelInput
//                   label={Strings.sm_register.DOB}
//                   value={value}
//                   onChangeText={v => onChange(v)}
//                   error={errors && errors.dob?.message}
//                   required={true}
//                   endComponent={() => (
//                     <TouchableOpacity onPress={() => setShow(true)}>
//                       <Image source={Images.calendar} />
//                     </TouchableOpacity>
//                   )}
//                   editable={false}
//                   onPressIn={() => setShow(true)}
//                 />
//               )}
//               name="dob"
//             />
//         <CustomPicker
//          ref={el=>picker=el}
//           placeholder={'Please select your favorite item...'}
//           options={options}
//           getLabel={item => item.label}
//           fieldTemplate={this.renderField}
//           optionTemplate={this.renderOption}
//           headerTemplate={this.renderHeader}
//           footerTemplate={this.renderFooter}
//           onValueChange={value => {
//             Alert.alert('Selected Item', value ? JSON.stringify(value) : 'No item were selected!')
//           }}
//         />
//         <Button label={"Save"} onPress={() => {if (picker) {
//             picker.showOptions();
//           }}} />
//       </View>
//     )
//         }
 
//   renderHeader() {
//     return (
//       <View style={styles.headerFooterContainer}>
//         <Text>This is header</Text>
//       </View>
//     )
//   }
 
//   renderFooter(action) {
//     return (
//       <TouchableOpacity
//         style={styles.headerFooterContainer}
//         onPress={() => {
//           Alert.alert('Footer', "You've click the footer!", [
//             {
//               text: 'OK'
//             },
//             {
//               text: 'Close Dropdown',
//               onPress: action.close.bind(this)
//             }
//           ])
//         }}
//       >
//         <Text>This is footer, click me!</Text>
//       </TouchableOpacity>
//     )
//   }
 
//   renderField(settings) {
//     const { selectedItem, defaultText, getLabel, clear } = settings
//     return (
//       <View style={styles.container}>
//         <View>
//           {!selectedItem && <Text style={[styles.text, { color: 'grey' }]}>{defaultText}</Text>}
//           {selectedItem && (
//             <View style={styles.innerContainer}>
//               <TouchableOpacity style={styles.clearButton} onPress={clear}>
//                 <Text style={{ color: '#fff' }}>Clear</Text>
//               </TouchableOpacity>
//               <Text style={[styles.text, { color: selectedItem.color }]}>
//                 {getLabel(selectedItem)}
//               </Text>
//             </View>
//           )}
//         </View>
//       </View>
//     )
//           }
 
//   renderOption(settings) {
//     const { item, getLabel } = settings
//     return (
//       <View style={{paddingVertical:20, alignSelf:'center'}}>
//         <View style={styles.innerContainer}>
//           {/* <View style={[styles.box, { backgroundColor: item.color }]} /> */}
//           <Text style={{ color: 'black', alignSelf: 'flex-start', fontSize:24 }}>{getLabel(item)}</Text>
//         </View>
//       </View>
//     )
//   }

// }
 
// const styles = StyleSheet.create({
//   container: {
//     borderColor: 'grey',
//     borderWidth: 1,
//     padding: 15
//   },
//   innerContainer: {
//     flexDirection: 'row',
//     alignItems: 'stretch'
//   },
//   text: {
//     fontSize: 18
//   },
//   headerFooterContainer: {
//     padding: 10,
//     alignItems: 'center'
//   },
//   clearButton: { backgroundColor: 'grey', borderRadius: 5, marginRight: 10, padding: 5 },
//   optionContainer: {
//     padding: 10,
//     borderBottomColor: 'grey',
//     // width:100
//     // borderBottomWidth: 5
//   },
//   optionInnerContainer: {
//     flex: 1,
//     flexDirection: 'row'
//   },
//   box: {
//     width: 20,
//     height: 20,
//     marginRight: 10
//   }
// })
