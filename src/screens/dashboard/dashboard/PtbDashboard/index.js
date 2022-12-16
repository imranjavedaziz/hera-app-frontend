import {View, Text} from 'react-native';
import React, {useState, useCallback} from 'react';

import styles from './style';
import Images from '../../../../constants/Images';
import Container from '../../../../components/Container';

import Strings from '../../../../constants/Strings';

import {IconHeader} from '../../../../components/Header';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';
import {getPtbDashboard} from '../../../../redux/actions/PtbDashboard';
import {Routes} from '../../../../constants/Constants';
import SensoryCharacteristics from '../../../../components/SensoryCharacteristics';
import CustomModal from '../../../../components/CustomModal/CustomModal';
import {scaleWidth} from '../../../../utils/responsive';
const PtbDashboard = props => {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profileImg = useSelector(state => state.Auth?.user?.profile_pic);

  useFocusEffect(
    useCallback(() => {
      dispatch(getPtbDashboard());
    }, [dispatch]),
  );

  const headerComp = () => (
    <IconHeader
      leftIcon={{
        uri: profileImg,
      }}
      leftPress={() => {
        navigation.navigate('PtbProfile');
      }}
      rightIcon={Images.iconChat}
      rightPress={() =>
        navigation.navigate(Routes.Chat_Listing, {ptbChat: true})
      }
      ApiImage={true}
      rightPrevIcon={Images.I_BUTTON}
      rightImg={{marginRight: scaleWidth(18)}}
      rightPrevPress={() => setModalVisible(!modalVisible)}
    />
  );
  return (
    <>
      <Container
        mainStyle={true}
        scroller={false}
        showHeader={true}
        headerComp={headerComp}>
        <View style={styles.emptyCardContainer}>
          <Text style={styles.sryText}>{Strings.dashboard.Sorry}</Text>
          <Text style={styles.innerText}>{Strings.dashboard.Para1}</Text>
          <Text style={styles.innerText2}>{Strings.dashboard.Para2}</Text>
        </View>
        <View style={styles.emptyCardContainer}>
          <Text style={styles.sryText}>{Strings.dashboard.Sorry}</Text>
          <Text style={styles.innerText}>{Strings.dashboard.SecondPara1}</Text>
          <Text style={styles.innerText2}>{Strings.dashboard.secondPara2}</Text>
        </View>
      </Container>
      {modalVisible && (
        <CustomModal>
          <SensoryCharacteristics
            onPress={() => setModalVisible(!modalVisible)}
          />
        </CustomModal>
      )}
    </>
  );
};
export default PtbDashboard;
