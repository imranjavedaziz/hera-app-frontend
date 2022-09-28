import {StyleSheet} from 'react-native';
import {Value} from '../../../constants/FixedValues';
import {Fonts, Routes} from '../../../constants/Constants';
import Colors from '../../../constants/Colors';
import Alignment from '../../../constants/Alignment';

export default {
  mainContainer: {
    flex: Value.CONSTANT_VALUE_1,
    alignItems: Alignment.CENTER,
  },
  lookingFor: {
    width: '100%',
    marginTop: Value.CONSTANT_VALUE_50,
  },
  required: {
    color: Colors.RED,
    fontSize: Value.CONSTANT_VALUE_18,
  },
  label: {
    position: Alignment.ABSOLUTE,
    left: Value.CONSTANT_VALUE_0,
    zIndex: -1,
    color: Colors.LABEL_BLACK,
  },
  ageContainer:{
    flexDirection: Alignment.ROW, 
    justifyContent: Alignment.SPACE_BETWEEN,
  },
  lookingsm: {
    alignItems: Alignment.CENTER,
    marginLeft: Value.CONSTANT_VALUE_15,
    fontFamily:Fonts.OpenSansBold,
    fontSize: Value.CONSTANT_VALUE_16,
    marginBottom: Value.CONSTANT_VALUE_27,
  },
  lookingDonor: {
    marginLeft: Value.CONSTANT_VALUE_10,
    fontWeight: Alignment.BOLD,
    fontSize: Value.CONSTANT_VALUE_16,
    marginBottom: Value.CONSTANT_VALUE_29,
  },
  lookingsDonor: {
    marginLeft: Value.CONSTANT_VALUE_10,
    fontWeight: Alignment.BOLD,
    fontSize: Value.CONSTANT_VALUE_16,
  },
  SDonorContainer: {
    flexDirection: Alignment.ROW,
    alignItems: Alignment.CENTER,
  },
  heightContainer: {
    flexDirection: Alignment.ROW,
    justifyContent: Alignment.SPACE_BETWEEN,
    paddingBottom: Value.CONSTANT_VALUE_10,
  },
  heightText: {
    color:Colors.RED,
    fontSize: Value.CONSTANT_VALUE_18,
  },
  chipText: {
    marginVertical: Value.CONSTANT_VALUE_15,
    fontSize: Value.CONSTANT_VALUE_14,
  },
  chipsRequiredText: {
    color: Colors.RED,
    fontSize: Value.CONSTANT_VALUE_18,
  },
  hairContainer: {
    flexDirection: Alignment.ROW,
    flexWrap: 'wrap',
    marginVertical: Value.CONSTANT_VALUE_5,
  },
  chips: {
    height: Value.CONSTANT_VALUE_41,
    width: Value.CONSTANT_VALUE_90,
    borderRadius: Value.CONSTANT_VALUE_21,
    justifyContent: Alignment.CENTER,
    marginRight: Value.CONSTANT_VALUE_9,
    marginVertical: Value.CONSTANT_VALUE_5,
  },
  eyeContainer: {
    flexDirection: Alignment.ROW,
    flexWrap: 'wrap',
    marginVerticle: Value.CONSTANT_VALUE_5,
    marginBottom: Value.CONSTANT_VALUE_20,
  },
  ageText: {
    marginVertical: Value.CONSTANT_VALUE_5,
    fontSize: Value.CONSTANT_VALUE_14,
    marginTop: Value.CONSTANT_VALUE_10,
  },
  ageRangeChip: {
    height: Value.CONSTANT_VALUE_41,
    width: Value.CONSTANT_VALUE_104,
    borderRadius: Value.CONSTANT_VALUE_21,
    justifyContent: Alignment.CENTER,
    // marginRight: Value.CONSTANT_VALUE_5,
    marginVertical: Value.CONSTANT_VALUE_10,
    padding: Value.CONSTANT_VALUE_0,
  },
  chipInsideText:{
    alignSelf: Alignment.CENTER
  },
  flexRow:{
    flexDirection:Alignment.ROW,
  },
  headerTxt:{
    color:Colors.RED,
    textDecorationLine:Alignment.UNDERLINE,
    fontFamily:Fonts.OpenSansBold,
    fontSize:Value.CONSTANT_VALUE_16
    
  },
  Btn:{
    height:80,
    width:195,

  }
};
