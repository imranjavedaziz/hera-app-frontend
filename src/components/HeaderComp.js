// import {StyleSheet, Text, TouchableOpacity, View, Image, Keyboard} from 'react-native';
// import React from 'react';

// import COLORS from '../styles/colors';
// import {IMAGES} from '../utils/Images'

// const HeaderComp = ({
//   header = '',
//   subHeader = '',
//   headerStyle = {},
//   subHeaderStyle = {},
//   onBack = () => {},
//   isBack = false,
//   isRight = false,
//   onRight=()=>{},
// }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.hedaerIcon}>
//       {!!isBack ? (
//         <View style={styles.iconContainer}>
          
//             <TouchableOpacity onPress={onBack}>
//               <Image
//                 style={styles.icon}
//                 source={require('../assets/Icons/arrow_back.png')}
//               />
//               {/* <Text>GoBack</Text> */}
//             </TouchableOpacity>
//            </View>): <View></View>}
        
//            {!!isRight ? (
//         <View style={styles.iconContainer}>
          
//             <TouchableOpacity onPress={onRight}>
//               <Image style={styles.rightIcon } source={IMAGES.CLOSE_ICON}/>
//             </TouchableOpacity>
//             </View> ) : <View/>}
        
//       </View>
//       <View >
//         <Text style={{...styles.headerStyle, ...headerStyle}}>{header}</Text>
//       </View>
//       <View>
//         <Text style={{...styles.subHeaderStyle, ...subHeaderStyle}}>
//           {subHeader}
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default HeaderComp;

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 50,
//     // borderWidth:1

//   },
//   headerStyle: {
//     fontSize: 11,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     textTransform: 'uppercase',
//     letterSpacing: 2.84,
//     opacity: 0.8,
//     marginBottom: 8,
//     marginTop: 55,
//     color:COLORS.black
//   },
//   subHeaderStyle: {
//     fontSize: 23,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   iconContainer: {
//     height: 35,
//     width: 35,
//     // borderRadius: 32,
//     marginLeft: 20,
//     marginRight:20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 4,
//   },
//   icon: {
//     height: 22,
//     width: 22,
//     alignSelf: 'center',
//   },
//   hedaerIcon: {
//     flexDirection: 'row',
//     // backgroundColor:'pink',
//     justifyContent:'space-between',
//     height: 35,
//     width: '100%',
//   },
//   rightIcon:{
//     height:22,
//     width:22,
//     alignSelf:'center'
//   }
// });
