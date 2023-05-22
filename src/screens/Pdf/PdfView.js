import {BackHandler, View} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import Pdf from 'react-native-pdf';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Header} from '../../components';
import {IconHeader} from '../../components/Header';
import {Colors, Images} from '../../constants';
import {MaterialIndicator} from 'react-native-indicators';
import {dynamicSize} from '../../utils/responsive';

const PdfView = () => {
  const {
    params: {url},
  } = useRoute();
  const navigation = useNavigation();
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
  const headerComp = () => (
    <IconHeader
      leftIcon={Images.circleIconBack}
      onPress={() => {
        navigation.goBack();
      }}
      style={styles.androidHeaderIcons}
    />
  );
  return (
    <View style={styles.pdfContainer}>
      <Header>{headerComp()}</Header>
      <Pdf
        source={{uri: url}}
        trustAllCerts={false}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link presse: ${uri}`);
        }}
        style={styles.pdf}
        renderActivityIndicator={() => {
          return (
            <View style={styles.container}>
              <MaterialIndicator
                color={Colors.COLOR_A3C6C4}
                size={dynamicSize(25)}
              />
            </View>
          );
        }}
        cache={true}
      />
    </View>
  );
};

export default PdfView;
