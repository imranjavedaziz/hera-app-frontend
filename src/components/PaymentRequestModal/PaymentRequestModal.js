import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {Value} from '../../constants/FixedValues';
import {Colors} from '../../constants';
import styles from './styles';
const PaymentRequestModal = props => {
  const {
    showModal,
    onRequestClose,
    String_1,
    String_2,
    String_3,
    String_4,
    String_5,
    onPressInvalid,
    onPressPaid,
    onPressCancel,
  } = props;
  return (
    <Modal
      transparent={true}
      visible={showModal}
      onRequestClose={onRequestClose}>
      <View style={[styles.centeredView]}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>{String_1}</Text>
          <Text style={styles.modalSubHeader}>{String_2}</Text>
          <TouchableOpacity onPress={onPressInvalid}>
            <Text style={styles.modalOption2}>{String_3}</Text>
            <View
              style={{
                marginTop: Value.CONSTANT_VALUE_20,
                borderBottomWidth: Value.CONSTANT_VALUE_1,
                borderBottomColor: Colors.ModalBorder,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressPaid}>
            <Text style={styles.modalOption2}>{String_4}</Text>
            <View
              style={{
                marginTop: Value.CONSTANT_VALUE_20,
                borderBottomWidth: Value.CONSTANT_VALUE_1,
                borderBottomColor: Colors.ModalBorder,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onPressCancel}>
            <Text style={styles.modalOption1}>{String_5}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentRequestModal;
