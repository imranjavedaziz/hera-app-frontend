import React from 'react';
import {View, Modal,StatusBar} from 'react-native';
import styles from './styles';
const CustomModel = props => {
  const {children} = props;
  return (
    <Modal transparent={true} animationType="fade">
      <StatusBar
            barStyle="light-content"
            backgroundColor={'#000000aa'}
            animated={true}
            hidden={false}
          />
      <View style={styles.modalContainer}>
        <View style={styles.boxContainer}>{children}</View>
      </View>
    </Modal>
  );
};
export default React.memo(CustomModel);
