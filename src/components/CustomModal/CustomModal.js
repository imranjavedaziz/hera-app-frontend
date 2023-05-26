import React from 'react';
import {View, Modal} from 'react-native';
import styles from './styles';
const CustomModel = props => {
  const {children} = props;
  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.boxContainer}>{children}</View>
      </View>
    </Modal>
  );
};
export default React.memo(CustomModel);
