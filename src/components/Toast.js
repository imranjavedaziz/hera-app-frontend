// Toast
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../constants/Colors';
import {Value, Prencentage} from '../constants/FixedValues';
import Alignment from '../constants/Alignment';
import Images from '../constants/Images';
import {hideAppToast} from '../redux/actions/loader';
import {Fonts} from '../constants/Constants';

const styles = {
  container: {
    position: Alignment.ABSOLUTE,
    top: Value.CONSTANT_VALUE_0,
    width: Prencentage.PRECENTAGE_100,
  },
  safe: {
    flex: Value.CONSTANT_VALUE_1,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    width: Prencentage.PRECENTAGE_100,
  },
  row: {
    flex: Value.CONSTANT_VALUE_1,
    flexDirection: Alignment.ROW,
    marginTop: Value.CONSTANT_VALUE_20,
    width: Prencentage.PRECENTAGE_100,
    paddingLeft: Value.CONSTANT_VALUE_30,
    paddingRight: Value.CONSTANT_VALUE_40,
  },
  text: {
    fontSize: Value.CONSTANT_VALUE_16,
    fontFamily: Fonts.OpenSansBold,
    color: Colors.WHITE,
    marginLeft: Value.CONSTANT_VALUE_12,
  },
  bar: {
    width: Value.CONSTANT_VALUE_20,
    height: Value.CONSTANT_VALUE_5,
    backgroundColor: Colors.WHITE,
    opacity: 0.4,
    marginTop: Value.CONSTANT_VALUE_20,
    marginBottom: Value.CONSTANT_VALUE_10,
    borderRadius: Value.CONSTANT_VALUE_3,
  },
};
const Toast = () => {
  const dispatch = useDispatch();
  const toastState = useSelector(state => state.loader);
  const backgroundColor = toastState.isErrToast
    ? Colors.COLOR_RED
    : Colors.GREEN;
  const icon = toastState.isErrToast
    ? Images.warning
    : toastState?.isCancelToast
    ? Images.rejectCross
    : Images.path;
  const hideToast = async () => {
    await dispatch(hideAppToast());
  };
  React.useEffect(() => {
    if (toastState.showToast) {
      setTimeout(hideToast, 5000);
    }
  }, [toastState.showToast]);
  if (toastState.showToast) {
    return (
      <View style={[styles.container, {backgroundColor}]}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={backgroundColor}
          animated={true}
          hidden={false}
        />
        <SafeAreaView style={styles.safe}>
          <Pressable style={styles.safe} onPress={hideToast}>
            <View style={styles.row}>
              <Image
                source={icon}
                style={
                  toastState.toastText.length > 10
                    ? {
                        alignItems: Alignment.CENTER,
                        justifyContent: Alignment.CENTER,
                        marginTop: Value.CONSTANT_VALUE_2,
                      }
                    : {
                        alignItems: Alignment.CENTER,
                        justifyContent: Alignment.CENTER,
                        marginTop: Value.CONSTANT_VALUE_5,
                      }
                }
              />
              <Text style={styles.text}>{toastState.toastText}</Text>
            </View>
            <View style={styles.bar} />
          </Pressable>
        </SafeAreaView>
      </View>
    );
  }
  return null;
};
export default Toast;
