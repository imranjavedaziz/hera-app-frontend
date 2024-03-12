import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, BackHandler} from 'react-native';
import {Alignment, Images, Strings} from '../../constants';
import Video from 'react-native-video';
import styles from './style';
import globalStyle from '../../styles/global';
import Orientation from 'react-native-orientation-locker';
import {Container} from '../../components';
import {statusHide} from '../../utils/responsive';
import {CircleBtn} from '../../components/Header';
const WalkThroughVedio = props => {
  const [loadingState, setLoadingState] = React.useState(false);
  const [videoLoader, setVideoLoader] = React.useState(true);
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef();
  const [counter, setCounter] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
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
  useEffect(() => {
    if (isFullScreen === true) {
      Orientation.unlockAllOrientations();
      return () => {
        Orientation.lockToPortrait();
      };
    }
  }, [isFullScreen]);
  useEffect(() => {
    return () => Orientation.lockToPortrait();
  }, []);
  const videoPlay = () => {
    setIsPlaying(!isPlaying);
    setCounter(counter + 1);
  };
  const headerComp = () => (
    <CircleBtn
      icon={Images.iconBack}
      onPress={navigation.goBack}
      accessibilityLabel="Cross Button, Go back"
      style={styles.header}
    />
  );
  return (
    <>
      <Container
        showHeader={true}
        headerEnd={false}
        headerComp={headerComp}
        style={styles.containerStyle}>
        <View style={[globalStyle.mainContainer, {marginTop: statusHide(105)}]}>
          <Text style={globalStyle.screenTitle}>
            {Strings.smSetting.See_Help_Video}
          </Text>
          <Video
            source={Images.HERA_VIDEO}
            style={styles.video}
            // audioOnly
            onFullscreenPlayerWillPresent={() => setIsFullScreen(true)}
            onFullscreenPlayerWillDismiss={() => setIsFullScreen(false)}
            controls={true}
            ref={videoRef}
            resizeMode={Alignment.CONTAIN}
            onLoad={() => {
              videoRef?.current?.seek(0);
              videoRef?.current?.pause();
              // videoRef?.current?.setNativeProps({
              //   paused: true,
              // });
              setLoadingState(!loadingState);
            }}
            paused={!isPlaying}
            onEnd={() => {
              setIsPlaying(false);
              videoRef?.current?.seek(0);
              videoRef?.current?.pause();
              // videoRef?.current?.setNativeProps({
              //   paused: true,
              // });
              setLoadingState(!loadingState);
            }}
            onLoadStart={() => {
              setLoadingState(!loadingState);
            }}
            onVideoBuffer={() => {
              setLoadingState(!loadingState);
            }}
            onReadyForDisplay={() => {
              setLoadingState(false);
              setVideoLoader(false);
            }}
            repeat={true}
            onPress={() => videoPlay()}
          />
        </View>
      </Container>
    </>
  );
};
export default WalkThroughVedio;
