import { StyleSheet } from "react-native";
import {Value} from '../../constants/FixedValues';
import {Fonts, Routes} from '../../constants/Constants';
import Colors from '../../constants/Colors';
// export const styles = StyleSheet.create({
    export default {
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Value.CONSTANT_VALUE_52,
    },
    modalView: {
      height: Value.CONSTANT_VALUE_230,
      width: Value.CONSTANT_VALUE_283,
      backgroundColor: 'white',
      paddingHorizontal: Value.CONSTANT_VALUE_23,
      paddingVertical: Value.CONSTANT_VALUE_20,
      alignItems: 'center',
    },
    smRegister: {
      fontWeight: 'bold',
      alignSelf: 'center',
      textDecorationLine: 'underline',
      fontSize: Value.CONSTANT_VALUE_15,
      marginTop: Value.CONSTANT_VALUE_25,
    },
    modalHeader: {
      lineHeight: Value.CONSTANT_VALUE_21,
      fontWeight: 'bold',
      fontFamily: Fonts.OpenSansRegular,
      paddingBottom: Value.CONSTANT_VALUE_5,
    },
    modalSubHeader: {
      textAlign: 'center',
      lineHeight: Value.CONSTANT_VALUE_18,
      marginTop: Value.CONSTANT_VALUE_1,
      fontFamily: Fonts.OpenSansRegular,
    },
    modalOption1: {
      color: 'red',
      fontSize: Value.CONSTANT_VALUE_16,
      paddingBottom: Value.CONSTANT_VALUE_10,
      marginVertical: Value.CONSTANT_VALUE_27,
      letterSpacing: Value.CONSTANT_VALUE_1,
      fontFamily: Fonts.OpenSansBold,
    },
    modalOption2: {
      fontSize: Value.CONSTANT_VALUE_16,
      fontWeight: 'bold',
      letterSpacing: Value.CONSTANT_VALUE_1,
      fontFamily: Fonts.OpenSansBold,
    },
    ImageText: {
      fontSize: Value.CONSTANT_VALUE_18,
      fontFamily: Fonts.OpenSansRegular,
      color: Colors.LABEL_BLACK,
    },
    uploadBackground: {
      width: Value.CONSTANT_VALUE_35,
      height: Value.CONSTANT_VALUE_35,
      borderRadius: Value.CONSTANT_VALUE_18,
      backgroundColor: Colors.GREEN,
      alignItems: 'center',
      justifyContent: 'center',
    },
    background: {
      width: Value.CONSTANT_VALUE_140,
      height: Value.CONSTANT_VALUE_140,
      borderRadius: Value.CONSTANT_VALUE_70,
      backgroundColor: Colors.GREEN,
      alignItems: 'center',
      justifyContent: 'center',
    },
  };