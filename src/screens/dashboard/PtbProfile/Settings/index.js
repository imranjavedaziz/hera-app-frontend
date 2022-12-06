import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Header, {IconHeader} from '../../../../components/Header';
import styles from './style';
import {Images, Strings} from '../../../../constants';
import {useNavigation} from '@react-navigation/native';
import AccountSetting from '../../../../components/dashboard/PtbProfile/AccountSettings';
import {ValidationMessages} from '../../../../constants/Strings';
import {Routes} from '../../../../constants/Constants';

const Settings = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [deactivate, setDeactivate] = useState(false);
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      style={styles.headerIcon}
      leftPress={() => navigation.goBack()}
    />
  );

  const backAction = () => {
    Alert.alert(
      ValidationMessages.DELETE_ACCOUNT,
      ValidationMessages.DELETE_TEXT,
      [
        {
          text: Strings.sm_create_gallery.deleteModal,
          onPress: () => {
            navigation.navigate('DeleteAccount');
          },
        },
        {
          text: Strings.profile.ModalOption2,
          onPress: () => null,
        },
      ],
    );
    return true;
  };

  const backDeactivateAction = () => {
    Alert.alert(
      ValidationMessages.Deactivate_Account,
      ValidationMessages.DEACTIVATE_TEXT,
      [
        {
          text: Strings.sm_create_gallery.deactivateModal,
          onPress: () => {
            navigation.navigate(Routes.DeactivateAccount);
          },
        },
        {
          text: Strings.sm_create_gallery.StayHera,
          onPress: () => null,
        },
      ],
    );
    return true;
  };
  const deactivateFunc = () => {
    setDeactivate(true);
    setShowModal(true);
  };
  return (
    <>
      <View style={styles.mainContainer}>
        <Header end={false}>{headerComp()}</Header>
        <View style={styles.headingContainer}>
          <Text style={styles.Settings}>{Strings.Settings.SETTINGS}</Text>
        </View>
        <View style={styles.innerHeading}>
          <Text style={styles.account}>
            {Strings.Settings.Account_Settings}
          </Text>
        </View>
        <View style={styles.changePsswrd}>
          <AccountSetting
            Icon={Images.lock}
            Heading={Strings.Settings.Change_Password}
            line
            onPress={() => {
              navigation.navigate(Routes.ChangePassword, {type: 1});
            }}
          />
          <View style={styles.deactivate}>
            <AccountSetting
              Icon={Images.blockUser}
              Heading={Strings.Settings.DEACTIVATE_ACCOUNT}
              Content={Strings.Settings.Deactivate_Content}
              line
              red
              onPress={() => {
                Platform.OS === 'ios'
                  ? backDeactivateAction()
                  : deactivateFunc();
              }}
            />
          </View>
          <View style={styles.delete}>
            <AccountSetting
              Icon={Images.blockUser}
              Heading={Strings.Settings.Delete_Account}
              Content={Strings.Settings.Delete_Content}
              onPress={() => {
                Platform.OS === 'ios' ? backAction() : setShowModal(true);
              }}
              red
            />
          </View>
        </View>
      </View>
      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={[styles.centeredView]}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>
              {deactivate
                ? ValidationMessages.Deactivate_Account
                : ValidationMessages.DELETE_ACCOUNT}
            </Text>
            <Text style={styles.modalSubHeader}>
              {deactivate
                ? ValidationMessages.DEACTIVATE_TEXT
                : ValidationMessages.DELETE_TEXT}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                deactivate
                  ? navigation.navigate(Routes.DeactivateAccount)
                  : navigation.navigate(Routes.DeleteAccount);
                setDeactivate(false);
              }}>
              <Text style={styles.modalOption1}>
                {deactivate
                  ? Strings.sm_create_gallery.deactivateModal
                  : Strings.sm_create_gallery.deleteModal}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                setDeactivate(false);
              }}>
              <Text style={styles.modalOption2}>
                {Strings.sm_create_gallery.StayHera}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default React.memo(Settings);
