import {View, Text, Platform, Alert, BackHandler} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header, {IconHeader} from '../../../../components/Header';
import styles from './style';
import {Images, Strings} from '../../../../constants';
import {useNavigation} from '@react-navigation/native';
import AccountSetting from '../../../../components/dashboard/PtbProfile/AccountSettings';
import {ValidationMessages} from '../../../../constants/Strings';
import {Routes} from '../../../../constants/Constants';
import {ModalMiddle} from '../../../../components';
import {useSelector} from 'react-redux';

const Settings = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [deactivate, setDeactivate] = useState(false);
  const {log_in_data} = useSelector(state => state.Auth);

  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      style={styles.headerIconAndroid}
      leftPress={() => navigation.goBack()}
    />
  );
  const handleBackButtonClick = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  const backAction = () => {
    Alert.alert(
      ValidationMessages.DELETE_ACCOUNT,
      ValidationMessages.DELETE_TEXT,
      [
        {
          text: Strings.sm_create_gallery.deleteModal,
          style: 'destructive',
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
          style: 'destructive',
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
        <View style={styles.headingAndroidContainer}>
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
              line
              red
              map
              DATA={
                log_in_data?.role_id === 2
                  ? Platform.OS !== 'ios'
                    ? Strings.Deactivate_Account_Case_IOS
                    : Strings.Deactivate_Account_Case_Android
                  : Strings.SM_Deactivate_Account
              }
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
              map
              DATA={
                log_in_data?.role_id === 2
                  ? Platform.OS === 'ios'
                    ? Strings.Delete_Account_Case_IOS
                    : Strings.Delete_Account_Case_Android
                  : Strings.SM_DELETE_Account
              }
              onPress={() => {
                Platform.OS === 'ios' ? backAction() : setShowModal(true);
              }}
              red
            />
          </View>
        </View>
      </View>
      <ModalMiddle
        showModal={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        String_1={
          deactivate
            ? ValidationMessages.Deactivate_Account
            : ValidationMessages.DELETE_ACCOUNT
        }
        String_2={
          deactivate
            ? ValidationMessages.DEACTIVATE_TEXT
            : ValidationMessages.DELETE_TEXT
        }
        String_3={
          deactivate
            ? Strings.sm_create_gallery.deactivateModal
            : Strings.sm_create_gallery.deleteModal
        }
        String_4={Strings.sm_create_gallery.StayHera}
        onPressNav={() => {
          setShowModal(false);
          deactivate
            ? navigation.navigate(Routes.DeactivateAccount)
            : navigation.navigate(Routes.DeleteAccount);
          setDeactivate(false);
        }}
        onPressOff={() => {
          setShowModal(false);
          setDeactivate(false);
        }}
      />
    </>
  );
};

export default React.memo(Settings);
