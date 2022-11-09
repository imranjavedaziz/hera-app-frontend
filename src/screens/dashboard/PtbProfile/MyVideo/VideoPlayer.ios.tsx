import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Video from 'react-native-video';

export const VideoPlayer: React.FC = () => {
  return (
    <View style={styles.container}>
      <Video
        source={{
          uri:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').width * (9 / 16),
          backgroundColor: 'black',
        }}
        controls={true}
        resizeMode={'cover'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * (9 / 16),
    backgroundColor: 'black',
  },
  text: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 15,
    textAlign: 'justify',
  },
});
