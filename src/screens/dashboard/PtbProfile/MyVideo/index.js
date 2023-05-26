import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Images from '../../../../constants/Images';
import {IconHeader} from '../../../../components/Header';
import Container from '../../../../components/Container';
import styles from './style';
import Strings from '../../../../constants/Strings';
import styleSheet from '../../../../styles/auth/smdonor/registerScreen';
import ActionSheet from 'react-native-actionsheet';
import {BottomSheetComp, ModalMiddle} from '../../../../components';
import {Colors} from '../../../../constants';
import {statusHide} from '../../../../utils/responsive';

const MyVideo = () => {
  const [video] = useState({file_url: '', loading: false});
  const [isOpen, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [threeOption, setThreeOption] = useState([]);
  const navigation = useNavigation();
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      style={styles.headerIcon}
      leftPress={() => navigation.goBack()}
    />
  );
  const openActionSheet = () => {
    setThreeOption([
      Strings.sm_create_gallery.bottomSheetCamera,
      Strings.sm_create_gallery.bottomSheetGallery,
      Strings.Subscription.Cancel,
    ]);
  };
  return (
    <>
      <Container
        mainStyle={true}
        scroller={true}
        showHeader={true}
        fixedHeader={true}
        profileLoad={true}
        style={{backgroundColor: Colors.BACKGROUND, marginTop: statusHide(105)}}
        showsVerticalScrollIndicator={true}
        headerComp={headerComp}>
        <View style={styles.mainContainer}>
          <View>
            <Text style={styles.heading}>{Strings.smSetting.MyVideo}</Text>
          </View>
          <View style={styles.innerHeadingContainer}>
            <Text style={styles.innerHeading}>
              {Strings.smSetting.VideoContent}
            </Text>
          </View>
          {video?.file_url !== '' && (
            <TouchableOpacity
              style={styles.deleteBtnContainer}
              onPress={() => {
                openActionSheet();
              }}>
              <Image source={Images.trashRed} />
              <Text style={styles.rmvText}>
                {Strings.smSetting.RemoveVideo}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Container>
      <ActionSheet
        options={threeOption}
        destructiveButtonIndex={2}
        cancelButtonIndex={2}
      />
      <BottomSheetComp isOpen={isOpen} setOpen={setOpen}>
        <View style={styleSheet.imgPickerContainer}>
          <TouchableOpacity
            style={[styleSheet.pickerBtn, styleSheet.pickerBtnBorder]}>
            <Text style={styleSheet.pickerBtnLabel}>
              {Strings.sm_create_gallery.bottomSheetCamera}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styleSheet.pickerBtn}>
            <Text style={styleSheet.pickerBtnLabel}>
              {Strings.sm_create_gallery.bottomSheetGallery}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetComp>
      <ModalMiddle
        showModal={showModal}
        String_1={Strings.smSetting.Remove_Video}
        String_2={Strings.sm_create_gallery.modalsubTitleTwo}
        String_3={Strings.sm_create_gallery.modalText}
        String_4={Strings.sm_create_gallery.modalText_2}
        onPressOff={() => {
          setShowModal(false);
        }}
      />
    </>
  );
};

export default React.memo(MyVideo);
