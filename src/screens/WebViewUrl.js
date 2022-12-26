import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, TouchableOpacity, View, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import {Alignment, Colors, Images} from '../constants';
import {Value} from '../constants/FixedValues';

const WebViewUrl = props => {
  const navigation = useNavigation();
  const INJECTED_JAVASCRIPT = `(function() {
      const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
    })();`;
  return (
    <>
      <View
        style={{
          alignItems: Alignment.FLEXEND,
          paddingVertical: Value.CONSTANT_VALUE_5,
          backgroundColor: Colors.BACKGROUND,
        }}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Image
            source={Images.iconcross}
            style={{
              marginRight: Value.CONSTANT_VALUE_20,
            }}
          />
        </TouchableOpacity>
      </View>
      <WebView
        style={{backgroundColor: Colors.BACKGROUND}}
        source={{uri: props?.route?.params?.url}}
        startInLoadingState
        injectedJavaScript={INJECTED_JAVASCRIPT}
        renderLoading={() => (
          <View
            style={{
              flex: Value.CONSTANT_VALUE_1,
              alignItems: Alignment.CENTER,
            }}>
            <ActivityIndicator size="large" />
          </View>
        )}
        automaticallyAdjustContentInsets={true}
        allowsBackForwardNavigationGestures
      />
    </>
  );
};
export default WebViewUrl;
