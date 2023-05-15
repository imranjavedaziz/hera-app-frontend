// Loader
import React from 'react';
import {View, Dimensions, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../constants/Colors';
import {Value} from '../constants/FixedValues';
import Alignment from '../constants/Alignment';
import {MaterialIndicator} from 'react-native-indicators';
import {dynamicSize, statusHide} from '../utils/responsive';
const {height} = Dimensions.get('window');
const styles = {
  container: {
    position: Alignment.ABSOLUTE,
    alignSelf: Alignment.CENTER,
    width: Value.CONSTANT_VALUE_50,
    height: Value.CONSTANT_VALUE_50,
    alignItems: Alignment.CENTER,
    justifyContent: Alignment.CENTER,
    borderRadius: Value.CONSTANT_VALUE_35,
    backgroundColor: Colors.WHITE,
    zIndex: Value.CONSTANT_VALUE_999999,
  },
};
const FormLoader = () => {
  const editLoading = useSelector(state => state.loader.editLoading);
  if (editLoading) {
    return (
      <View
        style={{
          backgroundColor: Colors.BACKGROUND,
          justifyContent: 'center',
          height: '200%',
        }}>
        <View
          style={[
            styles.container,
            Platform.OS === 'ios'
              ? {top: height / Value.CONSTANT_VALUE_2 - statusHide(105)}
              : {top: height / Value.CONSTANT_VALUE_2},
          ]}>
          <MaterialIndicator
            color={Colors.COLOR_A3C6C4}
            size={dynamicSize(25)}
          />
        </View>
      </View>
    );
  }
  return null;
};
export default FormLoader;
