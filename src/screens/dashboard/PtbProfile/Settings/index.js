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

const Settings = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
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
          text: Strings.profile.ModalOption2,
          onPress: () => null,
        },
        {
          text: Strings.sm_create_gallery.deleteModal,
          onPress: () => {
            navigation.navigate('DeleteAccount');
          },
        },
      ],
    );
    return true;
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
              navigation.navigate('ChangePassword');
            }}
          />
          <View style={styles.deactivate}>
            <AccountSetting
              Icon={Images.blockUser}
              Heading={Strings.Settings.Deactivate_Account}
              Content={Strings.Settings.Deactivate_Content}
              line
              red
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
              line
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
              {ValidationMessages.DELETE_ACCOUNT}
            </Text>
            <Text style={styles.modalSubHeader}>
              {ValidationMessages.DELETE_TEXT}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                navigation.navigate('DeleteAccount');
              }}>
              <Text style={styles.modalOption1}>
                {Strings.sm_create_gallery.deleteModal}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
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

export default Settings;
