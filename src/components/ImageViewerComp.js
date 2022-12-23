import {StyleSheet, View, Image, Modal, SafeAreaView,TouchableOpacity} from 'react-native';
import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import {width} from '../utils/responsive';
import {Images} from '../constants';

export default function ImageViewerComp(props) {
  const {data,onPress} = props;

  const _renderItem = ({item}) => {
    return (
      <View style={{top: 200}}>
        <Image source={{uri: item?.uri}} style={{height: 300, width: width}} />
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Image source={Images.frontCarousel} />
      </View>
    );
  };
  const _renderPrevButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Image source={Images.backCarousel} />
      </View>
    );
  };
  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <SafeAreaView />
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={onPress}>
          <Image
            source={Images.CROSS}
            style={{height: 30, width: 30, marginRight: 15}}
          />
        </TouchableOpacity>
        <AppIntroSlider
          showDoneButton={false}
          data={data}
          showPrevButton
          renderNextButton={_renderNextButton}
          renderPrevButton={_renderPrevButton}
          renderItem={_renderItem}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#181019',

    // backgroundColor: '#000000aa'
  },
  buttonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
