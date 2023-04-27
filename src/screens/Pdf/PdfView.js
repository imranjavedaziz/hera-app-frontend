import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import Pdf from 'react-native-pdf';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Header} from '../../components';
import {IconHeader} from '../../components/Header';
import {Images} from '../../constants';
const PdfView = () => {
  const {
    params: {url},
  } = useRoute();
  const navigation = useNavigation();
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
      />
    </View>
  );
};

export default PdfView;
