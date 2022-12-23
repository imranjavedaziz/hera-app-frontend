import {View} from 'react-native';
import React from 'react';
import styles from './style';
import {WebView} from 'react-native-webview';
const WalkThroughVedio = () => {
  return (
    <View style={styles.mainContainer}>
      <WebView
        source={{
          uri: 'https://www.youtube.com/watch?v=myjEoDypUD8',
        }}
        style={{marginTop: 20, flex: 1, backgroundColor: 'red'}}
      />
    </View>
  );
};

export default WalkThroughVedio;
