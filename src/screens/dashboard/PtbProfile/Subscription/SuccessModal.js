import {View, Text, Modal, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import Strings from '../../../../constants/Strings';
import styles from './style';
import moment from 'moment';
import { Colors } from '../../../../constants';

const SuccessModal = props => {
  const {
    successModal,
    setSuccessModal,
    selectCheckBox,
    isPlanChanged,
    subscription,
  } = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={successModal}
      onRequestClose={() => {
        setSuccessModal(!successModal);
      }}>
      <View style={styles.changeModalContainer}>
        <TouchableOpacity
          style={styles.changeModalBackdrop}
          onPress={() => setSuccessModal(!successModal)}
        />
        <View style={styles.changeModalBox}>
          <Text style={styles.changeModalTitle} numberOfLines={2}>
            {Strings.Subscription.SuccessChanged}
          </Text>
          <Text style={styles.changeModalPara}>
            {isPlanChanged
              ? Strings.Subscription.SuccessChangedPara.replace(
                  '{SELECTED_ROLE}',
                  selectCheckBox == null
                    ? '{SELECTED_ROLE}'
                    : Strings?.STATIC_ROLE.find(
                        r => r.id === selectCheckBox?.role_id_looking_for,
                      ).name,
                )
              : Strings.Subscription.SuccessUpgradePara.replace(
                  '{DATE_END}',
                  moment(subscription?.current_period_end, 'YYYY-MM-DD').format(
                    'LL',
                  ),
                )}
          </Text>
          <Pressable
            style={[styles.changeModalBtn,{backgroundColor: Colors.COLOR_A3C6C4,marginVertical: 20}]}
            onPress={() => {
              setSuccessModal(!successModal);
            }}>
            <Text style={styles.changeModalBtnTxt}>
              {Strings.Subscription.GotIt}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
export default SuccessModal;
