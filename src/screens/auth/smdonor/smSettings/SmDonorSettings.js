import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import Header, {IconHeader} from '../../../../components/Header';
import Images from '../../../../constants/Images';
import Strings from '../../../../constants/Strings';
import Styles from './Styles';
import PtbAccount, {
  ToggleNotification,
} from '../../../../components/dashboard/PtbProfile/PtbAccount';
import {ModalMiddle} from '../../../../components';

const SmDonorSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      style={Styles.androidHeaderIcon}
    />
  );
  return (
    <>
      <SafeAreaView style={Styles.flex}>
        <Header end={false}>{headerComp()}</Header>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={Styles.androidHeaderContainer}>
            <PtbAccount
              leftIcon={Images.setting2}
              title={Strings.smSetting.Settings}
            />
            <ToggleNotification />
            <PtbAccount
              leftIcon={Images.writing}
              title={Strings.smSetting.Inquiry}
            />
            <View style={Styles.buttoncontainer}>
              <TouchableOpacity style={Styles.button}>
                <Text style={Styles.buttonText}>{Strings.smSetting.Btn}</Text>
              </TouchableOpacity>
              <Text style={Styles.AppVersion}>
                {Strings.smSetting.AppVersion}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <ModalMiddle
        showModal={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        String_1={Strings.smSetting.Log_Out}
        String_2={Strings.smSetting.LogoutContent}
        String_3={Strings.smSetting.Yes_Logout}
        String_4={Strings.sm_create_gallery.StayHera}
        onPressNav={() => {
          setShowModal(false);
        }}
        onPressOff={() => {
          setShowModal(false);
        }}
      />
    </>
  );
};

export default React.memo(SmDonorSettings);
