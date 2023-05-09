import {StyleSheet} from 'react-native';
import {normalizeFont, scaleHeight, scaleWidth} from '../../utils/responsive';
import Colors from '../../constants/Colors';
import {Fonts} from '../../constants/Constants';
import {Prencentage, Value} from '../../constants/FixedValues';
import {Alignment} from '../../constants';
export const style = props =>
  StyleSheet.create({
    containerView: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
    },

    asteriskText: {
      color: Colors.RED,
    },
    asteriskGreenText: {
      color: Colors.RED,
    },

    textInput: {
      color: props?.isDisable ? Colors.WHITE : Colors.BLACK,
      flex: 1,
      fontFamily: Fonts.OpenSansRegular,
      fontSize: normalizeFont(14),
      marginLeft: scaleWidth(-4),
    },
    label: {
      color: Colors.BLACK,
      fontSize: normalizeFont(12),
      fontFamily: Fonts.OpenSansRegular,
    },
    inputContainer: {
      height: scaleHeight(60),
      backgroundColor: props?.isDisable
        ? Colors.INPUT_BORDER
        : Colors.BACKGROUND,
      flexDirection: 'row',
      paddingHorizontal: scaleWidth(15),
      borderRadius: 2,
      marginTop: scaleHeight(9),
      borderBottomColor: props?.showBorder
        ? props?.borderColor ?? Colors.SKY_BLUE
        : Colors.INPUT_BORDER,
      borderBottomWidth: 2,
      alignItems: 'center',
    },
    errorText: {
      color: Colors.RED,
      fontSize: normalizeFont(12),
      fontFamily: Fonts.OpenSansRegular,
      textAlign: 'right',
      paddingTop: scaleHeight(5),
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
      marginTop: scaleHeight(15),
    },
    descText: {
      color: Colors.BLACK,
      fontSize: normalizeFont(12),
      fontFamily: Fonts.OpenSansRegular,
      textAlign: 'left',
    },
    descContainerView: {
      marginTop: scaleHeight(10),
      marginBottom: scaleHeight(2),
    },
    dobField: {
      height: scaleHeight(50),
      flex: 1,
    },
    rowStyle: {
      width: Prencentage.PRECENTAGE_100,
    },
    rowTextStyle: {textAlign: Alignment.CENTER, color: Colors.BLACK},
    dropdownStyle: {
      textAlign: Alignment.LEFT,
      minHeight: Value.CONSTANT_VALUE_40,
    },
    buttonStyle: {
      width: Prencentage.PRECENTAGE_100,
      backgroundColor: Colors.CLEAR,
      borderBottomWidth: Value.CONSTANT_VALUE_2,
      height: 'auto',
      minHeight: Value.CONSTANT_VALUE_40,
      paddingHorizontal: Value.CONSTANT_VALUE_0,
    },
    buttonTextStyle: {
      textAlign: Alignment.LEFT,
      color: Colors.BLACK,
      fontFamily: Fonts.OpenSansBold,
      fontSize: Value.CONSTANT_VALUE_16,
      // marginHorizontal: Value.CONSTANT_VALUE_0,
      width: Prencentage.PRECENTAGE_90,
      right: 15,
      // marginTop: 10,
    },
    linebelow: {
      borderBottomWidth: Value.CONSTANT_VALUE_2,
      justifyContent: 'center',
    },
  });
