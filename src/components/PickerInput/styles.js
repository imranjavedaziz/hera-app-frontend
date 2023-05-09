import {StyleSheet} from 'react-native';
import {normalizeFont, scaleHeight, scaleWidth} from '../../utils/responsive';
import Colors from '../../constants/Colors';
import {Fonts} from '../../constants/Constants';
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
        ? Colors.LIGHT_BLACK47
        : Colors.BACKGROUND,
      flexDirection: 'row',
      paddingHorizontal: scaleWidth(15),
      borderRadius: 2,
      marginTop: scaleHeight(9),
      borderBottomColor: props?.showBorder
        ? props?.borderColor ?? 'white'
        : Colors.LIGHT_BLACK47,
      borderBottomWidth: 1,
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
  });
